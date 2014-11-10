/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend(
{	
  
  /* -----

		constructor
		
	  ------			*/
	
	init:function (x, y, settings)
	{
		// call the constructor
		this._super(me.Entity, 'init', [x, y , settings]);
		
		// set the default horizontal & vertical speed (accel vector)
		this.body.setVelocity(3, 15);
        
 		// set the display to follow our position on both axis
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

		// ensure the player is updated even when outside of the viewport
		this.alwaysUpdate = true;
		
	},

	/* -----

		update the player pos
		
	  ------			*/
	update : function (dt)
	{
			
		if (me.input.isKeyPressed('left'))
		{
			// flip the sprite on horizontal axis
			this.renderable.flipX(true);
			// update the entity velocity
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
		}
		else if (me.input.isKeyPressed('right'))
		{
			// unflip the sprite
			this.renderable.flipX(false);
			// update the entity velocity
			this.body.vel.x += this.body.accel.x * me.timer.tick;
		}
		else
		{
			this.body.vel.x = 0;
		}
		if (me.input.isKeyPressed('jump'))
		{	
			if (!this.jumping && !this.falling) 
			{
				// set current vel to the maximum defined value
				// gravity will then do the rest
				this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
				// set the jumping flag
				this.body.jumping = true;
			}
		}
		
		// apply physics to the body (this moves the entity)
		this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);
			 
		// update animation
		if (this.body.vel.x!=0 || this.body.vel.y!=0)
		{
			// update object animation
			this._super(me.Entity, 'update', [dt]);
			return true;
		}
		
		// else inform the engine we did not perform
		// any update (e.g. position, animation)
		return false;
	},
    
   /**
     * colision handler
     */
    onCollision : function (response, other) {
        // Make all other objects solid
        return true;
    }
    

});
