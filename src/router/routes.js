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
    children: [
      {
        path: '',
        redirect: 'ArticleAdmin'
      },
      {
        path: 'Article',
        name: 'ArticleAdmin',
        component: asyncComponents['article-admin']
      }
    ]
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
        component: asyncComponents['article']
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
