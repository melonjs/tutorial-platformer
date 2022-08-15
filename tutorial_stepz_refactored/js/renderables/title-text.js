import * as me from 'https://cdn.jsdelivr.net/npm/melonjs@13/dist/melonjs.module.js';


export default class TitleText extends me.Renderable {
    constructor() {
        super(0, 0, me.game.viewport.width, me.game.viewport.height);

        // font for the scrolling text
        this.font = new me.BitmapText(0, 0, {font: "PressStart2P"});

        this.scroller = "A SMALL STEP BY STEP TUTORIAL FOR GAME CREATION WITH MELONJS       ";
        this.scrollerpos = 600;

        // a tween to animate the arrow
        this.scrollertween = new me.Tween(this).to({scrollerpos: -2200 }, 10000).onComplete(this.scrollover.bind(this)).start();
    }

    // some callback for the tween objects
    scrollover() {
        // reset to default value
        this.scrollerpos = 640;
        this.scrollertween.to({scrollerpos: -2200 }, 10000).onComplete(this.scrollover.bind(this)).start();
    }

    update(dt) {
        return true;
    }

    draw(renderer) {
        this.font.textAlign = "center";
        this.font.draw(renderer, "PRESS ENTER TO PLAY", me.game.viewport.width, 540);
        this.font.textAlign = "left";
        this.font.draw(renderer, this.scroller, this.scrollerpos, 440);
    }

    onDestroyEvent() {
        //just in case
        this.scrollertween.stop();
    }
}
