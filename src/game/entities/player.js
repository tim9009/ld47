import { Vroom, Entity, Sound } from '../vroom/vroom.js'

// Sounds
import pickup from '../../assets/sound/pickup.wav'
import death from '../../assets/sound/death.wav'
import jump from '../../assets/sound/jump.wav'
import smash from '../../assets/sound/smash.wav'
import reconnect from '../../assets/sound/reconnect.wav'

import store from '@/store'

const player = new Entity({
	layer: 3,
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
	init () {
		console.log('Person running init')

		this.physics.enabled = true

		this.active = false
		this.dead = false
		this.deadTime = Date.now()
		this.deadTimeout = 600
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

		// Sounds
		this.soundPickup = new Sound(pickup)
		this.soundPickup.loadBuffer()
		this.soundPickup.gain = 0.6

		this.soundDeath = new Sound(death)
		this.soundDeath.loadBuffer()
		this.soundDeath.gain = 0.6

		this.soundJump = new Sound(jump)
		this.soundJump.loadBuffer()
		this.soundJump.gain = 0.3

		this.soundSmash = new Sound(smash)
		this.soundSmash.loadBuffer()
		this.soundSmash.gain = 0.3

		this.soundReconnect = new Sound(reconnect)
		this.soundReconnect.loadBuffer()
		this.soundReconnect.gain = 0.3
	},
	onCollision (target) {
		if (target.type == 'item') {
			this.soundPickup.play()
		}
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
					this.dead = true
					this.deadTime = new Date()
					this.physics.enabled = false

					store.state.gameReconnecting = true

					this.soundDeath.play()
				}
			}
		}
	},
	update () {
		// Handle game won / lost
		if (!store.state.gameStarted || store.state.gameConnecting || store.state.gameWon || store.state.gameLost) {
			return
		}

		// Handle player is dead
		if (this.dead) {
			// Handle death timeout reached
			if (Date.now() - this.deadTime > this.deadTimeout) {
				this.soundReconnect.play()

				this.physics.enabled = true
				this.restart()
				this.activate()

				store.state.gameReconnecting = false
			} else {
				return
			}
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

				this.soundJump.play()
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

				this.soundSmash.play()
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

		// Calculate relative pos and dim
		let relativePos = Vroom.util.getCameraRelativePos(this.pos)
		let relativeDim = Vroom.util.getCameraRelativeDim(this.dim)

		// Enable glow effect
		if (this.dead) {
			ctx.fillStyle = '#404040'
		} else {
			ctx.shadowBlur = 30
			ctx.shadowColor = 'rgba(34, 255, 253, 1)'


			// Set color
			ctx.fillStyle = this.color
		}

		ctx.fillRect(relativePos.x, relativePos.y, relativeDim.width, relativeDim.height)

		// Restore context
		ctx.restore()
	}
})

// On game restart
player.restart = function () {
	this.init()

	// Remove any left over velocity
	this.vel.x = 0
	this.vel.y = 0
}


// Activate player with correct sate
player.activate = function () {
	this.dead = false

	let initialPos = {
		x: 10,
		y: 900
	}

	this.pos.x = initialPos.x
	this.pos.y = initialPos.y
}

// Init call
player.init()

export { player }