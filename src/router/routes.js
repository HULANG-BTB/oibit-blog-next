import BaseLayout from '@/layout/base-layout'
import AdminLayout from '@/layout/admin-layout'
import asyncComponents from '@/views'

export default [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: '/Admin',
    component: AdminLayout,
    meta: {
      needAuth: true
    },
    children: [
      {
        path: '',
        redirect: { name: 'ArticleAdmin' }
      },
      {
        path: 'Article',
        name: 'ArticleAdmin',
        component: asyncComponents['article-admin'],
        meta: {
          needAuth: true
        }
      },
      {
        path: 'Carousel',
        name: 'CarouselAdmin',
        component: asyncComponents['carousel-admin'],
        meta: {
          needAuth: true
        }
      }
    ]
  },
  {
    path: '/Login',
    name: 'Login',
    component: asyncComponents['login']
  },
  {
    path: '/',
    component: BaseLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: asyncComponents['home-page']
      },
      {
        path: 'Article/:id',
        name: 'Article',
        component: asyncComponents['article']
      },
      {
        path: 'Category',
        name: 'Category',
        component: asyncComponents['article']
      },
      {
        path: 'Tag',
        name: 'Tag',
        redirect: { name: 'TagList' },
        component: asyncComponents['router-view'],
        children: [
          {
            path: 'List',
            name: 'TagList',
            component: asyncComponents['tag-list']
          }
        ]
      },
      {
        path: 'Archive',
        name: 'Archive',
        component: asyncComponents['archive']
      },
      {
        path: 'About',
        name: 'About',
        component: asyncComponents['about']
      }
    ]
  }
]
