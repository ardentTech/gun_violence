const Elm = require( "../elm/Main" );


class DataStoreManager {
    static batchLoad(stores = [], callback) {
        let loaded = 0;
        stores.forEach((s) => s.load((data) => {
            loaded++;
            if (loaded == stores.length) callback();
        }));
    }
}


class DataStore {
    load(callback) {
        d3.queue().defer(this.formatter, this.path).await((error, data) => {
            if (error) throw error;
            this.data = data;
            callback(data);
        });
    }
}


class UsStatesDataStore extends DataStore {
    get formatter() { return d3.json; }
    get path() { return "static/data/us-10m.v1.json"; }
}


class GunViolenceDataStore extends DataStore {
    get formatter() { return d3.csv; }
    get path() { return "static/data/stats.csv"; }

    get years() {
        let years = new Set();
        this.data.forEach((d) => {
            years.add(parseInt(d["Incident Date"].split(", ")[1]));
        });
        return Array.from(years);
    }
}


class Vis {}


class ElmApp {

    constructor() { this.app = Elm.Main.embed(document.getElementById("main")); }

    send(key, value) { this.app.ports[key].send(value); }

    receive(key, callback) { this.app.ports[key].subscribe(callback); }
}


class App {
    constructor() {
        this.dataStores = {
            "us.states": new UsStatesDataStore(),
            "gun.violence": new GunViolenceDataStore()
        };
        this.elmApp = new ElmApp();
        this.vis = new Vis();
    }

    loadData() {
        DataStoreManager.batchLoad(Object.values(this.dataStores), (data) => {
            this.elmApp.send("years", this.dataStores["gun.violence"].years);
            // @todo don't hard-code
            this.elmApp.send("categories", ["Incidents", "Injured", "Killed", "Victims"]);
        });
    }

    main() {
        this.loadData();
        this.elmApp.receive("newState", (state) => { this.update(state); });
    }

    // @todo
    update(state) {
        console.log("App.update");
        console.log(state);
    }

}


new App().main();
