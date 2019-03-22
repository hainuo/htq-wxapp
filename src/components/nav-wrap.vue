<template>
    <div :class="customClass" :style="customStyle" class="nav-bar">
        <div
            :style="{
                    marginTop: marginTop + 'px',
                    paddingLeft: showBack ? 0 : '10px',
                    paddingRight: showRefresh ? 0 : '10px'
                }"
            class="main-nav"
        >
            <div @click="$emit('goBack')" class="btn" v-if="showBack">
                <div
                    :class="{ 'round-text-white': roundWhiteBack }"
                    class="text-cancel"
                >
                    <i class="taobao-iconfont iconfont icon-back"></i>
                </div>
            </div>
            <div class="content">
                <slot></slot>
            </div>
            <div @click="$emit('reload')" class="btn" v-if="showRefresh">
                <div
                    :class="{ 'round-text-white': roundWhiteBack }"
                    class="text-cancel"
                >
                    <i class="taobao-iconfont iconfont icon-refresh"></i>
                </div>
            </div>
        </div>
        <div :style="{
                    top: marginTop + 'px',
                    left: showBack ? '42px' : '10px',
                    right: showBack ? '42px' : '10px',
                    justifyContent:centerTitle?'center':'flex-start'
                }"
             class="full-nav van-ellipsis"
             v-show="showFull"
        >
            <slot name="full">{{title}}</slot>
        </div>
    </div>

</template>

<script>
import StoreMixin from '@/mixins/store'

export default {
    mixins: [StoreMixin],
    props: {
        payload: '',
        showFull: {
            type: Boolean,
            default: false
        },
        showBack: {
            type: Boolean,
            default: false
        },
        showRefresh: {
            type: Boolean,
            default: false
        },
        roundWhiteBack: {
            type: Boolean,
            default: false
        },
        customClass: {
            type: String,
            default: ''
        },
        customStyle: {
            type: String,
            default: ''
        },
        centerTitle: {
            type: Boolean,
            default: true
        },
        title: ''
    },
    data() {
        return {
            marginTop: 0,
            reset: false
        }
    },
    created() {
        if (this.systemInfo.platform === 'android') {
            this.marginTop = this.systemInfo.statusBarHeight + 11
        } else {
            this.marginTop = this.systemInfo.statusBarHeight + 5
        }
        this.setNavHeight(this.marginTop + 42)
    }
}
</script>

<style lang="less" scoped>
    .nav-bar {
        position: fixed;
        z-index: 1100;
        top: 0;
        left: 0;
        width: 100%;

        .main-nav {
            position: relative;
            z-index: 9;
            height: 32px;
            line-height: 32px;
            margin-right: 95px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            padding: 0 10px;

            .btn {
                .text-cancel {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 32px;
                    height: 100%;
                    margin: 0 7px;

                    .iconfont {
                        font-size: 18px;
                        font-weight: bold;
                    }
                }

                .round-text-white {
                    border-radius: 100%;
                    background: rgba(0, 0, 0, 0.2);
                    color: #fff;
                }
            }

            .content {
                width: 100%;
            }

            .btn,
            .content {
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        .full-nav {
            z-index: 10;
            position: absolute;
            bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }
    }
</style>
