import { Vroom, Entity } from '../vroom/vroom.js'

import { player } from '../entities/player.js'
// import { Obstacle } from '../entities/Obstacle.js'
import { Terrain } from '../entities/Terrain.js'

// import store from '@/store'

// const state = require('../state.js')

const mainScene = new Entity({
	layer: 1,
	physics: {
		enabled: false
	},
	init () {
		console.log('Ground running init')
		this.active = false
		this.items = []
		this.terrain = []
	},
	update () {
		if (!this.active) {
			return
		}
	},
	render () {
		if (!this.active) {
			return
		}
	}
})

mainScene.activate = function () {
	this.active = true

	// Register entities
	Vroom.registerEntity(player)
	player.activate()

	for (let item in this.items) {
		Vroom.registerEntity(this.items[item])
	}
	for (let element in this.terrain) {
		Vroom.registerEntity(this.terrain[element])
	}
}

mainScene.deactivate = function () {
	this.active = false

	// Deregister entities
	Vroom.deregisterEntity(player._id)

	for (let item in this.items) {
		Vroom.deregisterEntity(this.items[item]._id)
	}

	for (let element in this.terrain) {
		Vroom.deregisterEntity(this.terrain[element]._id)
	}
}

// On game restart
mainScene.restart = function () {
	this.deactivate()
	this.init()
}

mainScene.setScene = function () {
	// // Reset state
	// this.items = []

	// // Standard items
	// this.items.push(new Obstacle({
	// 	type: 'exit',
	// 	pos: {
	// 		x: 20,
	// 		y: -80
	// 	},
	// 	dim: {
	// 		width: 80,
	// 		height: 80
	// 	}
	// }))

	// // Obstacles
	// if (options.items && options.items.length) {
	// 	for (let item in options.items) {
	// 		this.items.push(new Obstacle({
	// 			type: options.items[item].type || null,
	// 			ammount: options.items[item].ammount || null,
	// 			pos: {
	// 				x: (options.items[item].pos && options.items[item].pos.x) ? options.items[item].pos.x : 0,
	// 				y: (options.items[item].pos && options.items[item].pos.y) ? options.items[item].pos.y : 0
	// 			}
	// 		}))
	// 	}
	// }

	// Standard terrain
	this.terrain = []
	const elementThickness = 50


	// Ground
	this.terrain.push(new Terrain({
		pos: {
			x: -100,
			y: Vroom.state.canvas.height - elementThickness
		},
		dim: {
			width: Vroom.state.canvas.width + 200,
			height: 1000
		}
	}))

	// // Left wall
	// this.terrain.push(new Terrain({
	// 	pos: {
	// 		x: 0,
	// 		y: -wallHeight
	// 	},
	// 	dim: {
	// 		width: elementThickness,
	// 		height: wallHeight
	// 	},
	// 	type: 'wall'
	// }))

	// // Right wall
	// this.terrain.push(new Terrain({
	// 	pos: {
	// 		x: mainSceneWidth - elementThickness,
	// 		y: -wallHeight
	// 	},
	// 	dim: {
	// 		width: elementThickness,
	// 		height: wallHeight
	// 	},
	// 	type: 'wall'
	// }))

	this.terrain.push(new Terrain({
		pos: {
			x: 400,
			y: Vroom.state.canvas.height - (elementThickness * 2) - 150
		},
		dim: {
			width: 200,
			height: elementThickness
		}
	}))

	this.terrain.push(new Terrain({
		pos: {
			x: 900,
			y: Vroom.state.canvas.height - (elementThickness * 2) - 350
		},
		dim: {
			width: 200,
			height: elementThickness
		}
	}))

	this.terrain.push(new Terrain({
		pos: {
			x: 1400,
			y: Vroom.state.canvas.height - (elementThickness * 2) - 400
		},
		dim: {
			width: 100,
			height: elementThickness
		}
	}))

	this.terrain.push(new Terrain({
		pos: {
			x: 600,
			y: Vroom.state.canvas.height - (elementThickness * 2) - 700
		},
		dim: {
			width: 100,
			height: elementThickness
		}
	}))
}

mainScene.deleteObstacle = function (id) {
	for (let item in this.items) {
		if (this.items[item]._id == id) {
			Vroom.deregisterEntity(id)
			delete this.items[item]
			break
		}
	}
}

// Init call
mainScene.init()

export { mainScene }