export class ModelManager {

    constructor() {
        this.modelsLoaded = 0;
    }

    loadBatch(models, callback) {
        this.modelsLoaded = 0;

        models.forEach((model, i) => model.load((data) => {
            this.modelsLoaded++;
            if (this.modelsLoaded == models.length) callback();
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
