// const modulesContext = require.context('./', true, /\.js$/)
// let API = {}
// const chunks = modulesContext.keys().reduce((modules, key) => {
//     if (key !== './index.js') {
//         API = {
//             ...API,
//             ...modulesContext(key).default
//         }
//     }
//     return API
// }, {})
// export default chunks
import {formatter} from './formatter'
import {toast, dialog} from './notification'
import {validator} from './validator'

export default {
    formatter,
    toast,
    dialog,
    validator
}
