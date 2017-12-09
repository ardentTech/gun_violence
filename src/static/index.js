import { ElmApp } from "./elm_app.js";
import { GunViolence } from "./models/gun_violence.js";
import { Models } from "./models.js";
import { UsTopo } from "./models/us_topo.js";
import { UsHeatMap } from "./us_heatmap.js";


// @todo app-wide message bus
class App {
    constructor() {
        this.models = new Models();
        this.elmApp = new ElmApp();
        this.vis = new UsHeatMap();
        this.gunViolence = new GunViolence();
        this.usTopo = new UsTopo();
    }

    loadData() {
        this.models.add(this.gunViolence, this.usTopo).load(() => {
            this.vis.topoData = this.usTopo;
            this.gunViolence.parse();
            this.elmApp.send("years", this.gunViolence.years);
            this.elmApp.send("categories", this.gunViolence.categories);
        });
    }

    main() {
        this.loadData();
        this.vis.init();

        this.elmApp.receive("newState", (state) => {
            let parsed = JSON.parse(state);
            this.vis.update(
                this.gunViolence.asValues(parsed.category, parsed.year));
        });
    }

}


new App().main();
