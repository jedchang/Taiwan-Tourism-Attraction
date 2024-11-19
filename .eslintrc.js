module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/recommended', // 最嚴謹，完全依照建議
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-useless-escape': 'off', // 關閉不必要轉義 (\) 使用
    'new-cap': 'off' // 使用建構函式 new 關閉首字大寫
  }
}
