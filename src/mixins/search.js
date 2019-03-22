export default {
    data() {
        return {
            showSearch: false
        }
    },
    methods: {
        showSearchPage() {
            this.showSearch = true
        },
        hideSearchPage() {
            this.showSearch = false
        }
    }
}
