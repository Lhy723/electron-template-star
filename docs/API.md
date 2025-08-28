# API 文档

本文档描述了 Electron Template Star 项目中的 API 接口和数据结构。

## 📋 目录

- [用户认证 API](#用户认证-api)
- [用户管理 API](#用户管理-api)
- [主题配置 API](#主题配置-api)
- [菜单管理 API](#菜单管理-api)
- [数据类型定义](#数据类型定义)
- [错误处理](#错误处理)

## 🔐 用户认证 API

### 用户登录

**接口地址：** `POST /api/auth/login`

**请求参数：**
```typescript
interface LoginRequest {
  username: string    // 用户名
  password: string    // 密码
  remember?: boolean  // 记住登录状态
}
```

**响应数据：**
```typescript
interface LoginResponse {
  code: number
  message: string
  data: {
    token: string           // 访问令牌
    refreshToken: string    // 刷新令牌
    expiresIn: number      // 过期时间（秒）
    user: UserInfo         // 用户信息
  }
}
```

**示例：**
```javascript
// 请求
{
  "username": "admin",
  "password": "123456",
  "remember": true
}

// 响应
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 7200,
    "user": {
      "id": "1",
      "username": "admin",
      "nickname": "管理员",
      "email": "admin@example.com",
      "avatar": "https://example.com/avatar.jpg",
      "roles": ["admin"],
      "permissions": ["user:read", "user:write"]
    }
  }
}
```

### 用户登出

**接口地址：** `POST /api/auth/logout`

**请求头：**
```
Authorization: Bearer <token>
```

**响应数据：**
```typescript
interface LogoutResponse {
  code: number
  message: string
}
```

### 刷新令牌

**接口地址：** `POST /api/auth/refresh`

**请求参数：**
```typescript
interface RefreshTokenRequest {
  refreshToken: string
}
```

**响应数据：**
```typescript
interface RefreshTokenResponse {
  code: number
  message: string
  data: {
    token: string
    expiresIn: number
  }
}
```

## 👤 用户管理 API

### 获取用户信息

**接口地址：** `GET /api/user/info`

**请求头：**
```
Authorization: Bearer <token>
```

**响应数据：**
```typescript
interface UserInfoResponse {
  code: number
  message: string
  data: UserInfo
}
```

### 更新用户信息

**接口地址：** `PUT /api/user/info`

**请求参数：**
```typescript
interface UpdateUserRequest {
  nickname?: string
  email?: string
  avatar?: string
  phone?: string
}
```

**响应数据：**
```typescript
interface UpdateUserResponse {
  code: number
  message: string
  data: UserInfo
}
```

### 修改密码

**接口地址：** `PUT /api/user/password`

**请求参数：**
```typescript
interface ChangePasswordRequest {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}
```

**响应数据：**
```typescript
interface ChangePasswordResponse {
  code: number
  message: string
}
```

## 🎨 主题配置 API

### 获取主题配置

**接口地址：** `GET /api/theme/config`

**响应数据：**
```typescript
interface ThemeConfigResponse {
  code: number
  message: string
  data: ThemeConfig
}
```

### 保存主题配置

**接口地址：** `POST /api/theme/config`

**请求参数：**
```typescript
interface SaveThemeConfigRequest {
  config: ThemeConfig
}
```

**响应数据：**
```typescript
interface SaveThemeConfigResponse {
  code: number
  message: string
}
```

## 📋 菜单管理 API

### 获取用户菜单

**接口地址：** `GET /api/menu/user`

**请求头：**
```
Authorization: Bearer <token>
```

**响应数据：**
```typescript
interface UserMenuResponse {
  code: number
  message: string
  data: MenuItem[]
}
```

### 获取所有菜单

**接口地址：** `GET /api/menu/all`

**响应数据：**
```typescript
interface AllMenuResponse {
  code: number
  message: string
  data: MenuItem[]
}
```

## 📊 数据类型定义

### 用户信息

```typescript
interface UserInfo {
  id: string                    // 用户ID
  username: string              // 用户名
  nickname: string              // 昵称
  email: string                 // 邮箱
  phone?: string                // 手机号
  avatar?: string               // 头像URL
  status: 'active' | 'inactive' // 状态
  roles: string[]               // 角色列表
  permissions: string[]         // 权限列表
  createdAt: string            // 创建时间
  updatedAt: string            // 更新时间
  lastLoginAt?: string         // 最后登录时间
}
```

### 主题配置

```typescript
type ThemeMode = 'light' | 'dark' | 'auto'
type ThemeColor = 'blue' | 'green' | 'purple' | 'orange' | 'red'

interface ThemeConfig {
  mode: ThemeMode              // 主题模式
  color: ThemeColor            // 主题颜色
  sidebarCollapsed: boolean    // 侧边栏是否折叠
  showBreadcrumb: boolean      // 是否显示面包屑
  showTabs: boolean            // 是否显示标签页
  showFooter: boolean          // 是否显示页脚
  fixedHeader: boolean         // 是否固定头部
  fixedSidebar: boolean        // 是否固定侧边栏
  enableTransition: boolean    // 是否启用动画
  transitionName: string       // 动画名称
}
```

### 菜单项

```typescript
interface MenuItem {
  id: string                   // 菜单ID
  name: string                 // 菜单名称
  path: string                 // 路由路径
  component?: string           // 组件路径
  icon?: string                // 图标
  title: string                // 显示标题
  hidden?: boolean             // 是否隐藏
  alwaysShow?: boolean         // 是否总是显示
  redirect?: string            // 重定向路径
  meta?: {
    title: string              // 页面标题
    icon?: string              // 菜单图标
    noCache?: boolean          // 是否缓存
    breadcrumb?: boolean       // 是否显示面包屑
    activeMenu?: string        // 激活菜单
    roles?: string[]           // 所需角色
    permissions?: string[]     // 所需权限
  }
  children?: MenuItem[]        // 子菜单
  parentId?: string           // 父菜单ID
  sort: number                // 排序
  status: 'active' | 'inactive' // 状态
  createdAt: string           // 创建时间
  updatedAt: string           // 更新时间
}
```

### 路由配置

```typescript
interface RouteConfig {
  path: string                 // 路由路径
  name: string                 // 路由名称
  component: any               // 组件
  redirect?: string            // 重定向
  meta?: {
    title?: string             // 页面标题
    icon?: string              // 图标
    requiresAuth?: boolean     // 是否需要认证
    roles?: string[]           // 所需角色
    permissions?: string[]     // 所需权限
    noCache?: boolean          // 是否缓存
    breadcrumb?: boolean       // 是否显示面包屑
    activeMenu?: string        // 激活菜单
  }
  children?: RouteConfig[]     // 子路由
}
```

### API 响应格式

```typescript
interface ApiResponse<T = any> {
  code: number                 // 状态码
  message: string              // 消息
  data?: T                     // 数据
  timestamp?: number           // 时间戳
  traceId?: string            // 追踪ID
}
```

### 分页数据

```typescript
interface PaginationRequest {
  page: number                 // 页码
  pageSize: number            // 每页数量
  sortBy?: string             // 排序字段
  sortOrder?: 'asc' | 'desc'  // 排序方向
}

interface PaginationResponse<T> {
  list: T[]                   // 数据列表
  total: number               // 总数量
  page: number                // 当前页码
  pageSize: number            // 每页数量
  totalPages: number          // 总页数
}
```

## ❌ 错误处理

### 错误码定义

| 错误码 | 说明 | 处理方式 |
|--------|------|----------|
| 200 | 成功 | 正常处理 |
| 400 | 请求参数错误 | 检查请求参数 |
| 401 | 未授权 | 重新登录 |
| 403 | 权限不足 | 提示权限不足 |
| 404 | 资源不存在 | 提示资源不存在 |
| 500 | 服务器内部错误 | 提示系统错误 |
| 1001 | 用户名或密码错误 | 提示登录失败 |
| 1002 | 用户已被禁用 | 提示账号被禁用 |
| 1003 | 令牌已过期 | 刷新令牌或重新登录 |
| 1004 | 令牌无效 | 重新登录 |
| 2001 | 用户不存在 | 提示用户不存在 |
| 2002 | 邮箱已存在 | 提示邮箱已被使用 |
| 2003 | 用户名已存在 | 提示用户名已被使用 |

### 错误响应格式

```typescript
interface ErrorResponse {
  code: number                 // 错误码
  message: string              // 错误消息
  details?: string             // 详细信息
  timestamp: number            // 时间戳
  traceId: string             // 追踪ID
  path: string                // 请求路径
}
```

### 错误处理示例

```typescript
// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    const { code, message, data } = response.data
    
    if (code === 200) {
      return data
    } else {
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    const { response } = error
    
    if (response) {
      const { status, data } = response
      
      switch (status) {
        case 401:
          // 未授权，跳转到登录页
          router.push('/login')
          break
        case 403:
          // 权限不足
          ElMessage.error('权限不足')
          break
        case 404:
          // 资源不存在
          ElMessage.error('请求的资源不存在')
          break
        case 500:
          // 服务器错误
          ElMessage.error('服务器内部错误')
          break
        default:
          ElMessage.error(data?.message || '请求失败')
      }
    } else {
      // 网络错误
      ElMessage.error('网络连接失败')
    }
    
    return Promise.reject(error)
  }
)
```

## 🔧 Mock 数据

项目中使用 Mock 数据进行开发和测试：

```typescript
// 模拟登录 API
export const mockLogin = async (params: LoginRequest): Promise<LoginResponse> => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const { username, password } = params
  
  // 模拟用户验证
  if (username === 'admin' && password === '123456') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        token: 'mock-token-admin',
        refreshToken: 'mock-refresh-token-admin',
        expiresIn: 7200,
        user: {
          id: '1',
          username: 'admin',
          nickname: '管理员',
          email: 'admin@example.com',
          avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
          status: 'active',
          roles: ['admin'],
          permissions: ['*'],
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2023-01-01T00:00:00Z'
        }
      }
    }
  } else {
    return {
      code: 1001,
      message: '用户名或密码错误',
      data: null
    }
  }
}
```

## 📝 使用说明

1. **开发环境**：使用 Mock 数据进行开发
2. **测试环境**：连接测试服务器 API
3. **生产环境**：连接生产服务器 API

通过环境变量配置不同环境的 API 地址：

```typescript
// .env.development
VITE_API_BASE_URL=http://localhost:3000/api
VITE_USE_MOCK=true

// .env.production
VITE_API_BASE_URL=https://api.example.com
VITE_USE_MOCK=false
```