<template>
    <div :class="customClass" :style="customStyle">
        <!--加载占位符-->
        <content-placeholders :custom-style="'padding:10px;'"
                              v-if="showPlaceHolder">
            <content-placeholders-heading :custom-style="'margin-bottom:15px;'" :img="true"
                                          :key="n"
                                          v-for="n in 7"></content-placeholders-heading>
        </content-placeholders>
        <!--可滑动的商品列表-->
        <van-swipe-cell :key="index"
                        :right-width="rightWidth"
                        @close="onClose($event,goods.itemid,index)"
                        async-close
                        v-for="(goods, index) in goodsList"
                        v-if="!showPlaceHolder">
            <van-card :custom-class="customClass"
                      @click="onGoodsClick(goods.itemid)"
            >
                <img
                    :src="goods.itempic + '_310x310.jpg'"
                    class="van-card__img img-background"
                    lazy-load="true"
                    slot="thumb"
                />
                <div class="van-card__title van-multi-ellipsis--l2" slot="title">
                    <!--<van-tag custom-class="goods-tag background-tmall"-->
                    <!--v-if="goods.shoptype === 'B'&&!audit"-->
                    <!--&gt;天猫-->
                    <!--</van-tag>-->
                    <img src="../assets/img/tmall.png"
                         style=" height: 12px;width:28px;"
                         v-if="goods.shoptype === 'B'&&!audit">
                    {{ goods.itemtitle }}
                </div>
                <div class="activity-tag" slot="tags">
                    <van-tag custom-class="goods-tag"
                             plain
                             round
                             type="danger"
                             v-if="goods.activity_type === '淘抢购'&&!audit"
                    >淘抢购
                    </van-tag>
                    <van-tag custom-class="goods-tag"
                             plain
                             round
                             type="danger"
                             v-if="goods.activity_type === '聚划算'&&!audit"
                    >聚划算
                    </van-tag>
                    <van-tag custom-class="goods-tag color-orange"
                             plain
                             round
                             v-if="goods.itemdesc&&goods.itemdesc.indexOf('运费险') !== -1"
                    >运费险
                    </van-tag>
                    <van-tag class="goods-tag"
                             plain
                             round
                             type="danger"
                             v-if="goods.couponmoney > 0"
                    >
                        立减{{ goods.couponmoney }}
                    </van-tag>
                </div>
                <div class="foot-last" slot="tags">
                <span class="foot-label" v-show="goods.couponmoney > 0">
                    在售价:
                    <span class="o-t-price" style="color:#999;">
                        <span class="num">{{ goods.itemprice }}</span>
                    </span>
                </span>
                </div>
                <div class="foot-last" slot="tags">
                    <span class="foot-label">
                        <span v-show="goods.couponmoney > 0"> 折扣价: </span>
                        <span v-show="goods.couponmoney === '0'"> 在售价: </span>
                        <span class="o-t-price">
                            <span class="num">{{ goods.itemendprice }}</span>
                        </span>
                    </span>
                    <span class="foot-label">月销{{ goods.itemsale }}笔</span>
                </div>
            </van-card>
            <div :style="{width:rightWidth+'px'}" class="swipe-right" slot="right">
                删除
            </div>
        </van-swipe-cell>
        <!--占位符-->
        <divide-bar v-if="showText"></divide-bar>
        <!--空白提示-->
        <empty :emptyText="emptyText" v-if="isEmpty"></empty>
    </div>
</template>

<script>
import Empty from '@/components/empty'
import DivideBar from '@/components/divide-bar'
import ContentPlaceholders from '@/components/placeholder/ContentPlaceholders'
import ContentPlaceholdersHeading from '@/components/placeholder/ContentPlaceholdersHeading'

export default {
    props: {
        rightWidth: {
            type: Number,
            default: 0
        },
        goodsList: {
            type: Array,
            required: true
        },
        customClass: {
            default: '',
            type: String
        },
        customStyle: {
            default: '',
            type: String
        },
        isLoad: {
            default: true,
            type: Boolean
        },
        emptyText: {
            default: '当场好货还在精心挑选中~(｡･∀･)ﾉ',
            type: String
        }
    },
    components: { Empty, DivideBar, ContentPlaceholders, ContentPlaceholdersHeading },
    computed: {
        isEmpty() {
            return !this.isLoad && this.goodsList && this.goodsList.length < 1
        },
        showText() {
            return !this.isLoad && this.goodsList && this.goodsList.length > 1
        },
        showPlaceHolder() {
            return this.isLoad && (typeof this.goodsList === 'undefined' || this.goodsList == null || this.goodsList.length < 1)
        }
    },
    methods: {
        // 跳转详情页
        onGoodsClick(id) {
            this.$emit('click', id)
            this.navigateToDetail({
                id: id
            })
        },
        onClose(res, itemId, index) {
            this.$emit('close', {
                ...res.mp.detail,
                itemId,
                index
            })
        }
    }
}
</script>

<style lang="less" scoped>
    @import "../assets/style/goodslist";

    .swipe-right {
        color: #fff;
        font-size: 15px;
        width: 65px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f44;
    }
</style>
