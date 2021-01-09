const env = process.env.NODE_ENV
// const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
// const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const nodeExternals = require('webpack-node-externals')

const CompressionWebpackPlugin = require('compression-webpack-plugin')
const TARGET_NODE = process.env.WEBPACK_TARGET === 'node'
const target = TARGET_NODE ? 'server' : 'client'

module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  assetsDir: 'static',
  productionSourceMap: false,
  outputDir: `./dist/entry-${target}`,
  configureWebpack: () => ({
    entry: `./src/entry-${target}.js`,
    target: TARGET_NODE ? 'node' : 'web',
    output: {
      libraryTarget: TARGET_NODE ? 'commonjs2' : undefined
    }
    // plugins: [TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()],
    // optimization: { splitChunks: TARGET_NODE ? false : undefined }
  }),
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrgin: true
      }
    }
  },
  chainWebpack: config => {
    if (TARGET_NODE) {
      config.externals(
        nodeExternals({
          allowlist: [/\.css$/]
        })
      )
    } else {
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
}
