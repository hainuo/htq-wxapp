const common = {
    baseURL:
        process.env.NODE_ENV !== 'production'
            ? 'http://dev.server:9000/'
            : '线上域名',
    html2wxml: 'wx/app/html2wxml',
    audit: 'wx/app/wx8ce594b8f0c482f8/config/audit',
    poster: 'wx/app/wx8ce594b8f0c482f8/poster'
}
export default {
    common
}
