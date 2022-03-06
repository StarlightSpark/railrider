import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    speed: 0,
    isRidingTrain: false,
    railroad: null,
    eotTelemetry: {
      unitId: null,
      brakePipePressure: null,
      motion: null
    }
  },
  mutations: {
    updateEOTTelemetry(state, newTelemetry: any) {
      state.eotTelemetry = newTelemetry;
    }
  },
  actions: {
  },
  modules: {
  }
})

navigator.geolocation.getCurrentPosition((pos) => console.log(pos));

// is riding train
// * close to tracks
// * moving at a relatively constant non-zero speed
