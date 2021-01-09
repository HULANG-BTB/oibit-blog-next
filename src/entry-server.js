import App from './App.vue'
import { createSSRApp } from 'vue'
import mountApp from './main'
import vueRouter from './router'
const { renderToString } = require('@vue/server-renderer')

import Koa from 'koa'
import koaRouter from 'koa-router'

const server = new Koa()
const router = new koaRouter()

router.get('*', async ctx => {
  // const context = {
  //   title: 'vue ssr',
  //   metas: `
  //       <meta name="keyword" content="vue,ssr">
  //       <meta name="description" content="vue srr demo">
  //   `
  // }
  const vueApp = createSSRApp(App)
  mountApp(vueApp)
  vueRouter.push(ctx.url)
  await vueRouter.isReady()
  ctx.body = await renderToString(vueApp)
})

server.use(router.routes(), router.allowedMethods())
server.listen(4000)
