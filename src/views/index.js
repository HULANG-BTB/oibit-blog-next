export default {
  'home-page': () => import(/* webpackChunkName: "home-page" */ './home'),
  article: () => import(/* webpackChunkName: "article" */ './article'),
  archive: () => import(/* webpackChunkName: "archive" */ './archive'),
  about: () => import(/* webpackChunkName: "about" */ './about'),
  'article-admin': () => import(/* webpackChunkName: "article-admin" */ './admin/article'),
  login: () => import(/* webpackChunkName: "login" */ './login'),
  'carousel-admin': () => import(/* webpackChunkName: "carousel-admin" */ './admin/carousel'),
  tag: () => import(/* webpackChunkName: "carousel-admin" */ './tag')
}
