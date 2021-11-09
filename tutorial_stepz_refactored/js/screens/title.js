import * as me from '/node_modules/melonjs/dist/melonjs.module.js'
import TitleText from '../entities/title-text.js'


export default class TitleScreen extends me.Stage {

	onResetEvent() {
		// new sprite for the title screen, position at the center of the game viewport
		var backgroundImage = new me.Sprite(me.game.viewport.width / 2, me.game.viewport.height / 2, {
				image: me.loader.getImage('title_screen'),
			}
		);

		// scale to fit with the viewport size
		backgroundImage.scale(me.game.viewport.width / backgroundImage.width, me.game.viewport.height / backgroundImage.height);

		// there currently is a bug in melonjs where me.input.pointer is null if registerPointerEvent has not been called previously
		// here we are just telling melonjs we want to use pointer events, and setting the callback to a noop
		if(typeof me.input.pointer === 'undefined')
			me.input.registerPointerEvent('pointerdown', null, null);

		// add to the world container
		me.game.world.addChild(backgroundImage, 1);

		me.game.world.addChild(new TitleText());

		// change to play state on press Enter or click/tap
		me.input.bindKey(me.input.KEY.ENTER, "enter", true);
		me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.ENTER);

		this.handler = me.event.on(me.event.KEYDOWN, function (action, keyCode, edge) {
			if (action === "enter") {
				// play something on tap / enter
				// this will unlock audio on mobile devices
				me.audio.play("cling");
				me.state.change(me.state.PLAY);
			}
		});
	}

	/**
	 * action to perform when leaving this screen (state change)
	 */
	onDestroyEvent() {
		me.input.unbindKey(me.input.KEY.ENTER);
		me.input.unbindPointer(me.input.pointer.LEFT);
		me.event.off(me.event.KEYDOWN, this.handler);
	}
}
