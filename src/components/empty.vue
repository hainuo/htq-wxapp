<template>
    <div class="empty-page">
        <img mode="aspectFit" src="../assets/img/empty.png"/>
        <p>
            {{emptyText}}
        </p>
    </div>
</template>

<script>
export default {
    props: {
        emptyText: {
            default: '当场好货还在精心挑选中~(｡･∀･)ﾉ',
            type: String
        }
    }
}
</script>

<style lang="less" scoped>
    .empty-page {
        text-align: center;

        p {
            color: #666;
            font-size: 14px;
        }
    }
</style>
