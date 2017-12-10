export class ModelManager {

    loadBatch(models, callback) {
        models.forEach((model, i) => model.load((data) => {
            if ((i + 1) === models.length) callback();
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
