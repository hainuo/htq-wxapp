<template>
    <div v-show="value===0">
        <nav-wrap
            :custom-class="'background-theme-linear-gradient color-white'"
            :customStyle="secondNavStyle"
            :showRefresh="showRefresh"
            :title="System.NAME" @reload="onReload"
            showFull
        >
        </nav-wrap>
        <div :class="['body-scroll has-footer background-white']">
            <div :class="['swipe-bg']"
                 :style="{backgroundImage:swipeBackground}"></div>
            <div :style="{marginTop:(navHeight-230)+'px'}" class="swipe-wrap">
                <div :class="'background-white'">
                    <div style="position:relative;">
                        <!--轮播图-->
                        <swiper :current="currentSwiperIndex"
                                @change="onChangeSwiper"
                                autoplay circular>
                            <swiper-item :key="picIndex"
                                         v-for="(subject,picIndex) in subjectList">
                                <img :src="'http://img.haodanku.com/'+subject.app_image"
                                     @click="onClickSwipeItem(subject)" class="img-background" mode="widthFix">
                            </swiper-item>
                        </swiper>
                        <div class="current-slide" v-if="subjectList.length>0">
                            {{currentSwiperIndex+1}}/{{subjectList.length}}
                        </div>
                    </div>
                    <van-tabs :active="tabIndex"
                              :border="false"
                              @change="onChangeTab">
                        <van-tab :key="index" :title="tab.label" v-for="(tab,index) in tabs">
                        </van-tab>
                    </van-tabs>
                    <pull-load :isFinished="computeIsFinished"
                               :isLoad="computeIsLoading"
                               @load="onLoadMore"
                    >
                        <goods-list :custom-class="'background-white'"
                                    :goods-list="goodsList[tabIndex]"
                                    :isLoad="computeIsLoading"
                        >
                        </goods-list>
                    </pull-load>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavWrap from '@/components/nav-wrap'
import SearchBar from '@/components/search-bar'
import Api from '@/config/api'
import GoodsList from '@/components/goods-list'
import PullLoad from '@/components/pull-load'
import Constants from '@/config/constants'

export default {
    components: { NavWrap, SearchBar, GoodsList, PullLoad },
    props: {
        value: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            System: Constants.SYSTEM,
            subjectList: [],
            currentSwiperIndex: 0,
            goodsList: [],
            // 是否正在加载
            isLoading: [true],
            // 是否已全部加载完毕
            isFinished: [false],
            tabs: [
                { label: '全部', cid: 0 },
                { label: '女装', cid: 1 },
                { label: '男装', cid: 2 },
                { label: '内衣', cid: 3 },
                { label: '美妆', cid: 4 },
                { label: '配饰', cid: 5 },
                { label: '鞋品', cid: 6 },
                { label: '箱包', cid: 7 },
                { label: '儿童', cid: 8 },
                { label: '母婴', cid: 9 },
                { label: '居家', cid: 10 },
                { label: '美食', cid: 11 },
                { label: '数码', cid: 12 },
                { label: '家电', cid: 13 },
                { label: '车品', cid: 15 },
                { label: '文体', cid: 16 },
                { label: '其他', cid: 14 }
            ],
            tabIndex: 1,
            page: [1],
            pageSize: 10,
            // 导航透明度
            navOpacity: 0,
            swipeBackground: ''
        }
    },
    methods: {
        dynamicNav(scrollTop) {
            let opacity = Number((scrollTop - 10) / this.navHeight).toFixed(1)
            opacity = opacity > 1 ? 1 : opacity < 0 ? 0 : opacity
            if (
                (opacity > 0 && opacity < 1) ||
                    (opacity === 0 && this.navOpacity !== 0) ||
                    (opacity === 1 && this.navOpacity !== 1)
            ) {
                this.navOpacity = opacity
            }
        },
        onSearchFocus() {
            this.$emit('searchFocus')
        },
        // 加载专题
        async loadSubject() {
            await this.$ajax.get(Api.haodanku.listSubject)
                .then(res => {
                    this.subjectList = res.data
                    this.setShareImgUrl(`http://img.haodanku.com/${this.subjectList[0].image}`)
                    this.swipeBackground = `url("http://img.haodanku.com/${this.subjectList[0].app_image}")`
                })
        },
        onChangeSwiper(event) {
            this.currentSwiperIndex = event.mp.detail.current
            this.swipeBackground = `url("http://img.haodanku.com/${this.subjectList[this.currentSwiperIndex].app_image}")`
        },
        onClickSwipeItem(subject) {
            this.navigateToListSubject({
                id: subject.id
            })
        },
        async onChangeTab(res) {
            let index = res.mp.detail.index
            this.tabIndex = index
            if (typeof this.goodsList[index] === 'undefined' ||
                    this.goodsList[index].length < 1) {
                await this.onRefresh()
            }
        },
        // 加载商品
        async loadGoods() {
            await this.$ajax
                .get(Api.haodanku.listGoods, {
                    nav: 2,
                    cid: this.tabs[this.tabIndex].cid,
                    back: this.pageSize,
                    min_id: this.page[this.tabIndex]
                })
                .then((res) => {
                    if (res.data.list.length > 0) {
                        this.goodsList[this.tabIndex] = this.goodsList[this.tabIndex].concat(res.data.list)
                        this.$set(this.page, this.tabIndex, res.data.min_id)
                    } else {
                        this.$set(this.isFinished, this.tabIndex, true)
                    }
                    this.$set(this.isLoading, this.tabIndex, false)
                })
        },
        // 下拉刷新
        async onRefresh() {
            this.$set(this.page, this.tabIndex, 1)
            this.$set(this.goodsList, this.tabIndex, [])
            this.$set(this.isLoading, this.tabIndex, true)
            this.$set(this.isFinished, this.tabIndex, false)
            await this.loadGoods()
        },
        // 加载更多
        onLoadMore() {
            this.loadGoods()
        }
    },
    // 滚动到底部
    onScrollToLower() {
        if (!this.computeIsFinished && !this.computeIsLoading) {
            console.log('onReachBottom')
            this.$set(this.isLoading, this.tabIndex, true)
            this.onLoadMore()
        }
    },
    computed: {
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
        },
        secondNavStyle() {
            return this.navOpacity === 0
                ? 'display:none;'
                : `background:#F9F9F9;opacity:${this.navOpacity}`
        }
    },
    onPageScroll(e) {
        if (this.value === 0) {
            this.dynamicNav(e.scrollTop)
        }
    },
    onLoad() {
        Promise.all([
            this.loadSubject(),
            this.onChangeTab({
                mp: {
                    detail: {
                        index: this.tabIndex
                    }
                }
            })]).then(() => {
            this.showRefresh = false
        })
    }
}
</script>

<style lang="scss" scoped>

    .swipe-wrap {
        position: relative;
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;

        > div {
            min-height: 100vh;
            border-radius: 10px;
        }

        img {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 10px 10px 0 0;
        }
    }
</style>
