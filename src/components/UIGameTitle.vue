<template>
  <div class="gameTitle">
    <div class="content">
      <h1>FIREWALL SURFER V1.7.3</h1>
      <div>By Tim Eriksen</div>
      <br>
      <div>Target acquired...</div>
      <div>Attack vectors mapped...</div>
      <br>
      <br>
      <div>> Press H for help/guide</div>
      <div>> Press enter to start attack on mainframe</div>
    </div>
  </div>
</template>

<script>
  import start from '@/game/start'
  import { Vroom } from '@/game/vroom/vroom.js'

  import store from '@/store'

  export default {
    name: 'UIGameTitle',
    mounted () {
      window.addEventListener('keypress', this.keypress)
    },
    methods: {
      keypress (e) {
        Vroom.state.audioCtx.resume()

        if (store.state.gameStarted) {
          return
        }

        // H
        if (e.key == 'h' || e.key == 'H') {
          store.state.gameGuide = true
        }

        // Enter
        if (e.key == 'Enter') {
          start()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .gameTitle {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    color: #fff;
    background-color: rgb(14, 18, 33)
  }

  .content {
    width: 100%;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    line-height: 1.5;
  }
</style>
