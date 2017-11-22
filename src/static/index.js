// inject bundled Elm app into div#main
var Elm = require( '../elm/Main' ),
    app = Elm.Main.embed( document.getElementById( 'main' ) );

app.ports.newState.subscribe(function(payload) {
    update(payload);
});

// FIPS : ABBV
var states = {
    "01": "AL",
    "02": "AK",
    "04": "AZ",
    "05": "AR",
    "06": "CA",
    "08": "CO",
    "09": "CT",
    "10": "DE",
    "10": "DC",
    "12": "FL",
    "13": "GA",
    "15": "HI",
    "16": "ID",
    "17": "IL",
    "18": "IN",
    "19": "IA",
    "20": "KS",
    "21": "KY",
    "22": "LA",
    "23": "ME",
    "24": "MD",
    "25": "MA",
    "26": "MI",
    "27": "MN",
    "28": "MS",
    "29": "MO",
    "30": "MT",
    "31": "NE",
    "32": "NV",
    "33": "NH",
    "34": "NJ",
    "35": "NM",
    "36": "NY",
    "37": "NC",
    "38": "ND",
    "39": "OH",
    "40": "OK",
    "41": "OR",
    "42": "PA",
    "44": "RI",
    "45": "SC",
    "46": "SD",
    "47": "TN",
    "48": "TX",
    "49": "UT",
    "50": "VT",
    "51": "VA",
    "53": "WA",
    "54": "WV",
    "55": "WI",
    "56": "WY"
};

var color = d3.scaleLinear().range(["blue", "red"]);

var svg = d3.select("svg"),
    path = d3.geoPath();

// @todo need dummy data for init
function update(data) {
    var data = JSON.parse(data);

    color.domain(d3.extent(data, function(d) { return d.value; }));

    // @todo join this with state data
    data.forEach(function(d) {
        svg.select("#" + d.state)
            .transition()
            .duration(1000)
                .style("fill", color(d.value));
    });
}

function render() {
    console.log("render()")
    d3.queue()
        // @todo pull this local
        .defer(d3.json, "https://d3js.org/us-10m.v1.json")
        .await(ready);
}

function ready(error, us, stateData) {
    if (error) throw error;

    svg.append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
            .attr("d", path)
            .attr("class", "state")
            .attr("id", function(d) { return states[d.id]; });

    // @todo what is this for?
//    svg.append("path")
//        .attr("class", "state-borders")
//        .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
//            return a !== b; })));
}

render();
