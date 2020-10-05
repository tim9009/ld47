<template>
  <div class="game">
    <div class="canvasContainer">
      <canvas id="vroom-canvas" width="1920" height="1080" ref="canvas"></canvas>

      <UIGameStatus />

      <UIGameTitle v-if="!gameStarted" />

      <UIGameConnecting v-if="gameConnecting" />

      <UIGameReconnecting v-if="gameReconnecting" />

      <transition name="fade">
        <UIGameGuide v-if="gameGuide" />
      </transition>

      <transition name="fade">
        <UIGameLost v-if="gameLost" />
      </transition>

      <transition name="fade">
        <UIGameWon v-if="gameWon" />
      </transition>

      <div class="overlay overlay--tv"></div>
    </div>
  </div>
</template>

<script>
  import store from '@/store'

  import UIGameTitle from './UIGameTitle.vue'
  import UIGameGuide from './UIGameGuide.vue'
  import UIGameConnecting from './UIGameConnecting.vue'
  import UIGameReconnecting from './UIGameReconnecting.vue'
  import UIGameLost from './UIGameLost.vue'
  import UIGameWon from './UIGameWon.vue'
  import UIGameStatus from './UIGameStatus.vue'

  // Import game
  import init from '@/game/init'
  import '@/game/main'

  export default {
    name: 'Game',
    components: {
      UIGameTitle,
      UIGameGuide,
      UIGameConnecting,
      UIGameReconnecting,
      UIGameLost,
      UIGameWon,
      UIGameStatus
    },
    created () {
      // window.addEventListener("resize", this.handleWindowResize)
    },
    mounted () {
      init()
    },
    destroyed () {
      // window.removeEventListener("resize", this.handleWindowResize)
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
      gameGuide () {
        return store.state.gameGuide
      },
      gameLost () {
        return store.state.gameLost
      },
      gameWon () {
        return store.state.gameWon
      },
      gameStarted () {
        return store.state.gameStarted
      },
      gameConnecting () {
        return store.state.gameConnecting
      },
      gameReconnecting () {
        return store.state.gameReconnecting
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
    font-size: 1.7vw;
  }

  #vroom-canvas {
    width: 100%;
  }

  .canvasContainer {
    position: relative;
    overflow: hidden;
  }

  .overlay {
    &--tv {
      width: calc(100% + 160px);
      height: calc(100% + 160px);
      position: absolute;
      top: -80px;
      left: -80px;
      border: solid black 80px;
      border-radius: 50% / 10%;

      &::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
        z-index: 2;
        background-size: 100% 2px, 3px 100%;
        pointer-events: none;
      }
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
