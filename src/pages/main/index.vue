<template>
    <div>
        <tao-bao-pwd-dialog></tao-bao-pwd-dialog>
        <search-page
            :navCustomClass="navCustomClass"
            :searchCustomClass="searchCustomClass"
            @goBack="hideMainSearchPage"
            @search="onSearch"
            v-if="showSearch"
        ></search-page>
        <div v-show="!showSearch">
            <index :value="active" @searchFocus="showMainSearchPage"></index>
            <goods-class :value="active" @searchFocus="showMainSearchPage"></goods-class>
            <discovery :value="active"></discovery>
            <my :value="active"></my>
            <van-tabbar :active="active" @change="onChange">
                <van-tabbar-item :key="index" v-for="(tab, index) in tabs">
                    <span>{{ tab.label }}</span>
                    <i
                        :class="['taobao-iconfont iconfont', tab.class]"
                        slot="icon"
                    ></i>
                    <i
                        :class="['taobao-iconfont iconfont', tab.activeClass]"
                        slot="icon-active"
                    ></i>
                </van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>

<script>
import GoodsClass from '@/pages/class/index'
import SearchPage from '@/pages/search/index'
import SearchMixin from '@/mixins/search'
import My from '@/pages/my/index'
import TaoBaoPwdDialog from '@/components/taobao-pwd-dialog'
import Index from '@/pages/index/index'
import Discovery from '@/pages/discovery/index'
import Constants from '@/config/constants'

export default {
    mixins: [SearchMixin],
    components: { Index, SearchPage, GoodsClass, My, TaoBaoPwdDialog, Discovery },
    data() {
        return {
            tabs: [
                {
                    label: '首页',
                    class: 'icon-home',
                    activeClass: 'icon-homefill'
                },
                {
                    label: '分类',
                    class: 'icon-apps',
                    activeClass: 'icon-leimupinleifenleileibie2'
                },
                {
                    label: '发现',
                    class: 'icon-discover',
                    activeClass: 'icon-discoverfill'
                },
                {
                    label: '我',
                    class: 'icon-my',
                    activeClass: 'icon-myfill'
                }
            ],
            active: 0,
            searchCustomClass: '',
            navCustomClass: ''
        }
    },
    methods: {
        showMainSearchPage() {
            if (this.active === 0) {
                this.navCustomClass = 'background-theme-linear-gradient color-white'
                this.searchCustomClass = 'background-body color-black'
                this.setWhiteNavBar()
            } else {
                this.navCustomClass = ''
                this.searchCustomClass = 'background-body color-black'
                this.setBlackNavBar()
            }
            this.showSearchPage()
        },
        hideMainSearchPage() {
            this.setNavBarColor()
            this.hideSearchPage()
        },
        setWhiteNavBar() {
            this.$wx.context.setNavigationBarColor({
                frontColor: '#ffffff',
                backgroundColor: '#000000'
            })
        },
        setBlackNavBar() {
            this.$wx.context.setNavigationBarColor({
                frontColor: '#000000',
                backgroundColor: '#F9F9F9'
            })
        },
        setNavBarColor() {
            if (this.active === 1) {
                this.setBlackNavBar()
            } else {
                this.setWhiteNavBar()
            }
        },
        onChange(event) {
            this.active = event.mp.detail
            let backgroundColor = this.active === 1 ? '#f8f8f8' : '#ffffff'
            this.$wx.context.setBackgroundColor({
                backgroundColor: backgroundColor
            })
            this.setNavBarColor()
        },
        onSearch(params) {
            this.hideSearchPage()
            this.navigateToListClass(params)
        }
    },
    onShareAppMessage(res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: `${Constants.SYSTEM.NAME} - 精选好货，聚优惠巨省钱！`,
            imageUrl: this.shareImgUrl
        }
    },
    onLoad() {
        this.checkSession()
        this.checkIsAuditMode()
    }
}
</script>

<style lang="less" scoped>
    .iconfont {
        font-size: 22px;
    }
</style>
