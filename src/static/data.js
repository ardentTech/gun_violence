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


export class GunViolenceDataStore extends DataStore {

    constructor() {
        super();
        this._totalsByState = null;
        this._years = null;
    }

    get formatter() { return d3.csv; }

    get path() { return "static/data/stats.csv"; }

    // @todo auto-run this.parse ONCE and calculate years, totalsByState, etc.
    //
    get years() {
        if (this._years !== null) return this._years;

        this._years = new Set();
        this.raw.forEach((d) => this._years.add(this.rowYear(d)));
        return Array.from(this._years);
    }

    // @todo don't hard-code this
    get categories() { return ["Incidents", "Injured", "Killed", "Victims"]; }

    get totalsByState() {
        if (this._totalsByState !== null) return this._totalsByState;

        let data = {};
        this.raw.forEach((d) => {
            if (typeof data[d.State] === "undefined") {
                let res = {};
                this.years.forEach((y) => {
                    res[y] = { "incidents": 0, "injured": 0, "killed": 0, "victims": 0 }; 
                });
                data[d.State] = res;
            }

            let target = data[d.State][this.rowYear(d)],
                injured = parseInt(d["# Injured"]),
                killed = parseInt(d["# Killed"]);

            target.incidents++;
            target.injured += injured;
            target.killed += killed;
            target.victims += (injured + killed);
        });

        this._totalsByState = data;
        return data;
    }

    rowYear(row) { return parseInt(row["Incident Date"].split(", ")[1]); }
}
