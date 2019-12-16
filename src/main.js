import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
import Vue2Filters from 'vue2-filters';

Vue.component('VueSlider', VueSlider);
Vue.use(Vue2Filters);

axios.defaults.baseURL = 
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");