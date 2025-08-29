// 全局类型定义

// 基础类型
export interface BaseEntity {
  id: string
  createTime: string
  updateTime?: string
}

// API响应类型
export interface ApiResponse<T = any> {
  success: boolean
  data: T
  message?: string
  code?: number
}

// 分页类型
export interface Pagination {
  current: number
  pageSize: number
  total: number
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: Pagination
}

// 表格类型
export interface TableColumn {
  key: string
  title: string
  dataIndex: string
  width?: number
  align?: 'left' | 'center' | 'right'
  fixed?: 'left' | 'right'
  sortable?: boolean
  filterable?: boolean
  render?: (value: any, record: any, index: number) => any
}

// 表单类型
export interface FormRule {
  required?: boolean
  message?: string
  type?:
    | 'string'
    | 'number'
    | 'boolean'
    | 'method'
    | 'regexp'
    | 'integer'
    | 'float'
    | 'array'
    | 'object'
    | 'enum'
    | 'date'
    | 'url'
    | 'hex'
    | 'email'
  min?: number
  max?: number
  pattern?: RegExp
  validator?: (rule: any, value: any, callback: any) => void
  trigger?: 'blur' | 'change'
}

export interface FormItem {
  prop: string
  label: string
  type:
    | 'input'
    | 'password'
    | 'textarea'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'date'
    | 'time'
    | 'datetime'
    | 'number'
    | 'switch'
    | 'upload'
    | 'custom'
  placeholder?: string
  options?: Array<{ label: string; value: any; disabled?: boolean }>
  rules?: FormRule[]
  span?: number
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  multiple?: boolean
  component?: any
  props?: Record<string, any>
}

// 菜单权限类型
export interface Permission {
  id: string
  name: string
  code: string
  type: 'menu' | 'button' | 'api'
  parentId?: string
  path?: string
  component?: string
  icon?: string
  sort: number
  status: 'enabled' | 'disabled'
  children?: Permission[]
}

// 角色类型
export interface Role {
  id: string
  name: string
  code: string
  description?: string
  permissions: string[]
  status: 'enabled' | 'disabled'
  createTime: string
  updateTime?: string
}

// 文件上传类型
export interface UploadFile {
  id: string
  name: string
  url: string
  size: number
  type: string
  status: 'uploading' | 'success' | 'error'
  percent?: number
}

// 通知类型
export interface Notification {
  id: string
  title: string
  content: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createTime: string
}

// 系统设置类型
export interface SystemSettings {
  siteName: string
  siteDescription: string
  siteLogo: string
  siteIcon: string
  enableRegistration: boolean
  enableEmailVerification: boolean
  defaultUserRole: string
  maxFileSize: number
  allowedFileTypes: string[]
  smtpHost: string
  smtpPort: number
  smtpUser: string
  smtpPassword: string
  smtpSecure: boolean
}

// 统计数据类型
export interface Statistics {
  totalUsers: number
  activeUsers: number
  totalOrders: number
  totalRevenue: number
  growthRate: number
  chartData: Array<{
    date: string
    value: number
  }>
}

// 日志类型
export interface LogEntry {
  id: string
  level: 'debug' | 'info' | 'warn' | 'error'
  message: string
  timestamp: string
  userId?: string
  ip?: string
  userAgent?: string
  module: string
  action: string
  details?: Record<string, any>
}

// 主题类型（从stores/theme.ts导入）
export type { ThemeMode, ThemeColor, ThemeConfig } from '@/stores/theme'

// 用户类型（从stores/user.ts导入）
export type { UserInfo, LoginForm } from '@/stores/user'

// 菜单类型（从stores/menu.ts导入）
export type { MenuItem } from '@/stores/menu'

// Electron相关类型
export interface ElectronAPI {
  ipcRenderer: {
    on: (channel: string, listener: (...args: any[]) => void) => void
    off: (channel: string, listener: (...args: any[]) => void) => void
    send: (channel: string, ...args: any[]) => void
    invoke: (channel: string, ...args: any[]) => Promise<any>
  }
}

// 扩展Window接口
declare global {
  interface Window {
    electronAPI?: ElectronAPI
    ipcRenderer?: ElectronAPI['ipcRenderer']
  }
}

// Vue组件Props类型辅助
export type ComponentProps<T> = T extends new (...args: any[]) => { $props: infer P } ? P : never

// 工具类型
export type Nullable<T> = T | null
export type Optional<T> = T | undefined
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P]
}
export type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K]
}
export type OmitByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K]
}

// 事件类型
export interface CustomEvent<T = any> {
  type: string
  data: T
  timestamp: number
}

// 错误类型
export interface AppError {
  code: string
  message: string
  details?: any
  stack?: string
}

// 配置类型
export interface AppConfig {
  apiBaseUrl: string
  timeout: number
  retryTimes: number
  enableMock: boolean
  enableDevtools: boolean
  logLevel: 'debug' | 'info' | 'warn' | 'error'
}
