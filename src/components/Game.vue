<template>
  <div class="game">
    <div class="canvasContainer">
      <canvas id="vroom-canvas" width="1920" height="1080" ref="canvas"></canvas>

      <div class="overlay overlay--tv"></div>
    </div>

    <transition name="fade">
      <UIGameLost v-if="gameLost"/>
    </transition>

    <transition name="fade">
      <UIGameWon v-if="gameWon"/>
    </transition>
  </div>
</template>

<script>
  import store from '@/store'

  import UIGameLost from './UIGameLost.vue'
  import UIGameWon from './UIGameWon.vue'

  // import { Vroom } from '../game/vroom/vroom.js'

  // Import game
  import init from '@/game/init'
  import start from '@/game/start'
  import '@/game/main'

  export default {
    name: 'Game',
    components: {
      UIGameLost,
      UIGameWon
    },
    created () {
      window.addEventListener("resize", this.handleWindowResize)
    },
    mounted () {
      init()
      window.setTimeout(start, 1000)
    },
    destroyed () {
      window.removeEventListener("resize", this.handleWindowResize)
    },
    updated () {
    },
    methods: {
      // handleWindowResize() {
      //   Vroom.updateSize()
      //   Vroom.setCanvasScale()
      // }
    },
    computed: {
      gameLost () {
        return store.state.gameLost
      },
      gameWon () {
        return store.state.gameWon
      },
      overlayStyles () {
        if (!this.$refs.canvas) {
          return false
        }

        return `height: ${this.$refs.canvas.height};`
      }
    }
  }
</script>

<style lang="scss" scoped>
  .game {
    line-height: 0;
    font-family: monospace;
    font-size: 12px;
  }

  #vroom-canvas {
    width: 100%;
  }

  .canvasContainer {
    position: relative;
    overflow: hidden;
  }

  .overlay {
    width: calc(100% + 120px);
    height: calc(100% + 120px);
    position: absolute;
    top: -60px;
    left: -60px;

    &--tv {
      border: solid black 60px;
      border-radius: 150px;
    }
  }

  .fade-leave-active {
    transition: all 0ms ease-in-out;
  }

  .fade-leave {
    opacity: 1;
  }

  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active {
    transition: all 0ms ease-in-out;
  }

  .fade-enter {
    opacity: 0;
  }

  .fade-enter-to {
    opacity: 1;
  }
</style>
