import ElmApp from "./elm_app.js";
import { GunViolence } from "./models/gun_violence.js";
import { ModelManager } from "./models.js";
import { UsTopo } from "./models/us_topo.js";
import { UsStatesHeatMap } from "./us_states_heat_map.js";


class App {
    constructor() {
        this.elmApp = ElmApp;
        this.gunViolence = new GunViolence();
        this.modelManager = new ModelManager();
        this.usTopo = new UsTopo();
        this.vis = new UsStatesHeatMap({ parentNode: "vis" });
    }

    dataLoaded() {
        this.vis.topoData = this.usTopo;
        this.gunViolence.parse();
    }

    loadData() {
        this.modelManager.loadBatch([this.gunViolence, this.usTopo], () => this.dataLoaded());
    }

    main() {
        this.loadData();

        // @todo get a message from the bus instead of elm app directly
        this.elmApp.receive("newState", (state) => {
            let parsed = JSON.parse(state);
            if (parsed.category && parsed.year) {
                this.vis.update(this.gunViolence.asValues(parsed.category, parsed.year));
            }
        });
    }

}


new App().main();
