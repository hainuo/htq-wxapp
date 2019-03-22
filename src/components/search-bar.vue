<template>
    <section :class="customClass" @click="onSearchFocus" class="search">
        <div class="box-flex">
            <div class="icon">
                <i class="taobao-iconfont iconfont icon-search"></i>
            </div>
            <input
                :confirm-type="'search'"
                :disabled="disabled"
                :focus="focus"
                :placeholder="placeholderValue"
                :value="currentValue"
                @confirm="search"
                @input="onInput"
                @keyup.enter="search"
                class="search-input"
                type="text"
            />
            <div @click="onInput" class="icon" v-if="computeShowClear">
                <i class="taobao-iconfont iconfont icon-roundclosefill"></i>
            </div>
        </div>
        <slot name="action">
            <div @click="cancel" class="text-cancel" v-if="showAction">
                取消
            </div>
        </slot>
    </section>
</template>

<script>
import NavWrap from './nav-wrap'

export default {
    components: { NavWrap },
    data() {
        return {
            currentValue: this.value,
            placeholderValue: this.placeholder
        }
    },
    props: {
        customClass: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: '请输入搜索关键词'
        },
        value: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        showAction: {
            type: Boolean,
            default: false
        },
        showClear: {
            type: Boolean,
            default: true
        },
        focus: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        search() {
            this.$emit('search', this.currentValue)
        },
        onInput(event) {
            this.currentValue = event.target.value || ''
            this.$emit('input', this.currentValue)
        },
        cancel() {
            this.$emit('cancel')
        },
        onSearchFocus() {
            this.$emit('focus')
        },
        goBack() {
            this.$emit('back')
            this.$router.push({ path: '/' })
        }
    },
    watch: {
        value(val) {
            this.currentValue = val
        }
    },
    computed: {
        computeShowClear() {
            return this.showClear && this.currentValue !== ''
        }
    },
    beforeDestroy() {
        this.focus = false
    }
}
</script>

<style lang="less" scoped>
    .search {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        border-radius: 27px;
        /*color: #666;*/

        .text-cancel {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50px;
            height: 100%;
            color: #666;
            font-size: 15px;
        }

        .box-flex {
            display: flex;
            align-items: center;
            width: 100%;
            height: 100%;
            padding: 0 5px;

            input {
                width: 100%;
            }

            .icon {
                width: 32px;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;

                .icon-roundclosefill {
                    color: gray;
                    opacity: 0.5;
                }
            }
        }
    }
</style>
