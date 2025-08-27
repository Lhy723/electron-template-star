/**
 * 验证工具函数
 */

// 邮箱验证
export const isEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// 手机号验证（中国大陆）
export const isPhone = (phone: string): boolean => {
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(phone)
}

// 身份证号验证（中国大陆）
export const isIdCard = (idCard: string): boolean => {
  const idCardRegex = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  
  if (!idCardRegex.test(idCard)) {
    return false
  }
  
  // 验证校验码
  const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
  
  let sum = 0
  for (let i = 0; i < 17; i++) {
    sum += parseInt(idCard[i]) * weights[i]
  }
  
  const checkCode = checkCodes[sum % 11]
  return checkCode === idCard[17].toUpperCase()
}

// URL验证
export const isUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// IP地址验证
export const isIP = (ip: string): boolean => {
  const ipRegex = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/
  return ipRegex.test(ip)
}

// IPv6地址验证
export const isIPv6 = (ip: string): boolean => {
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/
  return ipv6Regex.test(ip)
}

// MAC地址验证
export const isMac = (mac: string): boolean => {
  const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
  return macRegex.test(mac)
}

// 密码强度验证
export const validatePassword = (password: string): {
  isValid: boolean
  strength: 'weak' | 'medium' | 'strong'
  errors: string[]
} => {
  const errors: string[] = []
  let score = 0
  
  // 长度检查
  if (password.length < 8) {
    errors.push('密码长度至少8位')
  } else {
    score += 1
  }
  
  // 包含小写字母
  if (!/[a-z]/.test(password)) {
    errors.push('密码必须包含小写字母')
  } else {
    score += 1
  }
  
  // 包含大写字母
  if (!/[A-Z]/.test(password)) {
    errors.push('密码必须包含大写字母')
  } else {
    score += 1
  }
  
  // 包含数字
  if (!/\d/.test(password)) {
    errors.push('密码必须包含数字')
  } else {
    score += 1
  }
  
  // 包含特殊字符
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('密码必须包含特殊字符')
  } else {
    score += 1
  }
  
  // 不能包含常见弱密码
  const weakPasswords = [
    'password', '123456', '123456789', 'qwerty', 'abc123',
    'password123', '123123', 'admin', 'root', 'user'
  ]
  
  if (weakPasswords.some(weak => password.toLowerCase().includes(weak))) {
    errors.push('密码不能包含常见弱密码')
    score = Math.max(0, score - 2)
  }
  
  let strength: 'weak' | 'medium' | 'strong'
  if (score <= 2) {
    strength = 'weak'
  } else if (score <= 4) {
    strength = 'medium'
  } else {
    strength = 'strong'
  }
  
  return {
    isValid: errors.length === 0,
    strength,
    errors
  }
}

// 用户名验证
export const isUsername = (username: string): boolean => {
  // 用户名只能包含字母、数字、下划线，长度3-20位
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/
  return usernameRegex.test(username)
}

// 中文姓名验证
export const isChineseName = (name: string): boolean => {
  const chineseNameRegex = /^[\u4e00-\u9fa5]{2,10}$/
  return chineseNameRegex.test(name)
}

// 英文姓名验证
export const isEnglishName = (name: string): boolean => {
  const englishNameRegex = /^[a-zA-Z\s]{2,50}$/
  return englishNameRegex.test(name)
}

// 数字验证
export const isNumber = (value: string): boolean => {
  return !isNaN(Number(value)) && isFinite(Number(value))
}

// 整数验证
export const isInteger = (value: string): boolean => {
  return Number.isInteger(Number(value))
}

// 正整数验证
export const isPositiveInteger = (value: string): boolean => {
  const num = Number(value)
  return Number.isInteger(num) && num > 0
}

// 小数验证
export const isDecimal = (value: string, precision?: number): boolean => {
  const decimalRegex = precision
    ? new RegExp(`^\\d+\\.\\d{1,${precision}}$`)
    : /^\d+\.\d+$/
  return decimalRegex.test(value)
}

// 金额验证（最多两位小数）
export const isMoney = (value: string): boolean => {
  const moneyRegex = /^\d+(\.\d{1,2})?$/
  return moneyRegex.test(value)
}

// 银行卡号验证
export const isBankCard = (cardNumber: string): boolean => {
  // 移除空格和连字符
  const cleanCardNumber = cardNumber.replace(/[\s-]/g, '')
  
  // 长度检查（一般为13-19位）
  if (!/^\d{13,19}$/.test(cleanCardNumber)) {
    return false
  }
  
  // Luhn算法验证
  let sum = 0
  let isEven = false
  
  for (let i = cleanCardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanCardNumber[i])
    
    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }
    
    sum += digit
    isEven = !isEven
  }
  
  return sum % 10 === 0
}

// 邮政编码验证（中国）
export const isPostalCode = (code: string): boolean => {
  const postalCodeRegex = /^[1-9]\d{5}$/
  return postalCodeRegex.test(code)
}

// QQ号验证
export const isQQ = (qq: string): boolean => {
  const qqRegex = /^[1-9]\d{4,10}$/
  return qqRegex.test(qq)
}

// 微信号验证
export const isWechat = (wechat: string): boolean => {
  const wechatRegex = /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/
  return wechatRegex.test(wechat)
}

// 车牌号验证（中国）
export const isLicensePlate = (plate: string): boolean => {
  // 普通车牌
  const normalPlateRegex = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-Z0-9]{4}[A-Z0-9挂学警港澳]$/
  // 新能源车牌
  const newEnergyPlateRegex = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-Z0-9]{5}$/
  
  return normalPlateRegex.test(plate) || newEnergyPlateRegex.test(plate)
}

// 统一社会信用代码验证
export const isSocialCreditCode = (code: string): boolean => {
  const socialCreditRegex = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/
  
  if (!socialCreditRegex.test(code)) {
    return false
  }
  
  // 校验码验证
  const weights = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28]
  const chars = '0123456789ABCDEFGHJKLMNPQRTUWXY'
  
  let sum = 0
  for (let i = 0; i < 17; i++) {
    const charIndex = chars.indexOf(code[i])
    sum += charIndex * weights[i]
  }
  
  const checkCode = chars[31 - (sum % 31)]
  return checkCode === code[17]
}

// 文件类型验证
export const isFileType = (filename: string, allowedTypes: string[]): boolean => {
  const extension = filename.split('.').pop()?.toLowerCase()
  return extension ? allowedTypes.includes(extension) : false
}

// 图片文件验证
export const isImageFile = (filename: string): boolean => {
  const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg']
  return isFileType(filename, imageTypes)
}

// 视频文件验证
export const isVideoFile = (filename: string): boolean => {
  const videoTypes = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv']
  return isFileType(filename, videoTypes)
}

// 音频文件验证
export const isAudioFile = (filename: string): boolean => {
  const audioTypes = ['mp3', 'wav', 'flac', 'aac', 'ogg', 'wma']
  return isFileType(filename, audioTypes)
}

// 文档文件验证
export const isDocumentFile = (filename: string): boolean => {
  const documentTypes = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt']
  return isFileType(filename, documentTypes)
}

// 压缩文件验证
export const isArchiveFile = (filename: string): boolean => {
  const archiveTypes = ['zip', 'rar', '7z', 'tar', 'gz', 'bz2']
  return isFileType(filename, archiveTypes)
}

// 文件大小验证
export const isFileSizeValid = (size: number, maxSize: number): boolean => {
  return size <= maxSize
}

// 日期格式验证
export const isDateFormat = (date: string, format = 'YYYY-MM-DD'): boolean => {
  const formatRegexMap: Record<string, RegExp> = {
    'YYYY-MM-DD': /^\d{4}-\d{2}-\d{2}$/,
    'YYYY/MM/DD': /^\d{4}\/\d{2}\/\d{2}$/,
    'DD/MM/YYYY': /^\d{2}\/\d{2}\/\d{4}$/,
    'MM/DD/YYYY': /^\d{2}\/\d{2}\/\d{4}$/,
    'YYYY-MM-DD HH:mm:ss': /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/
  }
  
  const regex = formatRegexMap[format]
  if (!regex) {
    return false
  }
  
  if (!regex.test(date)) {
    return false
  }
  
  // 验证日期是否有效
  const parsedDate = new Date(date)
  return !isNaN(parsedDate.getTime())
}

// 时间格式验证
export const isTimeFormat = (time: string, format = 'HH:mm:ss'): boolean => {
  const formatRegexMap: Record<string, RegExp> = {
    'HH:mm': /^([01]?\d|2[0-3]):[0-5]\d$/,
    'HH:mm:ss': /^([01]?\d|2[0-3]):[0-5]\d:[0-5]\d$/,
    'hh:mm A': /^(0?[1-9]|1[0-2]):[0-5]\d [AP]M$/i
  }
  
  const regex = formatRegexMap[format]
  return regex ? regex.test(time) : false
}

// 颜色值验证
export const isColor = (color: string): boolean => {
  // HEX颜色
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  // RGB颜色
  const rgbRegex = /^rgb\(\s*([01]?\d\d?|2[0-4]\d|25[0-5])\s*,\s*([01]?\d\d?|2[0-4]\d|25[0-5])\s*,\s*([01]?\d\d?|2[0-4]\d|25[0-5])\s*\)$/
  // RGBA颜色
  const rgbaRegex = /^rgba\(\s*([01]?\d\d?|2[0-4]\d|25[0-5])\s*,\s*([01]?\d\d?|2[0-4]\d|25[0-5])\s*,\s*([01]?\d\d?|2[0-4]\d|25[0-5])\s*,\s*(0|1|0?\.\d+)\s*\)$/
  
  return hexRegex.test(color) || rgbRegex.test(color) || rgbaRegex.test(color)
}

// JSON格式验证
export const isJSON = (str: string): boolean => {
  try {
    JSON.parse(str)
    return true
  } catch {
    return false
  }
}

// Base64格式验证
export const isBase64 = (str: string): boolean => {
  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/
  return base64Regex.test(str) && str.length % 4 === 0
}

// 版本号验证
export const isVersion = (version: string): boolean => {
  const versionRegex = /^\d+\.\d+\.\d+(-[a-zA-Z0-9]+)?$/
  return versionRegex.test(version)
}