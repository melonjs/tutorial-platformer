

/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};


game.HUD.Container = me.Container.extend({

	init: function() {
		// call the constructor
		this._super(me.Container, 'init');

		// persistent across level change
		this.isPersistent = true;

		// make sure we use screen coordinates
		this.floating = true;

		// give a name
		this.name = "HUD";

		// add our child score object
		this.addChild(new game.HUD.ScoreItem(-10, -10));
	}
});


/**
 * a basic HUD item to display score
 */
game.HUD.ScoreItem = me.Renderable.extend( {
	/**
	 * constructor
	 */
	init: function(x, y) {

		// call the parent constructor
		// (size does not matter here)
		this._super(me.Renderable, 'init', [x, y, 10, 10]);

		// create the font object
		this.font = new me.BitmapText(0, 0, {font: "PressStart2P"});

        // font alignment to right, bottom
        this.font.textAlign = "right";
        this.font.textBaseline = "bottom";

		// local copy of the global score
		this.score = -1;
	},

	/**
	 * update function
	 */
	update : function () {
		// we don't do anything fancy here, so just
		// return true if the score has been updated
		if (this.score !== game.data.score) {
			this.score = game.data.score;
			return true;
		}
		return false;
	},

	/**
	 * draw the score
	 */
	draw : function (renderer) {
		this.font.draw (renderer, game.data.score, me.game.viewport.width + this.pos.x, me.game.viewport.height + this.pos.y);
	}

});
