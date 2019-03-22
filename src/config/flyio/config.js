import Api from '@/config/api'
export default {
    fly: {
        // 请求头
        headers: {
            // "content-type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        // 请求基地址
        baseURL: Api.common.baseURL,
        // 是否自动将Content-Type为“application/json”的响应数据转化为JSON对象，默认为true
        parseJson: true,
        // 超时时间
        timeout: 0,
        // 携带cookie
        withCredentials: true,
        // 重试次数
        retry: 1,
        // 重试延迟
        retryDelay: 500
    },
    // 运行成功的判别标识
    success: {
        key: 'code', // 与后台规定的表示响应成功的变量
        value: 200 // 与后台规定的表示响应成功code
    }
}
