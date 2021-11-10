import * as me from 'https://cdn.jsdelivr.net/npm/melonjs@10.1.0/dist/melonjs.module.js'

let entities = {};

/**
 * Player Entity
 */
export class PlayerEntity extends me.Entity {
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

        // we need to tell the game that this is a PLAYER_OBJECT, now that there are other entities that can collide
        // with a player
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;

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
            this.body.force.x = 0;
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
    onCollision(response, other) {
        switch (response.b.body.collisionType) {
            case me.collision.types.WORLD_SHAPE:
                // Simulate a platform object
                if (other.type === "platform") {
                    if (this.body.falling &&
                        !me.input.isKeyPressed('down') &&

                        // Shortest overlap would move the player upward
                        (response.overlapV.y > 0) &&

                        // The velocity is reasonably fast enough to have penetrated to the overlap depth
                        (~~this.body.vel.y >= ~~response.overlapV.y)
                    ) {
                        // Disable collision on the x axis
                        response.overlapV.x = 0;

                        // Respond to the platform (it is solid)
                        return true;
                    }

                    // Do not respond to the platform (pass through)
                    return false;
                }
                break;

            case me.collision.types.ENEMY_OBJECT:
                if ((response.overlapV.y>0) && this.body.falling) {
                    // bounce (force jump)
                    this.body.vel.y = -this.body.maxVel.y;
                }
                else {
                    // let's flicker in case we touched an enemy
                    this.renderable.flicker(750);
                }

            // Fall through

            default:
                // Do not respond to other objects (e.g. coins)
                return false;
        }

        // Make the object solid
        return true;
    }
}
entities.PlayerEntity = PlayerEntity;



export class CoinEntity extends me.Collectable {
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    constructor(x, y, settings) {
        // call the parent constructor
        super(x, y , settings);

        // this item collides ONLY with PLAYER_OBJECT
        this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT);
    }

    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision(response, other) {
        // do something when collected

        // make sure it cannot be collected "again"
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);

        // remove it
        me.game.world.removeChild(this);

        return false
    }
}
entities.CoinEntity = CoinEntity;



export class EnemyEntity extends me.Sprite {
    /**
     *
     * @param x
     * @param y
     * @param settings
     */
    constructor(x, y, settings) {
        // save the area size as defined in Tiled
        let width = settings.width;

        // define this here instead of tiled
        settings.image = "wheelie_right";

        // adjust the size setting information to match the sprite size
        // so that the entity object is created with the right size
        settings.framewidth = settings.width = 64;
        settings.frameheight = settings.height = 64;

        // call the parent constructor
        super(x, y , settings);

        // add a physic body
        this.body = new me.Body(this);
        // add a default collision shape
        this.body.addShape(new me.Rect(0, 0, this.width, this.height));
        // configure max speed and friction
        this.body.setMaxVelocity(4, 6);
        this.body.setFriction(0.4, 0);
        // enable physic collision (off by default for basic me.Renderable)
        this.isKinematic = false;

        // set start/end position based on the initial area size
        x = this.pos.x;
        this.startX = x;
        this.pos.x = this.endX = x + width - this.width;
        //this.pos.x  = x + width - this.width;

        // to remember which side we were walking
        this.walkLeft = false;

        // make it "alive"
        this.alive = true;
    }


    // manage the enemy movement
    update(dt) {
        if (this.alive)
        {
            if (this.walkLeft && this.pos.x <= this.startX)
            {
                this.walkLeft = false;
                this.body.force.x = this.body.maxVel.x;
            }
            else if (!this.walkLeft && this.pos.x >= this.endX)
            {
                this.walkLeft = true;
                this.body.force.x = -this.body.maxVel.x;
            }

            this.flipX(this.walkLeft);
        }
        else
        {
            this.body.force.x = 0;
        }

        // return true if we moved or if the renderable was updated
        return (super.update(dt) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    }

    /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision(response, other) {
        if (response.b.body.collisionType !== me.collision.types.WORLD_SHAPE) {
            // res.y >0 means touched by something on the bottom
            // which mean at top position for this one
            if (this.alive && (response.overlapV.y > 0) && response.a.body.falling) {
                this.flicker(750, () => {
                    me.game.world.removeChild(this);
                });
            }
            return false;
        }
        // Make all other objects solid
        return true;
    }
}
entities.EnemyEntity = EnemyEntity;



export default entities;