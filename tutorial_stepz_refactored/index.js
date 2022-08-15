import * as me from 'https://cdn.jsdelivr.net/npm/melonjs@13/dist/melonjs.module.js';

import TitleScreen from './js/stage/title.js';
import PlayScreen from './js/stage/play.js';
import PlayerEntity from "./js/renderables/player-entity.js";
import CoinEntity from "./js/renderables/coin-entity.js";
import EnemyEntity from "./js/renderables/enemy-entity.js";

import DataManifest from './manifest.js';


/* Game namespace */
me.device.onReady(() => {

    // Initialize the video.
    if (!me.video.init(640, 480, {parent : "screen", scale : "auto", scaleMethod : "flex-width"})) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }

    // initialize the debug plugin in development mode.
    import('./js/plugin/debug/debugPanel.js').then((plugin) => {
        // automatically register the debug panel
        me.utils.function.defer(me.plugin.register, this, plugin.DebugPanelPlugin, "debugPanel");
    });


    // Initialize the audio.
    me.audio.init("mp3,ogg");

    // allow cross-origin for image/texture loading
    me.loader.crossOrigin = "anonymous";

    // set and load all resources.
    me.loader.preload(DataManifest, function() {
        // set the user defined game stages
        me.state.set(me.state.MENU, new TitleScreen());
        me.state.set(me.state.PLAY, new PlayScreen());


        // set a global fading transition for the screen
        me.state.transition("fade", "#FFFFFF", 250);


		// add our player entity in the entity pool
		me.pool.register("mainPlayer", PlayerEntity);
		me.pool.register("CoinEntity", CoinEntity);
		me.pool.register("EnemyEntity", EnemyEntity);


        // enable the keyboard
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        // map X, Up Arrow and Space for jump
        me.input.bindKey(me.input.KEY.X,      "jump", true);
        me.input.bindKey(me.input.KEY.UP,     "jump", true);
        me.input.bindKey(me.input.KEY.SPACE,  "jump", true);

        // Start the game.
        me.state.change(me.state.MENU);
    });

});
