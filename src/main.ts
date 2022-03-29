import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import "dotenv/config";
import { Loader } from "google-maps";

Vue.config.productionTip = false;

// const loader = new Loader(process.env.VUE_APP_GMAPS_API_KEY);
// Vue.prototype.$google = await loader.load();

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
