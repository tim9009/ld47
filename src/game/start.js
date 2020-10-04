import { Vroom } from './vroom/vroom.js'

// Entities
import { player } from './entities/player.js'

// Scenes
import { mainScene } from './scenes/mainScene.js'

import store from '@/store'

// const state = require('./state.js')

// Set initial store.state and start engine
export default function start() {
	const restarting = Vroom.state.running

	store.state.gameStarted = true
	store.state.gameConnecting = true

	// Reset size of canvas
	Vroom.updateSize(false)

	// Start engine if first time starting
	if(!restarting) {
		// Set image smooting
		const imageSmoothing = false
		Vroom.state.ctx.mozImageSmoothingEnabled = imageSmoothing
		Vroom.state.ctx.webkitImageSmoothingEnabled = imageSmoothing
		Vroom.state.ctx.msImageSmoothingEnabled = imageSmoothing
		Vroom.state.ctx.imageSmoothingEnabled = imageSmoothing

		// Vroooom vrooom!
		Vroom.run()

		// Set main scene
		mainScene.loadLevel(0)
	}

	// Reset glow effect
	Vroom.state.ctx.shadowBlur = 0
	Vroom.state.ctx.shadowColor = 'transparent'

	// Activate camera
	Vroom.activateCamera(Vroom.createCamera({
		pos: {
			x: 0,
			y: 0
		},
		offset: {
			y: -150
		},
		axis: 'vertical',
		lerpPercentage: 4
	}))

	Vroom.state.activeCamera.follow(player._id)

	// Set initial store.state
	store.state.gameWon = false
	store.state.gameLost = false

	// Restart entities if restarting
	if(restarting) {
		console.log('RESTARTING')
		player.restart()
	}

	// Make sure no scene entities are already registered
	Vroom.deregisterEntity(mainScene._id)

	// Register scene entities
	Vroom.registerEntity(mainScene)

	// Activate main scene
	mainScene.activate()

	// Set focus on window to make the game work when played in an iFrame
	window.focus()
}

window.addEventListener('load', function () {
	window.focus()
	document.body.addEventListener('click',function() {
		window.focus()
	}, false)
})