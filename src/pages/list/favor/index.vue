<template>
    <div>
        <tao-bao-pwd-dialog></tao-bao-pwd-dialog>
        <nav-wrap :custom-class="'background-theme-linear-gradient color-white'"
                  :title="title" @goBack="goBack"
                  showBack showFull>
        </nav-wrap>
        <div :style="{ paddingTop: navHeight+'px'}">
            <goods-list :custom-class="'background-white'"
                        :emptyText="'暂无'+title+'哦'"
                        :goods-list="goodsList"
                        :isLoad="isLoading"
                        :rightWidth="65"
                        @close="onClose">
            </goods-list>
        </div>
        <div @click="clearGoodsList" class="btn-goods" v-if="goodsList.length>0&&type===GOODS_FAVOR.TYPE_HISTORY">
            清空({{goodsList.length}})
        </div>
    </div>
</template>

<script>
import NavWrap from '@/components/nav-wrap'
import GoodsList from '@/components/goods-list'
import Constants from '@/config/constants'
import Api from '@/config/api'
import TaoBaoPwdDialog from '@/components/taobao-pwd-dialog'

export default {
    components: { NavWrap, GoodsList, TaoBaoPwdDialog },
    data() {
        return {
            GOODS_FAVOR: Constants.GOODS_FAVOR,
            title: '',
            type: Constants.GOODS_FAVOR.TYPE_HISTORY,
            goodsList: [],
            isLoading: true
        }
    },
    methods: {
        loadData() {
            this.goodsList = []
            this.$ajax.get(Api.goods.favorList, {
                openId: this.sessionKey,
                type: this.type
            }).then(res => {
                res.data.forEach(goods => {
                    this.goodsList.push({
                        itemid: goods.itemId,
                        itempic: goods.itemPic,
                        shoptype: goods.shopType,
                        itemtitle: goods.itemTitle,
                        activity_type: goods.activityType,
                        itemdesc: goods.itemDesc,
                        couponmoney: goods.couponMoney,
                        itemprice: goods.itemPrice,
                        itemendprice: goods.itemEndPrice,
                        itemsale: goods.itemSale
                    })
                })
                this.isLoading = false
            })
        },
        // 删除
        async onClose(res) {
            try {
                await this.$dialog.confirm({
                    title: '确定删除吗？'
                }).then(() => {
                    this.$toast.loading('删除中…')
                    this.$ajax.delete(Api.goods.favor, null, {
                        params: {
                            openId: this.sessionKey,
                            itemId: res.itemId,
                            type: this.type
                        }
                    }).then(() => {
                        this.goodsList.splice(res.index, 1)
                        this.$toast.success('删除成功')
                    }).catch(() => {
                        this.$toast.fail('删除失败')
                    })
                })
            } finally {
                res.instance.close()
            }
        },
        // 清空
        async clearGoodsList() {
            await this.$dialog.confirm({
                title: '确定清空吗？'
            }).then(() => {
                this.$toast.loading('清空中…')
                this.$ajax.delete(Api.goods.favorList, null, {
                    params: {
                        openId: this.sessionKey,
                        type: this.type
                    }
                }).then(() => {
                    this.goodsList = []
                    this.$toast.success('清空成功')
                }).catch(() => {
                    this.$toast.fail('清空失败')
                })
            })
        }
    },
    onLoad(option) {
        this.type = option.type
        this.title = this.type === Constants.GOODS_FAVOR.TYPE_HISTORY ? '足迹' : '收藏'
        this.loadData()
    }
}
</script>

