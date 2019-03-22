<template>
    <div class="bottom-bar">
        <div @click="onClickShop" class="mini">
            <i class="taobao-iconfont iconfont icon-shop"></i>
            <span class="btn-text">店铺</span>
        </div>
        <div class="mini">
            <i class="taobao-iconfont iconfont icon-wang"></i>
            <span class="btn-text">客服</span>
            <button class="open-btn" open-type="contact"></button>
        </div>
        <div :style="{color:favorActive?'#7974F5':'#999'}" @click="toggleGoodsFavor" class="mini">
            <i :class="['taobao-iconfont iconfont',favorActive?'icon-favorfill':'icon-favor']"></i>
            <span class="btn-text" v-text="favorActive?'已收藏':'收藏'"></span>
        </div>
        <div class="bottom-bar-btn">

            <div style="position: relative;" v-if="audit">
                分享好物
                <button
                    class="open-btn"
                    open-type="share"
                ></button>
            </div>
            <div @click="onCopyTPwd" v-else>复制淘口令</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        favorActive: false
    },
    methods: {
        onClickShop() {
            this.$emit('clickShop')
        },
        onCopyTPwd() {
            this.$emit('copyTPwd')
        },
        toggleGoodsFavor() {
            this.$emit('toggleGoodsFavor')
        }
    }
}
</script>

<style lang="less">
    @import "../assets/style/color";

    .bottom-bar {
        position: fixed;
        bottom: 0;
        width: 100%;
        display: flex;
        z-index: 110;
        flex-direction: row;
        align-items: center;
        background-color: #fff;
        box-sizing: border-box;
        padding-right: 10px;
        padding-bottom: constant(safe-area-inset-bottom);

        .mini {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 50px;
            height: 50px;
            white-space: nowrap;
            align-items: center;
            color: #999;
            padding: 0 15px;
            box-sizing: border-box;
            position: relative;

            &:active {
                color: @theme-color
            }

            .taobao-iconfont {
                font-size: 18px;
            }

            .btn-text {
                font-size: 10px;
                line-height: 20px;
            }
        }
    }
</style>
