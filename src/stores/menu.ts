import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { constantRoutes } from '@/router'

export interface MenuItem {
  id: string
  title: string
  icon?: string
  path: string
  component?: string
  redirect?: string
  hidden?: boolean
  alwaysShow?: boolean
  roles?: string[]
  permissions?: string[]
  children?: MenuItem[]
  meta?: {
    title: string
    icon?: string
    hidden?: boolean
    affix?: boolean
    roles?: string[]
    permissions?: string[]
    noCache?: boolean
    breadcrumb?: boolean
  }
}

export const useMenuStore = defineStore('menu', () => {
  // 状态
  const routes = ref<RouteRecordRaw[]>([]) // 所有路由
  const addRoutes = ref<RouteRecordRaw[]>([]) // 动态添加的路由
  const menuList = ref<MenuItem[]>([]) // 菜单列表
  const activeMenu = ref<string>('') // 当前激活的菜单
  const openedMenus = ref<string[]>([]) // 展开的菜单
  const cachedViews = ref<string[]>([]) // 缓存的视图
  const visitedViews = ref<MenuItem[]>([]) // 访问过的视图（标签页）

  // 计算属性
  const sidebarMenus = computed(() => {
    return filterMenus(menuList.value)
  })

  const breadcrumbList = computed(() => {
    const matched = findMenuPath(menuList.value, activeMenu.value)
    return matched.filter(item => item.meta?.breadcrumb !== false)
  })

  // 方法
  const generateRoutes = async (): Promise<RouteRecordRaw[]> => {
    routes.value = constantRoutes

    // 生成菜单列表
    menuList.value = generateMenus(routes.value)

    return []
  }

  const generateMenus = (routes: RouteRecordRaw[]): MenuItem[] => {
    const menus: MenuItem[] = []

    routes.forEach(route => {
      if (!route.meta?.hidden) {
        const menu: MenuItem = {
          id: (route.name as string) || route.path,
          title: route.meta?.title || route.path,
          icon: route.meta?.icon,
          path: route.path,
          component: route.component as string,
          redirect: route.redirect as string,
          hidden: route.meta?.hidden,
          roles: route.meta?.roles,
          permissions: route.meta?.permissions,
          meta: route.meta,
        }

        if (route.children && route.children.length > 0) {
          menu.children = generateMenus(route.children)
        }

        menus.push(menu)
      }
    })

    return menus
  }

  const filterMenus = (menus: MenuItem[]): MenuItem[] => {
    return menus.filter(menu => {
      if (menu.hidden) return false

      if (menu.children) {
        menu.children = filterMenus(menu.children)
        return menu.children.length > 0 || menu.alwaysShow
      }

      return true
    })
  }

  const findMenuPath = (menus: MenuItem[], path: string): MenuItem[] => {
    for (const menu of menus) {
      if (menu.path === path) {
        return [menu]
      }

      if (menu.children) {
        const childPath = findMenuPath(menu.children, path)
        if (childPath.length > 0) {
          return [menu, ...childPath]
        }
      }
    }
    return []
  }

  const setActiveMenu = (path: string) => {
    activeMenu.value = path
  }

  const toggleMenu = (menuId: string) => {
    const index = openedMenus.value.indexOf(menuId)
    if (index > -1) {
      openedMenus.value.splice(index, 1)
    } else {
      openedMenus.value.push(menuId)
    }
  }

  const openMenu = (menuId: string) => {
    if (!openedMenus.value.includes(menuId)) {
      openedMenus.value.push(menuId)
    }
  }

  const closeMenu = (menuId: string) => {
    const index = openedMenus.value.indexOf(menuId)
    if (index > -1) {
      openedMenus.value.splice(index, 1)
    }
  }

  const addVisitedView = (view: MenuItem) => {
    if (visitedViews.value.some(v => v.path === view.path)) return

    visitedViews.value.push({
      ...view,
      title: view.meta?.title || view.title,
    })
  }

  const addCachedView = (view: MenuItem) => {
    if (cachedViews.value.includes(view.id)) return
    if (!view.meta?.noCache) {
      cachedViews.value.push(view.id)
    }
  }

  const delVisitedView = (view: MenuItem): Promise<MenuItem[]> => {
    return new Promise(resolve => {
      const index = visitedViews.value.findIndex(v => v.path === view.path)
      if (index > -1) {
        visitedViews.value.splice(index, 1)
      }
      resolve([...visitedViews.value])
    })
  }

  const delCachedView = (view: MenuItem): Promise<string[]> => {
    return new Promise(resolve => {
      const index = cachedViews.value.indexOf(view.id)
      if (index > -1) {
        cachedViews.value.splice(index, 1)
      }
      resolve([...cachedViews.value])
    })
  }

  const delOthersVisitedViews = (view: MenuItem): Promise<MenuItem[]> => {
    return new Promise(resolve => {
      visitedViews.value = visitedViews.value.filter(v => {
        return v.meta?.affix || v.path === view.path
      })
      resolve([...visitedViews.value])
    })
  }

  const delOthersCachedViews = (view: MenuItem): Promise<string[]> => {
    return new Promise(resolve => {
      const index = cachedViews.value.indexOf(view.id)
      if (index > -1) {
        cachedViews.value = cachedViews.value.slice(index, index + 1)
      } else {
        cachedViews.value = []
      }
      resolve([...cachedViews.value])
    })
  }

  const delAllVisitedViews = (): Promise<MenuItem[]> => {
    return new Promise(resolve => {
      visitedViews.value = visitedViews.value.filter(view => view.meta?.affix)
      resolve([...visitedViews.value])
    })
  }

  const delAllCachedViews = (): Promise<string[]> => {
    return new Promise(resolve => {
      cachedViews.value = []
      resolve([...cachedViews.value])
    })
  }

  const updateVisitedView = (view: MenuItem) => {
    const index = visitedViews.value.findIndex(v => v.path === view.path)
    if (index > -1) {
      visitedViews.value[index] = { ...visitedViews.value[index], ...view }
    }
  }

  const resetMenuState = () => {
    routes.value = []
    addRoutes.value = []
    menuList.value = []
    activeMenu.value = ''
    openedMenus.value = []
    cachedViews.value = []
    visitedViews.value = []
  }

  return {
    // 状态
    routes,
    addRoutes,
    menuList,
    activeMenu,
    openedMenus,
    cachedViews,
    visitedViews,

    // 计算属性
    sidebarMenus,
    breadcrumbList,

    // 方法
    generateRoutes,
    generateMenus,
    filterAsyncRoutes,
    hasPermission,
    filterMenus,
    findMenuPath,
    setActiveMenu,
    toggleMenu,
    openMenu,
    closeMenu,
    addVisitedView,
    addCachedView,
    delVisitedView,
    delCachedView,
    delOthersVisitedViews,
    delOthersCachedViews,
    delAllVisitedViews,
    delAllCachedViews,
    updateVisitedView,
    resetMenuState,
  }
})
