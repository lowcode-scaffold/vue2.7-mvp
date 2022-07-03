import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { Modal } from "ant-design-vue";

Vue.config.productionTip = false;
Vue.use(Modal);
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
