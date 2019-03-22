<template>
    <div :class="customClass" :style="customStyle">
        <!--加载占位符-->
        <content-placeholders :custom-style="'padding:10px;'"
                              v-if="showPlaceHolder">
            <content-placeholders-heading :custom-style="'margin-bottom:15px;'" :img="true"
                                          :key="n"
                                          v-for="n in 7"></content-placeholders-heading>
        </content-placeholders>
        <!--卡片商品列表-->
        <div class="detail-recommend" v-if="!showPlaceHolder">
            <!--<div class="group-title">宝贝推荐</div>-->
            <ul class="item-list">
                <li :key="index" @click="onGoodsClick(goods.itemid)" class="item"
                    v-for="(goods,index) in goodsList">
                    <div>
                        <div class="item-pic-wrapper">
                            <img :src="goods.itempic+'_310x310.jpg'" class="item-pic img-background"
                                 lazy-load mode="widthFix">
                        </div>
                        <div class="item-base-info">
                            <h4 class="item-title">
                                <!--<van-tag custom-class="goods-tag background-tmall"-->
                                <!--v-if="goods.shoptype==='B'&&!audit">天猫-->
                                <!--</van-tag>-->
                                <img src="../assets/img/tmall.png"
                                     style=" height: 12px;width:28px;"
                                     v-if="goods.shoptype === 'B'&&!audit">
                                {{goods.itemtitle}}
                            </h4>
                            <div class="item-info activity-tag"
                                 style="justify-content: flex-start;align-items: center;">
                                <van-tag custom-class="goods-tag" plain round type="danger"
                                         v-if="goods.activity_type==='淘抢购'&&!audit">淘抢购
                                </van-tag>
                                <van-tag custom-class="goods-tag" plain round type="danger"
                                         v-if="goods.activity_type==='聚划算'&&!audit">聚划算
                                </van-tag>
                                <van-tag custom-class="goods-tag color-orange" plain
                                         round
                                         v-if="goods.itemdesc.indexOf('运费险')!==-1">运费险
                                </van-tag>
                                <van-tag class="goods-tag" plain round type="danger" v-if="goods.couponmoney>0">
                                    立减{{goods.couponmoney}}
                                </van-tag>
                            </div>
                            <div class="item-info">
                                <span class="item-price">¥ {{goods.itemendprice}}</span>
                                <span class="item-sold"
                                      style="text-decoration:line-through;">¥ {{goods.itemprice}}</span>
                                <span class="item-sold">{{goods.itemsale}}人已买</span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!--占位符-->
        <divide-bar v-if="showText"></divide-bar>
        <!--空白提示-->
        <empty :emptyText="emptyText" v-if="isEmpty">
        </empty>
    </div>

</template>

<script>
import Empty from '@/components/empty'
import DivideBar from '@/components/divide-bar'
import ContentPlaceholders from '@/components/placeholder/ContentPlaceholders'
import ContentPlaceholdersHeading from '@/components/placeholder/ContentPlaceholdersHeading'

export default {
    props: {
        goodsList: {
            required: true,
            type: Array
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
        }
    }
}
</script>

<style lang="less" scoped>
    @import url(../assets/style/color);

    .detail-recommend {
        .group-title {
            width: 100%;
            height: 28px;
            line-height: 28px;
            background-color: #fff;
            border-left: 5px solid #ff5000;
            padding-left: 8px;
            font-size: 14px;
        }

        .item-list {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 0 3%;

            .item {
                flex: 0 0 48.5%;
                box-sizing: border-box;
                margin-bottom: 10px;

                div {
                    background-color: #fff;
                    border-radius: 7px;

                    .item-pic-wrapper {
                        background-color: #fff;
                        max-width: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 7px 7px 0 0;

                        .item-pic {
                            width: 100%;
                            height: 100%;
                            border-radius: 7px 7px 0 0;
                        }
                    }

                    .item-base-info {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        padding: 8px 5px 8px 8px;
                        height: 80px;

                        .item-title {
                            font-size: 13px;
                            font-weight: normal;
                            text-align: justify;
                            height: 32px;
                            line-height: 16px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }

                        .item-info {
                            display: flex;
                            align-items: flex-end;
                            justify-content: space-between;

                            .item-price {
                                font-size: 14px;
                                color: #ff5000;
                            }

                            .item-sold {
                                font-size: 10px;
                                color: #999;
                            }
                        }
                    }
                }
            }
        }
    }

    .activity-tag {
        van-tag {
            margin-left: 5px;

            &:first-child {
                margin-left: 0;
            }
        }
    }

    .goods-tag {
        margin-right: 2px;
    }
</style>
