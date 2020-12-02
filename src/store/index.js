import Vue from 'vue'
import Vuex from 'vuex'
import loginModule from "./modules/loginModule"
import editorModule from "./modules/editorModule"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    loginModule,
    editorModule
  }
})
