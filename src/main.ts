import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import "dotenv/config";

Vue.config.productionTip = false;

Vue.filter("m2mi", (meters: number) => (meters / 1609.344).toFixed(2) + " mi");

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
