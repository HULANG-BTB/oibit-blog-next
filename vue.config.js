const env = process.env.NODE_ENV
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  assetsDir: 'static',
  productionSourceMap: false,
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

    config.when(env === 'production', config => {
      config.plugin('compressionPlugin').use(
        new CompressionWebpackPlugin({
          minRatio: 0.8,
          algorithm: 'gzip',
          threshold: 10240,
          test: new RegExp('\\.(js|json|css)$')
        })
      )
    })
  }
}
