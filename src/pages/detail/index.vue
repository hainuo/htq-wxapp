<template>
    <div :class="[{'disable-scroll':disableScroll}]">
        <tao-bao-pwd-dialog></tao-bao-pwd-dialog>
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
        <nav-wrap
            :customClass="'background-white'" :customStyle="secondNavStyle"
            :payload="activeTab"
            @goBack="goBack"
            showBack
            showFull
        >
            <div slot="full">
                <van-tabs
                    :active="payload"
                    :border="false"
                    @clickTab="onClickTab"
                    style="width:145px;height: 100%;"
                >
                    <van-tab title="宝贝"></van-tab>
                    <van-tab title="详情"></van-tab>
                    <van-tab title="推荐"></van-tab>
                </van-tabs>
            </div>
        </nav-wrap>
        <!--内容-->
        <div class="goods" v-if="taobaoGoodsInfo.propsCut">
            <!--商品信息-->
            <!--轮播图-->
            <div style="position: relative;">
                <swiper :current="currentSwiperIndex"
                        @change="onChangeSwiper"
                        autoplay
                        circular class="goods-swipe">
                    <swiper-item :key="picIndex" v-for="(pic,picIndex) in picList">
                        <img :src="pic" @click="showLarge(picIndex)" class="img-background" mode="widthFix">
                    </swiper-item>
                </swiper>
                <div class="current-slide">{{currentSwiperIndex+1}}/{{picList.length}}</div>
            </div>
            <!--商品标题-->
            <van-cell-group>
                <van-cell>
                    <div class="main-price-wrapper">
                        <p class="o-t-price">
                            <span class="num">{{ newPrice }}</span>
                        </p>
                        <div
                            v-for="(priceTag, tabIndex) in taobaoGoodsInfo.apiStack.price.priceTag"
                        >
                            <p class="t-tag" v-if="priceTag.text">
                                {{ priceTag.text }}
                            </p>
                            <p v-if="priceTag.icon">
                                <img :src="priceTag.icon" class="t-icon"/>
                            </p>
                        </div>
                        <p class="t-tag" v-if="coupon.price > 0">折扣价</p>
                        <i class="taobao-iconfont iconfont icon-share">
                            <button
                                class="open-btn"
                                open-type="share"
                            ></button>
                        </i>
                    </div>
                    <div class="original-price" v-if="coupon.price > 0">
                        在售价:￥<span>{{taobaoGoodsInfo.apiStack.price.price.priceText}}</span>
                    </div>
                    <div class="goods-title">
                        <img src="../../assets/img/tmall.png"
                             style=" height: 12px;width:28px;"
                             v-if="taobaoGoodsInfo.seller.shopType==='B'&&!audit">
                        {{ taobaoGoodsInfo.item.title }}
                    </div>
                    <div class="goods-desc" v-if="coupon.desc">
                        {{ coupon.desc }}
                    </div>
                </van-cell>
                <van-cell>
                    <div class="goods-express">
                        <div>
                            {{ taobaoGoodsInfo.apiStack.delivery.postage }}
                        </div>
                        <div>
                            月销{{
                            taobaoGoodsInfo.apiStack.item.sellCount
                            }}笔
                        </div>
                        <div>
                            {{ taobaoGoodsInfo.apiStack.delivery.from }}
                        </div>
                    </div>
                </van-cell>
            </van-cell-group>
            <!--活动Banner-->
            <div :style="{background:'url('+taobaoGoodsInfo.apiStack.resource.bigPromotion.bgPicUrl+')'}" class="banner"
                 v-if="showBanner">
                <img :src="taobaoGoodsInfo.apiStack.resource.bigPromotion.picUrl">
                <div>
        <span :style="{color: taobaoGoodsInfo.apiStack.resource.bigPromotion.memo[0].textColor}">
        {{taobaoGoodsInfo.apiStack.resource.bigPromotion.memo[0].text}}
        </span>
                </div>
            </div>
            <!--领券-->
            <div class="goods-cell-group" v-if="coupon.price>0&&!audit">
                <van-cell-group>
                    <van-cell @click="showCouponsDialog=true" is-link>
                        <div class="t-cell" slot="title">
                            <span class="van-cell-text t-cell-title">优惠</span>
                            <span class="van-cell-text t-cell-desc van-ellipsis">
                                <span class="main-price-wrapper">
                                    <span class="t-tag">内部券</span>
                                        {{coupon.couponexplain}}{{coupon.price}}元券
                                    </span>
                                </span>
                        </div>
                    </van-cell>
                </van-cell-group>
            </div>
            <!--服务-->
            <div class="goods-cell-group">
                <van-cell-group>
                    <van-cell @click="showServiceDialog=true" is-link>
                        <div class="t-cell" slot="title">
                            <span class="van-cell-text t-cell-title">服务</span>
                            <span class="van-cell-text t-cell-desc van-ellipsis">
        <span
            v-for="(service,serviceIndex) in taobaoGoodsInfo.apiStack.consumerProtection.items"
            v-if="serviceIndex<3">
        {{service.title}}
        </span>
        </span>
                        </div>
                    </van-cell>
                </van-cell-group>
            </div>
            <!--参数-->
            <div class="goods-cell-group">
                <van-cell-group>
                    <van-cell @click="showSkuDialog=true"
                              is-link v-if="taobaoGoodsInfo.apiStack.item.skuText">
                        <div class="t-cell" slot="title">
                            <span class="van-cell-text t-cell-title">规格</span>
                            <span class="van-cell-text t-cell-desc van-ellipsis">
                                {{taobaoGoodsInfo.item.skuText}}
                            </span>
                        </div>
                    </van-cell>
                    <van-cell @click="showParamsDialog=true" is-link>
                        <div class="t-cell" slot="title">
                            <span class="van-cell-text t-cell-title">参数</span>
                            <span class="van-cell-text t-cell-desc van-ellipsis">
                                {{taobaoGoodsInfo.propsCut}}
                            </span>
                        </div>
                    </van-cell>
                </van-cell-group>
            </div>
            <!--店铺简介-->
            <div @click="onClickShop" class="goods-cell-group" style="margin-bottom: 0;">
                <van-cell-group>
                    <van-cell>
                        <div class="shop-main">
                            <div class="shop-logo">
                                <img :src="taobaoGoodsInfo.seller.shopIcon">
                            </div>
                            <div class="shop-info">
                                <div class="shop-name">{{taobaoGoodsInfo.seller.shopName}}</div>
                                <div class="shop-title">
                                    <img :src="taobaoGoodsInfo.seller.certIcon" style="width: 14px;"
                                         v-if="taobaoGoodsInfo.seller.isShowCertIcon">
                                    <img :src="taobaoGoodsInfo.seller.creditLevelIcon"
                                         :style="{width:taobaoGoodsInfo.seller.shopType==='C'?'66px':'28px'}">
                                    <img :src="taobaoGoodsInfo.seller.brandIcon"
                                         style="width: 88px;margin-left: 5px;"
                                         v-if="taobaoGoodsInfo.seller.brandIcon">
                                </div>
                            </div>
                        </div>
                        <div class="score">
                            <div :key="evaluateIndex"
                                 class="score-item"
                                 v-for="(evaluate,evaluateIndex) in taobaoGoodsInfo.seller.evaluates">
                                {{evaluate.title}}&nbsp;
                                <span :style="{ color: evaluate.levelTextColor }">{{evaluate.score}}</span>&nbsp;
                                <div :style="{color: evaluate.levelTextColor ,
        backgroundColor:evaluate.levelBackgroundColor}"
                                     class="score-result">
                                    {{evaluate.levelText}}
                                </div>
                            </div>
                        </div>
                    </van-cell>
                </van-cell-group>
            </div>
            <!--图文详情-->
            <div class="detail-desc" id="detail">
                <!--占位符-->
                <divide-bar text="详情"></divide-bar>
                <img :key="descIndex" :src="descImg" class="desc-img img-background"
                     lazy-load="true" mode="widthFix" v-for="(descImg,descIndex) in descList">
            </div>
            <!--相似推荐-->
            <div id="recommend">
                <!--占位符-->
                <divide-bar text="推荐"></divide-bar>
                <goods-list-card :goods-list="recommendGoodsList" :isLoad="false" @click="onClickRecommend">
                </goods-list-card>
            </div>
            <!--优惠券弹框-->
            <tao-bao-dialog :dialog-type="'coupons'"
                            :params="haodankuGoodsInfo"
                            @getCoupon="onCopyTPwd"
                            v-if="coupon.price>0"
                            v-model="showCouponsDialog"></tao-bao-dialog>
            <!--服务弹框-->
            <tao-bao-dialog :dialog-type="'service'"
                            :params="taobaoGoodsInfo.apiStack.consumerProtection.items"
                            v-model="showServiceDialog"></tao-bao-dialog>
            <!--参数弹框-->
            <tao-bao-dialog :dialog-type="'params'"
                            :params="taobaoGoodsInfo.props.groupProps[0].基本信息"
                            v-model="showParamsDialog"></tao-bao-dialog>
            <!--sku弹框-->
            <tao-bao-dialog :dialog-type="'sku'"
                            :params="skuParams"
                            @changeSkuText="onChangeSkuText"
                            v-model="showSkuDialog"></tao-bao-dialog>
        </div>
        <content-placeholders v-else>
            <content-placeholders-img :custom-style="'height: 375px;'"></content-placeholders-img>
            <content-placeholders-text :custom-style="'margin:15px 10px 0 10px;'"
                                       :lines="10"></content-placeholders-text>
        </content-placeholders>
        <!-- 底部购买 -->
        <bottom-bar :favorActive="favor"
                    @clickShop="onClickShop"
                    @copyTPwd="onCopyTPwd"
                    @toggleGoodsFavor="toggleGoodsFavor">
        </bottom-bar>
    </div>
</template>

<script>
import BottomBar from '@/components/bottom-bar'
import TaoBaoDialog from '@/components/taobao-dialog'
import Api from '@/config/api'
import Constants from '@/config/constants'
import NavWrap from '@/components/nav-wrap'
import GoodsListCard from '@/components/goods-list-card'
import ContentPlaceholders from '@/components/placeholder/ContentPlaceholders'
import ContentPlaceholdersText from '@/components/placeholder/ContentPlaceholdersText'
import ContentPlaceholdersImg from '@/components/placeholder/ContentPlaceholdersImg'
import DivideBar from '@/components/divide-bar'
import TaoBaoPwdDialog from '@/components/taobao-pwd-dialog'

const dataArr = []

export default {
    components: {
        GoodsListCard,
        NavWrap,
        TaoBaoDialog,
        BottomBar,
        ContentPlaceholders,
        ContentPlaceholdersText,
        ContentPlaceholdersImg,
        DivideBar,
        TaoBaoPwdDialog
    },
    data() {
        return {
            // 商品id
            id: '',
            favor: false,
            // 栏位高度
            dividerHeight: 32,
            // 滚动位置
            scrollTop: 0,
            // 当前所在滑块的 index
            currentSwiperIndex: 0,
            // 导航序号
            activeTab: 0,
            // 导航透明度
            navOpacity: 0,
            // sku弹框
            showSkuDialog: false,
            // 服务弹框
            showCouponsDialog: false,
            // 服务弹框
            showServiceDialog: false,
            // 参数弹框
            showParamsDialog: false,
            // 轮播图
            picList: [],
            // 图文详情
            descList: null,
            // 优惠券
            coupon: {},
            // 好单库
            haodankuGoodsInfo: {
                itemprice: 0,
                itemendprice: 0,
                activity_type: ''
            },
            // 淘宝H5
            taobaoGoodsInfo: {
                propsCut: '',
                seller: {
                    evaluates: [{
                        levelTextColor: '',
                        score: '',
                        levelBackgroundColor: '',
                        levelText: ''
                    }],
                    shopName: '',
                    shopIcon: '',
                    sellerType: '',
                    shopType: '',
                    isShowCertIcon: '',
                    certIcon: '',
                    creditLevelIcon: '',
                    brandIcon: ''
                },
                item: {
                    title: ''
                },
                skuBase: {
                    props: ''
                },
                apiStack: {
                    consumerProtection: {
                        items: ''
                    },
                    item: {
                        sellCount: 0
                    },
                    resource: {
                        bigPromotion: {
                            bgPicUrl: '',
                            picUrl: '',
                            memo: [
                                {
                                    text: ''
                                }
                            ]
                        }
                    },
                    price: {
                        price: {
                            priceText: ''
                        }
                    },
                    skuCore: {
                        sku2info: [
                            { quantity: '' }
                        ]
                    },
                    delivery: {
                        postage: '',
                        from: ''
                    }
                },
                props: {
                    groupProps: [
                        { 基本信息: '' }
                    ]
                }
            },
            // 淘口令及高佣
            couponsConvert: { t_pwd: '' },
            // 推荐商品
            recommendGoodsList: [],
            // 禁止滚动
            disableScroll: false
        }
    },
    onLoad(option) {
        Object.assign(this.$data, this.$options.data())
        // 商品id
        this.id = option.id
        this.$toast.loading()
        let apiArray = [
            this.getCoupon(),
            this.getH5GoodsInfo(),
            this.getH5GoodsDesc(),
            this.listRecommendGoods()
        ]
        if (this.$validator.isNotEmpty(this.sessionKey)) {
            apiArray.push(this.getGoodsFavor())
        }
        Promise.all(apiArray).then(() => {
            this.showRefresh = false
            this.$toast.clear()
        }).catch(() => {
            this.$toast.clear()
            this.$dialog.alert({
                title: '出了点问题',
                content: '商品不存在或已失效',
                confirmText: '返回'
            }).then(() => {
                this.goBack()
            })
        })
    },
    onUnload() {
        const dataNum = dataArr.length
        if (!dataNum) return
        Object.assign(this.$data, dataArr[dataNum - 1])
        dataArr.pop()
    },
    onPageScroll(e) {
        this.dynamicNav(e.scrollTop)
        this.dynamicTab()
    },
    onShareAppMessage(res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: this.taobaoGoodsInfo.item.title,
            imageUrl: this.coupon.pic || this.picList[0]
        }
    },
    methods: {
        onClickShop() {
            this.setShop(this.taobaoGoodsInfo.seller)
            this.navigateToListShop()
        },
        dynamicNav(scrollTop) {
            this.scrollTop = scrollTop
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
        dynamicTab() {
            const query = this.$wx.context.createSelectorQuery()
            query.select('#detail').boundingClientRect()
            query.select('#recommend').boundingClientRect()
            query.exec(res => {
                if (res[0].top > this.navHeight) {
                    this.activeTab = 0
                } else if (res[1].top > this.navHeight) {
                    this.activeTab = 1
                } else {
                    this.activeTab = 2
                }
            })
        },
        onClickTab(e) {
            this.activeTab = e.mp.detail.index
            let nodeName
            if (this.activeTab === 0) {
                this.$wx.context.pageScrollTo({
                    scrollTop: 0,
                    duration: 300
                })
            } else {
                if (this.activeTab === 1) {
                    nodeName = '#detail'
                } else {
                    nodeName = '#recommend'
                }
                const query = this.$wx.context.createSelectorQuery()
                query
                    .select(nodeName)
                    .boundingClientRect(res => {
                        this.$wx.context.pageScrollTo({
                            scrollTop:
                                    this.scrollTop +
                                    res.top -
                                    this.navHeight +
                                    this.dividerHeight,
                            duration: 300
                        })
                    })
                    .exec()
            }
        },
        onChangeSkuText(skuText) {
            this.taobaoGoodsInfo.item.skuText = skuText
        },
        onChangeSwiper(event) {
            this.currentSwiperIndex = event.mp.detail.current
        },
        onClickRecommend(id) {
            dataArr.push({ ...this.$data })
            this.navigateToDetail({
                id: id
            })
        },
        chooseSku(event) {
            // event.target.className='sel';
        },
        alertNoCoupon() {
            this.$dialog.alert({
                title: '此商品没有参与推广哦',
                content: '不要气馁，再试试别的商品~'
            })
        },
        async onCopyTPwd() {
            let that = this
            if (!that.couponsConvert.t_pwd) {
                this.$toast.loading('口令生成中…')
                let isFail = await this.getTPwd().catch(() => {
                    this.$toast.clear()
                    this.alertNoCoupon()
                    return true
                })
                if (isFail) return
            }
            this.$wx.context
                .setClipboardData({
                    data: that.couponsConvert.t_pwd
                })
                .then(() => {
                    that.$dialog.alert({
                        title: '复制成功',
                        content: '打开手机淘宝即可领券购买哦',
                        confirmText: '我知道了'
                    })
                })
                .catch(() => {
                    that.$toast.fail('复制失败')
                })
        },
        showLarge(startPosition) {
            this.$wx.context.previewImage({
                urls: this.picList,
                current: this.picList[startPosition]
            })
        },
        async getCoupon() {
            await this.$ajax
                .get(Api.haodanku.goodsKeyword, {
                    keyword: this.id,
                    back: 1
                })
                .then(response => {
                    this.coupon = {
                        price: response.data.list.couponmoney,
                        desc: response.data.list.itemdesc,
                        pic: response.data.list.itempic,
                        couponexplain: response.data.list.couponexplain
                    }
                    this.haodankuGoodsInfo = response.data.list
                    if (this.coupon.pic) {
                        // 浏览历史
                        this.addGoodsFavor(Constants.GOODS_FAVOR.TYPE_HISTORY)
                    }
                })
        },
        async getH5GoodsInfo() {
            await this.$ajax
                .get(Api.taobao.goodsInfo, {
                    id: this.id
                })
                .then(response => {
                    this.taobaoGoodsInfo = response.data
                    this.picList = this.taobaoGoodsInfo.item.images
                    this.picList.forEach((pic, index) => {
                        if (pic.indexOf('http') === -1) {
                            this.picList.splice(index, 1, 'https:' + pic)
                        }
                    })
                })
        },
        async getH5GoodsDesc() {
            await this.$ajax
                .get(Api.taobao.goodsDesc, {
                    id: this.id
                })
                .then(response => {
                    this.descList = response.data
                    this.descList.push(
                        '//gw.alicdn.com/tfs/TB1Yo1Js3mTBuNjy1XbXXaMrVXa-1125-960.png'
                    )
                })
        },
        async getTPwd() {
            await this.$ajax
                .get(Api.haodanku.goodsConvert, {
                    id: this.id,
                    text: this.taobaoGoodsInfo.item.title,
                    logo: this.picList[0]
                })
                .then(response => {
                    this.couponsConvert = response.data
                })
        },
        async listRecommendGoods() {
            await this.$ajax
                .get(Api.haodanku.recommendGoods, {
                    id: this.id
                })
                .then(response => {
                    this.recommendGoodsList = response.data
                })
        },
        afterCouponPrice(originalPrice = 0, couponPrice = 0) {
            let prices = originalPrice.split('-')
            couponPrice = couponPrice || 0
            let afterCouponPrice =
                    Number(prices[0] * 100 - couponPrice * 100).toFixed() / 100
            if (prices.length > 1) {
                afterCouponPrice += '-'
                afterCouponPrice +=
                        Number(prices[1] * 100 - couponPrice * 100).toFixed() / 100
            }
            return afterCouponPrice
        },
        async getGoodsFavor() {
            await this.$ajax.get(Api.goods.favor, {
                openId: this.sessionKey,
                itemId: this.id,
                type: Constants.GOODS_FAVOR.TYPE_FAVOR
            }).then((res) => {
                this.favor = res.data
            })
        },
        toggleGoodsFavor() {
            if (!this.coupon.pic) {
                this.alertNoCoupon()
                return
            }
            this.initUserInfo().then(() => {
                if (this.favor) {
                    this.$ajax.delete(Api.goods.favor, null, {
                        params: {
                            openId: this.sessionKey,
                            itemId: this.id,
                            type: Constants.GOODS_FAVOR.TYPE_FAVOR
                        }
                    }).then(() => {
                        this.favor = !this.favor
                        this.$toast.success('取消收藏成功')
                    })
                } else {
                    this.addGoodsFavor(Constants.GOODS_FAVOR.TYPE_FAVOR)
                        .then(() => {
                            this.favor = !this.favor
                            this.$toast.success('收藏成功')
                        })
                }
            }).catch(() => {
                this.navigateToLogin()
            }
            )
        },
        async addGoodsFavor(type) {
            if (this.$validator.isNotEmpty(this.sessionKey)) {
                await this.$ajax.put(Api.goods.favor, {
                    ...this.goodsFavor,
                    type: type
                }, {
                    params: { openId: this.sessionKey }
                })
            }
        }
    },
    computed: {
        goodsFavor() {
            return {
                itemId: this.haodankuGoodsInfo.itemid,
                itemPic: this.haodankuGoodsInfo.itempic,
                shopType: this.haodankuGoodsInfo.shoptype,
                itemTitle: this.haodankuGoodsInfo.itemtitle,
                activityType: this.haodankuGoodsInfo.activity_type,
                itemDesc: this.haodankuGoodsInfo.itemdesc,
                couponMoney: this.haodankuGoodsInfo.couponmoney,
                itemPrice: this.haodankuGoodsInfo.itemprice,
                itemEndPrice: this.haodankuGoodsInfo.itemendprice,
                itemSale: this.haodankuGoodsInfo.itemsale
            }
        },
        firstNavStyle() {
            return this.navOpacity === 1
                ? 'display:none;'
                : `opacity:${1 - this.navOpacity}`
        },
        secondNavStyle() {
            return this.navOpacity === 0
                ? 'display:none;'
                : `opacity:${this.navOpacity}`
        },
        skuParams() {
            return {
                mainPic: this.coupon.pic || this.picList[0],
                newPrice: this.newPrice,
                quantity: this.taobaoGoodsInfo.apiStack.skuCore
                    .sku2info[0].quantity,
                skuText: this.taobaoGoodsInfo.item.skuText,
                props: this.taobaoGoodsInfo.skuBase.props,
                skus: this.taobaoGoodsInfo.skuBase.skus,
                skuInfo: this.taobaoGoodsInfo.apiStack.skuCore
                    .sku2info,
                couponPrice: this.coupon.price
            }
        },
        showBanner() {
            return this.taobaoGoodsInfo.seller.shopType === 'C' &&
                    this.$validator.isNotEmptyObj(this.taobaoGoodsInfo.apiStack.resource.bigPromotion) &&
                    this.$validator.isNotEmpty(this.taobaoGoodsInfo.apiStack.resource.bigPromotion.picUrl)
        },
        newPrice() {
            return this.afterCouponPrice(
                this.taobaoGoodsInfo.apiStack.price.price.priceText,
                this.coupon.price
            )
        }
    }
}
</script>

<style lang="less" scoped>
    .banner {
        margin-top: 15px;
        display: flex;
        overflow: hidden;
        width: 100%;
        height: 48px;

        > div {
            display: flex;
            overflow: hidden;
            width: auto;
            height: auto;
            font-size: 13px;
            place-self: center flex-start;
            margin-left: 15px;
            max-width: 240px;
            justify-content: flex-start;
            align-items: center;

            > span {
                text-overflow: ellipsis;
                overflow: hidden;
                line-height: 15.6px;
                white-space: nowrap;
            }
        }

        > img {
            display: flex;
            overflow: hidden;
            width: 24px;
            height: 24px;
            margin-left: 12px;
            margin-top: 12px;
        }
    }

    .nav-icon {
        width: 30px;
        font-size: 20px;
    }

    .goods {
        background-color: #f8f8f8;
        padding-bottom: 50px;

        .detail-desc {
            .desc-img {
                display: block;
                width: 100%;
                height: unset;
            }
        }

        &-swipe {
            height: 375px;

            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }

        &-title {
            text-align: left;
            font-size: 15px;
            line-height: 20.4px;
            color: rgb(51, 51, 51);
            font-weight: bold;
        }

        &-desc {
            text-align: left;
            font-size: 12px;
            color: gray;
            line-height: 18px;
        }

        &-price {
            color: gray;
            font-size: small;
        }

        &-price-after-coupons {
            color: #f44;
            font-size: large;
        }

        &-express {
            color: #999;
            font-size: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &-cell-group {
            margin: 15px 0;

            .van-cell__value {
                color: #999;
            }
        }
    }

    .van-cell__title {
        display: flex;
    }

    .shop-main {
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
            padding: 5px 10px;
            line-height: 18px;
            display: block;
            text-align: left;

            .shop-name {
                color: #333;
                font-size: 16px;
                text-overflow: ellipsis;
                overflow: hidden;
                word-break: break-all;
            }

            .shop-title {
                font-size: 12px;
                color: #051b28;
                margin-top: 5px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;

                img {
                    height: 12px;
                    width: auto;
                }
            }
        }
    }

    .score {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        color: #999;
        font-size: 12px;
        margin: 12px 0 0;

        &-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &-result {
            width: 16px;
            height: 16px;
            border-radius: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .main-price-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;

        .o-t-price {
            &:before {
                content: "\FFE5";
                display: inline-block;
                font-size: 16px;
            }

            color: #ff5000;
            font-size: 20px;
            margin-right: 5px;
        }

        .t-tag {
            display: flex;
            align-items: center;
            height: 14px;
            background-color: #fff1eb;
            border-radius: 20px;
            padding: 2px 4px;
            margin: 0 2px;
            font-size: 9px;
            line-height: 1;
            color: #ff5000;
        }

        .t-icon {
            margin-bottom: 7px;
            display: flex;
            align-items: center;
            padding: 2px 4px 0 4px;
            background-color: transparent;
            margin-right: 4px;
            height: 14px;
        }

        .icon-share {
            position: relative;
            margin-left: auto;
            font-size: 18px;
        }
    }

    .original-price {
        text-align: left;
        font-size: 10px;
        color: #999;

        > span {
            text-decoration: line-through;
        }
    }

    .t-cell {
        display: flex;
        align-items: center;

        &-title {
            color: #999;
        }

        &-desc {
            width: 270px;
            color: #333;
            margin-left: 16px;
        }
    }
</style>
