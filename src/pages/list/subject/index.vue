<template>
    <div>
        <tao-bao-pwd-dialog></tao-bao-pwd-dialog>
        <img-dialog :img="posterUrl" @open="onSaveSharePic"
                    button-text="保存"
                    title="保存海报分享到朋友圈~" v-model="showShareDialog"></img-dialog>
        <van-action-sheet
            :actions="actionSheets"
            :show="showActionSheet"
            @close="onCloseActionSheet"
            @select="onSelectActionSheet"
            cancel-text="取消"></van-action-sheet>
        <!-- 导航 -->
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
                  :customStyle="secondNavStyle" :title="title" @goBack="goBack"
                  showBack showFull>
        </nav-wrap>
        <div class="subject">
            <div class="swipe-wrap">
                <img :src="'http://img.haodanku.com/'+subject.image"
                     class="img-background" mode="widthFix">
                <div class="subject-title">{{subject.content}}
                    <div class="share" @click="onClickShare">
                        <i :class="['taobao-iconfont iconfont icon-share']"></i>
                    </div>
                </div>
            </div>
            <goods-list :custom-class="'background-white'"
                        :goods-list="goodsList"
                        :isLoad="isLoading">
            </goods-list>
        </div>
    </div>
</template>

<script>
import NavWrap from '@/components/nav-wrap'
import GoodsList from '@/components/goods-list'
import Api from '@/config/api'
import Routes from '@/config/routes'
import TaoBaoPwdDialog from '@/components/taobao-pwd-dialog'
import ImgDialog from '@/components/img-dialog'

export default {
    components: { NavWrap, GoodsList, TaoBaoPwdDialog, ImgDialog },
    data() {
        return {
            subject: {},
            goodsList: [],
            isLoading: true,
            // 导航透明度
            navOpacity: 0,
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
            // 海报url
            posterUrl: '',
            // 分享弹框
            showShareDialog: false
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
        loadGoods() {
            this.$ajax.get(Api.haodanku.getSubject, {
                id: this.subject.id
            }).then(res => {
                this.goodsList = res.data
                this.isLoading = false
                this.showRefresh = false
            })
        },
        loadSubject() {
            this.$ajax.get(Api.haodanku.listSubject)
                .then(res => {
                    res.data.forEach(subject => {
                        if (subject.id === this.subject.id) {
                            this.subject = subject
                            this.loadPoster()
                        }
                    })
                })
        },
        loadPoster() {
            // 海报url
            this.posterUrl = Api.common.baseURL +
                Api.common.poster +
                '?' +
                this.$qs.stringify({
                    scene: encodeURIComponent(this.subject.id),
                    page: Routes.listSubject,
                    bannerUrl: 'http://img.haodanku.com/' + this.subject.app_image
                })
                // 预加载海报
            this.$wx.context
                .getImageInfo({ src: this.posterUrl })
                .then(res => (this.posterUrl = res.path))
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
    computed: {
        title() {
            if (this.subject.name && this.subject.name.length > 14) {
                return this.subject.name.substr(0, 14).concat('…')
            } else {
                return this.subject.name
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
        }
    },
    onShareAppMessage(res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: this.subject.name,
            imageUrl: `http://img.haodanku.com/${this.subject.image}`
        }
    },
    onPageScroll(e) {
        this.dynamicNav(e.scrollTop)
    },
    onLoad(option) {
        console.log(option)
        this.subject.id = option.id || decodeURIComponent(option.scene)
        this.loadGoods()
        this.loadSubject()
    }
}
</script>

<style lang="scss" scoped>
    .subject {
        .swipe-wrap {
            position: relative;
            width: 100%;
            box-sizing: border-box;

            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }

        &-title {
            position: absolute;
            bottom: 0;
            padding: 10px;
            font-size: 20px;
            font-weight: bold;
            color: #f8f8f8;
            background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
            .share{
                display:inline;
                float:right;
                width:30px;
                text-align:center;
                i{
                    display:inline;
                }
            }
        }
    }


</style>
