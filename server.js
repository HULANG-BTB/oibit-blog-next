const Koa = require('koa')
// const path = require('path')
// const fs = require('fs')
const koaRouter = require('koa-router')
// const { createBundleRenderer } = require('vue-server-renderer')
const { renderToString } = require('@vue/server-renderer')

const vue = require('./src/entry-server')

const app = new Koa()
const router = koaRouter()
// const serverBundle = require(path.join(__dirname, './dist/entry-client/vue-ssr-client-manifest.json'))
// const clientManifest = require(path.join(__dirname, './dist/entry-client/vue-ssr-client-manifest.json'))

// const renderer = createBundleRenderer(serverBundle, {
//   runInNewContext: false,
//   clientManifest,
//   serializer: () => fs.readFileSync(path.join(__dirname, './dist/entry-client/vue-ssr-client-manifest.json'))
// })

router.get('*', async ctx => {
  // const context = {
  //   title: 'vue ssr',
  //   metas: `
  //       <meta name="keyword" content="vue,ssr">
  //       <meta name="description" content="vue srr demo">
  //   `
  // }
  ctx.body = await renderToString(vue)
})

app.use(router.routes(), router.allowedMethods())
app.listen(4000)
