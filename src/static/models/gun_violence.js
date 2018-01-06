import MessageBus from "../message_bus.js";
import { Model } from "../models.js";
import { UsStates } from "../us_states.js";


export class GunViolence extends Model {

    // @todo calculate total incidents here instead of D3 code
    constructor() {
        super();
        this._totalsByState = {}; // preload this in us_states.js?
        this._stateData = {};
        this._years = new Set();
    }

    categoryYearValues(category, year) {
        let data = {};

        if (category && year) {
            Object.entries(this._stateData).forEach((v) => {
                data[UsStates.fipsFromName(v[0])] = v[1][year]["totals"][category.toLowerCase()];
            });
        }

        return data;
    }

    // @todo don't hard-code this
    get categories() { return ["Incidents", "Injured", "Killed", "Victims"]; }

    get formatter() { return d3.csv; }

    get path() { return "static/data/stats.csv"; }

    get years() { return Array.from(this._years); }

    parse() {
        UsStates.names.forEach((n) => this._stateData[n] = {
            // @todo clean this up
            2017: {
                "incidents": [],
                "totals": { "incidents": 0, "injured": 0, "killed": 0, "victims": 0 }},
            2016: {
                "incidents": [],
                "totals": { "incidents": 0, "injured": 0, "killed": 0, "victims": 0 }},
            2015: {
                "incidents": [],
                "totals": { "incidents": 0, "injured": 0, "killed": 0, "victims": 0 }},
            2014: {
                "incidents": [],
                "totals": { "incidents": 0, "injured": 0, "killed": 0, "victims": 0 }}
        });

        this.raw.forEach((d) => {
            let year = this.rowYear(d),
                state = this._stateData[d.State];

            let stateYear = state[year],
                injured  = parseInt(d["# Injured"]),
                killed = parseInt(d["# Killed"]);

            stateYear.totals.incidents++;
            stateYear.totals.injured += injured;
            stateYear.totals.killed += killed;
            stateYear.totals.victims += (injured + killed);

            this._years.add(year);

            stateYear.incidents.push(d);
        });

        MessageBus.broadcast("categories:parsed", this.categories);
        MessageBus.broadcast("years:parsed", this.years);
    }

    rowYear(row) { return parseInt(row["Incident Date"].split(", ")[1]); }

    stateIncidents(config) {
        config.incidents = this._stateData[config.name][config.year].incidents;
        return config;
    }
}
