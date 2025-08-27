import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useMenuStore } from '@/stores/menu'
import Layout from '@/layout/index.vue'

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      hidden: true
    }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '仪表盘',
          icon: 'Dashboard',
          affix: true
        }
      }
    ]
  },
  {
    path: '/components',
    component: Layout,
    redirect: '/components/button',
    meta: {
      title: '组件示例',
      icon: 'Grid'
    },
    children: [
      {
        path: 'button',
        name: 'ButtonDemo',
        component: () => import('@/views/components/button/index.vue'),
        meta: {
          title: '按钮组件',
          icon: 'Mouse'
        }
      },
      {
        path: 'form',
        name: 'FormDemo',
        component: () => import('@/views/components/form/index.vue'),
        meta: {
          title: '表单组件',
          icon: 'Document'
        }
      },
      {
        path: 'table',
        name: 'TableDemo',
        component: () => import('@/views/components/table/index.vue'),
        meta: {
          title: '表格组件',
          icon: 'Grid'
        }
      }
    ]
  },
  {
    path: '/theme',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Theme',
        component: () => import('@/views/theme/index.vue'),
        meta: {
          title: '主题设置',
          icon: 'Brush'
        }
      }
    ]
  },
  {
    path: '/settings',
    component: Layout,
    redirect: '/settings/user',
    meta: {
      title: '系统设置',
      icon: 'Setting'
    },
    children: [
      {
        path: 'user',
        name: 'UserSettings',
        component: () => import('@/views/settings/user/index.vue'),
        meta: {
          title: '用户设置',
          icon: 'User'
        }
      },
      {
        path: 'system',
        name: 'SystemSettings',
        component: () => import('@/views/settings/system/index.vue'),
        meta: {
          title: '系统设置',
          icon: 'Tools'
        }
      }
    ]
  }
]

// 动态路由
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/users',
    meta: {
      title: '系统管理',
      icon: 'Lock',
      roles: ['admin']
    },
    children: [
      {
        path: 'users',
        name: 'UserManagement',
        component: () => import('@/views/admin/users/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'UserFilled',
          roles: ['admin']
        }
      },
      {
        path: 'roles',
        name: 'RoleManagement',
        component: () => import('@/views/admin/roles/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'Avatar',
          roles: ['admin']
        }
      }
    ]
  }
]

// 404路由
export const notFoundRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import('@/views/error/404.vue'),
  meta: {
    title: '页面不存在',
    hidden: true
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const menuStore = useMenuStore()

  // 设置页面标题
  if (to.meta?.title) {
    document.title = `${to.meta.title} - Electron Template Star`
  }

  // 如果是登录页面，直接放行
  if (to.path === '/login') {
    if (userStore.token) {
      next({ path: '/' })
    } else {
      next()
    }
    return
  }

  // 检查是否已登录
  if (!userStore.token) {
    next({ path: '/login', query: { redirect: to.fullPath } })
    return
  }

  // 检查是否已获取用户信息
  if (!userStore.userInfo) {
    try {
      await userStore.getUserInfo()
      await menuStore.generateRoutes(userStore.roles)
      
      // 动态添加路由
      menuStore.addRoutes.forEach(route => {
        router.addRoute(route)
      })
      
      // 添加404路由
      router.addRoute(notFoundRoute)
      
      next({ ...to, replace: true })
    } catch (error) {
      console.error('获取用户信息失败:', error)
      userStore.logout()
      next({ path: '/login' })
    }
    return
  }

  // 权限检查
  if (to.meta?.roles && !hasPermission(userStore.roles, to.meta.roles as string[])) {
    next({ path: '/403' })
    return
  }

  next()
})

// 权限检查函数
function hasPermission(userRoles: string[], routeRoles: string[]): boolean {
  if (!routeRoles || routeRoles.length === 0) {
    return true
  }
  return userRoles.some(role => routeRoles.includes(role))
}

export default router