const Elm = require( "../elm/Main" );


class DataStore {

    constructor() {
        this.data = {};
        this.sourcesLoaded = 0;

        this._loadedCallback = null;
        this._sources = [];
    }

    set loadedCallback(func) { this._loadedCallback = func; }

    set sources(s) { this._sources = s; }
    
    load() {
        this._sources.forEach((s) => s.load((data) => this.loaded(data, s.name)));
    }

    loaded(data, name) {
        this.data[name] = data;
        this.sourcesLoaded++;
        if (this.sourcesLoaded == this._sources.length) this._loadedCallback(data);
    }
}


class DataSource {

    constructor (name, path, formatter) {
        this.formatter = formatter;
        this.name = name;
        this.path = path;
    }

    load(callback) {
        d3.queue().defer(this.formatter, this.path).await((error, data) => {
            if (error) throw error;
            this.data = data;
            callback(data);
        });
    }
}


class Vis {

    parseData(data) {
        console.log("Vis.parseData");
        console.log(data);
    }

    update(state) {
        console.log("Vis.update");
    }
}


class App {
    constructor(elmSelector) {
        this.dataStore = new DataStore();
        this.elmSelector = elmSelector;
        this.elmApp = Elm.Main.embed(document.getElementById(this.elmSelector));
        this.vis = new Vis();
    }

    dataSources() {
        return [
            new DataSource("us.states", "static/data/us-10m.v1.json", d3.json),
            new DataSource("gun.violence", "static/data/stats.csv", d3.csv)
        ];
    }

    loadData() {
        this.dataStore.sources = this.dataSources();
        this.dataStore.loadedCallback = this.vis.parseData;
        this.dataStore.load();
    }

    main() {
        this.loadData();
//        this.elmApp.ports.newState.subscribe(this.newUIState);
    }

//    newUIState(state) {
//        this.vis.update(state);
//    }
}


new App("main").main();
