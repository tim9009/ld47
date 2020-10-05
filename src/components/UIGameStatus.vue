<template>
  <div class="gameStatus" :class="{ 'hacked': hacked }">
    <div class="statusLine detection">DETECTION COUNTDOWN: {{ detectionCountdown }}</div>
    <div class="statusLine node">SERVER NODE: {{ nodeNumber }}</div>
    <div class="statusLine password">PASSWORD: {{ passwordProgress }}</div>
    <div class="statusLine hackStatus">STATUS: <span>{{ hackStatus }}</span></div>
  </div>
</template>

<script>
  import store from '@/store'

  export default {
    name: 'UIGameStatus',
    data () {
      return {
        detectionCountdown: 0
      }
    },
    mounted () {
      this.countDown()
    },
    computed: {
      nodeNumber () {
        return store.state.currentLevel.nodeNumber || ''
      },
      passwordProgress () {
        let password = store.state.currentLevel.password
        password += '*'.repeat(store.state.currentLevel.passwordLength - store.state.currentLevel.password.length)

        return password
      },
      hacked () {
        return store.state.currentLevel.hacked || false
      },
      hackStatus () {
        if (store.state.currentLevel.hacked) {
          return 'HACKED'
        }

        return 'HACK IN PROGRESS...'
      }
    },
    methods: {
      countDown () {
        this.detectionCountdown = (store.state.currentLevel.connectionTimeout - (Date.now() - store.state.currentLevel.connectionTime)) / 1000
        // Loop this
        window.setTimeout(this.countDown, 10)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .gameStatus {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    color: #fff;
    text-shadow: -0.15vw 0 rgba(255, 0, 0, 0.3), 0.15vw 0 rgba(0, 255, 255, 0.15);
  }

  .statusLine {
    position: absolute;
    left: 30px;
    font-size: 1.2vw;
  }

  .detection {
    top: 2vw;
  }

  .node {
    top: 3.5vw;
  }

  .password {
    top: 5vw;
  }

  .hackStatus {
    top: 6.5vw;
    
    span {
      color: #fff;
    }
  }

  .hacked {
    .hackStatus span {
      color: #4F840B;
    }
  }
</style>
