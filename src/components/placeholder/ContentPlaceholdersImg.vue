<template>
    <div :class="className" :style="customStyle"></div>
</template>

<script>
export default {
    data() {
        return {
            className: 'vue-content-placeholders-img'
        }
    },
    props: {
        customStyle: {
            type: String,
            default: ''
        }
    }
}
</script>
