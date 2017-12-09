import { Model } from "../models.js";


export class UsTopo extends Model {

    get formatter() { return d3.json; }

    get path() { return "static/data/us-10m.v1.json"; }

    get states() { return this.raw.objects.states; }
}
