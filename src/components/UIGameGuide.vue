<template>
  <div class="gameGuide">
    <div class="content">
      <h1>GUIDE</h1>
      <div>Bla</div>
      <div>Bla</div>
      <br>
      <br>
      <div>Press Q to close help/guide</div>
    </div>
  </div>
</template>

<script>
  import store from '@/store'

  export default {
    name: 'UIGameGuide',
    mounted () {
      window.addEventListener('keypress', this.keypress)
    },
    methods: {
      keypress (e) {
        // Q
        if (e.keyCode == 81) {
          store.state.gameGuide = false
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .gameGuide {
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
