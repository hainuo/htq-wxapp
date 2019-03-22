<template>
    <div class="body-scroll has-footer background-white swipe-wrap" v-show="value===2">
        <content-placeholders v-if="talentInfo.topdata.length<1">
            <content-placeholders-img :custom-style="'height: 220px;'"></content-placeholders-img>
            <content-placeholders-text :custom-style="'margin:15px 10px 0 10px;'"
                                       :lines="15"></content-placeholders-text>
        </content-placeholders>
        <div v-else>
            <nav-wrap :custom-class="'background-theme-linear-gradient color-white'"
                      :customStyle="secondNavStyle"
                      :title="'发现'" showFull>
            </nav-wrap>
            <div :class="['swipe-bg']"
                 :style="{backgroundImage:swipeBackground}"></div>
            <!--轮播图-->
            <swiper :current="currentSwiperIndex" :style="{marginTop:(navHeight-230)+'px'}"
                    @change="onChangeSwiper"
                    class="topdata">
                <swiper-item :key="index"
                             v-for="(talent,index) in talentInfo.topdata">
                    <div @click="onClickArticle(talent)" class="topdata-item">
                        <img :src="talent.article_banner" class="swipe-img img-background" mode="widthFix">
                        <div class="topdata-title van-ellipsis">{{talent.shorttitle}}</div>
                    </div>
                </swiper-item>
            </swiper>
            <div class="talent-container">
                <div>
                    <div class="talent-title">本周新作</div>
                    <swiper class="newdata"
                            display-multiple-items="2">
                        <swiper-item :key="index_newdata"
                                     v-for="(talent,index_newdata) in talentInfo.newdata">
                            <div @click="onClickArticle(talent)" class="newdata-item" style="padding: 0 5px;">
                                <img :src="talent.article_banner" class="swipe-img img-background" mode="widthFix">
                                <div class="newdata-footer">
                                    <span class="newdata-title van-ellipsis">{{talent.shorttitle}}</span>
                                    <div class="newdata-author">
                                        <div class="author-info">
                                            <img :src="talent.head_img" class="author-head img-background"
                                                 mode="widthFix">
                                            <span class="author-name van-ellipsis">{{talent.talent_name}}</span>
                                        </div>
                                        <span class="read-count">
                                            <i :class="['taobao-iconfont iconfont icon-attention']"></i>
                                            <span style="margin-left: 3px;">{{talent.readtimes}}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </swiper-item>
                    </swiper>
                </div>
                <div>
                    <div class="talent-title">大家都在逛</div>
                    <van-tabs type="card">
                        <van-tab :key="index"
                                 :title="val"
                                 v-for="(val, key, index) in talentCategory">
                            <div :key="talent.id" @click="onClickArticle(talent)"
                                 class="newdata-item"
                                 style="margin-top: 10px;"
                                 v-for="talent in talentInfo.clickdata" v-show="talent.talentcat===key">
                                <img :src="talent.article_banner" class="swipe-img img-background" mode="widthFix">
                                <div class="newdata-footer">
                                    <span class="newdata-title van-ellipsis">{{talent.name}}</span>
                                    <div class="newdata-author">
                                        <div class="author-info">
                                            <img :src="talent.head_img" class="author-head img-background"
                                                 mode="widthFix">
                                            <span class="author-name">{{talent.talent_name}}</span>
                                        </div>
                                        <span class="read-count">
                                            <i :class="['taobao-iconfont iconfont icon-attention']"></i>
                                            <span style="margin-left: 3px;">{{talent.readtimes}}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </van-tab>
                    </van-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Api from '@/config/api'
import NavWrap from '@/components/nav-wrap'
import ContentPlaceholders from '@/components/placeholder/ContentPlaceholders'
import ContentPlaceholdersText from '@/components/placeholder/ContentPlaceholdersText'
import ContentPlaceholdersImg from '@/components/placeholder/ContentPlaceholdersImg'

export default {
    components: { NavWrap, ContentPlaceholders, ContentPlaceholdersText, ContentPlaceholdersImg },
    props: {
        value: {
            type: Number,
            default: 2
        }
    },
    data() {
        return {
            talentInfo: {
                talent_Category: {},
                clickdata: [],
                newdata: [],
                topdata: []
            },
            currentSwiperIndex: 0,
            swipeBackground: '',
            // 导航透明度
            navOpacity: 0
        }
    },
    computed: {
        talentCategory() {
            let talentCategory = {}
            for (let i = 0; i < this.talentInfo.clickdata.length; i++) {
                let cateId = this.talentInfo.clickdata[i].talentcat
                talentCategory[cateId] = this.talentInfo.talent_Category[cateId]
            }
            return talentCategory
        },
        secondNavStyle() {
            return this.navOpacity === 0
                ? 'display:none;'
                : `background:#F9F9F9;opacity:${this.navOpacity}`
        }
    },
    methods: {
        onClickArticle(talent) {
            this.navigateToArticle({
                id: talent.id,
                image: talent.image
            })
        },
        onChangeSwiper(event) {
            this.currentSwiperIndex = event.mp.detail.current
            this.swipeBackground = `url("${this.talentInfo.topdata[this.currentSwiperIndex].article_banner}")`
        },
        onClickSwipeItem(subject) {
            this.navigateToListSubject({
                ...subject
            })
        },
        loadTalent() {
            this.$ajax.get(Api.haodanku.talentInfo)
                .then(res => {
                    this.talentInfo = res.data
                    this.swipeBackground = `url("${this.talentInfo.topdata[0].article_banner}")`
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
    onPageScroll(e) {
        if (this.value === 2) {
            this.dynamicNav(e.scrollTop)
        }
    },
    onLoad() {
        this.loadTalent()
    }
}
</script>

<style lang="less" scoped>
    .swipe-wrap {
        position: relative;
        width: 100%;
        box-sizing: border-box;

        .topdata {
            .topdata-item {
                box-sizing: border-box;
                padding: 0 15px;

                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    border-radius: 10px 10px 0 0;
                }

                .topdata-title {
                    color: #666;
                    font-size: 16px;
                    width: 100%;
                    background-color: white;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    border-radius: 0 0 10px 10px;
                    box-sizing: border-box;
                    padding: 5px 10px;
                }
            }
        }
    }

    .talent-container {
        padding: 10px;
        box-sizing: border-box;

        &:first-child {
            padding-top: 20px;
            box-sizing: border-box;
        }

        .talent-title {
            font-size: 16px;
            margin: 10px 5px;
        }
    }

    .newdata-item {
        img {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 10px 10px 0 0;
        }

        .newdata-footer {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            background-color: #f8f8f8;
            border-radius: 0 0 10px 10px;
            box-sizing: border-box;
            padding: 10px;

            .newdata-title {
                color: black;
                font-size: 14px;
                display: inline-block;
                width: 100%;
            }

            .newdata-author {
                margin-top: 10px;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 12px;
                color: gray;

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
    }
</style>
