<template>
    <div>
        <slot name="header" v-if="!hideHeader"></slot>
        <div
            :class="{ 'show-header': showHeader, 'has-footer': showFooter }"
            class="body"
        >
            <slot name="body"></slot>
        </div>
        <div class="footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tabs: [
                {
                    label: '首页',
                    class: 'icon-home',
                    activeClass: 'icon-homefill'
                },
                {
                    label: '分类',
                    class: 'icon-apps',
                    activeClass: 'icon-leimupinleifenleileibie2'
                },
                {
                    label: '发现',
                    class: 'icon-discover',
                    activeClass: 'icon-discoverfill'
                },
                {
                    label: '我',
                    class: 'icon-my',
                    activeClass: 'icon-myfill'
                }
            ],
            active: 1
        }
    },
    props: {
        showHeader: {
            type: Boolean,
            default: false
        },
        showFooter: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="less" scoped>
    .body {
        position: absolute;
        left: 0;
        right: 0;
    }

    .show-header {
        top: 66px;
    }

    .has-footer {
        bottom: 50px;
    }

    .footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 50px;
    }
</style>
