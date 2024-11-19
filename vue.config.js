module.exports = {
  // 如果環境是生產模式，就使用 gitHub pages 路徑，不然就用根目錄
  publicPath:
    process.env.NODE_ENV === 'production' ? '/Taiwan-Tourism-Attraction/' : '/',

  // 本地預覽 file:// 改為相對路徑 './'
  // publicPath: './'

  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'Taiwan Tourism Attraction'
      args[0].keywords = '台灣旅遊景點導覽'
      args[0].description = '全台觀光景點報你知，交通餐飲旅宿通通有！'
      return args
    })
  },

  // 使用 scss 全域變數
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "~@/assets/scss/utils/_variables.scss";
          @import "~@/assets/scss/utils/_mixins.scss";
        `
      }
    }
  }
}
