<template>
    <div>
        <goods-list-card :custom-class="customClass"
                         :custom-style="customStyle"
                         :emptyText="emptyText"
                         :goods-list="goodsList"
                         :is-load="isLoad"
                         @click="onClickGoods"
                         v-if="card"></goods-list-card>
        <goods-list-normal :custom-class="customClass"
                           :custom-style="customStyle"
                           :emptyText="emptyText"
                           :goods-list="goodsList"
                           :is-load="isLoad"
                           :rightWidth="rightWidth"
                           @click="onClickGoods"
                           @close="onClose"
                           v-else>
        </goods-list-normal>
    </div>
</template>

<script>
import GoodsListCard from './goods-list-card'
import GoodsListNormal from './goods-list-normal'

export default {
    components: { GoodsListCard, GoodsListNormal },
    props: {
        rightWidth: {
            type: Number,
            default: 0
        },
        goodsList: {
            required: true
        },
        customClass: {
            default: '',
            type: String
        },
        customStyle: {
            default: '',
            type: String
        },
        isLoad: {
            default: true,
            type: Boolean
        },
        card: {
            type: Boolean,
            default: false
        },
        emptyText: '当场好货还在精心挑选中~(｡･∀･)ﾉ'
    },
    methods: {
        onClickGoods(id) {
            this.$emit('click', id)
        },
        onClose(res) {
            this.$emit('close', res)
        }
    }
}
</script>

