<template>
    <div>
        <slot></slot>
        <!-- <div class="loading" v-show="!isFinished&&isLoad"> -->
        <!-- <van-loading size="16px" color="#999"></van-loading> -->
        <!-- <span class="loading-text"> -->
        <!-- 加载中… -->
        <!-- </span> -->
        <!-- </div> -->
    </div>
</template>

<script>
export default {
    props: {
        isRefresh: {
            type: Boolean,
            default: false
        },
        isLoad: {
            type: Boolean,
            default: false
        },
        isFinished: {
            type: Boolean,
            default: false
        }
    },
    onPullDownRefresh() {
        console.log('onPullDownRefresh')
        this.$emit('refresh')
    },
    onReachBottom() {
        if (!this.isFinished && !this.isLoad) {
            console.log('onReachBottom')
            this.$emit('load')
            this.isLoad = true
        }
    },
    watch: {
        isRefresh(val) {
            if (!val) {
                this.$wx.context.stopPullDownRefresh()
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .loading {
        display: flex;
        justify-content: center;
        align-items: center;

        &-text {
            margin-left: 5px;
            color: #999;
            line-height: 50px;
            font-size: 13px;
        }
    }
</style>
