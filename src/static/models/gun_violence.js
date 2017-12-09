import { Model } from "../models.js";
import { UsStates } from "../us_states.js";


export class GunViolence extends Model {

    constructor() {
        super();
        this._totalsByState = {}; // preload this in us_states.js?
        this._stateTotals = {};
        this._years = new Set();
    }

    // @todo don't hard-code this
    get categories() { return ["Incidents", "Injured", "Killed", "Victims"]; }

    get formatter() { return d3.csv; }

    get path() { return "static/data/stats.csv"; }

    get years() { return Array.from(this._years); }

    parse() {
        UsStates.names.forEach((n) => this._stateTotals[n] = {
            2017: { "incidents": 0, "injured": 0, "killed": 0, "victims": 0 },
            2016: { "incidents": 0, "injured": 0, "killed": 0, "victims": 0 },
            2015: { "incidents": 0, "injured": 0, "killed": 0, "victims": 0 },
            2014: { "incidents": 0, "injured": 0, "killed": 0, "victims": 0 },
        });

        this.raw.forEach((d) => {
            let year = this.rowYear(d),
                state = this._stateTotals[d.State];

            let stateYear = state[year],
                injured = parseInt(d["# Injured"]),
                killed = parseInt(d["# Killed"]);

            stateYear.incidents++;
            stateYear.injured += injured;
            stateYear.killed += killed;
            stateYear.victims += (injured + killed);

            this._years.add(year);
        });
    }

    rowYear(row) { return parseInt(row["Incident Date"].split(", ")[1]); }

    asValues(category, year) {
        let data = {};

        if (category && year) {
            Object.entries(this._stateTotals).forEach((v) => {
                data[UsStates.fipsFromName(v[0])] = v[1][year][category.toLowerCase()];
            });
        }

        return data;
    }
}
