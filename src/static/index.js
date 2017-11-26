// inject bundled Elm app into div#main
var Elm = require( '../elm/Main' ),
    app = Elm.Main.embed( document.getElementById( 'main' ) );

app.ports.newState.subscribe(function(payload) {
    update(payload);
});

var data = {}, dataReady = false;

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

var color = d3.scaleLinear().range(["yellow", "red"]);

var svg = d3.select("svg"),
    path = d3.geoPath();

// receives messages from Elm
function update(payload) {
    if (!dataReady) {
        setTimeout(function() {
            update(payload);
        }, 500);
    } else {
        var filter = JSON.parse(payload),
            category = filter.category.toLowerCase(),
            dataz = {};

        filter.years.forEach(function(y) {
            for (var state in data[y]) {
                if (!dataz.hasOwnProperty(state)) {
                    dataz[state] = data[y][state][category];
                } else {
                    dataz[state] += data[y][state][category];
                }
            }
        });

        var result = [];
        for (var state in dataz) {
            result.push({"state": state, "value": dataz[state]});
        }
        color.domain(d3.extent(result, function(d) { return d.value; }));

        // @todo join this with state data
        result.forEach(function(d) {
            svg.select("#" + d.state)
                .transition()
                .duration(1000)
                    .style("fill", color(d.value));
        });
    }
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
    format(incidents);

    svg.append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
            .attr("d", path)
            .attr("class", "state")
            .attr("fill", "lightgrey")
            .attr("id", function(d) { return states[d.id]; });

    // @todo what is this for?
//    svg.append("path")
//        .attr("class", "state-borders")
//        .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
//            return a !== b; })));

    dataReady = true;
}

function format(incidents) {
    incidents.forEach(function(i) {
        var year = i["Incident Date"].split(", ")[1];

        if (!data.hasOwnProperty(year)) {
            data[year] = {};
        }

        var state = i.State;
        if (!data[year].hasOwnProperty(state)) {
            data[year][state] = {
            "incidents": 0,
            "injured": 0,
            "killed": 0,
            "victims": 0
            }
        }
        
        var injured = parseInt(i["# Injured"]),
            killed = parseInt(i["# Killed"]);

        data[year][state].incidents++;
        data[year][state].injured += injured;
        data[year][state].killed += killed;
        data[year][state].victims += (injured + killed);
    });
}

main();
