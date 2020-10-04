<template>
  <div class="gameTitle">
    <div class="content">
      <h1>FIREWALL SURFER V1.7.3</h1>
      <div>...Target acquired...</div>
      <div>...Attack vectors mapped...</div>
      <br>
      <br>
      <div>Press H for help/guide</div>
      <br>
      <br>
      <div>Press enter to start attack on mainframe</div>
    </div>
  </div>
</template>

<script>
  import start from '@/game/start'

  import store from '@/store'

  export default {
    name: 'UIGameTitle',
    mounted () {
      window.addEventListener('keypress', this.keypress)
    },
    methods: {
      keypress (e) {
        // H
        if (e.keyCode == 72) {
          store.state.gameGuide = true
          window.removeEventListener('keypress', this.keypress)
        }
        // Enter
        if (e.keyCode == 13) {
          start()
          window.removeEventListener('keypress', this.keypress)
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
