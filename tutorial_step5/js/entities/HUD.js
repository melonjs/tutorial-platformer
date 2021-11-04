import * as me from '/node_modules/melonjs/dist/melonjs.module.js'

import data from '../data.js'

let HUD = {};

/**
 * a HUD container and child items
 */

export class Container extends me.Container {
	constructor() {
		super();

		// persistent across level change
		this.isPersistent = true;

		// make sure we use screen coordinates
		this.floating = true;
		
		// give a name
		this.name = "HUD";

		// add our child score object at the top left corner
		this.addChild(new HUD.ScoreItem(5, 5));
	}
}
HUD.Container = Container;



export class ScoreItem extends me.Renderable {
	/**
	 *
	 * @param x
	 * @param y
	 */
	constructor(x, y) {
		super(x, y, 10, 10);

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
		// draw it baby !
	}
}
HUD.ScoreItem = ScoreItem;



export default HUD;
