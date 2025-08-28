# 开发指南

本文档提供了 Electron Template Star 项目的详细开发指南。

## 📋 目录

- [开发环境设置](#开发环境设置)
- [项目架构](#项目架构)
- [开发规范](#开发规范)
- [组件开发](#组件开发)
- [状态管理](#状态管理)
- [路由配置](#路由配置)
- [主题系统](#主题系统)
- [构建部署](#构建部署)
- [常见问题](#常见问题)

## 🛠️ 开发环境设置

### 必需软件

1. **Node.js** (>= 16.0.0)
   ```bash
   # 检查版本
   node --version
   npm --version
   ```

2. **Git**
   ```bash
   git --version
   ```

3. **推荐编辑器**: VS Code
   - 安装推荐插件：Vue Language Features (Volar)、TypeScript Vue Plugin (Volar)

### 项目设置

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd electron-template-star
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

## 🏗️ 项目架构

### 目录结构说明

```
src/
├── components/          # 可复用组件
│   ├── layout/         # 布局相关组件
│   │   ├── app-layout.vue      # 主布局
│   │   ├── sidebar.vue         # 侧边栏
│   │   ├── header.vue          # 头部
│   │   └── footer.vue          # 页脚
│   └── ui/             # UI 组件
├── router/             # 路由配置
│   └── index.ts        # 路由定义
├── stores/             # 状态管理
│   ├── menu.ts         # 菜单状态
│   ├── theme.ts        # 主题状态
│   └── user.ts         # 用户状态
├── styles/             # 样式文件
│   ├── index.css       # 全局样式
│   └── themes/         # 主题样式
├── utils/              # 工具函数
├── views/              # 页面组件
│   ├── dashboard.vue   # 仪表盘
│   ├── components.vue  # 组件示例
│   ├── theme.vue       # 主题设置
│   └── login.vue       # 登录页
├── App.vue             # 根组件
└── main.ts             # 应用入口
```

### 技术架构

```
┌─────────────────────────────────────┐
│              Electron               │
├─────────────────────────────────────┤
│               Vue 3                 │
├─────────────────────────────────────┤
│  Element Plus │ ShadcnUI │ Tailwind │
├─────────────────────────────────────┤
│    Pinia    │  Vue Router │  Vite   │
├─────────────────────────────────────┤
│         TypeScript │ ESLint         │
└─────────────────────────────────────┘
```

## 📝 开发规范

### 代码风格

1. **使用 TypeScript**
   - 所有新文件使用 `.ts` 或 `.vue` 扩展名
   - 定义明确的类型接口
   - 避免使用 `any` 类型

2. **Vue 3 Composition API**
   ```vue
   <script setup lang="ts">
   import { ref, computed, onMounted } from 'vue'
   
   // 响应式数据
   const count = ref(0)
   
   // 计算属性
   const doubleCount = computed(() => count.value * 2)
   
   // 生命周期
   onMounted(() => {
     console.log('组件已挂载')
   })
   </script>
   ```

3. **命名规范**
   - 组件名：PascalCase (`UserProfile.vue`)
   - 文件名：kebab-case (`user-profile.vue`)
   - 变量名：camelCase (`userName`)
   - 常量名：UPPER_SNAKE_CASE (`API_BASE_URL`)

### Git 提交规范

使用 Conventional Commits 规范：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**类型说明：**
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式化
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

**示例：**
```
feat(auth): add user login functionality

fix(theme): resolve dark mode toggle issue

docs: update development guide
```

## 🧩 组件开发

### 组件结构

```vue
<template>
  <!-- 模板内容 -->
</template>

<script setup lang="ts">
// 导入
import { ref, computed } from 'vue'

// 接口定义
interface Props {
  title: string
  count?: number
}

// Props
const props = withDefaults(defineProps<Props>(), {
  count: 0
})

// Emits
const emit = defineEmits<{
  update: [value: number]
  change: []
}>()

// 响应式数据
const isVisible = ref(true)

// 计算属性
const displayTitle = computed(() => {
  return `${props.title} (${props.count})`
})

// 方法
const handleClick = () => {
  emit('update', props.count + 1)
}
</script>

<style scoped>
/* 组件样式 */
</style>
```

### 组件最佳实践

1. **单一职责原则**
   - 每个组件只负责一个功能
   - 保持组件的简洁和可复用性

2. **Props 验证**
   ```typescript
   interface Props {
     required: string
     optional?: number
     withDefault?: boolean
   }
   
   const props = withDefaults(defineProps<Props>(), {
     optional: 0,
     withDefault: true
   })
   ```

3. **事件命名**
   - 使用动词形式：`click`, `change`, `update`
   - 避免使用原生事件名称

## 🗃️ 状态管理

### Pinia Store 结构

```typescript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useExampleStore = defineStore('example', () => {
  // 状态
  const count = ref(0)
  const items = ref<Item[]>([])
  
  // 计算属性
  const doubleCount = computed(() => count.value * 2)
  const itemCount = computed(() => items.value.length)
  
  // 方法
  const increment = () => {
    count.value++
  }
  
  const addItem = (item: Item) => {
    items.value.push(item)
  }
  
  const reset = () => {
    count.value = 0
    items.value = []
  }
  
  return {
    // 状态
    count,
    items,
    
    // 计算属性
    doubleCount,
    itemCount,
    
    // 方法
    increment,
    addItem,
    reset
  }
})
```

### Store 使用

```vue
<script setup lang="ts">
import { useExampleStore } from '@/stores/example'

const exampleStore = useExampleStore()

// 直接访问状态
console.log(exampleStore.count)

// 调用方法
exampleStore.increment()

// 响应式解构
import { storeToRefs } from 'pinia'
const { count, doubleCount } = storeToRefs(exampleStore)
</script>
```

## 🛣️ 路由配置

### 路由定义

```typescript
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '首页',
      requiresAuth: false,
      roles: ['admin', 'user']
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      title: '仪表盘',
      requiresAuth: true,
      roles: ['admin']
    }
  }
]
```

### 路由守卫

```typescript
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - Electron Template Star`
  }
  
  // 权限检查
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next('/login')
    return
  }
  
  // 角色检查
  if (to.meta.roles && !userStore.hasAnyRole(to.meta.roles)) {
    next('/403')
    return
  }
  
  next()
})
```

## 🎨 主题系统

### 主题配置

```typescript
// 主题类型定义
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
```

### 主题使用

```vue
<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

// 切换主题模式
const toggleTheme = () => {
  themeStore.toggleDark()
}

// 设置主题颜色
const setThemeColor = (color: ThemeColor) => {
  themeStore.setThemeColor(color)
}
</script>

<template>
  <div :class="{ 'dark': themeStore.isDark }">
    <!-- 内容 -->
  </div>
</template>
```

## 🏗️ 构建部署

### 开发构建

```bash
# 启动开发服务器
npm run dev

# 类型检查
npm run type-check

# 代码检查
npm run lint

# 代码格式化
npm run format
```

### 生产构建

```bash
# 构建 Web 版本
npm run build

# 构建 Electron 应用
npm run build:electron

# 预览构建结果
npm run preview
```

### 构建优化

1. **代码分割**
   ```typescript
   // 路由懒加载
   const Dashboard = () => import('@/views/Dashboard.vue')
   
   // 组件懒加载
   const LazyComponent = defineAsyncComponent(() => import('@/components/LazyComponent.vue'))
   ```

2. **资源优化**
   - 图片压缩
   - CSS 压缩
   - JavaScript 压缩
   - Tree Shaking

## ❓ 常见问题

### Q: 如何添加新的页面？

A: 
1. 在 `src/views/` 目录下创建新的 Vue 组件
2. 在 `src/router/index.ts` 中添加路由配置
3. 在菜单配置中添加菜单项（如需要）

### Q: 如何自定义主题？

A:
1. 在 `src/stores/theme.ts` 中添加新的主题配置
2. 在 `src/styles/themes/` 中添加对应的 CSS 变量
3. 更新主题选择器组件

### Q: 如何添加新的状态管理？

A:
1. 在 `src/stores/` 目录下创建新的 store 文件
2. 使用 `defineStore` 定义 store
3. 在组件中导入并使用

### Q: 如何处理 API 请求？

A:
1. 在 `src/utils/` 中创建 API 工具函数
2. 在 store 中处理异步逻辑
3. 在组件中调用 store 方法

### Q: 如何调试 Electron 应用？

A:
1. 使用 Chrome DevTools 调试渲染进程
2. 使用 VS Code 调试主进程
3. 查看控制台日志和错误信息

## 📚 参考资源

- [Vue 3 官方文档](https://vuejs.org/)
- [Electron 官方文档](https://www.electronjs.org/docs)
- [Vite 官方文档](https://vitejs.dev/)
- [Pinia 官方文档](https://pinia.vuejs.org/)
- [Element Plus 官方文档](https://element-plus.org/)
- [Tailwind CSS 官方文档](https://tailwindcss.com/)