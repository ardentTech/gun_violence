export class Vis {
    constructor() {
        this.color = d3.scaleSequential(d3.interpolateReds);
        this.path = d3.geoPath();
        this.isRendered = false;
        this.svg = null;
    }
    
    parseData(dataStores) {
        this.dataStores = dataStores;
    }

    render() {
        this.svg = d3.select("svg");

        this.svg.attr("width", document.getElementById("vis").clientWidth);
        this.svg.attr("height", 600);

        this.svg.append("svg:g")
            .attr("class", "states")
            .selectAll(".state")
            .data(topojson.feature(
                this.dataStores["us.states"].data,
                this.dataStores["us.states"].data.objects.states
            ).features)
            .enter().append("svg:path")
                .attr("d", this.path)
                .attr("class", "state")
                .attr("fill", (d) => { return this.color(0); });

        this.isRendered = true;
    }

    update(state) {
        if (!this.isRendered) this.render();
    }
}


// UPDATE
//if (!rendered) render(topo);
//
//var parsed = JSON.parse(state),
//    maxValue = 0,
//    minValue = 0,
//    state = null,
//    value = 0;
//
//filter.category = parsed.category.toLowerCase();
//filter.year = parsed.year;
//
//for (var k in data) {
//    state = data[k];
//    value = 0;
//
//    if (state.stats.hasOwnProperty(filter.year)) {
//        value += state.stats[filter.year][filter.category];
//    }
//
//    if (value > maxValue) maxValue = value;
//    if (value < minValue) minValue = value;
//    state.value = value;
//}
//
//color.domain([minValue, maxValue]);
//updateLegend(minValue, maxValue);
//updateStates(color(minValue));
