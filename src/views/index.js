export default {
  'home-page': () => import(/* webpackChunkName: "home-page" */ './home'),
  article: () => import(/* webpackChunkName: "article" */ './article'),
  archive: () => import(/* webpackChunkName: "archive" */ './archive'),
  about: () => import(/* webpackChunkName: "about" */ './about')
}
