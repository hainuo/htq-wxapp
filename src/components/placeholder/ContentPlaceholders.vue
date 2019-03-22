<template>
    <div :class="{'vue-content-placeholders': true,
    'vue-content-placeholders-is-rounded': rounded,
    'vue-content-placeholders-is-centered': centered,
    'vue-content-placeholders-is-animated': animated}" :style="customStyle">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        rounded: {
            type: Boolean,
            default: false
        },
        centered: {
            type: Boolean,
            default: false
        },
        animated: {
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

<style lang="scss">
    @import '../../assets/style/placeholder.scss';
</style>
