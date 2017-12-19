import * as Elm from "../elm/Main";
import MessageBus from "./message_bus.js";


export class ElmApp {

    constructor() {
        this.app = Elm.Main.embed(document.getElementById("main"));
        this.messageBus = MessageBus;

        this.messageBus.subscribe("state:click", "elm-app", (name) => this.onStateClick(name));
    }

    onStateClick(name) { this.send("selectedState", name); }

    send(key, value) { this.app.ports[key].send(value); }

    receive(key, callback) { this.app.ports[key].subscribe(callback); }
}


// @todo export default new ElmApp();
