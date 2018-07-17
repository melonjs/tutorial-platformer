/**
 * Player Entity
 */
game.PlayerEntity = me.Sprite.extend({

    /**
     * constructor
     */
	init:function (x, y, settings) {

		// call the constructor
		this._super(me.Sprite, 'init', [x, y , settings]);

        // define a basic walking animation (using all frames)
        this.addAnimation("walk",  [0, 1, 2, 3, 4, 5, 6, 7]);
        // define a standing animation (using the first frame)
        this.addAnimation("stand",  [0]);
        // set the standing animation as default
        this.setCurrentAnimation("stand");


        // add a physic body on this renderable
        this.body = new me.Body(this);
        this.body.addShape(new me.Rect(this.width / 4, 0, this.width / 2, this.height));
        // enable physic collision (off by default for basic me.Renderable)
        this.isKinematic = false;

        // max walking & jumping speed
        this.body.setMaxVelocity(3, 15);
        this.body.setFriction(0.4, 0);

 		// set the display to follow our position on both axis
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

		// ensure the player is updated even when outside of the viewport
		this.alwaysUpdate = true;
	},

    /**
     * update the entity
     */
	update : function (dt) {

		if (me.input.isKeyPressed('left'))
		{
			// flip the sprite on horizontal axis
			this.flipX(true);
			// update the default force
			this.body.force.x = -this.body.maxVel.x;
            // change to the walking animation
            if (!this.isCurrentAnimation("walk")) {
                this.setCurrentAnimation("walk");
            }
		}
		else if (me.input.isKeyPressed('right'))
		{
			// unflip the sprite
			this.flipX(false);
			// update the entity velocity
			this.body.force.x = this.body.maxVel.x;
            // change to the walking animation
            if (!this.isCurrentAnimation("walk")) {
                this.setCurrentAnimation("walk");
            }
		}
		else
		{
			this.body.force.x = 0;
            // change to the standing animation
            this.setCurrentAnimation("stand");
		}

		if (me.input.isKeyPressed('jump'))
		{
			if (!this.body.jumping && !this.body.falling)
			{
				// set current vel to the maximum defined value
				// gravity will then do the rest
				this.body.force.y = -this.body.maxVel.y
			}
		}
        else
        {
            this.body.force.y = 0;
        }

		// apply physics to the body (this moves the entity)
		this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Sprite, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
	},

   /**
     * colision handler
     */
    onCollision : function (response, other) {
        // Make all other objects solid
        return true;
    }


});
