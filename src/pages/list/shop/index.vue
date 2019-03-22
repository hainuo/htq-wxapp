<template>
    <div class="background-white">
        <!-- 导航 -->
        <nav-wrap
            :customStyle="firstNavStyle"
            :showRefresh="showRefresh"
            @goBack="goBack"
            @reload="onReload"
            roundWhiteBack
            showBack
        >
        </nav-wrap>
        <nav-wrap :center-title="false"
                  :custom-class="'background-body'"
                  :customStyle="secondNavStyle" @goBack="goBack"
                  showBack showFull>
            <div slot="full">
                <div class="title-nav">
                    <img :src="shop.shopIcon">{{shop.shopName}}
                </div>
            </div>
        </nav-wrap>
        <div class="body-scroll">
            <div :style="{backgroundImage:shopWrapBackground}" class="swipe-bg"></div>
            <!--店铺简介-->
            <div :style="{marginTop:'-230px'}" class="shop-wrap">
                <div class="shop-main">
                    <div class="shop-logo">
                        <img :src="shop.shopIcon">
                    </div>
                    <div class="shop-info">
                        <div class="shop-name van-ellipsis">{{shop.shopName}}</div>
                        <div class="shop-fans">粉丝数{{shop.fans}}</div>
                        <div class="shop-title">
                            <img :src="shop.certIcon" style="width: 14px;"
                                 v-if="shop.isShowCertIcon">
                            <img :src="shop.creditLevelIcon"
                                 :style="{width:shop.shopType==='C'?'66px':'28px'}">
                            <img :src="shop.brandIcon"
                                 style="width: 88px;margin-left: 5px;"
                                 v-if="shop.brandIcon">
                        </div>
                    </div>
                </div>
            </div>
            <pull-load :isFinished="isFinished"
                       :isLoad="isLoading"
                       @load="onLoadMore"
            >
                <goods-list :custom-class="'background-white'"
                            :goods-list="goodsList"
                            :isLoad="isLoading">
                </goods-list>
            </pull-load>

        </div>
    </div>
</template>

<script>
import NavWrap from '@/components/nav-wrap'
import GoodsList from '@/components/goods-list'
import PullLoad from '@/components/pull-load'
import Api from '@/config/api'

export default {
    components: { NavWrap, GoodsList, PullLoad },
    data() {
        return {
            goodsList: [],
            // 是否正在加载
            isLoading: true,
            // 是否已全部加载完毕
            isFinished: false,
            page: 1,
            pageSize: 50,
            // 背景图片
            shopWrapBackground: '',
            // 导航透明度
            navOpacity: 0
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
                if (opacity > 0) {
                    this.$wx.context.setNavigationBarColor({
                        frontColor: '#000000',
                        backgroundColor: '#F9F9F9'
                    })
                } else {
                    this.$wx.context.setNavigationBarColor({
                        frontColor: '#ffffff',
                        backgroundColor: '#000000'
                    })
                }
            }
        },
        // 加载更多
        onLoadMore() {
            this.loadGoods()
        },
        loadGoods() {
            this.$ajax
                .get(Api.haodanku.goodsKeyword, {
                    shopid: this.shop.shopId,
                    back: this.pageSize,
                    min_id: this.page
                })
                .then(res => {
                    if (res.data.list.length > 0) {
                        this.goodsList = this.goodsList.concat(res.data.list)
                        this.pageSize = res.data.min_id
                        this.shopWrapBackground = `url("${this.goodsList[0].itempic}_310x310.jpg")`
                    } else {
                        this.isFinished = true
                    }
                    this.showRefresh = false
                    this.isLoading = false
                })
        }
    },
    computed: {
        firstNavStyle() {
            return this.navOpacity === 1
                ? 'display:none;'
                : `opacity:${1 - this.navOpacity}`
        },
        secondNavStyle() {
            return this.navOpacity === 0
                ? 'display:none;'
                : `opacity:${this.navOpacity}`
        }
    },
    onPageScroll(e) {
        this.dynamicNav(e.scrollTop)
    },
    onLoad() {
        this.loadGoods()
    }
}
</script>

<style lang="less" scoped>

    .shop-wrap {
        height: 230px;
        width: 100%;
        box-sizing: border-box;
        padding: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .shop-main {
            width: 100%;
            display: flex;
            position: relative;

            .shop-logo {
                width: 54px;
                min-width: 54px;
                height: 54px;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 3px;
                }
            }

            .shop-info {
                width: 100%;
                padding: 0 10px;
                line-height: 18px;
                text-align: left;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                > div {
                    display: flex;
                    align-items: center;
                    color: white;
                }

                .shop-name {
                    font-size: 16px;
                }

                .shop-fans {
                    font-size: 12px;
                }

                .shop-title {
                    font-size: 12px;

                    img {
                        height: 12px;
                        width: auto;
                    }
                }
            }
        }

    }


</style>
