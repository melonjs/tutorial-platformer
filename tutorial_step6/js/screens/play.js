import * as me from 'https://cdn.jsdelivr.net/npm/melonjs@13/dist/melonjs.module.js'

import HUD from '../entities/HUD.js'
import data from '../data.js'

export default class PlayScreen extends me.Stage {

	/**
	 *  action to perform on state change
	 */
	onResetEvent() {

		// load a level
		me.level.load("area01");

		// reset the score
		data.score = 0;

		// add our HUD to the game world
		this.HUD = new HUD.Container();
		me.game.world.addChild(this.HUD);

	}


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	}
}
