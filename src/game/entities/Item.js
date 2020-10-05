import { Vroom, Entity } from '../vroom/vroom.js'

import { player } from './player.js'
import { mainScene } from '../scenes/mainScene.js'

import store from '@/store'

// Constructor
class Item extends Entity {
	constructor (options) {
		options = options || {}
		super({
			layer: 2,
			physics: {
				enabled: true,
				entityType: Entity.STATIC,
				collisionType: Entity.NONE
			},
			pos: {
				x: (options.pos && options.pos.x) ? options.pos.x : 0,
				y: (options.pos && options.pos.y) ? options.pos.y : 0
			},
			dim: {
				width: 30,
				height: 50
			}
		})

		this.color = options.color || '#ff00a0'
		this.type = options.type || 'item'
		this.icon = options.icon || 'O'
	}

	onCollision (target) {
		// On collision with player character
		if(target._id == player._id) {
			store.state.currentLevel.password += this.icon

			mainScene.deleteItem(this._id)
		}
	}

	render (ctx) {
		if(!Vroom.util.isEntityInCameraView(this)) {
			return
		}

		let relativePos = Vroom.util.getCameraRelativePos(this.pos)
		// let relativeDim = Vroom.util.getCameraRelativeDim(this.dim)

		// ctx.fillStyle = 'blue'
		// ctx.fillRect(relativePos.x, relativePos.y, relativeDim.width, relativeDim.height)

		ctx.font = '50px monospace'
		ctx.fillStyle = this.color

		ctx.fillText(this.icon, relativePos.x, relativePos.y + 45)
	}
}

export { Item }