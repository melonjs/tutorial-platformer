import * as me from '/node_modules/melonjs/dist/melonjs.module.js'

import HUD from '../entities/hud/index.js'
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

		// play the background music
		me.audio.playTrack("dst-inertexponent");
	}


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);


		// stop the current audio track
		me.audio.stopTrack();
	}
}
