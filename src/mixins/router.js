const ROUTES = require('../config/routes')
export default {
    data() {
        return {
            showRefresh: true
        }
    },
    methods: {
        goBack() {
            let currentPages = this.$wx.getCurrentPages()
            if (currentPages.length > 1) {
                this.$router.back()
            } else {
                this.redirectToIndex()
            }
        },
        onReload() {
            let currentPages = this.$wx.getCurrentPages()
            if (currentPages.length !== 0) {
                let currentPage = this.$wx.getCurrentPages()[currentPages.length - 1]
                currentPage.onLoad(currentPage.options)
            }
        },
        navigateToListClass(params) {
            this.$router.push({
                path: ROUTES.context + ROUTES.listClass,
                query: params
            })
        },
        navigateToDetail(params) {
            this.$router.push({
                path: ROUTES.context + ROUTES.goodsDetail,
                query: params
            })
        },
        navigateToIndex() {
            this.$router.push(ROUTES.context + ROUTES.main)
        },
        redirectToIndex() {
            this.$router.replace(ROUTES.context + ROUTES.main)
        },
        navigateToLogin() {
            this.$router.push(ROUTES.context + ROUTES.login)
        },
        navigateToAbout() {
            this.$router.push(ROUTES.context + ROUTES.about)
        },
        navigateToListFavor(params) {
            this.$router.push({
                path: ROUTES.context + ROUTES.listFavor,
                query: params
            })
        },
        navigateToListSubject(params) {
            this.$router.push({
                path: ROUTES.context + ROUTES.listSubject,
                query: params
            })
        },
        navigateToArticle(params) {
            this.$router.push({
                path: ROUTES.context + ROUTES.article,
                query: params
            })
        },
        navigateToListShop(params) {
            this.$router.push({
                path: ROUTES.context + ROUTES.listShop,
                query: params
            })
        }
    }
}
