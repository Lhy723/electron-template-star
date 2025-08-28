import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'
import AppLayout from '@/components/layout/app-layout.vue'

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: '登录',
      hidden: true
    }
  },
  {
    path: '/',
    component: AppLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard.vue'),
        meta: {
          title: '仪表盘',
          icon: 'Odometer',
          affix: true
        }
      },
      {
        path: 'components',
        name: 'Components',
        component: () => import('@/views/components.vue'),
        meta: {
          title: '组件示例',
          icon: 'Grid'
        }
      },
      {
        path: 'theme',
        name: 'Theme',
        component: () => import('@/views/theme.vue'),
        meta: {
          title: '主题设置',
          icon: 'Brush'
        }
      }
    ]
  }
]



// 404路由
const notFoundRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  redirect: '/dashboard',
  meta: {
    title: '页面不存在',
    hidden: true
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...constantRoutes, notFoundRoute],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  // 设置页面标题
  if (to.meta?.title) {
    document.title = `${to.meta.title} - Electron Template Star`
  }

  // 如果是登录页面，直接放行
  if (to.path === '/login') {
    if (userStore.isLoggedIn) {
      next({ path: '/' })
    } else {
      next()
    }
    return
  }

  // 检查是否已登录
  if (!userStore.isLoggedIn) {
    next({ path: '/login', query: { redirect: to.fullPath } })
    return
  }

  next()
})

export default router