<template>
    <div :class="className" :style="customStyle">
        <div :class="className+'__img'" v-if="img"></div>
        <div :class="className+'__content'">
            <div :class="className+'__title'"></div>
            <div :class="className+'__subtitle'"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            className: 'vue-content-placeholders-heading'
        }
    },
    props: {
        img: {
            type: Boolean,
            default: false
        },
        customStyle: {
            type: String,
            default: ''
        }
    }
}
</script>
