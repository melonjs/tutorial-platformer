import * as me from 'https://cdn.jsdelivr.net/npm/melonjs@13/dist/melonjs.module.js'

/**
 * Player Entity
 */



export default class PlayerEntity extends me.Entity {
    /**
     *
     * @param x
     * @param y
     * @param settings
     */
    constructor(x, y, settings) {
        super(x, y, settings);


        // max walking & jumping speed
        this.body.setMaxVelocity(3, 15);
        this.body.setFriction(0.4, 0);

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH, 0.4);

        // ensure the player is updated even when outside of the viewport
        this.alwaysUpdate = true;

        // define a basic walking animation (using all frames)
        this.renderable.addAnimation("walk",  [0, 1, 2, 3, 4, 5, 6, 7]);

        // define a standing animation (using the first frame)
        this.renderable.addAnimation("stand",  [0]);

        // set the standing animation as default
        this.renderable.setCurrentAnimation("stand");
    }

    /**
     * Update the Entity
     *
     * @param dt
     * @returns {any|boolean}
     */
    update(dt) {
        if (me.input.isKeyPressed('left')) {

            // flip the sprite on horizontal axis
            this.renderable.flipX(true);
            // update the default force
            this.body.force.x = -this.body.maxVel.x;
            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else if (me.input.isKeyPressed('right')) {

            // unflip the sprite
            this.renderable.flipX(false);
            // update the entity velocity
            this.body.force.x = this.body.maxVel.x;
            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else {
            // change to the standing animation
            this.renderable.setCurrentAnimation("stand");
        }

        if (me.input.isKeyPressed('jump')) {

            if (!this.body.jumping && !this.body.falling)
            {
                // set current vel to the maximum defined value
                // gravity will then do the rest
                this.body.force.y = -this.body.maxVel.y
            }
        } else {
            this.body.force.y = 0;
        }


        return (super.update(dt) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    }

    /**
     * Collision Handler
     *
     * @returns {boolean}
     */
    onCollision() {
        return true;
    }
}