import Vue from 'vue'
import App from '@/App'
import store from '@/store'
import plugin from '@/plugin'
import MpvueRouterPatch from 'mpvue-router-patch'

Vue.use(plugin)
Vue.use(MpvueRouterPatch)

Vue.config.productionTip = false
App.mpType = 'app'
App.store = store

const app = new Vue(App)
app.$mount()
