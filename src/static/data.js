// @todo use singletons

export class DataStores {
    static batchLoad(stores = [], callback) {
        let loaded = 0;
        stores.forEach((s) => s.load((data) => {
            loaded++;
            if (loaded == stores.length) callback();
        }));
    }
}


export class DataStore {
    load(callback) {
        d3.queue().defer(this.formatter, this.path).await((error, data) => {
            if (error) throw error;
            this.raw = data;
            callback(data);
        });
    }
}


export class UsTopoDataStore extends DataStore {
    get formatter() { return d3.json; }
    get path() { return "static/data/us-10m.v1.json"; }

    get states() { return this.raw.objects.states; }
}
