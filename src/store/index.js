import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gameGuide: false,
    gameWon: false,
    gameLost: false,
    gameStarted: false,
    gameConnecting: false,
    gameReconnecting: false,
    currentLevel: {
      connectionTime: 0,
      connectionTimeout: 90000,
      nodeNumber: 0,
      password: '',
      passwordLength: 0,
      hacked: false,
      final: false,
    },
    filters: {
      chromaticAberration: {
        enabled: true,
        intensity: 3,
        phase: 0
      },
      vignette: {
        enabled: true
      }
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
