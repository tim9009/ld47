<template>
  <div class="gameConnecting">
    <div class="content">
      <div>FIREWALL TRIGGERED</div>
      <div class="pulsate">// RECONNECTING //</div>
    </div>
  </div>
</template>

<script>
  import store from '@/store'

  export default {
    name: 'UIGameReconnecting',
    mounted () {
      // Add timeout to hide connection page
      window.setTimeout(function() {
        store.state.gameConnecting = false
      }, 600)
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
    background-color: rgba(14, 18, 33, 0.8)
  }

  .content {
    width: 100%;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    line-height: 1.5;
  }

  .pulsate {
    animation: pulsate 200ms ease-out;
    animation-iteration-count: infinite; 
    opacity: 1;
  }

  @-webkit-keyframes pulsate {
      0% { 
          opacity: 1;
      }
      50% { 
          opacity: 0.2;
      }
      100% { 
          opacity: 1;
      }
  }
</style>
