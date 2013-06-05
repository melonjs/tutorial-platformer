game.PlayScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
        // load a level
		me.levelDirector.loadLevel("area01");
		
		// add a default HUD to the game mngr
		me.game.addHUD(0,430,640,60);
		
		// add a new HUD item 
		me.game.HUD.addItem("score", new game.ScoreObject(620,10));
		
		// make sure everyhting is in the right order
		me.game.sort();
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
	    // remove the HUD
        me.game.disableHUD();
	}
});
