<template>
  <div class="gameGuide">
    <div class="content">
      <h1>Help</h1>
      <p>Firewall Surfer is a higly efficient password cracker and unauthorized access tool.<br>The GUI shows firewalls as white blocks and password fragments show up in a pink/red color.</p>
      <p>You must keep up your momentum to avoid being detected.<br>Colliding with the side of a firewall will most likely result in you being detected.</p>
      <p>Gather all the password fragments to crack the password and continue to the next server node.</p>
      <br>
      <p>
        <b>Controls:</b><br>
        <b>W:</b> Jump (press again to double jump)<br>
        <b>S:</b> Slam<br>
      </p>
      <br>
      <div>> Press Q to close help/guide</div>
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
        if (!store.state.gameGuide) {
          return
        }

        // Q
        if (e.key == 'q' || e.key == 'Q') {
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
