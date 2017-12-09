import { DataStores, UsTopoDataStore } from "./data.js";
import { ElmApp } from "./elm_app.js";
import { GunViolenceDataStore } from "./gun_violence.js";
import { UsHeatMap } from "./us_heatmap.js";


// @todo app-wide message bus
class App {
    constructor() {
        this.dataStores = {
            "gun.violence": new GunViolenceDataStore(),
            "us.topo": new UsTopoDataStore()
        };
        this.gunViolenceData = new GunViolenceDataStore();
        this.usTopo = new UsTopoDataStore();
        this.elmApp = new ElmApp();
        this.vis = new UsHeatMap();
    }

    loadData() {
        DataStores.batchLoad(Object.values(this.dataStores), () => {
            this.vis.topoData = this.dataStores["us.topo"];

            this.dataStores["gun.violence"].init();
            this.elmApp.send("years", this.dataStores["gun.violence"].years);
            this.elmApp.send("categories", this.dataStores["gun.violence"].categories);
        });
    }

    main() {
        this.loadData();
        this.vis.init();

        this.elmApp.receive("newState", (state) => {
            let parsed = JSON.parse(state);
            this.vis.update(
                this.dataStores["gun.violence"].asValues(parsed.category, parsed.year));
        });
    }

}


new App().main();
