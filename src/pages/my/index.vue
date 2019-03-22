<template>
    <div class="background-body" v-show="value===3">

        <div class="background-white" style="height: 295px;">
            <div :class="['swipe-bg']"
                 :style="{backgroundImage:userBackground}"></div>
            <div :style="{marginTop:'-200px'}" class="user-poster">
                <div @click="onInitUserInfo" class="user-info">
                    <img
                        :src="userInfo.avatarUrl"
                        class="head-img"
                        v-if="userInfo.avatarUrl"
                    />
                    <div class="head-img" v-else>
                        <i
                            :class="['taobao-iconfont iconfont icon-my']"
                            slot="icon"
                        ></i>
                    </div>
                    <div class="nickname">
                        {{ userInfo.nickName ? userInfo.nickName : '未登录' }}
                    </div>
                </div>
            </div>
        </div>

        <!-- <van-row class="user-links"> -->
        <!-- <van-col span="6"> -->
        <!-- <van-icon name="pending-payment"/> -->
        <!-- 待付款 -->
        <!-- </van-col> -->
        <!-- <van-col span="6"> -->
        <!-- <van-icon name="pending-orders"/> -->
        <!-- 待接单 -->
        <!-- </van-col> -->
        <!-- <van-col span="6"> -->
        <!-- <van-icon name="pending-deliver"/> -->
        <!-- 待发货 -->
        <!-- </van-col> -->
        <!-- <van-col span="6"> -->
        <!-- <van-icon name="logistics"/> -->
        <!-- 待发货 -->
        <!-- </van-col> -->
        <!-- </van-row> -->

        <div>
            <div class="goods-cell-group">
                <van-cell-group :border="false">
                    <van-cell @click="onClickFavor(goodsFavor.TYPE_FAVOR)" is-link>
                        <div slot="title">
                            <i
                                :class="[
                                'cell-icon taobao-iconfont iconfont icon-favor'
                            ]"
                            ></i>
                            <span class="van-cell-text">我的收藏</span>
                        </div>
                    </van-cell>
                    <van-cell :border="false" @click="onClickFavor(goodsFavor.TYPE_HISTORY)" is-link>
                        <div slot="title">
                            <i
                                :class="[
                                'cell-icon taobao-iconfont iconfont icon-footprint'
                            ]"
                            ></i>
                            <span class="van-cell-text">我的足迹</span>
                        </div>
                    </van-cell>
                </van-cell-group>
            </div>

            <div class="goods-cell-group">
                <van-cell-group :border="false">
                    <van-cell is-link>
                        <i
                            :class="[
                            'cell-icon taobao-iconfont iconfont icon-service'
                        ]"
                            slot="title"
                        ></i>
                        <span class="van-cell-text" slot="title">联系客服</span>
                        <button class="open-btn" open-type="contact"></button>
                    </van-cell>
                    <van-cell is-link>
                        <i
                            :class="[
                            'cell-icon taobao-iconfont iconfont icon-edit'
                        ]"
                            slot="title"
                        ></i>
                        <span class="van-cell-text" slot="title">意见反馈</span>
                        <button class="open-btn" open-type="feedback"></button>
                    </van-cell>
                    <van-cell :border="false" :value="system.VERSION">
                        <i
                            :class="[
                            'cell-icon taobao-iconfont iconfont icon-info'
                        ]"
                            slot="title"
                        ></i>
                        <span class="van-cell-text" slot="title">关于</span>
                    </van-cell>
                </van-cell-group>
            </div>
        </div>
    </div>
</template>

<script>
import Constants from '@/config/constants'

export default {
    props: {
        value: {
            type: Number,
            default: 3
        }
    },
    data() {
        return {
            system: Constants.SYSTEM,
            goodsFavor: Constants.GOODS_FAVOR
        }
    },
    methods: {
        async onInitUserInfo() {
            await this.initUserInfo().catch(() => {
                this.navigateToLogin()
                throw new Error('require login')
            }
            )
        },
        onClickFavor(type) {
            this.onInitUserInfo().then(() => {
                this.navigateToListFavor({
                    type: type
                })
            })
        }
    },
    computed: {
        userBackground() {
            return this.userInfo.avatarUrl
                ? `url("${this.userInfo.avatarUrl}")`
                : 'linear-gradient(to right, #7974F5, #ea8a9f);'
        }
    }
}
</script>

<style lang="less" scoped>
    @import "../../assets/style/color";

    .cell-icon {
        font-size: 18px;
        margin-right: 4px;
        display: inline-block;
    }

    .user {
        &-poster {
            position: relative;
            z-index: 99;
            width: 100%;
            height: 230px;
            display: flex;
            align-items: center;

            .user-info {
                padding: 0 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }

            .head-img {
                border-radius: 100%;
                width: 80px;
                height: 80px;
                background-color: white;
                display: flex;
                justify-content: center;
                align-items: center;

                .icon-my {
                    font-size: 42px;
                    color: gray;
                }
            }

            .nickname {
                margin-left: 10px;
                color: white;
            }
        }

        &-links {
            padding: 15px 0;
            font-size: 12px;
            text-align: center;
            background-color: #fff;

            .van-icon {
                display: block;
                font-size: 24px;
            }
        }
    }

    .goods-cell-group {
        &:first-child {
            margin: 0;
        }

        margin: 15px 0;
    }

    .line {
        margin: 0 auto;
        width: 100%;
        border-top: 1px solid #999;
        display: inline-block;
    }
</style>
