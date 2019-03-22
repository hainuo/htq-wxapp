<template>
    <div>
        <tao-bao-pwd-dialog></tao-bao-pwd-dialog>
        <search-page
            :navCustomClass="'background-nav-linear-gradient color-white'"
            :searchCustomClass="'background-body color-black'"
            @goBack="hideSearchPage"
            @search="onSearch"
            v-if="showSearch"
            v-model="keyword"
        ></search-page>
        <div v-show="!showSearch" :style="{minHeight:'100vh'}">
            <nav-wrap
                :custom-class="'background-nav-linear-gradient color-white'"
                :showRefresh="showRefresh"
                @goBack="goBack"
                @reload="onReload"
                show-back
            >
                <search-bar
                    :custom-class="'background-body color-black'"
                    :disabled="true"
                    :focus="false"
                    :showClear="false"
                    @focus="showSearchPage"
                    v-model="keyword"
                ></search-bar>
            </nav-wrap>
<!--            <scroll-view :class="['body',{'background-theme-linear-gradient':setScrollViewBackground}]" :lower-threshold="100"-->
<!--                         :style="{ top: navHeight+'px',bottom:'0'}"-->
<!--                         @scroll="onScroll"-->
<!--                         @scrolltolower="onScrollToLower"-->
<!--                         enable-back-to-top-->
<!--                         scroll-y>-->
            <div :style="{ height: navHeight+'px',width:'100%'}" :class="'background-accent'">
            </div>
            <!--父容器-->
            <div class="goods-list-wrap background-body">
                    <van-tabs
                        :active="tabIndex"
                        :border="false"
                        :custom-class="'color-white background-accent'"
                        @change="onChangeTab"
                    >
                        <van-tab
                            :key="index"
                            :title="tab.label"
                            v-for="(tab, index) in tabs"
                        >
                        </van-tab>
                    </van-tabs>
                    <order-bar :custom-class="backgroundColor"
                               :custom-style="`top:${navHeight}px`"
                               @changeListStyle="onChangeListStyle"
                               @changeSort="reloadBySort"></order-bar>
                    <pull-load :isFinished="computeIsFinished"
                               :isLoad="computeIsLoading"
                               @load="onLoadMore"
                    >
                        <goods-list :card="showlistCardStyle"
                                    :custom-class="backgroundColor"
                                    :goods-list="goodsList[tabIndex]"
                                    :isLoad="computeIsLoading">
                        </goods-list>
                    </pull-load>
                </div>

<!--            </scroll-view>-->
        </div>
    </div>
</template>

<script>
import Api from '@/config/api'
import NavWrap from '@/components/nav-wrap'
import SearchBar from '@/components/search-bar'
import GoodsList from '@/components/goods-list'
import SearchPage from '@/pages/search/index'
import SearchMixin from '@/mixins/search'
import OrderBar from '@/components/order-bar'
import GoodsListCard from '@/components/goods-list-card'
import TaoBaoPwdDialog from '@/components/taobao-pwd-dialog'
import PullLoad from '@/components/pull-load'

export default {
    mixins: [SearchMixin],
    components: {
        GoodsListCard,
        GoodsList,
        SearchBar,
        NavWrap,
        SearchPage,
        OrderBar,
        TaoBaoPwdDialog,
        PullLoad
    },
    data() {
        return {
            // scroll-top
            scrollTop: 0,
            // 是否设置scroll-view背景
            setScrollViewBackground: true,
            // 列表卡片样式
            showlistCardStyle: false,
            // 关键词
            keyword: '',
            // 分类id
            cid: '',
            // 请求地址
            url: '',
            // tab
            tabIndex: 0,
            tabs: '',
            // 商品列表
            goodsList: [],
            // 是否正在刷新
            isRefresh: [false],
            // 是否正在加载
            isLoading: [true],
            // 是否已全部加载完毕
            isFinished: [false],
            page: [1],
            tb_page: [1],
            pageSize: 50,
            // 只搜天猫
            isTmall: 0,
            // 只搜有券
            isCoupon: 0,
            // type=1是今日上新，type=2是9.9包邮，type=3是30元封顶，type=4是聚划算，
            // type=5是淘抢购，type=6是0点过夜单，type=7是预告单，type=8是品牌单，type=9是天猫商品，type=10是视频单
            type: '',
            sort: 0
        }
    },
    methods: {
        // 初始化
        initAll(option) {
            this.initParams(option)
            this.initTabs()
            this.onChangeTab({
                mp: {
                    detail: {
                        index: this.tabIndex
                    }
                }
            })
        },
        // 初始化参数
        initParams(option) {
            Object.assign(this.$data, this.$options.data())
            this.tabIndex = option.tab || 0
            this.keyword = option.keyword
            this.cid = option.cid
            this.url = option.url
        },
        // 初始化tab
        initTabs() {
            if (this.url === Api.haodanku.goodsSearch) {
                this.tabs = [
                    { label: '全部', isTmall: 0, isCoupon: 0 },
                    { label: '天猫', isTmall: 1, isCoupon: 0 },
                    { label: '有券', isTmall: 0, isCoupon: 1 }
                ]
            } else if (this.url === Api.haodanku.goodsKeyword) {
                this.tabs = [
                    { label: '全部', type: '' },
                    { label: '天猫', type: 9 },
                    { label: '今日上新', type: 1 },
                    { label: '9.9包邮', type: 2 },
                    { label: '30元封顶', type: 3 },
                    { label: '聚划算', type: 4 },
                    { label: '淘抢购', type: 5 }
                ]
            }
        },
        // 切换tab
        onChangeTab(res) {
            let index = res.mp.detail.index
            this.tabIndex = index
            this.isTmall = this.tabs[index].isTmall
            this.isCoupon = this.tabs[index].isCoupon
            this.type = this.tabs[index].type
            if (
                typeof this.goodsList[index] === 'undefined' ||
                    this.goodsList[index].length < 1
            ) {
                this.onRefresh()
            }
        },
        // 加载商品
        loadGoods() {
            this.$toast.loading()
            this.$ajax
                .get(this.url, {
                    keyword: this.keyword,
                    cid: this.cid,
                    back: this.pageSize,
                    min_id: this.page[this.tabIndex],
                    tb_p: this.tb_page[this.tabIndex],
                    is_tmall: this.isTmall || 0,
                    is_coupon: this.isCoupon || 0,
                    sort: this.sort,
                    type: this.type
                })
                .then(res => {
                    if (res.data.list.length > 0) {
                        this.goodsList[this.tabIndex] = this.goodsList[this.tabIndex]
                            .concat(res.data.list)
                        this.$set(
                            this.page,
                            this.tabIndex,
                            res.data.min_id
                        )
                        this.$set(
                            this.tb_page,
                            this.tabIndex,
                            res.data.tb_p
                        )
                    } else {
                        // 已全部加载完毕
                        this.$set(this.isFinished, this.tabIndex, true)
                    }
                    // 重置刷新和加载状态
                    this.$set(this.isRefresh, this.tabIndex, false)
                    this.$set(this.isLoading, this.tabIndex, false)
                    this.showRefresh = false
                    this.$toast.clear()
                })
        },
        // 下拉刷新
        onRefresh() {
            this.$set(this.isRefresh, this.tabIndex, true)
            // 初始化数据
            this.$set(this.page, this.tabIndex, 1)
            this.$set(this.tb_page, this.tabIndex, 1)
            this.$set(this.goodsList, this.tabIndex, [])
            this.$set(this.isLoading, this.tabIndex, true)
            this.$set(this.isFinished, this.tabIndex, false)
            this.loadGoods()
        },
        // 加载更多
        onLoadMore() {
            this.loadGoods()
        },
        // 搜索
        onSearch(params) {
            this.hideSearchPage()
            this.initAll(params)
        },
        // 更改排序
        reloadBySort(sortMethod) {
            let sort = 0
            switch (sortMethod) {
            case 0:
                sort = 0
                break
            case 1:
                sort = this.url === Api.haodanku.goodsKeyword ? 2 : 5
                break
            case 2:
                sort = this.url === Api.haodanku.goodsKeyword ? 1 : 4
                break
            case 3:
                sort = this.url === Api.haodanku.goodsKeyword ? 4 : 2
                break
            case 4:
                sort = this.url === Api.haodanku.goodsKeyword ? 5 : 6
                break
            }
            this.sort = sort
            this.onRefresh()
        },
        // 切换列表样式
        onChangeListStyle(listStyle) {
            this.showlistCardStyle = listStyle
        },
        // 滚动到底部
        onScrollToLower() {
            if (!this.computeIsFinished && !this.computeIsLoading) {
                console.log('onReachBottom')
                this.$set(this.isLoading, this.tabIndex, true)
                this.onLoadMore()
            }
        },
        onScroll(res) {
            let currentScrollTop = res.mp.detail.scrollTop
            this.setScrollViewBackground = currentScrollTop < 100
        }
    },
    computed: {
        backgroundColor() {
            return this.goodsList[this.tabIndex] && this.goodsList[this.tabIndex].length < 1
                ? 'background-white' : 'background-body'
        },
        computeIsRefresh() {
            if (typeof this.isRefresh[this.tabIndex] === 'undefined') {
                return false
            }
            return this.isRefresh[this.tabIndex]
        },
        computeIsLoading() {
            if (typeof this.isLoading[this.tabIndex] === 'undefined') {
                return true
            }
            return this.isLoading[this.tabIndex]
        },
        computeIsFinished() {
            if (typeof this.isFinished[this.tabIndex] === 'undefined') {
                return false
            }
            return this.isFinished[this.tabIndex]
        }
    },
    onLoad(option) {
        this.initAll(option)
    }
}
</script>

<style lang="less">
    @tab-active: rgb(255, 255, 107);
    @import "../../../assets/style/color";

    .van-tabs__line {
        background-color: @tab-active !important;
    }

    .van-tab {
        color: #ffffff !important;
    }

    .van-tab--active {
        color: @tab-active !important;
    }

    .goods-list-wrap {
        min-height: 100%;
    }

    .background-nav-linear-gradient {
        background-image: linear-gradient(to bottom, @theme-color, @accent-color) !important;
    }
</style>
