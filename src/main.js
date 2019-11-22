import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// use iView
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import './assets/css/app.css'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import VueLazyload from 'vue-lazyload'

Vue.use(ViewUI)
Vue.use(mavonEditor)
Vue.use(VueLazyload)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
