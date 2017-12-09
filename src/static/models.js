export class Models {

    constructor() {
        this.models = { loaded: [], unloaded: [] };
    }

    add() {
        Array.prototype.slice.call(arguments).forEach((a) => this.models.unloaded.push(a));
        return this;
    }

    load(callback) {
        this.models.unloaded.forEach((model, i) => model.load((data) => {
            this.models.loaded.push(this.models.unloaded.slice(i)[0]);
            // @todo ensure `callback` is a func
            if (this.models.loaded.length === this.models.unloaded.length) callback();
        }));
    }
}


export class Model {

    load(callback) {
        d3.queue().defer(this.formatter, this.path).await((error, data) => {
            if (error) throw error;
            this.raw = data;
            callback(data);
        });
    }
}
