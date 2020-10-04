import { Vroom, Entity } from '../vroom/vroom.js'

import { player } from '../entities/player.js'
import { connection } from '../entities/connection.js'
import { Terrain } from '../entities/Terrain.js'
import { Item } from '../entities/Item.js'

// Levels
import levelOne from '../levels/one.js'
import levelTwo from '../levels/two.js'

import store from '@/store'

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
		this.levelIndex = 0
		this.levels = [
			levelOne,
			levelTwo
		]
		this.level = {}
	},
	update () {
		if (!this.active) {
			return
		}

		// Check if level is hacked
		if (store.state.currentLevel.password.length >= this.level.items.length) {
			store.state.currentLevel.hacked = true
			connection.unlock()
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

	Vroom.registerEntity(connection)

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
	Vroom.deregisterEntity(connection._id)

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
	this.active = false
	this.items = []
	this.terrain = []
	this.level = {}
}

mainScene.setScene = function (level) {
	// Set level in scene
	this.level = level

	// Reset current level state
	store.state.currentLevel.nodeNumber = level.nodeNumber
	store.state.currentLevel.password = ''
	store.state.currentLevel.passwordLength = level.items.length
	store.state.currentLevel.hacked = false
	store.state.currentLevel.final = level.final

	// Activate connection
	level.connection.pos.y = Vroom.state.canvas.height - level.connection.pos.y
	connection.activate(level.connection)

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

	// Create terrain from level file
	for (let terrainData in this.level.terrain) {
		this.terrain.push(new Terrain({
			pos: {
				x: this.level.terrain[terrainData].pos.x,
				y: Vroom.state.canvas.height - (elementThickness * 2) - this.level.terrain[terrainData].pos.y
			},
			dim: {
				width: this.level.terrain[terrainData].dim.width,
				height: elementThickness
			}
		}))
	}

	this.items = []

	// Create items from level file
	for (let itemData in this.level.items) {
		this.items.push(new Item({
			pos: {
				x: this.level.items[itemData].pos.x,
				y: Vroom.state.canvas.height - this.level.items[itemData].pos.y
			},
			icon: this.level.items[itemData].icon
		}))
	}
}

mainScene.deleteItem = function (id) {
	for (let item in this.items) {
		if (this.items[item]._id == id) {
			Vroom.deregisterEntity(id)
			delete this.items[item]
			break
		}
	}
}

mainScene.loadLevel = function (levelIndex) {
	this.restart()
	this.setScene(this.levels[levelIndex])
}

mainScene.loadNextLevel = function () {
	this.levelIndex++
	this.loadLevel(this.levelIndex)
}

// Init call
mainScene.init()

export { mainScene }