<template>
    <div v-show="value===1">
        <nav-wrap
            :custom-class="'background-body'"
            :showRefresh="showRefresh"
            @reload="onReload"
        >
            <search-bar
                :custom-class="'background-white'"
                :disabled="true"
                :focus="false"
                @focus="$emit('searchFocus')"
            ></search-bar>
        </nav-wrap>
        <div :style="{ top: navHeight + 'px' }" class="body has-footer">
            <div class="menu">
                <!-- 左侧导航 -->
                <scroll-view class="menu-left" scroll-with-animation scroll-y>
                    <ul>
                        <li
                            :class="{ active: index === classIndex }"
                            :key="index"
                            @click="changeClass(classItem, index)"
                            v-for="(classItem, index) in classList"
                        >
                            {{ classItem.main_name }}
                        </li>
                    </ul>
                </scroll-view>
                <!-- 右侧导航 -->
                <scroll-view
                    :key="rightIndex"
                    class="menu-right"
                    scroll-with-animation
                    scroll-y
                    v-for="(classItem, rightIndex) in classList"
                    v-show="rightIndex === classIndex"
                >
                    <div class="content-right">
                        <template
                            v-for="(subClass, classIndex) in classItem.data"
                        >
                            <div class="title">
                                <span>{{ subClass.next_name }} </span>
                            </div>
                            <ul>
                                <li
                                    :key="infoIndex"
                                    @click="goList(info.son_name)"
                                    v-for="(info, infoIndex) in subClass.info"
                                >
                                    <img
                                        :lazy-load="true"
                                        :src="info.imgurl"
                                        class="img img-background"
                                        mode="aspectFit"
                                    />
                                    <span>{{ info.son_name }}</span>
                                </li>
                            </ul>
                        </template>
                    </div>
                </scroll-view>
            </div>
        </div>
    </div>
</template>

<script>
import Api from '@/config/api'
import NavWrap from '@/components/nav-wrap'
import SearchBar from '@/components/search-bar'

export default {
    components: { NavWrap, SearchBar },
    props: {
        value: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            classList: [],
            classIndex: 0,
            currentCid: ''
        }
    },
    onLoad() {
        this.showRefresh = true
        this.loadClass()
    },
    methods: {
        goList(keyword) {
            this.navigateToListClass({
                url: Api.haodanku.goodsKeyword,
                cid: this.currentCid,
                keyword: keyword
            })
        },
        changeClass(currentItem, index) {
            this.currentCid = currentItem.cid
            this.classIndex = index
        },
        loadClass() {
            this.$ajax.get(Api.haodanku.listClass).then(response => {
                if (response.code === 200 && response.data.length > 0) {
                    this.classList = response.data
                    this.currentCid = response.data[0].cid
                    this.showRefresh = false
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
    @import "../../assets/style/color";

    .menu {
        background: @body-color;
        display: flex;
        width: 100%;
        height: 100%;
        overflow: hidden;
        color: rgb(68, 68, 68);

        &-left {
            width: 80px;

            ul {
                background: white;

                li {
                    height: 50px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    &.active {
                        color: @theme-color;
                        background: @body-color;

                        &:before {
                            content: "";
                            position: absolute;
                            height: 26px;
                            width: 3px;
                            /*background-image: linear-gradient(rgb(245, 220, 187) 10%, rgb(254, 121, 35));*/
                            background-image: linear-gradient(
                                #cf94ab 10%,
                                @theme-color
                            );
                            border-radius: 50px;
                            left: 0;
                            z-index: 3;
                        }
                    }
                }
            }
        }

        &-right {
            flex: 1;

            .content-right {
                padding: 0 12px;

                .title {
                    display: flex;
                    flex-direction: row;
                    place-content: flex-start space-between;
                    padding-bottom: 6px;

                    span {
                        font-size: 14px;
                        line-height: 18px;
                        height: 18px;
                        color: rgb(68, 68, 68);
                    }
                }

                ul {
                    background-color: rgb(255, 255, 255);
                    display: flex;
                    flex-wrap: wrap;
                    /*justify-content: space-between;*/
                    border-radius: 12px;
                    padding: 13.5px 18px;
                    margin-bottom: 6px;

                    li {
                        flex: 0 0 33.3333%;
                        display: flex;
                        flex-direction: column;
                        align-content: flex-start;
                        flex-shrink: 0;
                        cursor: pointer;
                        width: 62px;
                        height: 88px;
                        margin-top: 4.5px;
                        margin-bottom: 4.5px;
                        align-items: center;
                        justify-content: center;

                        &:active {
                            background: @body-color;
                        }

                        .img {
                            width: 62px;
                            height: 62px;
                            overflow: hidden;
                            border-radius: 0;
                        }

                        span {
                            font-size: 12px;
                            line-height: 18px;
                            text-align: center;
                            color: rgb(102, 102, 102);
                            margin-top: 6px;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            max-width: 100%;
                            overflow: hidden;
                        }
                    }
                }
            }
        }
    }
</style>
