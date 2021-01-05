module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  assetsDir: 'static',
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '/data/api': {
        target: 'https://oibit.cn',
        changeOrgin: true
      }
    }
  },
  chainWebpack: config => {
    config.externals({
      moment: 'moment'
    })
  }
}
