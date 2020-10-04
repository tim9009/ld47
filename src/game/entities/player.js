import { Vroom, Entity } from '../vroom/vroom.js'

import store from '@/store'

const player = new Entity({
	layer: 2,
	physics: {
		enabled: true,
		entityType: Entity.DYNAMIC,
		collisionType: Entity.INELASTIC
	},
	pos: {
		x: 100,
		y: 100
	},
	dim: {
		width: 50,
		height: 100
	},
	mass: 15,
	restitution: 0,
	onCreated () {
	},
	init () {
		console.log('Person running init')

		this.active = false
		this.color = 'rgb(254, 252, 255)'
		this.speed = 35
		this.maxSpeed = 100
		this.onGround = true
		this.jumping = false
		this.jumpCount = 0
		this.maxJumpCount = 2
		this.smashing = false
		this.smashCount = 0
		this.maxSmashCount = 1
	},
	onCollisionAfterDisplace (target) {
		if (target.type == 'terrain') {
			// Handle collision on top
			if (this.getBottom() == target.getTop()) {
				this.onGround = true
				this.jumping = false
				this.jumpCount = 0
				this.smashing = false
				this.smashCount = 0
			} else {
				// Handle collision on left side
				if (this.getRight() == target.getLeft()) {
					store.state.gameLost = true
				}
			}
		}
	},
	update () {
		// Handle game won / lost
		if (store.state.gameWon || store.state.gameLost) {
			return
		}

		// Set speed
		this.vel.x = this.speed

		// W / JUMP
		if (Vroom.isKeyPressed(87)) {
			if (!this.jumping && (this.onGround || this.jumpCount < this.maxJumpCount)) {
				this.vel.y = -50
				this.onGround = false
				this.jumping = true
				this.jumpCount++
			}
		} else {
			this.jumping = false
		}

		// S / SMASH
		if (Vroom.isKeyPressed(83)) {
			if (!this.smashing && (!this.onGround || this.smashCount < this.maxSmashCount)) {
				this.vel.y = 60
				this.smashing = true
				this.smashCount++
			}
		} else {
			this.smashing = false
		}

		// Limit speed
		if (this.vel.x > this.maxSpeed) {
			this.vel.x = this.maxSpeed
		}

		if (this.vel.x < -this.maxSpeed) {
			this.vel.x = -this.maxSpeed
		}

		if (this.vel.y > this.maxSpeed) {
			this.vel.y = this.maxSpeed
		}

		if (this.vel.y < -this.maxSpeed) {
			this.vel.y = -this.maxSpeed
		}

		// Handle character leaving screen
		if (this.pos.x >= Vroom.state.canvas.width - 1) {
			this.pos.x = -this.dim.width + 1
		}

		// Set camera settings for fast falling
		if (this.vel.y > 10) {
			Vroom.state.activeCamera.lerpPercentage = 10

		} else {
			Vroom.state.activeCamera.lerpPercentage = 4
		}
	},
	render (ctx) {
		// Save context
		ctx.save()

		// Enable glow effect
		ctx.shadowBlur = 30
		ctx.shadowColor = 'rgba(34, 255, 253, 1)'

		// Calculate relative pos and dim
		let relativePos = Vroom.util.getCameraRelativePos(this.pos)
		let relativeDim = Vroom.util.getCameraRelativeDim(this.dim)

		// Set color
		ctx.fillStyle = this.color
		// ctx.strokeStyle = this.color

		// Draw player
		// ctx.beginPath()
		// ctx.lineWidth = '4px'
		// ctx.rect(relativePos.x + 0.5, relativePos.y + 0.5, relativeDim.width, relativeDim.height)
		// // ctx.rect(this.pos.x + 0.5, this.pos.y + 0.5, this.dim.width, this.dim.height)
		// ctx.stroke()
		ctx.fillRect(relativePos.x, relativePos.y, relativeDim.width, relativeDim.height)

		// Restore context
		ctx.restore()
	},
	afterRender () {

	}
})

// On game restart
player.restart = function () {
	this.init()
}


// Activate player with correct sate
player.activate = function () {
	let initialPos = {
		x: 1000,
		y: 850
	}

	this.pos.x = initialPos.x
	this.pos.y = initialPos.y
}

// Init call
player.init()

export { player }