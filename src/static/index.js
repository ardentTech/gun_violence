import ElmApp from "./elm_app.js";
import { GunViolence } from "./models/gun_violence.js";
import MessageBus from "./message_bus.js";
import { ModelManager } from "./models.js";
import { UsTopo } from "./models/us_topo.js";
import { UsStatesHeatMap } from "./us_states_heat_map.js";


class App {
    constructor() {
        this.elmApp = ElmApp;
        this.gunViolence = new GunViolence();
        this.messageBus = MessageBus;
        this.modelManager = new ModelManager();
        this.usTopo = new UsTopo();
        this.vis = new UsStatesHeatMap({ parentNode: "vis" });

        this.messageBus.subscribe(
            "state:clicked", "elm-app", (payload) => this.onStateClick(payload));
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
                this.vis.update(
                    this.gunViolence.categoryYearValues(
                        parsed.category, parsed.year));
            }
        });
    }

    onStateClick(state) {
        this.elmApp.send(
            "selectedState",
            JSON.stringify(this.gunViolence.stateIncidents(state)));
    }
}


new App().main();
