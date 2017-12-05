const Elm = require( "../elm/Main" );


class DataStore {

    // @todo should this manage all access?
    load(ready) {
        const sources = [[d3.json, "static/data/us-10m.v1.json"], [d3.csv, "static/data/stats.csv"]];
        let queue = d3.queue();
        sources.map((d) => { queue.defer(d[0], d[1]); });
        queue.awaitAll(ready);
    }
}


class Vis {

    parseData(error, topo, stats) {
        if (error) throw error;
        console.log("Vis.parseData");
    }

    update(state) {
        console.log("Vis.update");
    }
}


class App {
    constructor(elmSelector) {
        this.elmSelector = elmSelector;
        this.elmApp = Elm.Main.embed(document.getElementById(this.elmSelector));
        this.vis = new Vis();
        this.dataStore = new DataStore();
    }

    main() {
        this.dataStore.load(this.vis.parseData);
        this.elmApp.ports.newState.subscribe(this.newUIState);

//        var years = new Set();
//        for (var state in data) {
//            for (var year in data[state].stats) {
//                years.add(year);
//            } 
//        }
//
//        app.ports.categories.send(["Incidents", "Injured", "Killed", "Victims"]);
//        app.ports.years.send(Array.from(years)
//            .sort(function(a, b) {return b - a; })
//            .map(function(y) { return parseInt(y); }));
    }

    newUIState(state) {
        this.vis.update(state);
    }
}


new App("main").main();
