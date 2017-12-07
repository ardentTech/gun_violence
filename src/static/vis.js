export class UsHeatMap {
    constructor() {
        this.color = d3.scaleSequential(d3.interpolateReds);
        this.path = d3.geoPath();
        this.isRendered = false;
        this.svg = null;
    }

    set topoData(data) { this._topoData = data; }

    init() { d3.select(window).on("resize", () => this.resize()); }

    render() {
        this.svg = d3.select("svg");
        this.svg.attr("width", document.getElementById("vis").clientWidth);
        this.svg.attr("height", 600);

        this.svg.append("svg:g")
            .attr("class", "states")
            .selectAll(".state")
            .data(topojson.feature(this._topoData.data, this._topoData.states).features)
            .enter().append("svg:path")
                .attr("d", this.path)
                .attr("class", "state")
                .attr("fill", (d) => { return this.color(0); });

        this.isRendered = true;
    }

    resize() {
        this.svg.attr("width", document.getElementById("vis").clientWidth);
        // @todo height
    }

    update(state) {
        if (!this.isRendered) this.render();
    }
}
