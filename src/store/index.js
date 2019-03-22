import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import common from './modules/common'
import goods from './modules/goods'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        common,
        goods
    },
    plugins: [
        createPersistedState({
            storage: {
                getItem: key => wx.getStorageSync(key),
                setItem: (key, value) => {
                    if (typeof value !== 'string') {
                        value = JSON.stringify(value)
                    }
                    wx.setStorageSync(key, value)
                },
                removeItem: key => wx.removeStorageSync(key)
            }
        })
    ]
})

Vue.prototype.$store = store

export default store
