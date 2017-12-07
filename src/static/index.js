//const Elm = require( "../elm/Main" );
import * as Elm from "../elm/Main";
import { DataStoreManager, DataStore, UsStatesDataStore, GunViolenceDataStore } from "./data.js";
import { Vis } from "./vis.js";


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
            this.elmApp.send("categories", this.dataStores["gun.violence"].categories);
            this.vis.parseData(this.dataStores);
        });
    }

    main() {
        this.loadData();
        this.elmApp.receive("newState", (state) => { this.vis.update(state); });
    }

}


new App().main();
