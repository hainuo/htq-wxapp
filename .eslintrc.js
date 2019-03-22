// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: false,
        node: true,
        es6: true
    },
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    'rules': {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        // 强制使用一致的缩进
        'indent': ['error', 4],
        // 强制在 function的左括号之前使用一致的空格
        'space-before-function-paren': ['error', 'never'],
        // 禁止扩展原生类型
        'no-extend-native': ['error', { 'exceptions': ['Date'] }],
        // 要求使用 Error 对象作为 Promise 拒绝的原因
        'prefer-promise-reject-errors': ['error', { 'allowEmptyReject': true }]
    },
    globals: {
        App: true,
        Page: true,
        wx: true,
        swan: true,
        tt: true,
        my: true,
        getApp: true,
        getPage: true,
        requirePlugin: true,
        mpvue: true,
        mpvuePlatform: true
    }
}
