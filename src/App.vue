<script>
import StoreMixin from '@/mixins/store'

export default {
    mixins: [StoreMixin],
    created() {
        console.log('app created')
        this.initSystemInfo()
    }
}
</script>

<style lang="less">
    @import url(./assets/style/iconfont);
    @import url(./assets/style/vant);
    @import url(./assets/style/global);
</style>
