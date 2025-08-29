import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import router from '@/router'

export interface UserInfo {
  id: string
  username: string
  nickname: string
  email: string
  avatar: string
  roles: string[]
  permissions: string[]
  lastLoginTime: string
  createTime: string
}

export interface LoginForm {
  username: string
  password: string
  remember: boolean
}

const TOKEN_KEY = 'electron-template-token'
const USER_INFO_KEY = 'electron-template-user-info'

export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref<string>('')
  const userInfo = ref<UserInfo | null>(null)
  const roles = ref<string[]>([])
  const permissions = ref<string[]>([])

  // 方法
  const initUserStore = () => {
    // 从本地存储恢复token和用户信息
    const savedToken = localStorage.getItem(TOKEN_KEY)
    const savedUserInfo = localStorage.getItem(USER_INFO_KEY)

    if (savedToken) {
      token.value = savedToken
    }

    if (savedUserInfo) {
      try {
        const parsed = JSON.parse(savedUserInfo)
        userInfo.value = parsed
        roles.value = parsed.roles || []
        permissions.value = parsed.permissions || []
      } catch (error) {
        console.error('解析用户信息失败:', error)
        clearUserData()
      }
    }
  }

  const login = async (loginForm: LoginForm): Promise<boolean> => {
    try {
      // 模拟登录API调用
      const response = await mockLogin(loginForm)

      if (response.success) {
        token.value = response.data.token
        localStorage.setItem(TOKEN_KEY, token.value)

        // 获取用户信息
        await getUserInfo()

        return true
      } else {
        throw new Error(response.message || '登录失败')
      }
    } catch (error) {
      console.error('登录失败:', error)
      return false
    }
  }

  const getUserInfo = async (): Promise<UserInfo | null> => {
    try {
      // 模拟获取用户信息API调用
      const response = await mockGetUserInfo(token.value)

      if (response.success) {
        userInfo.value = response.data
        roles.value = response.data.roles
        permissions.value = response.data.permissions

        localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo.value))

        return userInfo.value
      } else {
        throw new Error(response.message || '获取用户信息失败')
      }
    } catch (error) {
      console.error('获取用户信息失败:', error)
      return null
    }
  }

  const logout = async () => {
    try {
      // 模拟登出API调用
      await mockLogout(token.value)
    } catch (error) {
      console.error('登出失败:', error)
    } finally {
      clearUserData()
      router.push('/login')
    }
  }

  const clearUserData = () => {
    token.value = ''
    userInfo.value = null
    roles.value = []
    permissions.value = []
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_INFO_KEY)
  }

  const updateUserInfo = (newUserInfo: Partial<UserInfo>) => {
    if (userInfo.value) {
      userInfo.value = { ...userInfo.value, ...newUserInfo }
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo.value))
    }
  }

  const hasRole = (role: string): boolean => {
    return roles.value.includes(role)
  }

  const hasPermission = (permission: string): boolean => {
    return permissions.value.includes(permission)
  }

  const hasAnyRole = (roleList: string[]): boolean => {
    return roleList.some(role => roles.value.includes(role))
  }

  const hasAnyPermission = (permissionList: string[]): boolean => {
    return permissionList.some(permission => permissions.value.includes(permission))
  }

  // 计算属性
  const isLoggedIn = computed(() => {
    return !!token.value && !!userInfo.value
  })

  return {
    // 状态
    token,
    userInfo,
    roles,
    permissions,

    // 计算属性
    isLoggedIn,

    // 方法
    initUserStore,
    login,
    getUserInfo,
    logout,
    clearUserData,
    updateUserInfo,
    hasRole,
    hasPermission,
    hasAnyRole,
    hasAnyPermission,
  }
})

// 模拟API函数
interface ApiResponse<T = any> {
  success: boolean
  data: T
  message?: string
}

const mockLogin = async (loginForm: LoginForm): Promise<ApiResponse<{ token: string }>> => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000))

  // 简单的用户名密码验证
  if (loginForm.username === 'admin' && loginForm.password === 'admin123') {
    return {
      success: true,
      data: {
        token: 'mock-admin-token-' + Date.now(),
      },
    }
  } else if (loginForm.username === 'user' && loginForm.password === 'user123') {
    return {
      success: true,
      data: {
        token: 'mock-user-token-' + Date.now(),
      },
    }
  } else {
    return {
      success: false,
      data: { token: '' },
      message: '用户名或密码错误',
    }
  }
}

const mockGetUserInfo = async (token: string): Promise<ApiResponse<UserInfo>> => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500))

  if (token.includes('admin')) {
    return {
      success: true,
      data: {
        id: '1',
        username: 'admin',
        nickname: '管理员',
        email: 'admin@example.com',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        roles: ['admin', 'user'],
        permissions: [
          'user:read',
          'user:write',
          'user:delete',
          'role:read',
          'role:write',
          'role:delete',
        ],
        lastLoginTime: new Date().toISOString(),
        createTime: '2023-01-01T00:00:00.000Z',
      },
    }
  } else if (token.includes('user')) {
    return {
      success: true,
      data: {
        id: '2',
        username: 'user',
        nickname: '普通用户',
        email: 'user@example.com',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        roles: ['user'],
        permissions: ['user:read'],
        lastLoginTime: new Date().toISOString(),
        createTime: '2023-01-01T00:00:00.000Z',
      },
    }
  } else {
    return {
      success: false,
      data: {} as UserInfo,
      message: 'Token无效',
    }
  }
}

const mockLogout = async (_token: string): Promise<void> => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 300))

  return {
    success: true,
    data: null,
    message: '登出成功',
  }
}
