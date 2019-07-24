import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },

  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'el-icon-my-branchOffice' }
    }]
  },
  {
    path: '/elements',
    component: Layout,
    redirect: '/elements/element',
    alwaysShow: true,
    meta: { title: 'Element', icon: 'el-icon-my-element' },
    children: [{
      path: 'element',
      name: 'element',
      component: () => import('@/views/element/index'),
      meta: { title: 'Element组件' }
    }]
  },
  {
    path: '/menu1',
    component: Layout,
    redirect: '/menu1/doem1',
    name: 'Menu1',
    meta: { title: 'Menu1', icon: 'el-icon-my-medicalExamination' },
    children: [
      {
        path: 'doem1',
        name: 'Menu1Doem1',
        component: () => import('@/views/menu1/demo1.vue'),
        meta: { title: 'Menu1Doem1' }
      },
      {
        path: 'doem2',
        name: 'Menu1Doem2',
        component: () => import('@/views/menu1/demo2.vue'),
        meta: { title: 'Menu1Doem2' }
      },
      {
        path: 'doem3',
        name: 'Menu1Doem3',
        component: () => import('@/views/menu1/demo3.vue'),
        meta: { title: 'Menu1Doem3' }
      },
      {
        path: 'doem4',
        name: 'Menu1Doem4',
        component: () => import('@/views/menu1/demo4.vue'),
        meta: { title: 'Menu1Doem4', hidden: true },
        hidden: true
      }
    ]
  },
  {
    path: '/menu2',
    component: Layout,
    redirect: '/menu2/doem1',
    name: 'Menu2',
    meta: { title: 'Menu2', icon: 'el-icon-my-enterprise' },
    children: [
      {
        path: 'doem1',
        name: 'Menu2Doem1',
        component: () => import('@/views/menu2/demo1.vue'),
        meta: { title: 'Menu2Doem1' }
      },
      {
        path: 'doem2',
        name: 'Menu2Doem2',
        component: () => import('@/views/menu2/demo2.vue'),
        meta: { title: 'Menu2Doem2' }
      },
      {
        path: 'doem3',
        name: 'Menu2Doem3',
        component: () => import('@/views/menu2/demo3.vue'),
        meta: { title: 'Menu2Doem3' }
      },
    ]
  },
  {
    path: '/menu3',
    component: Layout,
    redirect: '/menu3/doem1',
    name: 'Menu3',
    meta: { title: 'Menu3', icon: 'el-icon-my-overview' },
    children: [
      {
        path: 'doem1',
        name: 'Menu3Doem1',
        component: () => import('@/views/menu3/demo1.vue'),
        meta: { title: 'Menu3Doem1' }
      },
      {
        path: 'doem2',
        name: 'Menu3Doem2',
        component: () => import('@/views/menu3/demo2.vue'),
        meta: { title: 'Menu3Doem2' }
      },
      {
        path: 'doem3',
        name: 'Menu3Doem3',
        component: () => import('@/views/menu3/demo3.vue'),
        meta: { title: 'Menu3Doem3' }
      },
    ]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// 清空动态添加的路由数据
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
