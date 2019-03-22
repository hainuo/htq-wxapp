<template>
    <div class="divide-bar">
        <span class="line"></span>
        <div class="icon-info">
            <span class="icon-text">{{text}}</span>
        </div>
        <span class="line"></span>
    </div>
</template>

<script>
export default {
    props: {
        text: {
            default: '加载完啦',
            type: String
        }
    }
}
</script>

<style lang="less" scoped>
    .divide-bar {
        /*background-color: #f8f8f8;*/
        color: #999;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px 0;
        font-size: 0;

        .line {
            display: inline-block;
            width: 40px;
            border-top: 1px solid #999;
        }

        .icon-info {
            position: relative;
            top: -1px;
            margin: 0 8px;
        }

        .icon-text {
            font-size: 12px;
            margin-left: 1px;
        }
    }
</style>
