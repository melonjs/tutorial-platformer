import * as me from 'https://cdn.jsdelivr.net/npm/melonjs@10.1.0/dist/melonjs.module.js'
import ScoreItem from "./score-item.js";


export default class Container extends me.Container {
    constructor() {
        super();

        // persistent across level change
        this.isPersistent = true;

        // make sure we use screen coordinates
        this.floating = true;

        // give a name
        this.name = "HUD";

        // add our child score object at the top left corner
        this.addChild(new ScoreItem(5, 5));
    }
}