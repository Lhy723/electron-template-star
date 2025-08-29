/**
 * 日期时间工具函数
 */

// 日期格式化
export const formatDate = (
  date: Date | string | number,
  format = 'YYYY-MM-DD HH:mm:ss'
): string => {
  const d = new Date(date)

  if (isNaN(d.getTime())) {
    return ''
  }

  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  const hour = d.getHours()
  const minute = d.getMinutes()
  const second = d.getSeconds()
  const millisecond = d.getMilliseconds()

  const formatMap: Record<string, string> = {
    YYYY: year.toString(),
    YY: year.toString().slice(-2),
    MM: month.toString().padStart(2, '0'),
    M: month.toString(),
    DD: day.toString().padStart(2, '0'),
    D: day.toString(),
    HH: hour.toString().padStart(2, '0'),
    H: hour.toString(),
    mm: minute.toString().padStart(2, '0'),
    m: minute.toString(),
    ss: second.toString().padStart(2, '0'),
    s: second.toString(),
    SSS: millisecond.toString().padStart(3, '0'),
    SS: Math.floor(millisecond / 10)
      .toString()
      .padStart(2, '0'),
    S: Math.floor(millisecond / 100).toString(),
  }

  return format.replace(/YYYY|YY|MM|M|DD|D|HH|H|mm|m|ss|s|SSS|SS|S/g, match => {
    return formatMap[match] || match
  })
}

// 相对时间
export const formatRelativeTime = (date: Date | string | number): string => {
  const d = new Date(date)
  const now = new Date()
  const diff = now.getTime() - d.getTime()

  if (isNaN(d.getTime())) {
    return ''
  }

  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  const week = 7 * day
  const month = 30 * day
  const year = 365 * day

  if (diff < minute) {
    return '刚刚'
  } else if (diff < hour) {
    return `${Math.floor(diff / minute)}分钟前`
  } else if (diff < day) {
    return `${Math.floor(diff / hour)}小时前`
  } else if (diff < week) {
    return `${Math.floor(diff / day)}天前`
  } else if (diff < month) {
    return `${Math.floor(diff / week)}周前`
  } else if (diff < year) {
    return `${Math.floor(diff / month)}个月前`
  } else {
    return `${Math.floor(diff / year)}年前`
  }
}

// 获取时间段
export const getTimeOfDay = (date?: Date | string | number): string => {
  const d = date ? new Date(date) : new Date()
  const hour = d.getHours()

  if (hour >= 5 && hour < 12) {
    return '上午'
  } else if (hour >= 12 && hour < 18) {
    return '下午'
  } else if (hour >= 18 && hour < 22) {
    return '晚上'
  } else {
    return '深夜'
  }
}

// 获取问候语
export const getGreeting = (date?: Date | string | number): string => {
  const d = date ? new Date(date) : new Date()
  const hour = d.getHours()

  if (hour >= 5 && hour < 12) {
    return '早上好'
  } else if (hour >= 12 && hour < 14) {
    return '中午好'
  } else if (hour >= 14 && hour < 18) {
    return '下午好'
  } else if (hour >= 18 && hour < 22) {
    return '晚上好'
  } else {
    return '夜深了'
  }
}

// 判断是否为今天
export const isToday = (date: Date | string | number): boolean => {
  const d = new Date(date)
  const today = new Date()

  return (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  )
}

// 判断是否为昨天
export const isYesterday = (date: Date | string | number): boolean => {
  const d = new Date(date)
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  return (
    d.getFullYear() === yesterday.getFullYear() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getDate() === yesterday.getDate()
  )
}

// 判断是否为本周
export const isThisWeek = (date: Date | string | number): boolean => {
  const d = new Date(date)
  const today = new Date()
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - today.getDay())
  startOfWeek.setHours(0, 0, 0, 0)

  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6)
  endOfWeek.setHours(23, 59, 59, 999)

  return d >= startOfWeek && d <= endOfWeek
}

// 判断是否为本月
export const isThisMonth = (date: Date | string | number): boolean => {
  const d = new Date(date)
  const today = new Date()

  return d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth()
}

// 判断是否为本年
export const isThisYear = (date: Date | string | number): boolean => {
  const d = new Date(date)
  const today = new Date()

  return d.getFullYear() === today.getFullYear()
}

// 获取月份天数
export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate()
}

// 获取月份第一天是星期几
export const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month - 1, 1).getDay()
}

// 获取日期范围
export const getDateRange = (
  startDate: Date | string | number,
  endDate: Date | string | number
): Date[] => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const dates: Date[] = []

  const current = new Date(start)
  while (current <= end) {
    dates.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }

  return dates
}

// 计算年龄
export const calculateAge = (birthDate: Date | string | number): number => {
  const birth = new Date(birthDate)
  const today = new Date()

  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age
}

// 计算两个日期之间的天数
export const daysBetween = (
  date1: Date | string | number,
  date2: Date | string | number
): number => {
  const d1 = new Date(date1)
  const d2 = new Date(date2)

  const timeDiff = Math.abs(d2.getTime() - d1.getTime())
  return Math.ceil(timeDiff / (1000 * 3600 * 24))
}

// 添加天数
export const addDays = (date: Date | string | number, days: number): Date => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

// 添加月份
export const addMonths = (date: Date | string | number, months: number): Date => {
  const result = new Date(date)
  result.setMonth(result.getMonth() + months)
  return result
}

// 添加年份
export const addYears = (date: Date | string | number, years: number): Date => {
  const result = new Date(date)
  result.setFullYear(result.getFullYear() + years)
  return result
}

// 获取本周开始日期
export const getStartOfWeek = (date?: Date | string | number): Date => {
  const d = date ? new Date(date) : new Date()
  const day = d.getDay()
  const diff = d.getDate() - day
  const startOfWeek = new Date(d.setDate(diff))
  startOfWeek.setHours(0, 0, 0, 0)
  return startOfWeek
}

// 获取本周结束日期
export const getEndOfWeek = (date?: Date | string | number): Date => {
  const startOfWeek = getStartOfWeek(date)
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6)
  endOfWeek.setHours(23, 59, 59, 999)
  return endOfWeek
}

// 获取本月开始日期
export const getStartOfMonth = (date?: Date | string | number): Date => {
  const d = date ? new Date(date) : new Date()
  const startOfMonth = new Date(d.getFullYear(), d.getMonth(), 1)
  startOfMonth.setHours(0, 0, 0, 0)
  return startOfMonth
}

// 获取本月结束日期
export const getEndOfMonth = (date?: Date | string | number): Date => {
  const d = date ? new Date(date) : new Date()
  const endOfMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0)
  endOfMonth.setHours(23, 59, 59, 999)
  return endOfMonth
}

// 获取本年开始日期
export const getStartOfYear = (date?: Date | string | number): Date => {
  const d = date ? new Date(date) : new Date()
  const startOfYear = new Date(d.getFullYear(), 0, 1)
  startOfYear.setHours(0, 0, 0, 0)
  return startOfYear
}

// 获取本年结束日期
export const getEndOfYear = (date?: Date | string | number): Date => {
  const d = date ? new Date(date) : new Date()
  const endOfYear = new Date(d.getFullYear(), 11, 31)
  endOfYear.setHours(23, 59, 59, 999)
  return endOfYear
}

// 时区转换
export const convertTimezone = (
  date: Date | string | number,
  fromTimezone: string,
  toTimezone: string
): Date => {
  const d = new Date(date)

  // 使用Intl.DateTimeFormat进行时区转换
  // const fromDate = new Intl.DateTimeFormat('en-US', {
  //   timeZone: fromTimezone,
  //   year: 'numeric',
  //   month: '2-digit',
  //   day: '2-digit',
  //   hour: '2-digit',
  //   minute: '2-digit',
  //   second: '2-digit',
  //   hour12: false
  // }).formatToParts(d)

  const toDate = new Intl.DateTimeFormat('en-US', {
    timeZone: toTimezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(d)

  // 构建转换后的日期
  const year = parseInt(toDate.find(part => part.type === 'year')?.value || '0')
  const month = parseInt(toDate.find(part => part.type === 'month')?.value || '0') - 1
  const day = parseInt(toDate.find(part => part.type === 'day')?.value || '0')
  const hour = parseInt(toDate.find(part => part.type === 'hour')?.value || '0')
  const minute = parseInt(toDate.find(part => part.type === 'minute')?.value || '0')
  const second = parseInt(toDate.find(part => part.type === 'second')?.value || '0')

  return new Date(year, month, day, hour, minute, second)
}

// 获取时区列表
export const getTimezones = (): string[] => {
  return [
    'UTC',
    'Asia/Shanghai',
    'Asia/Tokyo',
    'Asia/Seoul',
    'Asia/Hong_Kong',
    'Asia/Singapore',
    'Asia/Bangkok',
    'Asia/Dubai',
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'Europe/Rome',
    'Europe/Moscow',
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'America/Toronto',
    'America/Vancouver',
    'America/Sao_Paulo',
    'Australia/Sydney',
    'Australia/Melbourne',
    'Pacific/Auckland',
  ]
}
