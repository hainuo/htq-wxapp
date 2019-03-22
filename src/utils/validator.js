// 正则匹配
const Pattern = {
    isEmpty: /(^\s*)|(\s*$)/g
}

export const validator = {
    /**
     * 执行正则表达式
     * @param pattern 校验的正则表达式
     * @param strValue 校验的值
     * @returns {boolean}
     */
    executeExp(pattern, strValue) {
        return pattern.test(strValue)
    },
    /**
     * 判断字符串是否为空
     * @param strValue 校验的值
     * @returns {boolean}
     */
    isEmpty(strValue) {
        return (
            strValue == null ||
            typeof strValue === 'undefined' ||
            strValue.replace(Pattern.isEmpty, '').length === 0
        )
    },
    /**
     * 判断字符串是否非空
     * @param strValue 校验的值
     * @returns {boolean}
     */
    isNotEmpty(strValue) {
        return !this.isEmpty(strValue)
    },
    /**
     * 对象是否为空
     * @param obj 检验对象
     * @returns {boolean}
     */
    isEmptyObj(obj) {
        return (
            obj == null ||
            typeof obj === 'undefined' ||
            Object.keys(obj).length === 0
        )
    },
    /**
     * 判断字符串是否非空
     * @param obj 检验对象
     * @returns {boolean}
     */
    isNotEmptyObj(obj) {
        return !this.isEmptyObj(obj)
    },
    /**
     * 是否在范围长度内
     * @param strValue 范围数组 [1, 10] 长度在1-10内
     * @param lenArr 范围数组 [1, 10] 长度在1-10内
     * @returns {boolean}
     */
    isLenRange(strValue, lenArr) {
        return strValue.length >= lenArr[0] && strValue.length <= lenArr[1]
    },
    /**
     * 是否在数值范围内
     * @param numValue 范围数组 [1, 10] 数值在1-10内
     * @param numArr 范围数组 [1, 10] 数值在1-10内
     * @returns {boolean}
     */
    isNumRange(numValue, numArr) {
        return numValue >= numArr[0] && numValue <= numArr[1]
    }
}
