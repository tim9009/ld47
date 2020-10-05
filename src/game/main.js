import { Vroom, Sound } from './vroom/vroom.js'

// import { mainScene } from './scenes/mainScene.js'

// Sound
import music from '../assets/sound/music.mp3'
import connecting from '../assets/sound/connecting.wav'
import gameLost from '../assets/sound/game-lost.wav'

import start from '@/game/start'
import store from '@/store'

// Set up music
const soundMusic = new Sound(music)
soundMusic.loadBuffer()
soundMusic.gain = 0.8
soundMusic.play()

const soundConnecting = new Sound(connecting)
soundConnecting.loadBuffer()
soundConnecting.gain = 0.6

const soundGameLost = new Sound(gameLost)
soundGameLost.loadBuffer()
soundGameLost.gain = 0.6

Vroom.mainUpdateLoopExtension = function () {
	// Check if connection has timeout
	if (!store.state.gameLost && !store.state.gameWon && store.state.gameStarted && new Date() - store.state.currentLevel.connectionTime > store.state.currentLevel.connectionTimeout) {
		store.state.gameLost = true
		soundGameLost.play()
	}

	if (store.state.gameLost || store.state.gameWon) {
		// ENTER
		if (Vroom.isKeyPressed(13)) {
			store.state.gameLost = false
			store.state.gameWon = false
			store.state.gameConnecting = false
			store.state.gameReconnecting = false
			store.state.gameStarted = false
			start()
		}
	}

	// Music
	if (soundMusic.ready && !soundMusic.playing) {
		soundMusic.play()
	}

	// Connecting
	if (store.state.gameConnecting && !soundConnecting.playing) {
		soundConnecting.play()
	}
}

Vroom.mainRenderLoopExtension = function (ctx) {
	// Apply filters
	if (store.state.filters.chromaticAberration.enabled) {
		chromaticAberration(ctx, store.state.filters.chromaticAberration.intensity, store.state.filters.chromaticAberration.phase)
	}

	if (store.state.filters.vignette.enabled) {
		vignette(ctx)
	}
}

// Filters
function chromaticAberration (ctx, intensity, phase) {
	const imageData = ctx.getImageData(0, 0, Vroom.state.canvas.width, Vroom.state.canvas.height)
	const data = imageData.data

	for (let i = phase % 4; i < data.length; i += 4) {
		data[i] = data[i + 4 * intensity]
	}

	ctx.putImageData(imageData, 0, 0)
}

function vignette (ctx) {
	// Create vignette dimensions
	const gradient = ctx.createRadialGradient(
		Vroom.state.canvas.width / 2, // Inner circle x
		Vroom.state.canvas.height / 2, // Inner circle y
		Vroom.state.canvas.width * 0.25, // Inner circle r
		Vroom.state.canvas.width / 2, // Outer circle x
		Vroom.state.canvas.height / 2, // Outer circle y
		Vroom.state.canvas.width * 0.5 // Outer circle r
	)

	// Add vignette colors
	gradient.addColorStop(0, "rgba(29, 13, 33, 0)");
	gradient.addColorStop(1, "rgba(29, 13, 33, 0.4)");

	// Draw vignette
	ctx.fillStyle = gradient
	ctx.fillRect(0, 0, Vroom.state.canvas.width, Vroom.state.canvas.height)
}