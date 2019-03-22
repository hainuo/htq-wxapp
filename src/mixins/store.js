import { mapActions, mapMutations, mapState } from 'vuex'

export default {
    computed: {
        ...mapState({
            systemInfo: state => state.common.systemInfo,
            navHeight: state => state.common.navHeight,
            userInfo: state => state.common.userInfo,
            sessionKey: state => state.common.sessionKey,
            searchKeyword: state => state.goods.searchKeyword,
            shareImgUrl: state => state.goods.shareImgUrl,
            shop: state => state.goods.shop,
            audit: state => state.common.audit
        })
    },
    methods: {
        ...mapMutations([
            'setNavHeight',
            'addSearchKeyword',
            'clearSearchKeyword',
            'setShop',
            'setShareImgUrl']),
        ...mapActions([
            'initSystemInfo',
            'initUserInfo',
            'checkSession',
            'checkIsAuditMode'])
    }
}
