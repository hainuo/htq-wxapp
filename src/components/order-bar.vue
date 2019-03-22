<template>
    <div :class="customClass" :style="customStyle" class="order-bar">
        <div class="order-box">
            <div :class="{'color-accent':active===0}" @click="toggleSortMethods" class="item">
                {{sortText}} <i
                :class="['taobao-iconfont iconfont',showSortMethods?'icon-triangleupfill':'icon-triangledownfill']"></i>
            </div>
            <div :class="{'color-accent':active===1}" @click="sortBySales" class="item">销量</div>
            <div :class="{'color-accent':active===2}" @click="sortByCoupon" class="item">人气</div>
            <div @click="toggleGoodsList" class="item">
                <i :class="['taobao-iconfont iconfont',showGoodsCard?'icon-cascades':'icon-list']"></i>
            </div>
        </div>
        <div :style="{overflowY:showSortMethods?'visible':'hidden'}" style="position:relative;">
            <div :class="{'popup':showSortMethods}" class="sort-methods">
                <div :class="{'color-accent':sortMethod===0&&active===0}" @click="chooseSortMethod(0,'综合')"
                     class="sort-methods-item">
                    综合
                    <i :class="['taobao-iconfont iconfont icon-check']" v-if="sortMethod===0&&active===0"></i>
                </div>
                <div :class="{'color-accent':sortMethod===1&&active===0}" @click="chooseSortMethod(1,'价格降序')"
                     class="sort-methods-item">
                    价格降序
                    <i :class="['taobao-iconfont iconfont icon-check']" v-if="sortMethod===1&&active===0"></i>
                </div>
                <div :class="{'color-accent':sortMethod===2&&active===0}" @click="chooseSortMethod(2,'价格升序')"
                     class="sort-methods-item">
                    价格升序
                    <i :class="['taobao-iconfont iconfont icon-check']" v-if="sortMethod===2&&active===0"></i>
                </div>
            </div>
            <div @click="showSortMethods=false" class="background" v-show="showSortMethods"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        customStyle: '',
        customClass: ''
    },
    data() {
        return {
            showSortMethods: false,
            showGoodsCard: false,
            active: 0,
            sortMethod: 0,
            sortText: '综合'
        }
    },
    methods: {
        toggleSortMethods() {
            this.showSortMethods = !this.showSortMethods
        },
        chooseSortMethod(method, sortText) {
            this.sortMethod = method
            this.sortText = sortText
            this.active = 0
            this.showSortMethods = false
            this.$emit('changeSort', method)
        },
        sortBySales() {
            this.active = 1
            this.$emit('changeSort', 3)
        },
        sortByCoupon() {
            this.active = 2
            this.$emit('changeSort', 4)
        },
        toggleGoodsList() {
            this.showGoodsCard = !this.showGoodsCard
            this.$emit('changeListStyle', this.showGoodsCard)
        }
    },
    watch: {
        active(val) {
            if (val !== 0) {
                this.showSortMethods = false
                this.sortText = '综合'
            }
        }
    }
}
</script>

<style lang="less" scoped>
    @import "../assets/style/color";

    .order-bar {
        position: sticky;
        font-size: 14px;
        z-index: 9999;
        background-color: white;
        color: #333;
        top: 0;

        .order-box {
            display: flex;
            height: 32px;
            width: 100%;
            justify-content: space-between;

            .item {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;

                &:first-child {
                    .iconfont {
                        font-size: 10px;
                        margin-left: 5px;
                    }
                }

                &:last-child {
                    &:active {
                        color: @accent-color;
                    }
                }
            }
        }

        .sort-methods {
            padding: 0 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 100%;
            position: absolute;
            background: white;
            z-index: 999;
            transition: 0.3s transform;
            transform: translateY(-100%);
            box-sizing: border-box;

            &.popup {
                transform: translateY(0);
            }

            &-item {
                height: 40px;
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid rgba(153, 153, 153, 0.28);

                &:last-child {
                    border: none;
                }
            }
        }
    }

    .background {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100vh;
        display: block;
        top: 0;
        z-index: 998;
        background-color: rgba(0, 0, 0, 0.7);
    }
</style>
