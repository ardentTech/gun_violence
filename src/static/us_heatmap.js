// @TODO
// modes = county | state | country


export class UsHeatMap {
    constructor() {
        this.color = d3.scaleSequential(d3.interpolateReds);
        this.isRendered = false;
        this.parentId = "vis";
        this.path = d3.geoPath();
        this.svg = null;
    }

    set topoData(data) { this._topoData = data; }

    containerWidth() { return document.getElementById(this.parentId).clientWidth; }

    init() { d3.select(window).on("resize", () => this.resize()); }

    render() {
        this.svg = d3.select("svg");
        this.svg.attr("width", "100%");

        this.svg.append("svg:g")
            .attr("class", "states")
            .selectAll(".state")
            .data(topojson.feature(this._topoData.raw, this._topoData.states).features)
            .enter().append("svg:path")
                .attr("d", this.path)
                .attr("class", "state")
                .style("fill", (d) => { return this.color(0); })
                .attr("id", (d) => { return d.id; });

        this.resize();
        this.isRendered = true;
    }

    resize() {
        let width = this.containerWidth();
        d3.select("g.states").attr("transform", "scale(" + (width / 1000) + ")");
        this.svg.attr("height", width * 0.75);
    }

    update(stateValues) {
        if (!this.isRendered) this.render();

        this.color.domain(d3.extent(Object.values(stateValues)));

        d3.selectAll(".state")
            .transition()
            .duration(1000)
            .style("fill", (d) => { return this.color(stateValues[d.id]); });
    }
}
