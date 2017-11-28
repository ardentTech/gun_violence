// @todo message to Elm with Years
// @todo tooltips with state name and value

var Elm = require( "../elm/Main" ),
    app = Elm.Main.embed(document.getElementById("main")),
    color = d3.scaleSequential(d3.interpolateReds),
    svg = d3.select("svg"),
    path = d3.geoPath(),
    rendered = false,
    data = {};

var fipsToName = {
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

function main() {
    d3.queue()
        .defer(d3.json, "static/data/us-10m.v1.json")
        .defer(d3.csv, "static/data/stats.csv")
        .await(render);

    app.ports.newState.subscribe(function(state) { update(state); });
}

function render(error, topo, stats) {
    if (error) throw error;

    stats.forEach(function(s) {
        var year = s["Incident Date"].split(", ")[1],
            injured = parseInt(s["# Injured"]),
            killed = parseInt(s["# Killed"]);

        if (!data.hasOwnProperty(s.State)) {
            data[s.State] = {"stats": {}}; 
        }

        var state = data[s.State];

        if (!state.stats.hasOwnProperty(year)) {
            state.stats[year] = { "incidents": 0, "injured": 0, "killed": 0, "victims": 0 };
        }

        state.stats[year].incidents++;
        state.stats[year].injured += injured;
        state.stats[year].killed += killed;
        state.stats[year].victims += (injured + killed);
    });

    svg.append("svg:g")
        .attr("class", "states")
        .selectAll(".state")
        .data(topojson.feature(topo, topo.objects.states).features)
        .enter().append("svg:path")
            .attr("d", path)
            .attr("class", "state")
            .attr("fill", function(d) { return color(0); })
            .append("svg:title")
                .text(function(d) { return fipsToName[d.id]; });

    rendered = true;
}

function update(state) {
    if (rendered) {
        var parsed = JSON.parse(state),
            category = parsed.category.toLowerCase(),
            maxValue = 0,
            minValue = 0,
            years = parsed.years;

        for (var k in data) {
            var state = data[k], value = 0;

            years.forEach(function(year) {
                if (state.stats.hasOwnProperty(year)) {
                    value += state.stats[year][category];
                }
            });

            if (value > maxValue) maxValue = value;
            if (value < minValue) minValue = value;
            state.value = value;
        }

        color.domain([minValue, maxValue]);

        svg.selectAll(".state")
            .transition()
            .duration(1000)
            .style("fill", function(s) {
                var name = fipsToName[s.id];
                if (data.hasOwnProperty(name)) {
                    return color(data[name].value);
                } else {
                    return color(minValue);
                }
            })
            .select("title")
                .text(function(d) {
                    var name = fipsToName[d.id];
                    if (data.hasOwnProperty(name)) {
                        return name + " : " + data[name].value;
                    } else {
                        return name;
                    }
                });
    } else {
        // @todo limit how many times this can execute
        setTimeout(function() { update(state); }, 500);
    } 
} 

main();
