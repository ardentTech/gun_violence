import { ElmApp } from "./elm_app.js";
import { GunViolence } from "./models/gun_violence.js";
import { ModelManager } from "./models.js";
import { UsTopo } from "./models/us_topo.js";
import { UsStatesHeatMap } from "./us_states_heat_map.js";


class App {
    constructor() {
        this.modelManager = new ModelManager();
        this.elmApp = new ElmApp();
        this.vis = new UsStatesHeatMap({ parentNode: "vis" });
        this.gunViolence = new GunViolence();
        this.usTopo = new UsTopo();
    }

    dataLoaded() {
        this.vis.topoData = this.usTopo;
        this.gunViolence.parse();
        this.elmApp.send("years", this.gunViolence.years);
        this.elmApp.send("categories", this.gunViolence.categories);
    }

    loadData() {
        this.modelManager.loadBatch([this.gunViolence, this.usTopo], () => this.dataLoaded());
    }

    main() {
        this.loadData();

        this.elmApp.receive("newState", (state) => {
            let parsed = JSON.parse(state);
            if (parsed.category && parsed.year) {
                this.vis.update(this.gunViolence.asValues(parsed.category, parsed.year));
            }
        });
    }

}


new App().main();
