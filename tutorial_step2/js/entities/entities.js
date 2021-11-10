import * as me from 'https://cdn.jsdelivr.net/npm/melonjs@10.1.0/dist/melonjs.module.js'

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
    }

    /**
     * Update the Entity
     *
     * @param dt
     * @returns {any|boolean}
     */
    update(dt) {
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