import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gameWon: false,
    gameLost: false,
    filters: {
      chromaticAberration: {
        enabled: true,
        intensity: 2,
        phase: 0
      },
      vignette: {
        enabled: true
      },
      lines: {
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
