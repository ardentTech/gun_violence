// @todo tooltips with state name and value
// @todo proper data binding
var Elm = require( '../elm/Main' ),
    app = Elm.Main.embed( document.getElementById( 'main' ) );

app.ports.newState.subscribe(function(payload) {
    update(payload);
});

var data = {}, dataLoaded = false, usTopo = null;

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

var color = d3.scaleLinear().range(["white", "red"]);

var svg = d3.select("svg"),
    path = d3.geoPath();

// receives messages from Elm
function update(payload) {
    if (dataLoaded) {
        var parsed = JSON.parse(payload),
            category = parsed.category.toLowerCase(),
            years = parsed.years;

        data.geometries.forEach(function(g) {
            var value = 0;

            years.forEach(function(y) {
                if (g.stats.hasOwnProperty(y)) {
                    value += g.stats[y][category];
                }
            });

            g.value = value;
        });

        color.domain(d3.extent(data.geometries, function(d) { return d.value; }));

        svg.selectAll(".state")
            .transition()
            .duration(1000)
            .style("fill", function(s) {
                var d = data.geometries.find(function(g) { return s.id == g.id; });
                return color(d.value); });
    } else {
        setTimeout(function() { update(payload); }, 500);
    }
}

function main() {
    d3.queue()
        .defer(d3.json, "static/data/us-10m.v1.json")
        .defer(d3.csv, "static/data/incidents.csv")
        .await(ready);
}

function ready(error, topo, stats) {
    if (error) throw error;

    data = topo.objects.states;
    usTopo = topo;

    data.geometries.forEach(function(g) { g.stats = {}; });

    stats.forEach(function(s) {
        // get state data object
        var d = data.geometries.find(function(g) { return states[g.id] == s.State; }),
            year = s["Incident Date"].split(", ")[1],
            injured = parseInt(s["# Injured"]),
            killed = parseInt(s["# Killed"]);

        if (!d.stats.hasOwnProperty(year)) d.stats[year] = {
            "incidents": 0,
            "injured": 0,
            "killed": 0,
            "victims": 0
        };

        d.stats[year].incidents++;
        d.stats[year].injured += injured;
        d.stats[year].killed += killed;
        d.stats[year].victims += (injured + killed);
    });

    svg.append("g")
        .attr("class", "states")
        .selectAll(".state")
        .data(topojson.feature(topo, data).features)
        .enter().append("path")
            .attr("d", path)
            .attr("class", "state")
            .attr("fill", "white")
            .append("svg:title")
                .text(function(d) { return states[d.id]; });

    dataLoaded = true;
}

main();
