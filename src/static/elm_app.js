import * as Elm from "../elm/Main";


export class ElmApp {

    constructor() { this.app = Elm.Main.embed(document.getElementById("main")); }

    send(key, value) { this.app.ports[key].send(value); }

    receive(key, callback) { this.app.ports[key].subscribe(callback); }
}
