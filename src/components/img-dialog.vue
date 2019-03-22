<template>
    <div>
        <div class="dialog-bg" v-show="show"></div>
        <div :class="[{ 'scale-1': show }]" class="dialog-wrap scale-0">
            <div class="dialog">
                <img :src="img" @longpress="onLongpress" class="img" mode="widthFix"/>
                <div class="bottom">
                    <div class="title">{{ title }}</div>
                    <div class="dialog-button-group">
                        <div class="bottom-bar-btn">
                            <div @click="onOpen">{{buttonText}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <i
                @click="onClose"
                class="taobao-iconfont iconfont icon-roundclose"
            ></i>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        img: '',
        title: {
            type: String,
            default: ''
        },
        value: {
            type: Boolean,
            default: ''
        },
        buttonText: {
            type: String,
            default: '打开'
        }
    },
    data() {
        return {
            show: false
        }
    },
    methods: {
        onClose() {
            this.show = false
            this.$emit('close')
            this.$emit('input', false)
        },
        onOpen() {
            this.$emit('open')
        },
        onLongpress() {
            this.$emit('longpress')
        }
    },
    watch: {
        value(val) {
            this.show = val
        }
    }
}
</script>

<style lang="less" scoped>
    @import "../assets/style/color";

    .dialog-bg {
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

    .dialog-wrap {
        z-index: 2000;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .dialog {
            display: flex;
            flex-direction: column;
            background-color: white;
            border-radius: 10px;
            width:80%;
            max-height:70%;

            .img {
                width: 100%;
                /*flex: 0 0 60%;*/
                border-radius: 10px 10px 0 0;
            }

            .bottom {
                flex: 0 0 40%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                padding: 10px;
                box-sizing: border-box;

                .title {
                    font-size: 14px;
                }

                .dialog-button-group {
                    width: 100%;
                    height: 60px;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    background-color: #fff;
                }
            }
        }

        .icon-roundclose {
            font-size: 35px;
            color: white;
            margin: 15px;
        }
    }

    .scale-0 {
        transition: 0.3s transform;
        transform: scale(0);
    }

    .scale-1 {
        transform: scale(1);
    }
</style>
