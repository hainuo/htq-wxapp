<template>
    <div>
        <nav-wrap
            :custom-class="navCustomClass"
            @goBack="$emit('goBack')"
            show-back
        >
            <search-bar
                :custom-class="searchCustomClass"
                :focus="focus"
                :value="keyword"
                @input="onInput"
                @search="search(keyword)"
            ></search-bar>
        </nav-wrap>
        <div :style="{ top: navHeight + 'px' }" class="body">
            <!-- <van-tabs @change="onChangeTab" :active="tabIndex"> -->
            <!--
                <van-tab v-for="(tab,index) in tabs" :title="tab" :key="index">
            -->
            <!-- </van-tab> -->
            <!-- </van-tabs> -->
            <!-- 历史搜索 -->
            <div v-if="searchKeyword.length>0">
                <div class="search-title">
                    <span class="search-title-text">历史搜索</span>
                    <span
                        @click="removeSearchHistory"
                        class="search-title-icon"
                    >
                        <i class="taobao-iconfont iconfont icon-delete"></i>
                    </span>
                </div>
                <div class="search-tag-group">
                    <span
                        :key="index"
                        @click="search(keyword)"
                        class="search-tag"
                        v-for="(keyword, index) in searchKeyword"
                    >
                        {{ keyword }}
                    </span>
                </div>
            </div>
            <!-- 热门搜索 -->
            <div>
                <div class="search-title">
                    <span class="search-title-text">搜索发现</span>
                    <span class="search-title-icon">
                        <i
                            :class="[
                                'taobao-iconfont iconfont',
                                showHot
                                    ? 'icon-attention'
                                    : 'icon-attentionforbid'
                            ]"
                            @click="showHot = !showHot"
                        ></i>
                    </span>
                </div>
                <div class="search-tag-group" v-if="showHot">
                    <span
                        :key="index"
                        @click="search(keyword.keyword)"
                        class="search-tag"
                        v-for="(keyword, index) in keywordList"
                        v-if="index < 20"
                    >
                        {{ keyword.keyword }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavWrap from '@/components/nav-wrap'
import SearchBar from '@/components/search-bar'
import Api from '@/config/api'

export default {
    components: { NavWrap, SearchBar },
    props: {
        focus: {
            type: Boolean,
            default: true
        },
        tabIndex: {
            type: Number,
            default: 0
        },
        value: {
            type: String,
            default: ''
        },
        navCustomClass: {
            type: String,
            default: 'background-white'
        },
        searchCustomClass: {
            type: String,
            default: 'background-body'
        }
    },
    data() {
        return {
            tabs: ['全部', '天猫', '有券'],
            // 当前搜索词
            keyword: '',
            // 搜索热词
            keywordList: '',
            // 只搜天猫
            onlyTmall: false,
            // 只搜有券
            onlyCoupon: false,
            // 展示热搜
            showHot: true
        }
    },
    onLoad(option) {
        this.initParams(option)
        this.listHotKey()
    },
    methods: {
        initParams(option) {
            // this.tabIndex = option.tab || 0;
            // this.keyword = option.keyword;
            this.keyword = this.value
        },
        onChangeTab(obj) {
            this.tabIndex = obj.mp.detail.index
        },
        onInput(val) {
            this.$emit('input', val)
            this.keyword = val
        },
        removeSearchHistory() {
            this.$dialog
                .confirm({
                    title: '清空全部历史记录?'
                })
                .then(() => {
                    this.clearSearchKeyword()
                })
        },
        search(keyword) {
            if (keyword !== '' || keyword != null) {
                let id = keyword.match(/([1-9]\d{10,})/)
                if (id != null) {
                    this.navigateToDetail({
                        id: id[0]
                    })
                    return
                }

                this.keyword = keyword
                this.addSearchKeyword(this.keyword)
                this.$emit('search', {
                    url: Api.haodanku.goodsSearch,
                    keyword: this.keyword,
                    tab: this.tabIndex
                })
            }
        },
        listHotKey() {
            this.$ajax.get(Api.haodanku.listHotKey).then(response => {
                if (response.code === 200) {
                    this.keywordList = response.data
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .search-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #666;
        padding: 10px 15px;

        &-text {
            font-size: 14px;
        }
    }

    .search-tag {
        color: #666;
        font-size: 14px;
        padding: 3px 8px;
        background-color: rgb(229, 229, 229);
        border-radius: 12px;
        margin: 5px;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 100%;
        overflow: hidden;

        &-group {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;
            padding: 0 5px;
        }
    }
</style>
