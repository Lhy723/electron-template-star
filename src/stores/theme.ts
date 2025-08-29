import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type ThemeMode = 'light' | 'dark' | 'auto'
export type ThemeColor = 'blue' | 'green' | 'purple' | 'orange' | 'red'

export interface ThemeConfig {
  mode: ThemeMode
  color: ThemeColor
  sidebarCollapsed: boolean
  showBreadcrumb: boolean
  showTabs: boolean
  showFooter: boolean
  fixedHeader: boolean
  fixedSidebar: boolean
  enableTransition: boolean
  transitionName: string
}

const THEME_KEY = 'electron-template-theme'

// 预设主题配置
export const themePresets = {
  default: {
    mode: 'light' as ThemeMode,
    color: 'blue' as ThemeColor,
    sidebarCollapsed: false,
    showBreadcrumb: true,
    showTabs: true,
    showFooter: true,
    fixedHeader: true,
    fixedSidebar: true,
    enableTransition: true,
    transitionName: 'fade',
  },
  dark: {
    mode: 'dark' as ThemeMode,
    color: 'blue' as ThemeColor,
    sidebarCollapsed: false,
    showBreadcrumb: true,
    showTabs: true,
    showFooter: true,
    fixedHeader: true,
    fixedSidebar: true,
    enableTransition: true,
    transitionName: 'fade',
  },
  minimal: {
    mode: 'light' as ThemeMode,
    color: 'green' as ThemeColor,
    sidebarCollapsed: true,
    showBreadcrumb: false,
    showTabs: false,
    showFooter: false,
    fixedHeader: false,
    fixedSidebar: false,
    enableTransition: false,
    transitionName: 'none',
  },
}

// 主题颜色配置
export const themeColors = {
  blue: {
    primary: '#409eff',
    primaryLight: '#79bbff',
    primaryDark: '#337ecc',
  },
  green: {
    primary: '#67c23a',
    primaryLight: '#95d475',
    primaryDark: '#529b2e',
  },
  purple: {
    primary: '#9c27b0',
    primaryLight: '#ba68c8',
    primaryDark: '#7b1fa2',
  },
  orange: {
    primary: '#ff9800',
    primaryLight: '#ffb74d',
    primaryDark: '#f57c00',
  },
  red: {
    primary: '#f56c6c',
    primaryLight: '#f89898',
    primaryDark: '#dd6161',
  },
}

export const useThemeStore = defineStore('theme', () => {
  // 状态
  const config = ref<ThemeConfig>({
    ...themePresets.default,
  })

  // 计算属性
  const isDark = computed(() => {
    if (config.value.mode === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return config.value.mode === 'dark'
  })

  const currentThemeColor = computed(() => {
    return themeColors[config.value.color]
  })

  // 方法
  const initTheme = () => {
    // 从本地存储加载主题配置
    const savedTheme = localStorage.getItem(THEME_KEY)
    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme)
        config.value = { ...config.value, ...parsed }
      } catch (error) {
        console.error('解析主题配置失败:', error)
      }
    }

    // 应用主题
    applyTheme()

    // 监听系统主题变化
    if (config.value.mode === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', applyTheme)
    }
  }

  const applyTheme = () => {
    const html = document.documentElement

    // 应用暗色模式
    if (isDark.value) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }

    // 应用主题颜色
    const colors = currentThemeColor.value
    html.style.setProperty('--el-color-primary', colors.primary)
    html.style.setProperty('--el-color-primary-light-3', colors.primaryLight)
    html.style.setProperty('--el-color-primary-dark-2', colors.primaryDark)

    // 应用CSS变量
    html.style.setProperty('--theme-primary', colors.primary)
    html.style.setProperty('--theme-primary-light', colors.primaryLight)
    html.style.setProperty('--theme-primary-dark', colors.primaryDark)
  }

  const setThemeMode = (mode: ThemeMode) => {
    config.value.mode = mode
    applyTheme()
    saveTheme()
  }

  const setThemeColor = (color: ThemeColor) => {
    config.value.color = color
    applyTheme()
    saveTheme()
  }

  const toggleDark = () => {
    const newMode = isDark.value ? 'light' : 'dark'
    setThemeMode(newMode)
  }

  const setSidebarCollapsed = (collapsed: boolean) => {
    config.value.sidebarCollapsed = collapsed
    saveTheme()
  }

  const toggleSidebar = () => {
    config.value.sidebarCollapsed = !config.value.sidebarCollapsed
    saveTheme()
  }

  const updateConfig = (newConfig: Partial<ThemeConfig>) => {
    config.value = { ...config.value, ...newConfig }
    applyTheme()
    saveTheme()
  }

  const loadPreset = (presetName: keyof typeof themePresets) => {
    config.value = { ...themePresets[presetName] }
    applyTheme()
    saveTheme()
  }

  const resetTheme = () => {
    config.value = { ...themePresets.default }
    applyTheme()
    saveTheme()
  }

  const saveTheme = () => {
    localStorage.setItem(THEME_KEY, JSON.stringify(config.value))
  }

  const exportTheme = () => {
    return JSON.stringify(config.value, null, 2)
  }

  const importTheme = (themeJson: string) => {
    try {
      const imported = JSON.parse(themeJson)
      config.value = { ...config.value, ...imported }
      applyTheme()
      saveTheme()
      return true
    } catch (error) {
      console.error('导入主题配置失败:', error)
      return false
    }
  }

  return {
    // 状态
    config,

    // 计算属性
    isDark,
    currentThemeColor,

    // 方法
    initTheme,
    applyTheme,
    setThemeMode,
    setThemeColor,
    toggleDark,
    setSidebarCollapsed,
    toggleSidebar,
    updateConfig,
    loadPreset,
    resetTheme,
    saveTheme,
    exportTheme,
    importTheme,
  }
})
