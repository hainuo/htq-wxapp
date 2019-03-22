<template>
    <div>
        <nav-wrap @goBack="goBack" showBack>
            <div slot="full">
                <div class="title">关于</div>
            </div>
        </nav-wrap>
        <div :style="{ top: navHeight + 'px' }" class="body login">
            <div class="login-info">
                <img class="head-img" src="../../assets/img/logo.png">
                <div class="auth">
                    {{system.NAME}} {{system.VERSION}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavWrap from '@/components/nav-wrap'
import Constants from '@/config/constants'

export default {
    components: { NavWrap },
    data() {
        return {
            system: Constants.SYSTEM
        }
    },
    methods: {
        onGetUserInfo(res) {
            this.initUserInfo(res.mp.detail).then(() => {
                this.goBack()
            })
        }
    }
}
</script>

<style lang="less" scoped>
    @import "../../assets/style/color";

    .title {
        font-weight: bold;
    }

    .login {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 40%;
        padding: 0 40px;

        &-info {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            height: 70%;

            .head-img {
                border-radius: 100%;
                width: 80px;
                height: 80px;
                background-color: white;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .auth {
                width: 100%;

                &-title {
                    width: 100%;
                    font-size: 16px;
                    margin-bottom: 5px;
                    font-weight: 600;
                }

                &-desc {
                    width: 100%;
                    color: gray;
                    font-size: 14px;
                }
            }
        }

        &-btn {
            height: 40px;
            line-height: 40px;
            font-size: 16px;
        }

        &-text {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .icon-wechat {
            margin: 0 5px;
        }
    }
</style>
