import { Vroom } from './vroom/vroom.js'

import start from './start.js'

import store from '@/store'

Vroom.mainUpdateLoopExtension = function (secondsPassed) {
	// If the game has not been won or lost
	if(!store.state.gameLost && !store.state.gameWon) {
		// Check for loss condition
		if(secondsPassed == 'ost') { // TEMP
			store.state.gameLost = true
		}

		// Check for win codition
		if(secondsPassed == 'ost') { // TEMP
			store.state.gameWon = true
		}
	}

	if(store.state.gameLost || store.state.gameWon) {
		// ENTER
		if(Vroom.isKeyPressed(13)) {
			start()
		}
	}
}

Vroom.mainRenderLoopExtension = function (ctx) {
	// Apply filters
	if(store.state.filters.chromaticAberration.enabled) {
		chromaticAberration(ctx, store.state.filters.chromaticAberration.intensity, store.state.filters.chromaticAberration.phase)
	}

	if(store.state.filters.vignette.enabled) {
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