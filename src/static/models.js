export class Models {

    constructor() { this.models = { loaded: [], unloaded: [] }; }

    set add(model) { this.models.unloaded.push(model); }

    load(callback) {
        this.models.unloaded.forEach((model, i) => model.load((data) => {
            this.models.loaded.push(this.models.unloaded.slice(i)[0]);
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
