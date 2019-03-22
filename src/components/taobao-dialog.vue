<template>
    <div>
        <div @click="close"
             class="dialog-wrapper"
             v-if="showDialog">
        </div>
        <div :class="['dialog',{'dialog-popup':showDialog}]">
            <template v-if="dialogType==='service'">
                <div class="dialog-title">基础服务</div>
                <div class="dialog-content">
                    <scroll-view class="dialog-base-info scroll-wrap" scroll-y>
                        <ul class="base-info-list">
                            <li :key="baseIndex" v-for="(base,baseIndex) in params">
                                <img class="info-icon"
                                     src="//gw.alicdn.com/tfs/TB1O4sFQpXXXXb3apXXXXXXXXXX-200-200.png">
                                <div class="info-title">{{base.title}}</div>
                                <div class="info-desc">{{base.desc}}</div>
                            </li>
                        </ul>
                        <!--<div class="other-title">其他</div>-->
                        <!--<ul class="base-info-list">-->
                        <!--<li v-for="(base,index) in service" v-if="index>=service.length-3">-->
                        <!--<img class="info-icon"-->
                        <!--src="//gw.alicdn.com/tfs/TB1O4sFQpXXXXb3apXXXXXXXXXX-200-200.png">-->
                        <!--<div class="info-title">{{base.title}}</div>-->
                        <!--<div class="info-desc">{{base.desc}}</div>-->
                        <!--</li>-->
                        <!--</ul>-->
                    </scroll-view>
                </div>
                <div class="dialog-button-group">
                    <div class="bottom-bar-btn">
                        <div @click="close">关闭</div>
                    </div>
                </div>
            </template>

            <template v-if="dialogType==='params'">
                <div class="dialog-title">产品参数</div>
                <div class="dialog-content">
                    <scroll-view class="scroll-wrap" scroll-y>
                        <ul class="product-param-list">
                            <li :key="paramIndex" v-for="(param,paramIndex) in params">
                                <template v-for="(val, key,keyIndex) in param">
                                    <div class="param-name">{{key}}</div>
                                    <div class="param-value">{{val}}</div>
                                </template>
                            </li>
                        </ul>
                    </scroll-view>
                </div>
                <div class="dialog-button-group">
                    <div class="bottom-bar-btn">
                        <div @click="close">关闭</div>
                    </div>
                </div>
            </template>

            <template v-if="dialogType==='coupons'">
                <div class="dialog-title">优惠</div>
                <div class="dialog-content">
                    <div class="dialog-coupon">
                        <div class="coupon-tb-page">
                            <!--<div class="title">店铺红包</div>-->
                            <!--<div class="c-coupon">-->
                            <!--<div class="coupon-main dec-redpacket">-->
                            <!--<div class="detail">-->
                            <!--<div class="main"><span class="unit">￥</span><span-->
                            <!--class="value">5</span><img class="promotion-image"-->
                            <!--src="//img.alicdn.com/tps/TB1SnU.OXXXXXcdXFXXXXXXXXXX-303-54.png">-->
                            <!--</div>-->
                            <!--<div class="rule rule-0">订单金额满5.01可使用</div>-->
                            <!--<div class="rule rule-1">有效期2018.08.21-2018.08.23</div>-->
                            <!--</div>-->
                            <!--<div class="divider">-->
                            <!--<div class="dash"></div>-->
                            <!--</div>-->
                            <!--<div class="op ">-->
                            <!--<div class="apply">立即领取</div>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--</div>-->

                            <!--<div class="title">店铺优惠券</div>-->
                            <div class="c-coupon">
                                <div @click="$emit('getCoupon')" class="coupon-main dec-sawtooth">
                                    <div class="detail">
                                        <div class="main">
                                            <span class="unit">￥</span>
                                            <span class="value">{{params.couponmoney}}</span>
                                        </div>
                                        <div class="rule rule-0">订单金额{{params.couponexplain}}</div>
                                        <div class="rule rule-1">
                                            有效期{{couponsActiveTime}}
                                        </div>
                                    </div>
                                    <div class="divider">
                                        <div class="dash"></div>
                                    </div>
                                    <div class="op">
                                        <div class="apply">立即领取</div>
                                        <div class="count"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dialog-button-group">
                    <div class="bottom-bar-btn">
                        <div @click="close">关闭</div>
                    </div>
                </div>
            </template>

            <template v-if="dialogType==='sku'">
                <!--<div  class="dialog-title">内部优惠券</div>-->
                <div class="dialog-content">
                    <div class="dialog-xsku">
                        <div class="ctrl-ui-sku">
                            <div class="sku-pro">
                                <div>
                                    <div class="sku-img">
                                        <p><img :src="sku.pic"></p>
                                    </div>
                                    <div class="sku-pro-info">
                                        <div>
                                            <p class="h">￥{{sku.price}}</p>
                                            <p class="quantity">库存:{{sku.quantity}}</p>
                                            <p class="sku-txt">
                                                <span class="c-sku"></span>
                                                <span class="unc-sku">{{sku.skuText}}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <i @click="close"
                                       class="sku-closed taobao-iconfont iconfont icon-roundclose"></i>
                                </div>
                            </div>
                            <div class="sku-info">
                                <scroll-view class="scroll-wrap" scroll-y>
                                    <div>
                                        <div class="sku-box" v-for="(sku,skuIndex) in params.props">
                                            <h2 class="h2">{{sku.name}}</h2>
                                            <ul class="ul">
                                                <li :class="[{'sel':valueIndex===sku.activeValueIndex}]" :key="valueIndex"
                                                    @click="onClickSku(skuIndex,valueIndex)"
                                                    class="li normal"
                                                    v-for="(value,valueIndex) in sku.values"
                                                >{{value.name}}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </scroll-view>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dialog-button-group">
                    <div class="bottom-bar-btn">
                        <div @click="close">关闭</div>
                    </div>
                </div>
            </template>

            <template v-if="dialogType==='goods'">
                <div class="dialog-title">文中相关商品</div>
                <div class="dialog-content">
                    <scroll-view class="scroll-wrap" scroll-y>
                        <div>
                            <goods-list :custom-class="'background-white'"
                                        :goods-list="params"
                                        :isLoad="isLoading"
                            >
                            </goods-list>
                        </div>
                    </scroll-view>
                </div>
                <div class="dialog-button-group">
                    <div class="bottom-bar-btn">
                        <div @click="close">关闭</div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import GoodsList from '@/components/goods-list'

export default {
    components: { GoodsList },
    data() {
        return {
            showDialog: this.value,
            sku: {
                pic: '',
                price: '',
                quantity: '',
                skuText: ''
            }
        }
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        dialogType: {
            type: String,
            default: 'service'
        },
        params: {
            default() {
                return []
            }
        },
        isLoading: {
            type: Boolean,
            default: true
        }
    },
    watch: {
        showDialog(val) {
            this.$emit('input', val)
        },
        value(val) {
            this.showDialog = val
        }
    },
    methods: {
        onClickSku(skuIndex, valueIndex) {
            let prop = this.params.props[skuIndex]
            if (prop.activeValueIndex === valueIndex) {
                prop.activeValueIndex = -1
                this.sku.price = this.params.newPrice
                this.sku.quantity = this.params.quantity
            } else {
                prop.activeValueIndex = valueIndex
            }
            let propPath = ''
            let skuChecked = 0
            let skuText = '已选：'
            let notCheckedSkuText = ''
            this.params.props.forEach(item => {
                if (typeof item.activeValueIndex === 'number' &&
                    item.activeValueIndex > -1) {
                    skuText += `${item.values[item.activeValueIndex].name} `
                    propPath += `${item.pid}:${item.values[item.activeValueIndex].vid};`
                    skuChecked++
                } else {
                    notCheckedSkuText += `${item.name} `
                }
            })
            if (skuChecked === this.params.props.length) {
                // 已全部选择
                this.sku.skuText = skuText
                propPath = propPath.substr(0, propPath.length - 1)
                this.params.skus.forEach(sku => {
                    if (sku.propPath === propPath) {
                        let skuId = sku.skuId
                        this.sku.quantity = this.params.skuInfo[skuId].quantity
                        this.sku.price = Number(this.params.skuInfo[skuId].price.priceText * 100 - this.params.couponPrice * 100).toFixed() / 100
                    }
                })
            } else {
                if (skuChecked === 0) {
                    this.sku.skuText = this.params.skuText
                } else {
                    this.sku.skuText = `请选择 ${notCheckedSkuText}`
                }
            }
            // 设置sku图片
            if (prop.values[valueIndex].image) {
                this.sku.pic = prop.activeValueIndex > -1 ? prop.values[valueIndex].image : this.params.mainPic
            }
            this.$emit('changeSkuText', this.sku.skuText)
        },
        close() {
            this.showDialog = false
        },
        onClickGoods(item) {
            this.navigateToDetail({
                id: item.id
            })
        }
    },
    computed: {
        couponsActiveTime() {
            return this.$formatter.formatTime(this.params.couponstarttime * 1000, 'yyyy-MM-dd') +
                '-' +
                this.$formatter.formatTime(this.params.couponendtime * 1000, 'yyyy-MM-dd')
        }
    },
    onLoad() {
        if (this.dialogType === 'sku') {
            this.sku = {
                pic: this.params.mainPic,
                price: this.params.newPrice,
                quantity: this.params.quantity,
                skuText: this.params.skuText
            }
        }
    }
}
</script>

<style lang="less" scoped>
    @import "../assets/style/color";

    .dialog-wrapper {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        display: block;
        top: 0;
        z-index: 1000;
        background-color: rgba(0, 0, 0, 0.7);
    }

    .dialog {
        display: flex;
        flex-direction: column;
        position: fixed;
        z-index: 2000;
        bottom: 0;
        width: 100%;
        height: 83%;
        transition: 0.3s transform;
        transform: translateY(100%);
        background-color: #fff;
        color: #333;
        font-size: 15px;
        border-radius: 10px 10px 0 0;

        &.dialog-popup {
            transform: translateY(0);
        }

        .dialog-title {
            display: flex;
            justify-content: center;
            height: 60px;
            line-height: 60px;
        }

        .dialog-content {
            display: flex;
            flex: 1;
            padding: 0 10px;
            overflow: hidden;

            .dialog-base-info {
                width: 100%;
                padding-left: 5px;

                ul {
                    list-style: none;
                }

                li {
                    display: flex;
                    flex-wrap: wrap;
                    flex-direction: row;
                    align-items: center;
                    padding: 10px 0;

                    .info-icon {
                        width: 15px;
                        height: 15px;
                    }

                    .info-title {
                        width: 90%;
                        font-size: 14px;
                        color: #999;
                        padding-left: 15px;
                    }

                    .info-desc {
                        color: #999;
                        font-size: 12px;
                        margin-top: 5px;
                        padding-left: 30px;
                    }
                }

                .other-title {
                    text-align: center;
                    margin-top: 10px;
                    padding: 20px 0;
                }
            }

        }

        .dialog-button-group {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fff;
            padding: 10px;
            box-sizing: border-box;
        }
    }

    .scroll-wrap {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .product-param-list {
        flex: 1;

        li {
            :first-child {
                padding-top: 0;
            }

            display: flex;
            flex-direction: row;
            padding: 10px 0;

            .param-name {
                width: 27%;
                color: #999;
            }

            .param-value {
                width: 73%;
                padding-left: 15px;
                word-break: break-word;
            }
        }
    }

    .dialog-coupon {
        display: flex;
        flex: 1;
        flex-direction: column;
        width: 100%;

        .coupon-tb-page {
            padding: 5px 10px;
            position: relative;

            .title {
                margin: 18.93px 0 13.25px;
                text-align: center;
                color: #051b28;
                font-size: 12.31px;
                line-height: 13.25px;
            }

            .c-coupon {
                margin: 11.36px 0;

                .coupon-main {
                    display: flex;
                    justify-content: flex-start;
                    align-items: stretch;
                    flex-direction: row;
                    color: #fff;
                    font-size: 11.36px;
                    height: 82.36px;
                    overflow: hidden;
                    position: relative;

                    &.dec-redpacket {
                        border-radius: 3.786785px;
                        background-color: rgb(252, 58, 52);
                        color: rgb(255, 243, 177);

                        .op {
                            position: relative;

                            &:before {
                                content: "";
                                width: 128.7px;
                                height: 128.7px;
                                background: #e1322e;
                                position: absolute;
                                top: -16.32px;
                                right: -74.8px;
                                border-radius: 50%;
                            }
                        }
                    }

                    &.dec-sawtooth {
                        background-color: rgb(242, 175, 45);
                        color: rgb(255, 255, 255);
                        /* 相对定位，方便让before和after伪元素绝对定位偏移 */
                        position: relative;
                        /* 把超出div的部分隐藏起来 */
                        overflow: hidden;

                        &:before, &:after {
                            content: '';
                            width: 0;
                            height: 100%;
                            /* 绝对定位进行偏移 */
                            position: absolute;
                            top: 5px;
                        }

                        &:before {
                            /* 圆点型的border */
                            border-right: 5px dotted white;
                            /* 偏移一个半径，让圆点的一半覆盖div */
                            left: -2.5px;
                        }

                        &:after {
                            /* 圆点型的border */
                            border-left: 5px dotted white;
                            /* 偏移一个半径，让圆点的一半覆盖div */
                            right: -2.5px;
                        }
                    }

                    .detail {
                        width: 70%;
                        padding: 13.253215px;
                        white-space: nowrap;
                        position: relative;

                        .main {
                            height: 27.453215px;
                            line-height: 27.453215px;
                            -webkit-transform: scale(.83);
                            -webkit-transform-origin: 0 0;

                            .unit {
                                font-size: 22px;
                            }

                            .value {
                                font-size: 32.2px;
                                margin-right: 1.9px;
                            }

                            .promotion-image {
                                height: 15px;
                                margin-left: 2.84px;
                            }
                        }

                        .rule {
                            -webkit-transform: scale(.83);
                            -webkit-transform-origin: 0 0;
                        }

                        .rule-0 {
                            opacity: 1;
                            margin-top: 4.7px;
                        }
                    }

                    .divider {
                        width: 13.3px;
                        position: relative;

                        .dash {
                            border-color: rgb(255, 255, 255);
                            height: 100%;
                            width: 6.6px;
                            position: absolute;
                            left: 0;
                            border-right: 1px dashed #fff;
                        }
                    }

                    .op {
                        width: 25%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        text-align: center;

                        .apply {
                            position: relative;
                            font-size: 14px;
                            margin: 1.7px 0;
                        }
                    }
                }
            }
        }
    }

    .dialog-xsku {
        width: 100%;

        .ctrl-ui-sku {
            display: flex;
            height: 100%;
            flex-direction: column;
            font-size: 13px;
            padding: 10px 0;
            color: #333;

            .sku-pro {
                padding-bottom: 16px;
                /*border-bottom: 0.5px solid #f2f2f2;*/

                > div {
                    display: flex;
                    flex-direction: row;
                    align-items: flex-end;

                    .sku-img {
                        font-size: 0;

                        img {
                            width: 110px;
                            height: 110px;
                        }
                    }

                    .sku-pro-info {
                        margin-left: 10px;

                        .sku-title {
                            display: none;
                        }

                        .h {
                            color: #ff5000;
                            font-size: 18px;
                        }

                        .quantity, .sku-txt {
                            font-size: 12px;
                        }
                    }

                    .sku-closed {
                        font-style: normal;
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        font-size: 24px;
                        color: #999;
                        cursor: pointer;
                    }
                }
            }

            .sku-info {
                flex: 1;
                overflow: auto;

                .sku-box {
                    margin-top: 20px;
                    border-top: 0.5px solid #f2f2f2;

                    &:first-child {
                        border-top: 0;
                        margin-top: 0;
                    }

                    .h2 {
                        font-size: 15px;
                        font-weight: normal;
                        padding: 12.5px 0;
                    }

                    .ul {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;

                        .li {
                            border-radius: 20px;
                            padding: 8px 14.5px;
                            font-size: 12px;
                            margin-right: 14px;
                            margin-bottom: 10px;

                            &.normal {
                                background-color: #F8F8F8;
                                white-space: nowrap;
                            }

                            &.sel {
                                color: #fff;
                                background-image: linear-gradient(to right, @theme-color, @accent-color);
                            }
                        }
                    }
                }
            }

            .sku-quantity {
                display: flex;
                flex-direction: row;
                align-items: center;

                h2 {
                    flex: 2;
                }

                .btn-minus, .btn-plus {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 32.5px;
                    height: 32.5px;
                    background-color: #f6f6f6;
                    font-style: normal;
                    position: relative;
                }

                .btn-input {
                    width: 40px;
                    height: 32.5px;
                    margin: 0 2px;
                    position: relative;

                    input {
                        font-size: 14px;
                        background-color: #f6f6f6;
                        border: 0;
                        width: 40px;
                        height: 32.5px;
                        text-align: center;
                    }
                }
            }
        }
    }
</style>
