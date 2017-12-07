export class UsHeatMap {
    constructor() {
        this.color = d3.scaleSequential(d3.interpolateReds);
        this.isRendered = false;
        this.parentId = "vis";
        this.path = d3.geoPath();
        this.svg = null;
    }

    set topoData(data) { this._topoData = data; }

    containerWidth() {
        return document.getElementById(this.parentId).clientWidth;
    }

    init() { d3.select(window).on("resize", () => this.resize()); }

    render() {
        this.svg = d3.select("svg");
        this.svg.attr("width", "100%");

        this.svg.append("svg:g")
            .attr("class", "states")
            .selectAll(".state")
            .data(topojson.feature(this._topoData.data, this._topoData.states).features)
            .enter().append("svg:path")
                .attr("d", this.path)
                .attr("class", "state")
                .attr("fill", (d) => { return this.color(0); });

        this.resize();
        this.isRendered = true;
    }

    resize() {
        let width = this.containerWidth();
        d3.select("g.states").attr("transform", "scale(" + (width / 1000) + ")");
        this.svg.attr("height", width * 0.75);
    }

    update(state) {
        if (!this.isRendered) this.render();
    }
}
