const env = process.env.NODE_ENV
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  assetsDir: 'assets',
  productionSourceMap: false,
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '^/api': {
        target: 'https://oibit.cn',
        changeOrgin: true
      },
      '^/static': {
        target: 'https://oibit.cn',
        changeOrgin: true
      }
    }
  },
  chainWebpack: config => {
    config.externals({
      dayjs: 'dayjs'
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
  },
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass') // This line must in sass option
      }
    }
  }
}
