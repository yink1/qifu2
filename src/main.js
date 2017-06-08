// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@/router/router'
import store from '@/store/store'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import './assets/theme.less'
import $ from 'jquery'
Vue.config.productionTip = false
Vue.use(MuseUI)
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  $,
  template: '<App/>',
  components: { App }
})
