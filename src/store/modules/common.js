import Vue from 'vue'
import plugin from '@/plugin'
import Api from '@/config/api'

Vue.use(plugin)

const state = {
    systemInfo: {},
    navHeight: 0,
    sessionKey: '',
    userInfo: {},
    audit: true
}
const mutations = {
    setSystemInfo(state, payload) {
        delete payload.errMsg
        state.systemInfo = payload
    },
    setNavHeight(state, payload) {
        state.navHeight = payload
    },
    setUserInfo(state, payload) {
        state.userInfo = payload
    },
    setSessionKey(state, payload) {
        state.sessionKey = payload
    },
    setAudit(state, payload) {
        state.audit = payload
    }
}
const actions = {
    checkIsAuditMode({ commit }) {
        Vue.ajax.get(Api.common.audit)
            .then(res => {
                commit('setAudit', res.data)
            })
    },
    initSystemInfo({ commit }) {
        Vue.wx.context.getSystemInfo().then(res => {
            commit('setSystemInfo', res)
        })
    },
    async loginAndAuth({ commit, state }, payload) {
        Vue.toast.loading('登录中…')
        // sessionKey已经失效
        if (Vue.validator.isEmpty(state.sessionKey)) {
            await Vue.wx.context.login()
                .then(async(res) => {
                    await Vue.ajax.post(Api.user.login, {
                        ...payload.userInfo
                    }, {
                        params: {
                            code: res.code
                        }
                    }).then(result => {
                        if (result.code === 200) {
                            commit('setSessionKey', result.data)
                        }
                    })
                })
        }
        commit('setUserInfo', payload.userInfo)
        Vue.toast.clear()
    },
    async initUserInfo({ dispatch, commit, state }, payload) {
        if (Vue.validator.isNotEmptyObj(payload)) {
            // commit("setUserInfo", payload.userInfo);
            await dispatch('loginAndAuth', payload)
        } else if (Vue.validator.isEmptyObj(state.userInfo)) {
            console.log('用户信息为空')
            // 查看是否授权
            await Vue.wx.context.getSetting().then(async res => {
                if (res.authSetting['scope.userInfo']) {
                    console.log('已授权')
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    await Vue.wx.context.getUserInfo().then(async res => {
                        await dispatch('loginAndAuth', res)
                    })
                } else {
                    console.log('未授权')
                    throw new Error('未授权')
                }
            })
        }
    },
    async checkSession({ dispatch, commit }) {
        await Vue.wx.context.checkSession()
            .catch(() => {
                // session_key 已经失效
                commit('setSessionKey', '')
                commit('setUserInfo', {})
            })
        await dispatch('initUserInfo')
    }
}
export default {
    state,
    actions,
    mutations
}
