import wxp from 'minapp-api-promise'

const FAIL_ICON_PATH = '/static/img/fail.png'
const ICON_TYPE = {
    SUCCESS: 'success',
    LOADING: 'loading',
    NONE: 'none'
}
export const toast = {
    loading(str = '加载中…') {
        wxp.showLoading({
            title: str
        })
    },
    clear() {
        wxp.hideLoading()
        wxp.hideToast()
    },
    fail(str = '加载失败') {
        this.show(str, ICON_TYPE.NONE, FAIL_ICON_PATH)
    },
    success(str) {
        this.show(str, ICON_TYPE.SUCCESS)
    },
    show(message, iconType, iconPath) {
        let options =
            typeof message === 'string'
                ? {
                    title: message,
                    icon: iconType,
                    image: iconPath
                }
                : message
        wxp.showToast(options)
    }
}

export const dialog = {
    async confirm(options) {
        options.confirmColor = '#7974F5'
        await wxp.showModal(options).then(res => {
            if (res.confirm) {
            } else if (res.cancel) {
                return Promise.reject()
            }
        })
    },
    async alert(options) {
        options.showCancel = false
        options.confirmColor = '#7974F5'
        await wxp.showModal(options).then(res => {
            if (res.confirm) {
            } else if (res.cancel) {
                return Promise.reject()
            }
        })
    }
}
