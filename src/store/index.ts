import Vue from "vue";
import Vuex from "vuex";
import { MAX_BRAKING_PRESSURE } from "@/common/constants";
import { EOTStatus } from "@/common/types";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    speed: 0,
    railroad: null,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    recon: {
      namespaced: true,
      state: () => ({
        nearbyTrains: []
      }),
      mutations: {
        setNearbyTrains(state, uniqueEOTTrasmissions: EOTStatus[]) {
          state.nearbyTrains = uniqueEOTTrasmissions;
        }
      }
    },
    train: {
      namespaced: true,
      state: () => ({
        speed: null,
        defects: [],
        eotStatus: {
          unitId: null,
          brakePipePressure: null,
          motion: null
        },
      }),
      getters: {
        isBraking({ eotStatus }) {
          return eotStatus.brakePipePressure <= MAX_BRAKING_PRESSURE;
        }
      },
      mutations: {
        setEOTStatus(state, newEOTStatus: EOTStatus) {
          state.eotStatus = newEOTStatus;
        }
      }
    },
    position: {
      namespaced: true,
      state: () => ({
        lastMilepost: null,
        speed: null,
        isRidingTrain: null,
        currentPosition: null,
      }),
      mutations: {
        setLastMilepost(state, milepost: number) {
          state.lastMilepost = milepost;
        },
        setSpeed(state, speed: number) {
          state.speed = speed;
        },
        setIsRidingTrain(state, isRidingTrain: boolean) {
          state.isRidingTrain = isRidingTrain
        },
        setCurrentPosition(state, position: GeolocationPosition) {
          state.currentPosition = position;
        }
      }
    }
  }
})


// is riding train
// * close to tracks
// * moving at a relatively constant non-zero speed
