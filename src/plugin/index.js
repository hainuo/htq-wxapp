// Plugin
import Fly from '@/config/flyio'
import Utils from '../utils'
import Wx from '@/config/wx'
import RouterMixin from '@/mixins/router'
import StoreMixin from '@/mixins/store'
import Qs from 'qs'

export default {
    /**
     * 自定义方法
     * 组件内使用： this.$ajax
     * 全局使用：Vue.$ajax
     */
    install(Vue) {
        Vue.ajax = Fly
        Vue.formatter = Utils.formatter
        Vue.validator = Utils.validator
        Vue.toast = Utils.toast
        Vue.dialog = Utils.dialog
        Vue.wx = Wx
        Vue.qs = Qs

        Vue.prototype.$ajax = Fly
        Vue.prototype.$formatter = Utils.formatter
        Vue.prototype.$validator = Utils.validator
        Vue.prototype.$toast = Utils.toast
        Vue.prototype.$dialog = Utils.dialog
        Vue.prototype.$wx = Wx
        Vue.prototype.$qs = Qs

        Vue.mixin(RouterMixin)
        Vue.mixin(StoreMixin)
        Vue.mixin({
            onUnload() {
                if (this.$options.data && this.$data.reset !== false) {
                    // 重置组件数据状态
                    Object.assign(this.$data, this.$options.data())
                }
            }
        })
    }
}
