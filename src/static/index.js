import { DataStores, UsTopoDataStore, GunViolenceDataStore } from "./data.js";
import { ElmApp } from "./elm_app.js";
import { UsHeatMap } from "./us_heatmap.js";
import { UsStatesDataStore } from "./us_states.js";


class App {
    constructor() {
        this.dataStores = {
            "gun.violence": new GunViolenceDataStore(),
            "us.states": new UsStatesDataStore(),
            "us.topo": new UsTopoDataStore()
        };
        this.elmApp = new ElmApp();
        this.vis = new UsHeatMap();
    }

    loadData() {
        DataStores.batchLoad(Object.values(this.dataStores), () => {
            this.elmApp.send("years", this.dataStores["gun.violence"].years);
            this.elmApp.send("categories", this.dataStores["gun.violence"].categories);
            this.vis.topoData = this.dataStores["us.topo"];
        });
    }

    main() {
        this.loadData();
        this.vis.init();
        this.elmApp.receive("newState", (state) => {
            console.log(this.dataStores["gun.violence"].totalsByState);
            this.vis.update(state);
        });
    }

}


new App().main();
