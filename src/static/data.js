export class DataStoreManager {
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
            this.data = data;
            callback(data);
        });
    }
}


export class UsStatesDataStore extends DataStore {
    get formatter() { return d3.json; }
    get path() { return "static/data/us-10m.v1.json"; }
}


export class GunViolenceDataStore extends DataStore {

    get formatter() { return d3.csv; }
    get path() { return "static/data/stats.csv"; }

    get years() {
        let years = new Set();
        this.data.forEach((d) => {
            years.add(parseInt(d["Incident Date"].split(", ")[1]));
        });
        return Array.from(years);
    }

    // @todo don't hard-code this
    get categories() {
        return ["Incidents", "Injured", "Killed", "Victims"];
    }
}
