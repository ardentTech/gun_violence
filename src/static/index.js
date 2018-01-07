import ElmApp from "./elm_app.js";
import { GunViolence } from "./models/gun_violence.js";
import MessageBus from "./message_bus.js";
import { ModelManager } from "./models.js";
import { UsTopo } from "./models/us_topo.js";
import { UsStatesHeatMap } from "./us_states_heat_map.js";


// @todo receive msg from elm app when new year is chosen


class App {
    constructor() {
        this.elmApp = ElmApp;
        this.filter = { category : null, year : null };
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
        // @todo update a filter object and emit a message
        this.elmApp.receive("newFilter", (state) => {
            let parsed = JSON.parse(state);
            // @todo learn how to unpack efficiently in ES6
            this.filter.category = parsed.category;
            if (this.filter.year != parsed.year) {
                this.filter.year = parsed.year;
            // @todo if the filter year changes, trigger a `onStateClick`
//                this.onStateClick();
            }

            if (this.filter.category && this.filter.year) {
                this.vis.update(
                    this.gunViolence.categoryYearValues(
                        this.filter.category, this.filter.year));

            }
        });
    }

    onStateClick(state) {
        state.year = this.filter.year;
        this.elmApp.send(
            "selectedState",
            JSON.stringify(this.gunViolence.stateIncidents(state)));
    }
}


new App().main();
