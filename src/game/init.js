import { Vroom } from './vroom/vroom.js'

// Initiate engine

export default function init() {
	Vroom.init({
		canvasId: 'vroom-canvas',
		debug: {
			enabled: false,
			overlay: false
		},
		dim: {
			width: 1152,
			height: 648,
		},
		input: {
			preventDefault: [32, 17, 37, 38, 39, 40]
		},
		physics: {
			physicsEnabled: true,
			gravityEnabled: true,
			iterations: 1,
			gravity: {
				x: 0,
				y: 9.81
			},
			friction: {
				x: 10,
				y: 10
			}
		},
		backgroundColor: 'rgb(14, 18, 33)'
	})
}