import { UsStates } from "./us_states.js";
import MessageBus from "./message_bus.js";


const TRANSITION_DURATION = 1000;


export class UsStatesHeatMap {
    constructor(settings) {
        this.color = d3.scaleSequential(d3.interpolateReds);
        this.isRendered = false;
        this.parentId = settings.parentNode;
        this.path = d3.geoPath();
        this.svg = null;
        this.legendAxisSvg = null;
        this.legendScale = d3.scaleLinear();
        this.legendSvg = null;
        this.legendAxis = d3.axisBottom().scale(this.legendScale);

        d3.select(window).on("resize", () => this.resize());
    }

    set topoData(data) { this._topoData = data; }

    containerWidth() { return document.getElementById(this.parentId).clientWidth; }

    onStateClick(d) {
        MessageBus.broadcast("state:clicked", {
            "name": UsStates.nameFor(d.id)
        });
    }

    render() {
        this.svg = d3.select("svg");
        this.svg.attr("width", "100%");

        this.renderStates();
        this.renderLegend();

        this.resize();
        this.isRendered = true;
    }

    renderLegend() {
        let defs = this.svg.append("svg:defs"),
            dimensions = { height: 15, width: 200 },
            extent = [0, 50],
            offset = 0,
            step = 100 / extent[1];

        let gradient = defs.append("svg:linearGradient")
            .attr("id", "linear-gradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%");

        this.color.domain(extent);

        d3.range(extent[0], extent[1]).forEach((i) => {
            gradient.append("svg:stop")
                .attr("offset", offset + "%")
                .attr("stop-color", "" + this.color(i));
            offset += step;
        });

        this.legendSvg = this.svg.append("svg:g").attr("id", "legend");

        this.legendSvg.append("svg:rect")
            .attr("width", dimensions.width)
            .attr("height", dimensions.height)
            .style("fill", "url(#linear-gradient)");

        this.legendScale.range([extent[0], dimensions.width]);

        this.legendAxisSvg = this.legendSvg.append("svg:g")
            .attr("transform", "translate(0,10)");
    }

    renderStates() {
        this.svg.append("svg:g")
            .attr("class", "states")
            .selectAll(".state")
            .data(topojson.feature(this._topoData.raw, this._topoData.states).features)
            .enter().append("svg:path")
                .attr("d", this.path)
                .attr("class", "state")
                .attr("id", (d) => { return d.id; })
                .on("click", this.onStateClick)
                .style("fill", (d) => { return this.color(0); });
    }

    // @todo don't float legend right on mobile devices
    resize() {
        let width = this.containerWidth();

        this.svg.attr("height", width * 0.75);
        d3.select("g.states").attr("transform", "scale(" + (width / 1000) + "),translate(0,40)");
        this.legendSvg.attr("transform", "translate(" + (this.containerWidth() - 250) + ",0)");
    }

    update(data) {
        if (!this.isRendered) this.render();

        let extent = d3.extent(Object.values(data));
        this.color.domain(extent);
        this.updateStates(data);
        this.updateLegend(extent);
    }

    updateLegend(extent) {
        this.legendScale.domain(extent);
        this.legendAxis.tickValues(extent);
        this.legendAxisSvg.transition()
            .duration(TRANSITION_DURATION)
            .call(this.legendAxis);
    }

    updateStates(data) {
        d3.selectAll(".state")
            .transition()
            .duration(TRANSITION_DURATION)
            .style("fill", (d) => { return this.color(data[d.id]); });
    }
}
