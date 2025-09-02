import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { modernDesignTokens } from '../styles/design-tokens'
import type { ModernColorTokens } from '../types/design-tokens'

// 现代主题模式
export type ModernThemeMode = 'light' | 'dark' | 'auto'

// 现代主题配色方案
export type ModernThemeColor = 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'pink' | 'indigo' | 'teal'

// 组件风格类型
export type ComponentStyle = 'modern' | 'classic' | 'minimal' | 'rounded' | 'sharp'

// 毛玻璃强度类型
export type GlassIntensity = 'light' | 'medium' | 'heavy' | 'ultra'

// 交互反馈类型
export type InteractionFeedback = 'none' | 'minimal' | 'standard' | 'enhanced'

// 现代主题配置接口
export interface ModernThemeConfig {
  mode: ModernThemeMode
  color: ModernThemeColor
  componentStyle: ComponentStyle
  enableAnimations: boolean
  enableBlur: boolean
  compactMode: boolean
  reducedMotion: boolean
  highContrast: boolean
  // 新增 iOS 风格选项
  glassIntensity: GlassIntensity
  interactionFeedback: InteractionFeedback
  enableSpringAnimations: boolean
  enableRippleEffect: boolean
  enableBackdropEffects: boolean
  enableParallax: boolean
  enableGradientBackgrounds: boolean
  // 字体设置
  fontFamily: string
  fontSize: number
  fontWeight: string
  // 背景设置
  backgroundImage: string | null
  backgroundSize: 'cover' | 'contain' | 'auto'
  backgroundPosition: string
  backgroundOpacity: number
  enableBackgroundBlur: boolean
}

// 现代主题配置预设
const modernThemePresets: Record<string, ModernThemeConfig> = {
  default: {
    mode: 'light',
    color: 'blue',
    componentStyle: 'modern',
    enableAnimations: true,
    enableBlur: true,
    compactMode: false,
    reducedMotion: false,
    highContrast: false,
    // iOS 风格默认设置
    glassIntensity: 'medium',
    interactionFeedback: 'standard',
    enableSpringAnimations: true,
    enableRippleEffect: true,
    enableBackdropEffects: true,
    enableParallax: false,
    enableGradientBackgrounds: true,
    // 字体默认设置
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: 16,
    fontWeight: '400',
    // 背景默认设置
    backgroundImage: null,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundOpacity: 1,
    enableBackgroundBlur: false
  },
  dark: {
    mode: 'dark',
    color: 'blue',
    componentStyle: 'modern',
    enableAnimations: true,
    enableBlur: true,
    compactMode: false,
    reducedMotion: false,
    highContrast: false,
    glassIntensity: 'medium',
    interactionFeedback: 'standard',
    enableSpringAnimations: true,
    enableRippleEffect: true,
    enableBackdropEffects: true,
    enableParallax: false,
    enableGradientBackgrounds: true,
    // 字体默认设置
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: 16,
    fontWeight: '400',
    // 背景默认设置
    backgroundImage: null,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundOpacity: 1,
    enableBackgroundBlur: false
  },
  minimal: {
    mode: 'light',
    color: 'blue',
    componentStyle: 'minimal',
    enableAnimations: false,
    enableBlur: false,
    compactMode: true,
    reducedMotion: true,
    highContrast: false,
    glassIntensity: 'light',
    interactionFeedback: 'none',
    enableSpringAnimations: false,
    enableRippleEffect: false,
    enableBackdropEffects: false,
    enableParallax: false,
    enableGradientBackgrounds: true,
    // 字体默认设置
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: 14,
    fontWeight: '300',
    // 背景默认设置
    backgroundImage: null,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundOpacity: 1,
    enableBackgroundBlur: false
  },
  classic: {
    mode: 'light',
    color: 'blue',
    componentStyle: 'classic',
    enableAnimations: true,
    enableBlur: false,
    compactMode: false,
    reducedMotion: false,
    highContrast: false,
    glassIntensity: 'light',
    interactionFeedback: 'minimal',
    enableSpringAnimations: false,
    enableRippleEffect: false,
    enableBackdropEffects: false,
    enableParallax: false,
    enableGradientBackgrounds: true
  },
  rounded: {
    mode: 'light',
    color: 'green',
    componentStyle: 'rounded',
    enableAnimations: true,
    enableBlur: true,
    compactMode: false,
    reducedMotion: false,
    highContrast: false,
    glassIntensity: 'heavy',
    interactionFeedback: 'enhanced',
    enableSpringAnimations: true,
    enableRippleEffect: true,
    enableBackdropEffects: true,
    enableParallax: true,
    enableGradientBackgrounds: true
  },
  // 新增 iOS 专业预设
  iosClassic: {
    mode: 'light',
    color: 'blue',
    componentStyle: 'rounded',
    enableAnimations: true,
    enableBlur: true,
    compactMode: false,
    reducedMotion: false,
    highContrast: false,
    glassIntensity: 'ultra',
    interactionFeedback: 'enhanced',
    enableSpringAnimations: true,
    enableRippleEffect: true,
    enableBackdropEffects: true,
    enableParallax: true,
    enableGradientBackgrounds: true
  },
  iosModern: {
    mode: 'dark',
    color: 'purple',
    componentStyle: 'modern',
    enableAnimations: true,
    enableBlur: true,
    compactMode: false,
    reducedMotion: false,
    highContrast: false,
    glassIntensity: 'heavy',
    interactionFeedback: 'enhanced',
    enableSpringAnimations: true,
    enableRippleEffect: true,
    enableBackdropEffects: true,
    enableParallax: false,
    enableGradientBackgrounds: true
  }
}

// 主题色彩映射
const themeColorMap: Record<ModernThemeColor, string> = {
  blue: '#007AFF',
  green: '#34C759',
  purple: '#AF52DE',
  orange: '#FF9500',
  red: '#FF3B30',
  pink: '#FF2D92',
  indigo: '#5856D6',
  teal: '#5AC8FA'
}

export const useModernThemeStore = defineStore('modernTheme', () => {
  // 状态
  const config = ref<ModernThemeConfig>({ ...modernThemePresets.default })
  const systemPrefersDark = ref(false)
  
  // 计算属性
  const isDark = computed(() => {
    if (config.value.mode === 'auto') {
      return systemPrefersDark.value
    }
    return config.value.mode === 'dark'
  })
  
  const currentColorTokens = computed((): ModernColorTokens => {
    return isDark.value 
      ? modernDesignTokens.colors.dark 
      : modernDesignTokens.colors.light
  })
  
  const primaryColor = computed(() => {
    return themeColorMap[config.value.color]
  })
  
  const themeClasses = computed(() => {
    const classes = []
    
    if (isDark.value) {
      classes.push('dark')
    }
    
    classes.push(`theme-color-${config.value.color}`)
    classes.push(`component-style-${config.value.componentStyle}`)
    
    if (config.value.compactMode) {
      classes.push('compact-mode')
    }
    
    if (config.value.reducedMotion) {
      classes.push('reduced-motion')
    }
    
    if (config.value.highContrast) {
      classes.push('high-contrast')
    }
    
    if (!config.value.enableBlur) {
      classes.push('no-blur')
    }
    
    // 新增 iOS 风格类
    classes.push(`glass-${config.value.glassIntensity}`)
    classes.push(`interaction-${config.value.interactionFeedback}`)
    
    if (!config.value.enableSpringAnimations) {
      classes.push('no-spring')
    }
    
    if (!config.value.enableRippleEffect) {
      classes.push('no-ripple')
    }
    
    if (!config.value.enableBackdropEffects) {
      classes.push('no-backdrop')
    }
    
    if (config.value.enableParallax) {
      classes.push('enable-parallax')
    }
    
    if (!config.value.enableGradientBackgrounds) {
      classes.push('no-gradients')
    }
    
    return classes
  })
  
  // 方法
  const updateConfig = (newConfig: Partial<ModernThemeConfig>) => {
    config.value = { ...config.value, ...newConfig }
    saveConfig()
    applyTheme()
  }
  
  const setMode = (mode: ModernThemeMode) => {
    updateConfig({ mode })
  }
  
  const setColor = (color: ModernThemeColor) => {
    updateConfig({ color })
  }
  
  const setComponentStyle = (componentStyle: ComponentStyle) => {
    updateConfig({ componentStyle })
  }
  
  const toggleMode = () => {
    const newMode = isDark.value ? 'light' : 'dark'
    setMode(newMode)
  }
  
  const applyPreset = (presetName: string) => {
    if (modernThemePresets[presetName]) {
      config.value = { ...modernThemePresets[presetName] }
      saveConfig()
      applyTheme()
    }
  }
  
  const saveConfig = () => {
    try {
      localStorage.setItem('modernThemeConfig', JSON.stringify(config.value))
    } catch (error) {
      console.warn('Failed to save theme config:', error)
    }
  }
  
  const loadConfig = () => {
    try {
      const saved = localStorage.getItem('modernThemeConfig')
      if (saved) {
        const savedConfig = JSON.parse(saved)
        config.value = { ...modernThemePresets.default, ...savedConfig }
      }
    } catch (error) {
      console.warn('Failed to load theme config:', error)
    }
  }
  
  const applyTheme = () => {
    const root = document.documentElement
    
    // 应用主题类
    const existingClasses = root.className.split(' ').filter(cls => 
      !cls.startsWith('dark') && 
      !cls.startsWith('theme-color-') &&
      !cls.startsWith('component-style-') &&
      !cls.startsWith('compact-mode') &&
      !cls.startsWith('reduced-motion') &&
      !cls.startsWith('high-contrast') &&
      !cls.startsWith('no-blur') &&
      !cls.startsWith('glass-') &&
      !cls.startsWith('interaction-') &&
      !cls.startsWith('no-spring') &&
      !cls.startsWith('no-ripple') &&
      !cls.startsWith('no-backdrop') &&
      !cls.startsWith('enable-parallax') &&
      !cls.startsWith('no-gradients')
    )
    
    root.className = [...existingClasses, ...themeClasses.value].join(' ')
    
    // 应用主题色彩变量
    root.style.setProperty('--modern-primary-active', primaryColor.value)
    
    // 应用组件风格变量
    applyComponentStyleVariables()
    
    // 应用 iOS 风格变量
    applyiOSStyleVariables()
    
    // 应用系统偏好
    if (config.value.reducedMotion) {
      root.style.setProperty('--modern-duration-fast', '0ms')
      root.style.setProperty('--modern-duration-medium', '0ms')
      root.style.setProperty('--modern-duration-slow', '0ms')
      root.style.setProperty('--ios-duration-fast', '0ms')
      root.style.setProperty('--ios-duration-medium', '0ms')
      root.style.setProperty('--ios-duration-slow', '0ms')
    } else {
      root.style.removeProperty('--modern-duration-fast')
      root.style.removeProperty('--modern-duration-medium')
      root.style.removeProperty('--modern-duration-slow')
      root.style.removeProperty('--ios-duration-fast')
      root.style.removeProperty('--ios-duration-medium')
      root.style.removeProperty('--ios-duration-slow')
    }
    
    // 应用紧凑模式
    if (config.value.compactMode) {
      root.style.setProperty('--modern-spacing-xs', '2px')
      root.style.setProperty('--modern-spacing-sm', '4px')
      root.style.setProperty('--modern-spacing-md', '8px')
      root.style.setProperty('--modern-spacing-lg', '12px')
    } else {
      root.style.removeProperty('--modern-spacing-xs')
      root.style.removeProperty('--modern-spacing-sm')
      root.style.removeProperty('--modern-spacing-md')
      root.style.removeProperty('--modern-spacing-lg')
    }
    
    // 应用字体和背景设置
    applyFontSettings()
    applyBackgroundSettings()
  }
  
  const applyComponentStyleVariables = () => {
    const root = document.documentElement
    const style = config.value.componentStyle
    
    // 重置所有变量
    const styleVariables = [
      '--component-border-radius',
      '--component-border-width', 
      '--component-shadow',
      '--component-padding',
      '--component-font-weight'
    ]
    
    styleVariables.forEach(variable => {
      root.style.removeProperty(variable)
    })
    
    // 根据风格设置变量
    switch (style) {
      case 'modern':
        root.style.setProperty('--component-border-radius', 'var(--modern-radius-md)')
        root.style.setProperty('--component-border-width', '1px')
        root.style.setProperty('--component-shadow', 'var(--modern-shadow-sm)')
        root.style.setProperty('--component-padding', 'var(--modern-spacing-md)')
        root.style.setProperty('--component-font-weight', '500')
        break
      case 'classic':
        root.style.setProperty('--component-border-radius', 'var(--modern-radius-xs)')
        root.style.setProperty('--component-border-width', '1px')
        root.style.setProperty('--component-shadow', 'none')
        root.style.setProperty('--component-padding', 'var(--modern-spacing-sm)')
        root.style.setProperty('--component-font-weight', '400')
        break
      case 'minimal':
        root.style.setProperty('--component-border-radius', 'var(--modern-radius-none)')
        root.style.setProperty('--component-border-width', '1px')
        root.style.setProperty('--component-shadow', 'none')
        root.style.setProperty('--component-padding', 'var(--modern-spacing-sm)')
        root.style.setProperty('--component-font-weight', '300')
        break
      case 'rounded':
        root.style.setProperty('--component-border-radius', 'var(--modern-radius-xl)')
        root.style.setProperty('--component-border-width', '0px')
        root.style.setProperty('--component-shadow', 'var(--modern-shadow-md)')
        root.style.setProperty('--component-padding', 'var(--modern-spacing-lg)')
        root.style.setProperty('--component-font-weight', '500')
        break
      case 'sharp':
        root.style.setProperty('--component-border-radius', 'var(--modern-radius-none)')
        root.style.setProperty('--component-border-width', '2px')
        root.style.setProperty('--component-shadow', 'none')
        root.style.setProperty('--component-padding', 'var(--modern-spacing-md)')
        root.style.setProperty('--component-font-weight', '600')
        break
      default:
        // 默认现代风格
        root.style.setProperty('--component-border-radius', 'var(--modern-radius-md)')
        root.style.setProperty('--component-border-width', '1px')
        root.style.setProperty('--component-shadow', 'var(--modern-shadow-sm)')
        root.style.setProperty('--component-padding', 'var(--modern-spacing-md)')
        root.style.setProperty('--component-font-weight', '500')
    }
  }

  // 新增 iOS 风格变量应用方法
  const applyiOSStyleVariables = () => {
    const root = document.documentElement
    
    // 应用毛玻璃强度
    const glassIntensityMap = {
      light: 'var(--ios-blur-light)',
      medium: 'var(--ios-blur-medium)',
      heavy: 'var(--ios-blur-heavy)',
      ultra: 'var(--ios-blur-ultra)'
    }
    
    root.style.setProperty('--current-glass-blur', glassIntensityMap[config.value.glassIntensity])
    
    // 应用交互反馈变量
    const feedbackMap = {
      none: '0',
      minimal: '0.5',
      standard: '1',
      enhanced: '1.5'
    }
    
    root.style.setProperty('--interaction-scale', feedbackMap[config.value.interactionFeedback])
    
    // 应用动效设置
    if (!config.value.enableSpringAnimations) {
      root.style.setProperty('--ios-ease-spring', 'var(--ios-ease-in-out)')
    } else {
      root.style.removeProperty('--ios-ease-spring')
    }
  }

  // 新增 iOS 风格方法
  const setGlassIntensity = (intensity: GlassIntensity) => {
    updateConfig({ glassIntensity: intensity })
  }

  const setInteractionFeedback = (feedback: InteractionFeedback) => {
    updateConfig({ interactionFeedback: feedback })
  }

  const toggleSpringAnimations = () => {
    updateConfig({ enableSpringAnimations: !config.value.enableSpringAnimations })
  }

  const toggleRippleEffect = () => {
    updateConfig({ enableRippleEffect: !config.value.enableRippleEffect })
  }

  const toggleBackdropEffects = () => {
    updateConfig({ enableBackdropEffects: !config.value.enableBackdropEffects })
  }

  const toggleParallax = () => {
    updateConfig({ enableParallax: !config.value.enableParallax })
  }

  const toggleGradientBackgrounds = () => {
    updateConfig({ enableGradientBackgrounds: !config.value.enableGradientBackgrounds })
  }

  // 字体管理方法
  const setFontFamily = (fontFamily: string) => {
    updateConfig({ fontFamily })
    applyFontSettings()
  }

  const setFontSize = (fontSize: number) => {
    updateConfig({ fontSize })
    applyFontSettings()
  }

  const setFontWeight = (fontWeight: string) => {
    updateConfig({ fontWeight })
    applyFontSettings()
  }

  const applyFontSettings = () => {
    const root = document.documentElement
    root.style.setProperty('--app-font-family', config.value.fontFamily)
    root.style.setProperty('--app-font-size', `${config.value.fontSize}px`)
    root.style.setProperty('--app-font-weight', config.value.fontWeight)
  }

  // 背景图片管理方法
  const setBackgroundImage = (imageUrl: string | null) => {
    updateConfig({ backgroundImage: imageUrl })
    applyBackgroundSettings()
  }

  const setBackgroundSize = (size: 'cover' | 'contain' | 'auto') => {
    updateConfig({ backgroundSize: size })
    applyBackgroundSettings()
  }

  const setBackgroundPosition = (position: string) => {
    updateConfig({ backgroundPosition: position })
    applyBackgroundSettings()
  }

  const setBackgroundOpacity = (opacity: number) => {
    updateConfig({ backgroundOpacity: opacity })
    applyBackgroundSettings()
  }

  const toggleBackgroundBlur = () => {
    updateConfig({ enableBackgroundBlur: !config.value.enableBackgroundBlur })
    applyBackgroundSettings()
  }

  const applyBackgroundSettings = () => {
    const root = document.documentElement
    const body = document.body
    
    try {
      if (config.value.backgroundImage) {
        // 判断是否为渐变背景
        if (config.value.backgroundImage.startsWith('linear-gradient')) {
          // 渐变背景直接设置为background
          root.style.setProperty('--app-background-image', config.value.backgroundImage)
        } else {
          // 图片背景使用url()
          root.style.setProperty('--app-background-image', `url(${config.value.backgroundImage})`)
        }
        
        root.style.setProperty('--app-background-size', config.value.backgroundSize)
        root.style.setProperty('--app-background-position', config.value.backgroundPosition)
        root.style.setProperty('--app-background-opacity', config.value.backgroundOpacity.toString())
        
        if (config.value.enableBackgroundBlur) {
          root.style.setProperty('--app-background-filter', 'blur(10px)')
        } else {
          root.style.setProperty('--app-background-filter', 'none')
        }
        
        // 添加body属性，用于选择器，强制更新DOM
        body.setAttribute('data-has-background', 'true')
        
        // 强制重绘以确保背景立即生效
        body.style.display = 'none'
        body.offsetHeight // 触发重排
        body.style.display = ''
        
        console.log('背景图片已应用:', {
          image: config.value.backgroundImage,
          size: config.value.backgroundSize,
          position: config.value.backgroundPosition,
          opacity: config.value.backgroundOpacity
        })
      } else {
        // 移除背景设置
        root.style.setProperty('--app-background-image', 'none')
        root.style.removeProperty('--app-background-size')
        root.style.removeProperty('--app-background-position')
        root.style.removeProperty('--app-background-opacity')
        root.style.removeProperty('--app-background-filter')
        
        // 移除body属性
        body.removeAttribute('data-has-background')
        
        console.log('背景图片已移除')
      }
      
      // 确保背景立即在所有页面生效
      setTimeout(() => {
        // 触发页面重绘以确保样式应用
        const allElements = document.querySelectorAll('*')
        allElements.forEach(el => {
          if (el instanceof HTMLElement) {
            const currentDisplay = el.style.display
            el.style.display = 'none'
            el.offsetHeight
            el.style.display = currentDisplay
          }
        })
      }, 50)
      
    } catch (error) {
      console.error('应用背景设置时出错:', error)
    }
  }

  // 系统字体检测 - 优化版本
  const getSystemFonts = (): string[] => {
    const systemFonts = [
      'system-ui, -apple-system, sans-serif', // 系统默认
      // Windows 系统字体
      'Arial, sans-serif',
      'Arial Black, sans-serif', 
      'Bahnschrift, sans-serif',
      'Calibri, sans-serif',
      'Cambria, serif',
      'Candara, sans-serif',
      'Comic Sans MS, cursive',
      'Consolas, monospace',
      'Constantia, serif',
      'Corbel, sans-serif',
      'Courier New, monospace',
      'Ebrima, sans-serif',
      'Franklin Gothic Medium, sans-serif',
      'Gabriola, cursive',
      'Gadugi, sans-serif',
      'Georgia, serif',
      'HoloLens MDL2 Assets, sans-serif',
      'Impact, sans-serif',
      'Ink Free, cursive',
      'Javanese Text, serif',
      'Leelawadee UI, sans-serif',
      'Lucida Console, monospace',
      'Lucida Sans Unicode, sans-serif',
      'Malgun Gothic, sans-serif',
      'Marlett, sans-serif',
      'Microsoft Himalaya, serif',
      'Microsoft JhengHei, sans-serif',
      'Microsoft New Tai Lue, sans-serif',
      'Microsoft PhagsPa, sans-serif',
      'Microsoft Sans Serif, sans-serif',
      'Microsoft Tai Le, sans-serif',
      'Microsoft YaHei, sans-serif',
      'Microsoft Yi Baiti, serif',
      'MingLiU-ExtB, serif',
      'Mongolian Baiti, serif',
      'MS Gothic, monospace',
      'MV Boli, cursive',
      'Myanmar Text, serif',
      'Nirmala UI, sans-serif',
      'Palatino Linotype, serif',
      'Segoe MDL2 Assets, sans-serif',
      'Segoe Print, cursive',
      'Segoe Script, cursive',
      'Segoe UI, sans-serif',
      'Segoe UI Historic, serif',
      'Segoe UI Emoji, emoji',
      'Segoe UI Symbol, sans-serif',
      'SimSun, serif',
      'Sitka Text, serif',
      'Sylfaen, serif',
      'Symbol, serif',
      'Tahoma, sans-serif',
      'Times New Roman, serif',
      'Trebuchet MS, sans-serif',
      'Verdana, sans-serif',
      'Webdings, sans-serif',
      'Wingdings, sans-serif',
      'Yu Gothic, sans-serif',
      // macOS 系统字体
      '.AppleSystemUIFont, sans-serif',
      'SF Pro Display, -apple-system, sans-serif',
      'SF Pro Text, -apple-system, sans-serif',
      'SF Pro Rounded, -apple-system, sans-serif',
      'SF Mono, monospace',
      'SF Compact Display, -apple-system, sans-serif',
      'SF Compact Text, -apple-system, sans-serif',
      'New York, serif',
      'Helvetica, sans-serif',
      'Helvetica Neue, sans-serif',
      'Apple Color Emoji, emoji',
      'Times, serif',
      'Courier, monospace',
      'Menlo, monospace',
      'Monaco, monospace',
      'Andale Mono, monospace',
      'Lucida Grande, sans-serif',
      'Trebuchet MS, sans-serif',
      'Verdana, sans-serif',
      'Arial Unicode MS, sans-serif',
      'Chalkduster, cursive',
      'Herculanum, cursive',
      'Papyrus, cursive',
      'Brush Script MT, cursive',
      'Bradley Hand, cursive',
      'Marker Felt, cursive',
      'Noteworthy, cursive',
      'Optima, sans-serif',
      'Palatino, serif',
      'Baskerville, serif',
      'Big Caslon, serif',
      'Bodoni 72, serif',
      'Cochin, serif',
      'Didot, serif',
      'Futura, sans-serif',
      'Gill Sans, sans-serif',
      'Hoefler Text, serif',
      'Rockwell, serif',
      // 中文字体
      '微软雅黑, Microsoft YaHei, sans-serif',
      '黑体, SimHei, sans-serif',
      '宋体, SimSun, serif',
      '新宋体, NSimSun, serif',
      '仿宋, FangSong, serif',
      '楷体, KaiTi, serif',
      '华文细黑, STXihei, sans-serif',
      '华文黑体, STHeiti, sans-serif',
      '华文宋体, STSong, serif',
      '华文仿宋, STFangsong, serif',
      '华文楷体, STKaiti, serif',
      '华文琥珀, STHupo, serif',
      '华文隶书, STLiti, serif',
      '华文行楷, STXingkai, serif',
      '方正舒体, FZShuTi, serif',
      '方正姚体, FZYaoti, serif',
      '思源黑体, Source Han Sans CN, sans-serif',
      '思源宋体, Source Han Serif CN, serif',
      'PingFang SC, sans-serif',
      'Hiragino Sans GB, sans-serif',
      'WenQuanYi Micro Hei, sans-serif',
      'WenQuanYi Zen Hei, sans-serif',
      '文泉驿微米黑, sans-serif',
      '文泉驿正黑, sans-serif',
      '幼圆, YouYuan, cursive',
      '隶书, LiSu, cursive',
      // Google Fonts 常用字体
      'Roboto, sans-serif',
      'Open Sans, sans-serif',
      'Lato, sans-serif',
      'Montserrat, sans-serif',
      'Source Sans Pro, sans-serif',
      'Raleway, sans-serif',
      'Ubuntu, sans-serif',
      'Nunito, sans-serif',
      'Poppins, sans-serif',
      'PT Sans, sans-serif',
      'Oswald, sans-serif',
      'Source Code Pro, monospace',
      'Fira Code, monospace',
      'JetBrains Mono, monospace',
      'Inter, sans-serif',
      'Work Sans, sans-serif',
      'Playfair Display, serif',
      'Merriweather, serif',
      'Source Serif Pro, serif',
      'Crimson Text, serif',
      'Lora, serif',
      // 专业设计字体
      'Avenir, sans-serif',
      'Proxima Nova, sans-serif',
      'Brandon Grotesque, sans-serif',
      'Gotham, sans-serif',
      'Trade Gothic, sans-serif',
      'DIN, sans-serif',
      'Akzidenz-Grotesk, sans-serif',
      'Univers, sans-serif',
      'Frutiger, sans-serif',
      'Myriad Pro, sans-serif'
    ]
    
    return systemFonts
  }

  // 检测字体是否可用 - 改进的算法
  const isFontAvailable = (fontFamily: string): boolean => {
    if (typeof document === 'undefined') return false
    
    // 对于系统默认字体，直接返回true
    if (fontFamily.includes('system-ui') || fontFamily.includes('-apple-system')) {
      return true
    }
    
    // 获取主要字体名称
    const fontName = fontFamily.split(',')[0].trim().replace(/["']/g, '')
    
    // 使用Canvas方法检测字体
    try {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      if (!context) return false
      
      // 设置测试文本，包含中英文和特殊字符
      const testText = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789中文测试!@#$%^&*()'
      const fallbackFont = 'Arial'
      const fontSize = '72px'
      
      // 测试回退字体宽度
      context.font = `${fontSize} ${fallbackFont}`
      const fallbackWidth = context.measureText(testText).width
      
      // 测试目标字体宽度
      context.font = `${fontSize} "${fontName}", ${fallbackFont}`
      const testWidth = context.measureText(testText).width
      
      // 如果宽度不同，说明字体存在
      return Math.abs(testWidth - fallbackWidth) > 0.1
    } catch (error) {
      console.warn('字体检测失败:', fontName, error)
      return false
    }
  }

  // 获取可用的系统字体 - 改进版本
  const getAvailableFonts = (): string[] => {
    const systemFonts = getSystemFonts()
    const availableFonts: string[] = []
    
    // 首先添加系统默认字体
    availableFonts.push('system-ui, -apple-system, sans-serif')
    
    // 定义常见字体列表（高优先级）
    const commonFonts = [
      'Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana', 
      'Tahoma', 'Courier New', 'Segoe UI', 'Calibri', 'Trebuchet MS',
      '微软雅黑', 'Microsoft YaHei', '黑体', '宋体', '仿宋', '楷体',
      'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', 'Roboto', 'Open Sans'
    ]
    
    // 批量检测常见字体
    const availableCommonFonts = new Set<string>()
    
    // 使用快速检测方法
    const quickFontCheck = (fontNames: string[]): string[] => {
      const available: string[] = []
      
      try {
        // 使用CSS Font Loading API（如果可用）
        if ('fonts' in document && document.fonts.check) {
          for (const fontName of fontNames) {
            try {
              if (document.fonts.check(`12px "${fontName}"`)) {
                available.push(fontName)
                availableCommonFonts.add(fontName)
              }
            } catch (e) {
              // 如果CSS Font Loading API失败，使用后备方法
            }
          }
        }
      } catch (e) {
        // 如果不支持，使用传统方法
      }
      
      return available
    }
    
    // 快速检测常见字体
    const quickResults = quickFontCheck(commonFonts)
    
    // 逐个检测其他字体（限制数量避免性能问题）
    let checkedCount = 0
    const maxChecks = 50 // 限制检测数量
    
    for (const font of systemFonts) {
      if (font !== 'system-ui, -apple-system, sans-serif' && checkedCount < maxChecks) {
        const fontName = font.split(',')[0].trim().replace(/["']/g, '')
        
        // 如果已经在常见字体中检测过，直接添加
        if (availableCommonFonts.has(fontName)) {
          availableFonts.push(font)
          continue
        }
        
        // 对于常见字体，假设它们存在以提高性能
        if (commonFonts.includes(fontName)) {
          availableFonts.push(font)
        } else {
          // 对于不常见的字体，进行检测
          try {
            if (isFontAvailable(font)) {
              availableFonts.push(font)
            }
            checkedCount++
          } catch (error) {
            console.warn('字体检测失败:', fontName, error)
          }
        }
      }
    }
    
    console.log(`字体检测完成: 找到 ${availableFonts.length} 个可用字体，检测了 ${checkedCount} 个不常见字体`)
    
    return availableFonts
  }
  
  const detectSystemPreference = () => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      systemPrefersDark.value = mediaQuery.matches
      
      mediaQuery.addEventListener('change', (e) => {
        systemPrefersDark.value = e.matches
      })
      
      // 检测用户偏好
      const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      if (reducedMotionQuery.matches) {
        updateConfig({ reducedMotion: true })
      }
      
      const highContrastQuery = window.matchMedia('(prefers-contrast: high)')
      if (highContrastQuery.matches) {
        updateConfig({ highContrast: true })
      }
    }
  }
  
  const exportConfig = () => {
    return JSON.stringify(config.value, null, 2)
  }
  
  const importConfig = (configString: string) => {
    try {
      const importedConfig = JSON.parse(configString)
      updateConfig(importedConfig)
      return true
    } catch (error) {
      console.error('Failed to import config:', error)
      return false
    }
  }
  
  const resetToDefaults = () => {
    config.value = { ...modernThemePresets.default }
    saveConfig()
    applyTheme()
  }
  
  // 监听配置变化
  watch(() => config.value.mode, () => {
    applyTheme()
  })
  
  watch(isDark, () => {
    applyTheme()
  })
  
  watch(() => config.value.color, () => {
    applyTheme()
  })
  
  watch(() => config.value.componentStyle, () => {
    applyTheme()
  })
  
  // 初始化
  const initialize = () => {
    loadConfig()
    detectSystemPreference()
    applyTheme()
  }
  
  return {
    // 状态
    config,
    systemPrefersDark,
    
    // 计算属性
    isDark,
    currentColorTokens,
    primaryColor,
    themeClasses,
    
    // 方法
    updateConfig,
    setMode,
    setColor,
    setComponentStyle,
    toggleMode,
    applyPreset,
    saveConfig,
    loadConfig,
    applyTheme,
    applyComponentStyleVariables,
    detectSystemPreference,
    exportConfig,
    importConfig,
    resetToDefaults,
    initialize,
    
    // 新增 iOS 风格方法
    applyiOSStyleVariables,
    setGlassIntensity,
    setInteractionFeedback,
    toggleSpringAnimations,
    toggleRippleEffect,
    toggleBackdropEffects,
    toggleParallax,
    toggleGradientBackgrounds,
    
    // 字体管理方法
    setFontFamily,
    setFontSize,
    setFontWeight,
    applyFontSettings,
    getSystemFonts,
    getAvailableFonts,
    isFontAvailable,
    
    // 背景管理方法
    setBackgroundImage,
    setBackgroundSize,
    setBackgroundPosition,
    setBackgroundOpacity,
    toggleBackgroundBlur,
    applyBackgroundSettings,
    
    // 预设
    modernThemePresets
  }
})