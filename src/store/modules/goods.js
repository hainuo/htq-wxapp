const state = {
    // 历史搜索词
    searchKeyword: [],
    shareImgUrl: '',
    shop: {}
}
const mutations = {
    setShop(state, payload) {
        state.shop = payload
    },
    setShareImgUrl(state, payload) {
        state.shareImgUrl = payload
    },
    addSearchKeyword(state, keyword) {
        if (state.searchKeyword.indexOf(keyword) > -1) {
            state.searchKeyword.splice(state.searchKeyword.indexOf(keyword), 1)
        }
        // 最新搜索的词在最前面
        state.searchKeyword.unshift(keyword)
        // 最多保存20条
        if (state.searchKeyword.length > 20) {
            state.searchKeyword.splice(20, state.searchKeyword.length - 20)
        }
    },
    clearSearchKeyword(state) {
        state.searchKeyword = []
    }
}

export default {
    state,
    mutations
}
