import Config from './config'
import Fly from 'flyio'
import utils from '@/utils'

const fly = new Fly()

Object.assign(fly.config, Config.fly)
// 添加请求拦截器
fly.interceptors.request.use(request => {
    // 给所有请求添加自定义header
    // request.headers["X-Tag"] = "flyio";
    // 打印出请求体
    console.log(
        utils.formatter.formatTime(new Date(), 'yyyy-MM-dd HH:mm:ss:S')
    )
    console.log(request)
    // 终止请求
    // var err=new Error("xxx")
    // err.request=request
    // return Promise.reject(new Error(""))
    // 可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
    return request
})

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
    response => {
        if (response.data[Config.success.key] === Config.success.value) {
            // 只将请求结果的data字段返回
            return response.data
        } else {
            return Promise.reject(response.data)
        }
    },
    err => {
        // 发生网络错误后会走到这里
        let config = err.request
        // If config does not exist or the retry option is not set, reject
        if (!config || !config.retry) {
            utils.toast.fail('网络异常')
            return err
        }
        // Set the variable for keeping track of the retry count
        config.__retryCount = config.__retryCount || 0
        // Check if we've maxed out the total number of retries
        if (config.__retryCount >= config.retry) {
            // Reject with the error
            utils.toast.fail('网络异常')
            return err
        }
        // Increase the retry count
        config.__retryCount += 1
        // Create new promise to handle exponential backoff
        let backoff = new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, config.retryDelay || 1)
        })
        // Return the promise in which recalls axios to retry the request
        return backoff.then(() => {
            return fly.request(config)
        })
    }
)

export default fly
