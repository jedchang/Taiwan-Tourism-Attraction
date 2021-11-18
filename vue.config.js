module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' ? '/Taiwan-Tourism-Attraction/' : '/',
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'Taiwan Tourism Attraction'
      args[0].keywords = '台灣旅遊景點導覽'
      args[0].description = '全台觀光景點報你知，交通餐飲旅宿通通有！'
      return args
    })
  },
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
