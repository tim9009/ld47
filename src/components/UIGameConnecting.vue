<template>
  <div class="gameConnecting">
    <div class="content">
      <div>{{ text }}...</div>
    </div>
  </div>
</template>

<script>
  import store from '@/store'

  export default {
    name: 'UIGameConnecting',
    mounted () {
      // Add timeout to hide connection page
      window.setTimeout(function() {
        store.state.gameConnecting = false
      }, 2500)
    },
    computed: {
      text () {
        if (store.state.currentLevel.final) {
          return 'Access to MAIFRAIME acquired, connecting'
        }

        switch (store.state.currentLevel.nodeNumber) {
          case 1:
            return 'Connecting to least secure server node'

          default:
            return `Connecting to next server node (#${store.state.currentLevel.nodeNumber})`
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .gameConnecting {
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
