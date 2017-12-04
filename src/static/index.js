var TRANSITION_DURATION = 1000;

var Elm = require( "../elm/Main" ),
    app = Elm.Main.embed(document.getElementById("main")),
    color = d3.scaleSequential(d3.interpolateReds),
    data = {},
    filter = {"category": null, "year": null},
    path = d3.geoPath(),
    rendered = false,
    svg = null,
    topo = null;

function initUI() {
    var years = new Set();
    for (var state in data) {
        for (var year in data[state].stats) {
            years.add(year);
        } 
    }

    app.ports.categories.send(["Incidents", "Injured", "Killed", "Victims"]);
    app.ports.years.send(Array.from(years)
        .sort(function(a, b) {return b - a; })
        .map(function(y) { return parseInt(y); }));
}

function main() {
    d3.queue()
        .defer(d3.json, "static/data/us-10m.v1.json")
        .defer(d3.csv, "static/data/stats.csv")
        .await(ready);

    // messages from elm
    app.ports.newState.subscribe(function(state) { update(state); });
}

function onStateClick(d) {
    var stateName = nameFromFips(d.id);
    app.ports.selectedState.send(JSON.stringify({
        category: filter.category,
        name: stateName,
        value: data[stateName].value,
        year: filter.year
    }));
}

// @todo indicate this only works with CSV
function parseStats(stats) {
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
}

function ready(error, topo_, stats) {
    if (error) throw error;

    topo = topo_;
    parseStats(stats);
    initUI();
}

function render(topo) {
    if (!rendered) {
        svg = d3.select("svg");

        svg.attr("width", document.getElementById("vis").clientWidth);
        // @todo fix this
        svg.attr("height", 600);

        svg.append("svg:g")
            .attr("class", "states")
            .selectAll(".state")
            .data(topojson.feature(topo, topo.objects.states).features)
            .enter().append("svg:path")
                .attr("d", path)
                .attr("class", "state")
                .attr("fill", function(d) { return color(0); })
                .on("click", onStateClick)
                .append("svg:title")
                    .text(function(d) { return nameFromFips(d.id); });

        renderLegend();
        rendered = true;
    }
}

function renderLegend() {
    var defs = svg.append("svg:defs"),
        gradient = defs.append("svg:linearGradient")
            .attr("id", "linear-gradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%"),
        min = 0, max = 50, offset = 0, step = 100 / max;

    color.domain([min, max]);
    d3.range(min, max).forEach(function(i) {
        gradient.append("svg:stop")
            .attr("offset", offset + "%")
            .attr("stop-color", "" + color(i));
        offset += step;
    });

    svg.append("svg:rect")
        .attr("width", 300)
        .attr("height", 20)
        .style("fill", "url(#linear-gradient)");

    // @todo axis ticks
}

// the color scale doesn't need to be re-rendered
function updateLegend(min, max) {
}

function update(state) {

    if (!rendered) {
        render(topo);
    }
    var parsed = JSON.parse(state),
        maxValue = 0,
        minValue = 0,
        state = null,
        value = 0;

    filter.category = parsed.category.toLowerCase();
    filter.year = parsed.year;

    for (var k in data) {
        state = data[k];
        value = 0;

        if (state.stats.hasOwnProperty(filter.year)) {
            value += state.stats[filter.year][filter.category];
        }

        if (value > maxValue) maxValue = value;
        if (value < minValue) minValue = value;
        state.value = value;
    }

    color.domain([minValue, maxValue]);
    updateLegend(minValue, maxValue);
    updateStates(color(minValue));
} 

function updateStates(defaultColor) {
    svg.selectAll(".state")
        .transition()
        .duration(TRANSITION_DURATION)
        .style("fill", function(d) {
            var name = nameFromFips(d.id);
            return data.hasOwnProperty(name) ? color(data[name].value) : defaultColor;
        })
        .select("title")
            .text(function(d) {
                var name = nameFromFips(d.id);
                return data.hasOwnProperty(name) ? name + " : " + data[name].value : name;
            });
}

main();


// @todo usstates.js

function nameFromFips(fips) {
    return map_[fips];
}

// PRIVATE

var map_ = {
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
