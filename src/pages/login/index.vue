<template>
    <div>
        <nav-wrap @goBack="goBack" showBack showFull>
            <div slot="full">
                登录
            </div>
        </nav-wrap>
        <div :style="{ top: navHeight + 'px' }" class="body login">
            <div class="login-info">
                <img class="head-img" src="../../assets/img/logo.png">
                <div class="auth">
                    <div class="auth-title">申请获取以下权限</div>
                    <div class="auth-desc">• 获取你的公开信息（昵称、头像等）</div>
                </div>
            </div>
            <button
                :loading="loading"
                @getuserinfo="onGetUserInfo"
                class="bottom-bar-btn login-btn"
                lang="zh_CN"
                open-type="getUserInfo"
                type="primary"
            >
                <div class="login-text">
                    <i :class="['cell-icon taobao-iconfont iconfont icon-wx']"></i>
                    <div>授权登录</div>
                </div>
            </button>
        </div>
    </div>
</template>

<script>
import NavWrap from '@/components/nav-wrap'

export default {
    components: { NavWrap },
    data() {
        return {
            loading: false
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
