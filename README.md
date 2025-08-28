# Electron Template Star ⭐

一个现代化的 Electron + Vue 3 桌面应用开发模板，集成了最新的前端技术栈和最佳实践。

## ✨ 特性

- 🚀 **现代技术栈**: Electron + Vue 3 + Vite + TypeScript
- 🎨 **丰富UI组件**: Element Plus + ShadcnUI + Tailwind CSS
- 🌈 **主题系统**: 支持亮色/暗色主题，多种主题色彩
- 🔐 **权限管理**: 基于角色的权限控制系统
- 📱 **响应式布局**: 适配不同屏幕尺寸
- 🗂️ **路由管理**: Vue Router 动态路由配置
- 📦 **状态管理**: Pinia 状态管理
- 🛠️ **开发工具**: ESLint + Prettier + TypeScript
- ⚡ **热重载**: 开发环境快速热重载
- 📋 **标签页**: 多标签页管理
- 🍞 **面包屑**: 导航面包屑

## 🛠️ 技术栈

### 核心框架
- [Electron](https://www.electronjs.org/) - 跨平台桌面应用框架
- [Vue 3](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集

### UI 框架
- [Element Plus](https://element-plus.org/) - Vue 3 组件库
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [ShadcnUI](https://ui.shadcn.com/) - 现代化组件库

### 状态管理
- [Pinia](https://pinia.vuejs.org/) - Vue 状态管理库
- [Vue Router](https://router.vuejs.org/) - Vue 路由管理

### 开发工具
- [ESLint](https://eslint.org/) - 代码质量检查
- [Prettier](https://prettier.io/) - 代码格式化
- [Husky](https://typicode.github.io/husky/) - Git hooks

## 📦 安装

### 环境要求
- Node.js >= 16
- npm >= 8

### 克隆项目
```bash
git clone <repository-url>
cd electron-template-star
```

### 安装依赖
```bash
npm install
```

## 🚀 使用

### 开发模式
```bash
npm run dev
```

### 构建应用
```bash
# 构建 Web 版本
npm run build

# 构建 Electron 应用
npm run build:electron
```

### 代码检查
```bash
# ESLint 检查
npm run lint

# 自动修复
npm run lint:fix

# Prettier 格式化
npm run format
```

### 预览构建结果
```bash
npm run preview
```

## 📁 项目结构

```
electron-template-star/
├── electron/                 # Electron 主进程文件
│   ├── main.ts              # 主进程入口
│   └── preload.ts           # 预加载脚本
├── src/                     # 源代码目录
│   ├── components/          # 组件目录
│   │   ├── layout/          # 布局组件
│   │   └── ui/              # UI 组件
│   ├── router/              # 路由配置
│   ├── stores/              # 状态管理
│   │   ├── menu.ts          # 菜单状态
│   │   ├── theme.ts         # 主题状态
│   │   └── user.ts          # 用户状态
│   ├── styles/              # 样式文件
│   ├── utils/               # 工具函数
│   ├── views/               # 页面组件
│   ├── App.vue              # 根组件
│   └── main.ts              # 应用入口
├── public/                  # 静态资源
├── dist/                    # 构建输出
├── dist-electron/           # Electron 构建输出
└── package.json             # 项目配置
```

## 🎨 主题系统

### 主题模式
- **亮色模式**: 默认亮色主题
- **暗色模式**: 深色主题
- **自动模式**: 跟随系统主题

### 主题色彩
- 蓝色 (默认)
- 绿色
- 紫色
- 橙色
- 红色

### 布局配置
- 侧边栏折叠
- 显示面包屑
- 显示标签页
- 显示页脚
- 固定头部
- 固定侧边栏
- 动画效果

## 🔐 权限系统

### 用户角色
- **admin**: 管理员
- **user**: 普通用户
- **guest**: 访客

### 权限控制
- 路由级权限控制
- 组件级权限控制
- 按钮级权限控制

## 📋 功能模块

### 仪表盘
- 数据统计卡片
- 图表展示
- 快捷操作

### 组件示例
- Element Plus 组件展示
- 自定义组件示例
- 交互效果演示

### 主题设置
- 主题模式切换
- 主题色彩选择
- 布局配置
- 预设主题

### 用户管理
- 用户登录/登出
- 用户信息管理
- 权限验证

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🙏 致谢

感谢所有开源项目的贡献者们！