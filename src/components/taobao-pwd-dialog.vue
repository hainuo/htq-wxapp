<template>
    <img-dialog :img="picList[0]"
                :title="taobaoGoodsInfo.item.title"
                @open="onOpen"
                v-model="show">
    </img-dialog>
</template>

<script>
import Api from '@/config/api'
import ImgDialog from '@/components/img-dialog'

export default {
    components: { ImgDialog },
    component: {
        ImgDialog
    },
    data() {
        return {
            id: '',
            show: false,
            taobaoGoodsInfo: { item: {} },
            picList: []
        }
    },
    methods: {
        onOpen() {
            this.navigateToDetail({
                id: this.id
            })
            this.show = false
        },
        async getH5GoodsInfo() {
            await this.$ajax
                .get(Api.taobao.goodsInfo, {
                    id: this.id
                })
                .then(response => {
                    this.taobaoGoodsInfo = response.data
                    this.picList = this.taobaoGoodsInfo.item.images
                    this.show = true
                })
        },
        checkClipboard() {
            this.$wx.context.getClipboardData().then(res => {
                let data = res.data
                if (data != null && data !== '' && /taobao.com/.test(data)) {
                    let id = data.match(/([1-9]\d{10,})/)
                    if (id !== null) {
                        this.id = id[0]
                        this.getH5GoodsInfo().then(() => {
                            if (this.show) {
                                this.$wx.context
                                    .setClipboardData({ data: '' })
                                    .then(() => {
                                        this.$toast.clear()
                                    })
                            }
                        })
                    }
                }
            })
        }
    },
    onLoad() {
        this.checkClipboard()
    },
    onShow() {
        this.checkClipboard()
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
            width: 75%;
            height: 55%;

            .img {
                width: 100%;
                flex: 0 0 60%;
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
