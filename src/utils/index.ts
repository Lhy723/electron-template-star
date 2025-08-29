/**
 * 工具函数库
 */

// 类型判断
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isNumber = (val: unknown): val is number => typeof val === 'number'
export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean'
export const isFunction = (val: unknown): val is Function => typeof val === 'function'
export const isObject = (val: unknown): val is Record<any, any> => val !== null && typeof val === 'object'
export const isArray = Array.isArray
export const isDate = (val: unknown): val is Date => val instanceof Date
export const isRegExp = (val: unknown): val is RegExp => val instanceof RegExp
export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

// 空值判断
export const isEmpty = (val: unknown): boolean => {
  if (val === null || val === undefined) return true
  if (isString(val) || isArray(val)) return val.length === 0
  if (isObject(val)) return Object.keys(val).length === 0
  return false
}

export const isNotEmpty = (val: unknown): boolean => !isEmpty(val)

// 深拷贝
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as T
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as T
  if (typeof obj === 'object') {
    const clonedObj = {} as T
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
  return obj
}

// 对象合并
export const deepMerge = <T extends Record<string, any>>(
  target: T,
  ...sources: Partial<T>[]
): T => {
  if (!sources.length) return target
  const source = sources.shift()
  
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        deepMerge(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }
  
  return deepMerge(target, ...sources)
}

// 防抖
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      if (!immediate) func(...args)
    }
    
    const callNow = immediate && !timeout
    
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    
    if (callNow) func(...args)
  }
}

// 节流
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// 格式化文件大小
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 格式化数字
export const formatNumber = (num: number, precision = 2): string => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(precision) + 'B'
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(precision) + 'M'
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(precision) + 'K'
  }
  return num.toString()
}

// 生成随机字符串
export const randomString = (length = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// 生成UUID
export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// 获取URL参数
export const getUrlParams = (url?: string): Record<string, string> => {
  const urlStr = url || window.location.href
  const params: Record<string, string> = {}
  const urlObj = new URL(urlStr)
  
  urlObj.searchParams.forEach((value, key) => {
    params[key] = value
  })
  
  return params
}

// 设置URL参数
export const setUrlParams = (params: Record<string, string | number>): string => {
  const url = new URL(window.location.href)
  
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value))
  })
  
  return url.toString()
}

// 移除URL参数
export const removeUrlParams = (keys: string[]): string => {
  const url = new URL(window.location.href)
  
  keys.forEach(key => {
    url.searchParams.delete(key)
  })
  
  return url.toString()
}

// 下载文件
export const downloadFile = (url: string, filename?: string): void => {
  const link = document.createElement('a')
  link.href = url
  link.download = filename || ''
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// 下载Blob文件
export const downloadBlob = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob)
  downloadFile(url, filename)
  URL.revokeObjectURL(url)
}

// 复制到剪贴板
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // 降级方案
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      const result = document.execCommand('copy')
      document.body.removeChild(textArea)
      return result
    }
  } catch (error) {
    console.error('复制失败:', error)
    return false
  }
}

// 获取设备信息
export const getDeviceInfo = () => {
  const ua = navigator.userAgent
  const isWindows = /windows/i.test(ua)
  const isMac = /macintosh|mac os x/i.test(ua)
  const isLinux = /linux/i.test(ua)
  const isAndroid = /android/i.test(ua)
  const isIOS = /iphone|ipad|ipod/i.test(ua)
  const isMobile = /mobile/i.test(ua) || isAndroid || isIOS
  const isTablet = /tablet|ipad/i.test(ua)
  const isDesktop = !isMobile && !isTablet
  
  return {
    userAgent: ua,
    platform: navigator.platform,
    isWindows,
    isMac,
    isLinux,
    isAndroid,
    isIOS,
    isMobile,
    isTablet,
    isDesktop,
    language: navigator.language,
    languages: navigator.languages,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
    screen: {
      width: screen.width,
      height: screen.height,
      availWidth: screen.availWidth,
      availHeight: screen.availHeight,
      colorDepth: screen.colorDepth,
      pixelDepth: screen.pixelDepth
    },
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }
}

// 存储相关
export const storage = {
  get: <T = any>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue || null
    } catch (error) {
      console.error('获取存储数据失败:', error)
      return defaultValue || null
    }
  },
  
  set: (key: string, value: any): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error('设置存储数据失败:', error)
      return false
    }
  },
  
  remove: (key: string): boolean => {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('删除存储数据失败:', error)
      return false
    }
  },
  
  clear: (): boolean => {
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.error('清空存储数据失败:', error)
      return false
    }
  }
}

// 会话存储
export const sessionStorage = {
  get: <T = any>(key: string, defaultValue?: T): T | null => {
    try {
      const item = window.sessionStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue || null
    } catch (error) {
      console.error('获取会话存储数据失败:', error)
      return defaultValue || null
    }
  },
  
  set: (key: string, value: any): boolean => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error('设置会话存储数据失败:', error)
      return false
    }
  },
  
  remove: (key: string): boolean => {
    try {
      window.sessionStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('删除会话存储数据失败:', error)
      return false
    }
  },
  
  clear: (): boolean => {
    try {
      window.sessionStorage.clear()
      return true
    } catch (error) {
      console.error('清空会话存储数据失败:', error)
      return false
    }
  }
}