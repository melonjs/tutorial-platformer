import * as me from 'https://cdn.jsdelivr.net/npm/melonjs@10.1.0/dist/melonjs.module.js'
import data from '../../data.js'


export default class ScoreItem extends me.Renderable {
    /**
     *
     * @param x
     * @param y
     */
    constructor(x, y) {
        super(x, y, 10, 10);


        // create the font object
        this.font = new me.BitmapText(0, 0, {font: "PressStart2P"});

        // font alignment to right, bottom
        this.font.textAlign = "right";
        this.font.textBaseline = "bottom";

        // local copy of the global score
        this.score = -1;
    }

    /**
     *
     * @returns {boolean}
     */
    update() {
        // we don't do anything fancy here, so just
        // return true if the score has been updated
        if (this.score !== data.score) {
            this.score = data.score;
            return true;
        }

        return false;
    }


    /**
     * draw the score
     */
    draw(renderer) {
        this.font.draw (renderer, data.score, me.game.viewport.width + this.pos.x, me.game.viewport.height + this.pos.y);
    }
}