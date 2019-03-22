export const formatter = {
    formatTime(date, format) {
        Date.prototype.Format = function(fmt) {
            let o = {
                'M+': date.getMonth() + 1,
                'd+': date.getDate(),
                'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
                'H+': date.getHours(),
                'm+': date.getMinutes(),
                's+': date.getSeconds(),
                'q+': Math.floor((date.getMonth() + 3) / 3),
                S: date.getMilliseconds()
            }
            let week = {
                '0': '\u65e5',
                '1': '\u4e00',
                '2': '\u4e8c',
                '3': '\u4e09',
                '4': '\u56db',
                '5': '\u4e94',
                '6': '\u516d'
            }
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(
                    RegExp.$1,
                    (date.getFullYear() + '').substr(4 - RegExp.$1.length)
                )
            }
            if (/(E+)/.test(fmt)) {
                fmt = fmt.replace(
                    RegExp.$1,
                    (RegExp.$1.length > 1
                        ? RegExp.$1.length > 2
                            ? '\u661f\u671f'
                            : '\u5468'
                        : '') + week[date.getDay() + '']
                )
            }
            for (let k in o) {
                if (new RegExp('(' + k + ')').test(fmt)) {
                    fmt = fmt.replace(
                        RegExp.$1,
                        RegExp.$1.length === 1
                            ? o[k]
                            : ('00' + o[k]).substr(('' + o[k]).length)
                    )
                }
            }
            return fmt
        }
        if (!date) {
            return ''
        }
        if (typeof date === 'string') {
            date = new Date(date.replace(/-/g, '/'))
        }
        if (typeof date === 'number') {
            date = new Date(date)
        }
        if (!format) {
            format = 'yyyy-MM-dd HH:mm:ss'
        }
        return date.Format(format)
    },
    encodeHtml(str) {
        if (typeof str !== 'string') return ''
        let s = str.replace(/&/g, '&amp;')
        s = s.replace(/</g, '&lt;')
        s = s.replace(/>/g, '&gt;')
        s = s.replace(/ /g, '&nbsp;')
        s = s.replace(/'/g, '&#39;')
        s = s.replace(/"/g, '&quot;')
        return s
    },
    decodeHtml(str) {
        if (typeof str !== 'string') return ''
        let s = str.replace(/&amp;/g, '&')
        s = s.replace(/&lt;/g, '<')
        s = s.replace(/&gt;/g, '>')
        s = s.replace(/&nbsp;/g, ' ')
        s = s.replace(/&#39;/g, '\'')
        s = s.replace(/&quot;/g, '"')
        return s
    }
}
