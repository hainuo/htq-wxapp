const ROUTES = require('./config/routes')
module.exports = [
    {
        path: ROUTES.main,
        config: {
            usingComponents: {
                'van-cell': '/static/vant/cell/index',
                'van-cell-group': '/static/vant/cell-group/index',
                'van-tabbar': '/static/vant/tabbar/index',
                'van-tabbar-item': '/static/vant/tabbar-item/index',
                'van-tab': '/static/vant/tab/index',
                'van-tabs': '/static/vant/tabs/index',
                'van-transition': '/static/vant/transition/index',
                'van-card': '/static/vant/card/index',
                'van-tag': '/static/vant/tag/index',
                'van-swipe-cell': '/static/vant/swipe-cell/index'
            },
            // disableScroll: true,
            navigationBarTextStyle: 'white'
        }
    },
    {
        path: ROUTES.listClass,
        config: {
            usingComponents: {
                'van-tab': '/static/vant/tab/index',
                'van-tabs': '/static/vant/tabs/index',
                'van-card': '/static/vant/card/index',
                'van-tag': '/static/vant/tag/index',
                'van-swipe-cell': '/static/vant/swipe-cell/index'
            },
            navigationBarTextStyle: 'white',
            backgroundColor: '#ea8a9f'
        }
    },
    {
        path: ROUTES.search,
        config: {
            usingComponents: {
                'van-tab': '/static/vant/tab/index',
                'van-tabs': '/static/vant/tabs/index'
            }
        }
    },
    {
        path: ROUTES.goodsDetail,
        config: {
            usingComponents: {
                'van-tab': '/static/vant/tab/index',
                'van-tabs': '/static/vant/tabs/index',
                'van-cell': '/static/vant/cell/index',
                'van-cell-group': '/static/vant/cell-group/index',
                'van-tag': '/static/vant/tag/index'
            },
            navigationBarTextStyle: 'white'
        }
    },
    {
        path: ROUTES.login,
        config: {
            disableScroll: true
        }
    },
    {
        path: ROUTES.about,
        config: {
            disableScroll: true
        }
    },
    {
        path: ROUTES.listFavor,
        config: {
            usingComponents: {
                'van-tab': '/static/vant/tab/index',
                'van-tabs': '/static/vant/tabs/index',
                'van-card': '/static/vant/card/index',
                'van-tag': '/static/vant/tag/index',
                'van-swipe-cell': '/static/vant/swipe-cell/index'
            },
            navigationBarTextStyle: 'white'
        }
    },
    {
        path: ROUTES.listSubject,
        config: {
            usingComponents: {
                'van-card': '/static/vant/card/index',
                'van-tag': '/static/vant/tag/index',
                'van-swipe-cell': '/static/vant/swipe-cell/index',
                'van-action-sheet': '/static/vant/action-sheet/index'
            },
            navigationBarTextStyle: 'white'
        }
    },
    {
        path: ROUTES.article,
        config: {
            usingComponents: {
                'htmltowxml': '/static/html2wxml-component/html2wxml',
                'van-card': '/static/vant/card/index',
                'van-tag': '/static/vant/tag/index',
                'van-swipe-cell': '/static/vant/swipe-cell/index',
                'van-action-sheet': '/static/vant/action-sheet/index'
            },
            navigationBarTextStyle: 'white'
        }
    },
    {
        path: ROUTES.listShop,
        config: {
            usingComponents: {
                'van-card': '/static/vant/card/index',
                'van-tag': '/static/vant/tag/index',
                'van-swipe-cell': '/static/vant/swipe-cell/index',
                'van-cell': '/static/vant/cell/index',
                'van-cell-group': '/static/vant/cell-group/index'
            },
            navigationBarTextStyle: 'white'
        }
    }
]
