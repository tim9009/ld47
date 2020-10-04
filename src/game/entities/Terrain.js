import { Vroom, Entity } from '../vroom/vroom.js'

// Constructor
class Terrain extends Entity {
	constructor(options) {
		options = options || {}
		super({
			physics: {
				enabled: true,
				entityType: Entity.STATIC,
				collisionType: Entity.INELASTIC
			},
			pos: {
				x: (options.pos && options.pos.x) ? options.pos.x : 0,
				y: (options.pos && options.pos.y) ? options.pos.y : 0
			},
			dim: {
				width: (options.dim && options.dim.width) ? options.dim.width : 0,
				height: (options.dim && options.dim.height) ? options.dim.height : 0
			}
		})

		this.color = 'rgb(254, 252, 255)'
		this.type = options.type || 'terrain'
	}

	render(ctx) {
		if(!Vroom.util.isEntityInCameraView(this)) {
			return
		}

		// Save context
		// ctx.save()

		// Enable glow effect
		// ctx.shadowBlur = 20
		// ctx.shadowColor = 'rgb(200, 0, 150)'

		let relativePos = Vroom.util.getCameraRelativePos(this.pos)
		let relativeDim = Vroom.util.getCameraRelativeDim(this.dim)

		ctx.fillStyle = this.color

		ctx.fillRect(relativePos.x, relativePos.y, relativeDim.width, relativeDim.height)

		// Restore context
		// ctx.restore()
	}
}

export { Terrain }