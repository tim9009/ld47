import { Vroom, Entity, Sound } from '../vroom/vroom.js'

import { mainScene } from '../scenes/mainScene.js'
import { player } from './player.js'

// Sounds
import connectionOpen from '../../assets/sound/connection-open.wav'

import store from '@/store'

const connection = new Entity({
	layer: 3,
	physics: {
		enabled: true,
		entityType: Entity.STATIC,
		collisionType: Entity.NONE
	},
	pos: {
		x: 100,
		y: 100
	},
	dim: {
		width: 300,
		height: 400
	},
	init () {
		console.log('Connection running init')

		this.active = true
		this.color = 'rgb(254, 252, 255)'
		this.locked = true
		this.nextNode = ''

		// Sounds
		this.soundConnectionOpen = new Sound(connectionOpen)
		this.soundConnectionOpen.loadBuffer()
		this.soundConnectionOpen.gain = 0.6
	},
	onCollision (target) {
		if (!this.active || this.locked) {
			return
		}

		// On collision with player character
		if (target._id == player._id) {
			// Handle connection is final connection
			if (this.final) {
				store.state.gameWon = true
				return
			}

			mainScene.loadNextLevel()
			mainScene.activate()
		}
	},
	render (ctx) {
		if (!this.active || this.locked) {
			return
		}
		// Save context
		ctx.save()

		// Enable glow effect
		ctx.shadowBlur = 400
		ctx.shadowColor = 'rgba(34, 255, 253, 1)'

		// Calculate relative pos and dim
		let relativePos = Vroom.util.getCameraRelativePos(this.pos)
		let relativeDim = Vroom.util.getCameraRelativeDim(this.dim)

		// Set color
		ctx.fillStyle = this.color
		ctx.fillRect(relativePos.x, relativePos.y, relativeDim.width, relativeDim.height)

		// Draw text
		ctx.font = '40px monospace'
		ctx.fillStyle = '#ff00a0'
		ctx.textAlign = 'center'

		if (!store.state.currentLevel.final) {
			ctx.fillText('Next node', relativePos.x + (relativeDim.width / 2), relativePos.y + (relativeDim.height / 2) - 25)
		}

		ctx.fillText(this.text, relativePos.x + (relativeDim.width / 2), relativePos.y + (relativeDim.height / 2) + 25)

		// Restore context
		ctx.restore()
	}
})

// On game restart
connection.restart = function () {
	this.init()
}


// Activate connection with correct sate
connection.activate = function (options) {
	this.active = true
	this.locked = true
	this.pos.x = options.pos.x
	this.pos.y = Vroom.state.canvas.height - options.pos.y
	this.text = options.text || ''
	this.final = options.final || false
}

connection.unlock = function () {
	this.locked = false
	this.soundConnectionOpen.play()
}

// Init call
connection.init()

export { connection }