<template>
    <div>
        <tao-bao-pwd-dialog></tao-bao-pwd-dialog>
        <nav-wrap
            :customStyle="firstNavStyle"
            :showRefresh="showRefresh"
            @goBack="goBack"
            @reload="onReload"
            roundWhiteBack
            showBack
        >
        </nav-wrap>
        <nav-wrap :center-title="false"
                  :custom-class="'background-theme-linear-gradient color-white'"
                  :customStyle="secondNavStyle" :title="title" @goBack="goBack" showBack
                  showFull>
        </nav-wrap>
        <div class="body-scroll">
            <content-placeholders v-if="!articleData.article">
                <content-placeholders-img :custom-style="'height: 220px;'"></content-placeholders-img>
                <content-placeholders-text :custom-style="'margin:15px 10px 0 10px;'"
                                           :lines="15"></content-placeholders-text>
            </content-placeholders>
            <div class="article background-white" v-else>
                <div class="cover">
                    <img :src="articleData.article_banner" class="banner" mode="widthFix">
                </div>
                <h4 class="title">{{articleData.label}} {{articleData.name}}</h4>
                <div class="newdata-author">
                    <div class="author-info">
                        <img :src="articleData.head_img" class="author-head" mode="widthFix">
                        <span class="author-name">{{articleData.talent_name}}</span>
                    </div>
                    <div class="right-part">
                        <span @click="onClickShare" class="read-count"
                              style="margin-right: 10px;">
                            <i :class="['taobao-iconfont iconfont icon-share']"></i>
                            <span style="margin-left: 3px;">分享</span>
                        </span>
                        <span class="read-count">
                            <i :class="['taobao-iconfont iconfont icon-attention']"></i>
                            <span style="margin-left: 3px;">{{articleData.readtimes}}</span>
                        </span>
                    </div>
                </div>
                <!--// 直接渲染Page中的已经过解析的obj数据-->
                <htmltowxml :json="articleWxmlNodes" :showLoading="false"></htmltowxml>
                <div @click="onClickGoodsBtn" class="btn-goods">商品({{articleData.items.length}})</div>
                <tao-bao-dialog :dialog-type="'goods'" :isLoading="isLoading" :params="goodsArray"
                                v-model="showGoodsDialog">
                </tao-bao-dialog>
            </div>
        </div>
        <img-dialog :img="posterUrl" @open="onSaveSharePic"
                    button-text="保存"
                    title="保存海报分享到朋友圈~" v-model="showShareDialog"></img-dialog>
        <van-action-sheet
            :actions="actionSheets"
            :show="showActionSheet"
            @close="onCloseActionSheet"
            @select="onSelectActionSheet"
            cancel-text="取消"></van-action-sheet>
    </div>
</template>

<script>
import Api from '@/config/api'
import Routes from '@/config/routes'
import NavWrap from '@/components/nav-wrap'
import TaoBaoDialog from '@/components/taobao-dialog'
import ContentPlaceholders from '@/components/placeholder/ContentPlaceholders'
import ContentPlaceholdersText from '@/components/placeholder/ContentPlaceholdersText'
import ContentPlaceholdersImg from '@/components/placeholder/ContentPlaceholdersImg'
import ImgDialog from '@/components/img-dialog'
import TaoBaoPwdDialog from '@/components/taobao-pwd-dialog'

export default {
    components: {
        TaoBaoDialog,
        ContentPlaceholders,
        ContentPlaceholdersText,
        ContentPlaceholdersImg,
        NavWrap,
        ImgDialog,
        TaoBaoPwdDialog
    },
    data() {
        return {
            id: '',
            showActionSheet: false,
            actionSheets: [
                {
                    name: '分享',
                    openType: 'share'
                },
                {
                    name: '生成海报'
                }
            ],
            showGoodsDialog: false,
            articleWxmlNodes: [],
            articleData: {
                article: '',
                items: []
            },
            // 导航透明度
            navOpacity: 0,
            isLoading: true,
            // 海报url
            posterUrl: '',
            // 分享弹框
            showShareDialog: false
        }
    },
    computed: {
        goodsArray() {
            let goodsArray = []
            this.articleData.items.forEach(item => {
                this.$ajax
                    .get(Api.haodanku.goodsKeyword, {
                        keyword: item.itemid,
                        back: 1
                    })
                    .then(res => {
                        if (res.data.min_id > 0) {
                            goodsArray.push({
                                itemid: res.data.list.itemid,
                                itempic: res.data.list.itempic,
                                shoptype: res.data.list.shoptype,
                                itemtitle: res.data.list.itemtitle,
                                activity_type: res.data.list.activity_type,
                                itemdesc: res.data.list.itemdesc,
                                couponmoney: res.data.list.couponmoney,
                                itemprice: res.data.list.itemprice,
                                itemendprice: res.data.list.itemendprice,
                                itemsale: res.data.list.itemsale
                            })
                        }
                        this.isLoading = false
                    })
            })
            return goodsArray
        },
        title() {
            if (this.articleData.name && this.articleData.name.length > 14) {
                return this.articleData.name.substr(0, 14).concat('…')
            } else {
                return this.articleData.name
            }
        },
        firstNavStyle() {
            return this.navOpacity === 1
                ? 'display:none;'
                : `opacity:${1 - this.navOpacity}`
        },
        secondNavStyle() {
            return this.navOpacity === 0
                ? 'display:none;'
                : `opacity:${this.navOpacity}`
        },
        articleHtml() {
            let articleHtml = this.$formatter.decodeHtml(this.articleData.article)
            articleHtml = articleHtml.replace(/<div class="(am-g|single-content)"[\s\S]*?<\/div><\/div>(?=<p)?/g, '')
            return articleHtml
        }
    },
    methods: {
        onSelectActionSheet(event) {
            this.onCloseActionSheet()
            if (event.mp.detail.name === '生成海报') {
                this.showShareDialog = true
            }
        },
        onCloseActionSheet() {
            this.showActionSheet = false
        },
        onClickShare() {
            this.showActionSheet = true
        },
        onSaveSharePic() {
            this.$wx.context
                .authorize({ scope: 'scope.writePhotosAlbum' })
                .then(() => {
                    this.$toast.loading('保存中…')
                    this.$wx.context
                        .saveImageToPhotosAlbum({ filePath: this.posterUrl })
                        .then(() => {
                            this.showShareDialog = false
                            this.$toast.success('保存成功')
                        })
                        .catch(() => {
                            this.$dialog.alert({
                                title: '出了点问题',
                                content: '海报保存失败',
                                confirmText: '知道了'
                            })
                        })
                })
        },
        onClickGoodsBtn() {
            this.showGoodsDialog = true
        },
        loadArticle() {
            this.$toast.loading()
            this.$ajax.get(Api.haodanku.getArticle, {
                id: this.id
            }).then(res => {
                res.data.image = this.articleData.image
                this.articleData = res.data
                this.$ajax.post(Api.common.html2wxml, {
                    text: this.articleHtml
                }, {
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded'
                    }
                }).catch(wxml => {
                    this.articleWxmlNodes = wxml
                    this.showRefresh = false
                    this.$toast.clear()
                })
                // 海报url
                this.posterUrl = Api.common.baseURL +
                    Api.common.poster +
                    '?' +
                    this.$qs.stringify({
                        scene: this.id,
                        page: Routes.article,
                        bannerUrl: this.articleData.article_banner
                    })
                    // 预加载海报
                this.$wx.context
                    .getImageInfo({ src: this.posterUrl })
                    .then(res => (this.posterUrl = res.path))
            })
        },
        dynamicNav(scrollTop) {
            let opacity = Number((scrollTop - 10) / this.navHeight).toFixed(1)
            opacity = opacity > 1 ? 1 : opacity < 0 ? 0 : opacity
            if (
                (opacity > 0 && opacity < 1) ||
                    (opacity === 0 && this.navOpacity !== 0) ||
                    (opacity === 1 && this.navOpacity !== 1)
            ) {
                this.navOpacity = opacity
            }
        }
    },
    onShareAppMessage(res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        console.log(this.articleData)
        return {
            title: this.articleData.name,
            imageUrl: this.articleData.image || this.articleData.compose_image
        }
    },
    onPageScroll(e) {
        this.dynamicNav(e.scrollTop)
    },
    onLoad(option) {
        console.log(option)
        if (option.scene) {
            this.id = decodeURIComponent(option.scene)
        } else {
            this.id = option.id
            this.articleData.image = option.image
        }
        this.loadArticle()
    }
}
</script>

<style lang="less" scoped>
    .article {
        .banner {
            width: 100%;
        }

        .title {
            padding: 10px;
            font-size: 20px;
        }

        .newdata-author {
            width: 100%;
            padding: 5px 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
            color: gray;
            box-sizing: border-box;

            .right-part {
                display: flex;
                justify-content: space-around;
            }

            .author-info {
                display: flex;
                align-items: center;
            }

            .author-head {
                width: 30px;
                border-radius: 100%;
            }

            .author-name {
                margin-left: 5px;
            }

            .read-count {
                display: flex;
                align-items: center;
                line-height: 100%;
            }
        }

    }
</style>
