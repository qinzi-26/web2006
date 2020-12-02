import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import i18n from "./plugins/i18n.js"
import "./router/permission"
import './plugins/element.js'
import "./plugins/MyComponents.js"
import "./assets/css/common.css"
import "./utils/eventbus"
import { initProject } from "./utils/init"
initProject();  // 初始化

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
