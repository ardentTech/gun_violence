// inject bundled Elm app into div#main
var Elm = require( '../elm/Main' ),
    app = Elm.Main.embed( document.getElementById( 'main' ) );

app.ports.newState.subscribe(function(payload) {
    update(payload);
});

var states = {
    "01": "Alabama",
    "02": "Alaska",
    "04": "Arizona",
    "05": "Arkansas",
    "06": "California",
    "08": "Colorado",
    "09": "Connecticut",
    "10": "Delaware",
    "11": "District of Columbia",
    "12": "Florida",
    "13": "Georgia",
    "15": "Hawaii",
    "16": "Idaho",
    "17": "Illinois",
    "18": "Indiana",
    "19": "Iowa",
    "20": "Kansas",
    "21": "Kentucky",
    "22": "Louisiana",
    "23": "Maine",
    "24": "Maryland",
    "25": "Massachusetts",
    "26": "Michigan",
    "27": "Minnesota",
    "28": "Mississippi",
    "29": "Missouri",
    "30": "Montana",
    "31": "Nebraska",
    "32": "Nevada",
    "33": "New Hampshire",
    "34": "New Jersey",
    "35": "New Mexico",
    "36": "New York",
    "37": "North Carolina",
    "38": "North Dakota",
    "39": "Ohio",
    "40": "Oklahoma",
    "41": "Oregon",
    "42": "Pennsylvania",
    "44": "Rhode Island",
    "45": "South Carolina",
    "46": "South Dakota",
    "47": "Tennessee",
    "48": "Texas",
    "49": "Utah",
    "50": "Vermont",
    "51": "Virginia",
    "53": "Washington",
    "54": "West Virginia",
    "55": "Wisconsin",
    "56": "Wyoming"
};

var color = d3.scaleLinear().range(["blue", "red"]);

var svg = d3.select("svg"),
    path = d3.geoPath();

// receives messages from Elm
function update(payload) {
    var payload = JSON.parse(payload);
}

// @todo need dummy data for init
function updatez(data) {
//    var data = JSON.parse(data);
//
//    color.domain(d3.extent(data, function(d) { return d.value; }));
//
//    // @todo join this with state data
//    data.forEach(function(d) {
//        svg.select("#" + d.state)
//            .transition()
//            .duration(1000)
//                .style("fill", color(d.value));
//    });
}

function main() {
    d3.queue()
        .defer(d3.json, "static/data/us-10m.v1.json")
        .defer(d3.csv, "static/data/incidents.csv")
        .await(ready);
}

function ready(error, us, incidents) {
    if (error) throw error;

    // @todo filter incidents
    // @todo need default filter object
    var incidents = formatIncidents(incidents);

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

function formatIncidents(incidents) {
    var data = {};

    for (var key in states) {
        data[states[key]] = {
            "incidents": 0,
            "injured": 0,
            "killed": 0,
            "victims": 0
        }
    }

    incidents.forEach(function(i) {
        var state = data[i.State],
            injured = parseInt(i["# Injured"]),
            killed = parseInt(i["# Killed"]);
        state.incidents++;
        state.injured += injured;
        state.killed += killed;
        state.victims += (injured + killed);
    });

    console.log(data);
    return data;
}

main();
