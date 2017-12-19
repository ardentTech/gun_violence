import * as Elm from "../elm/Main";
import MessageBus from "./message_bus.js";


class ElmApp {

    constructor() {
        this.app = Elm.Main.embed(document.getElementById("main"));
        this.messageBus = MessageBus;

        this.messageBus.subscribe(
            "state:clicked", "elm-app", (payload) => this.onStateClick(payload));
        this.messageBus.subscribe(
            "categories:parsed", "elm-app", (payload) => this.onCategoriesParsed(payload));
        this.messageBus.subscribe(
            "years:parsed", "elm-app", (payload) => this.onYearsParsed(payload));
    }

    onCategoriesParsed(payload) { this.send("categoriesInit", payload); }

    onStateClick(payload) { this.send("selectedState", payload); }

    onYearsParsed(payload) { this.send("yearsInit", payload); }

    send(key, value) { this.app.ports[key].send(value); }

    receive(key, callback) { this.app.ports[key].subscribe(callback); }
}


export default new ElmApp();
