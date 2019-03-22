<template>
    <div :class="className" :style="customStyle">
        <div :class="className+'__line'" :key="n" v-for="n in lines"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            className: 'vue-content-placeholders-text'
        }
    },
    props: {
        lines: {
            type: Number,
            default: 4
        },
        customStyle: {
            type: String,
            default: ''
        }
    }
}
</script>
