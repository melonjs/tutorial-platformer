import * as me from 'https://cdn.jsdelivr.net/npm/melonjs@13/dist/melonjs.module.js'

import TitleScreen from './screens/title.js'
import PlayScreen from './screens/play.js'

import {PlayerEntity, CoinEntity, EnemyEntity} from "./entities/entities.js";

import resources from './resources.js'


/* Game namespace */
let game = {

    // Run on page load.
    onload() {
        // Initialize the video.
        if (!me.video.init(640, 480, {parent : "screen", scale : "auto", scaleMethod : "flex-width"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = game.loaded.bind(this);

        // Load the resources.
        me.loader.preload( resources );

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },



    // Run on game resources loaded.
    loaded() {
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
    }
};

// here's where the magic starts
me.device.onReady( game.onload );