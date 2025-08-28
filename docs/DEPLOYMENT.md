# 部署指南

本文档提供了 Electron Template Star 项目的详细部署指南。

## 📋 目录

- [环境准备](#环境准备)
- [构建配置](#构建配置)
- [Web 应用部署](#web-应用部署)
- [Electron 应用打包](#electron-应用打包)
- [自动化部署](#自动化部署)
- [性能优化](#性能优化)
- [监控与维护](#监控与维护)

## 🛠️ 环境准备

### 系统要求

**开发环境：**
- Node.js >= 16.0.0
- npm >= 8.0.0
- Git >= 2.0.0

**构建环境：**
- 内存：至少 4GB RAM
- 磁盘：至少 10GB 可用空间
- 网络：稳定的网络连接

### 依赖安装

```bash
# 安装项目依赖
npm install

# 安装全局工具（可选）
npm install -g electron-builder
npm install -g serve
```

## ⚙️ 构建配置

### 环境变量配置

创建不同环境的配置文件：

**.env.development**
```bash
# 开发环境配置
VITE_APP_TITLE=Electron Template Star (Dev)
VITE_API_BASE_URL=http://localhost:3000/api
VITE_USE_MOCK=true
VITE_APP_VERSION=1.0.0-dev
```

**.env.staging**
```bash
# 测试环境配置
VITE_APP_TITLE=Electron Template Star (Staging)
VITE_API_BASE_URL=https://api-staging.example.com
VITE_USE_MOCK=false
VITE_APP_VERSION=1.0.0-staging
```

**.env.production**
```bash
# 生产环境配置
VITE_APP_TITLE=Electron Template Star
VITE_API_BASE_URL=https://api.example.com
VITE_USE_MOCK=false
VITE_APP_VERSION=1.0.0
```

### Vite 构建配置

**vite.config.ts**
```typescript
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      vue(),
      createHtmlPlugin({
        inject: {
          data: {
            title: env.VITE_APP_TITLE || 'Electron Template Star'
          }
        }
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    build: {
      target: 'esnext',
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: mode !== 'production',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production'
        }
      },
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          manualChunks: {
            vendor: ['vue', 'vue-router', 'pinia'],
            ui: ['element-plus'],
            utils: ['lodash-es', 'dayjs']
          }
        }
      },
      chunkSizeWarningLimit: 1000
    },
    server: {
      port: 5173,
      host: true,
      open: true
    },
    preview: {
      port: 4173,
      host: true
    }
  }
})
```

## 🌐 Web 应用部署

### 构建 Web 应用

```bash
# 开发构建
npm run build:dev

# 测试环境构建
npm run build:staging

# 生产环境构建
npm run build

# 预览构建结果
npm run preview
```

### 静态文件服务器部署

#### Nginx 配置

**nginx.conf**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/electron-template-star/dist;
    index index.html;
    
    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # HTML 文件不缓存
    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
    
    # SPA 路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API 代理（可选）
    location /api/ {
        proxy_pass http://backend-server:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### Apache 配置

**.htaccess**
```apache
RewriteEngine On

# Handle Angular and Vue.js routes
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Set cache headers
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

### Docker 部署

**Dockerfile**
```dockerfile
# 构建阶段
FROM node:18-alpine as build-stage

WORKDIR /app

# 复制 package 文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 生产阶段
FROM nginx:alpine as production-stage

# 复制构建结果
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 复制 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
```

**docker-compose.yml**
```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    
  # 可选：添加后端服务
  api:
    image: your-api-image:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/dbname
    depends_on:
      - db
    restart: unless-stopped
    
  db:
    image: postgres:14-alpine
    environment:
      - POSTGRES_DB=dbname
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

## 📦 Electron 应用打包

### Electron Builder 配置

**electron-builder.json**
```json
{
  "appId": "com.example.electron-template-star",
  "productName": "Electron Template Star",
  "directories": {
    "output": "release",
    "buildResources": "build"
  },
  "files": [
    "dist/**/*",
    "dist-electron/**/*",
    "node_modules/**/*",
    "package.json"
  ],
  "extraMetadata": {
    "main": "dist-electron/main.js"
  },
  "win": {
    "target": [
      {
        "target": "nsis",
        "arch": ["x64", "ia32"]
      },
      {
        "target": "portable",
        "arch": ["x64"]
      }
    ],
    "icon": "build/icon.ico",
    "requestedExecutionLevel": "asInvoker"
  },
  "nsis": {
    "oneClick": false,
    "allowToChangeInstallationDirectory": true,
    "createDesktopShortcut": true,
    "createStartMenuShortcut": true,
    "shortcutName": "Electron Template Star"
  },
  "mac": {
    "target": [
      {
        "target": "dmg",
        "arch": ["x64", "arm64"]
      },
      {
        "target": "zip",
        "arch": ["x64", "arm64"]
      }
    ],
    "icon": "build/icon.icns",
    "category": "public.app-category.productivity"
  },
  "linux": {
    "target": [
      {
        "target": "AppImage",
        "arch": ["x64"]
      },
      {
        "target": "deb",
        "arch": ["x64"]
      },
      {
        "target": "rpm",
        "arch": ["x64"]
      }
    ],
    "icon": "build/icon.png",
    "category": "Office"
  },
  "publish": {
    "provider": "github",
    "owner": "your-username",
    "repo": "electron-template-star"
  }
}
```

### 构建脚本

**package.json**
```json
{
  "scripts": {
    "build:electron": "npm run build && electron-builder",
    "build:electron:win": "npm run build && electron-builder --win",
    "build:electron:mac": "npm run build && electron-builder --mac",
    "build:electron:linux": "npm run build && electron-builder --linux",
    "build:electron:all": "npm run build && electron-builder --win --mac --linux",
    "dist": "npm run build:electron",
    "dist:dir": "npm run build && electron-builder --dir",
    "release": "npm run build && electron-builder --publish=always"
  }
}
```

### 构建命令

```bash
# 构建当前平台
npm run build:electron

# 构建 Windows 版本
npm run build:electron:win

# 构建 macOS 版本
npm run build:electron:mac

# 构建 Linux 版本
npm run build:electron:linux

# 构建所有平台
npm run build:electron:all

# 发布到 GitHub Releases
npm run release
```

## 🚀 自动化部署

### GitHub Actions

**.github/workflows/build.yml**
```yaml
name: Build and Deploy

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  release:
    types: [ published ]

jobs:
  build-web:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm run test
    
    - name: Build application
      run: npm run build
    
    - name: Upload build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: web-build
        path: dist/
  
  build-electron:
    runs-on: ${{ matrix.os }}
    
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build Electron app
      run: npm run build:electron
      env:
        GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    
    - name: Upload artifacts
      uses: actions/upload-artifact@v3
      with:
        name: electron-${{ matrix.os }}
        path: release/
  
  deploy:
    needs: build-web
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Download build artifacts
      uses: actions/download-artifact@v3
      with:
        name: web-build
        path: dist/
    
    - name: Deploy to server
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        script: |
          cd /var/www/electron-template-star
          git pull origin main
          npm ci
          npm run build
          sudo systemctl reload nginx
```

### GitLab CI/CD

**.gitlab-ci.yml**
```yaml
stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "18"

cache:
  paths:
    - node_modules/

test:
  stage: test
  image: node:$NODE_VERSION
  script:
    - npm ci
    - npm run lint
    - npm run test
  only:
    - merge_requests
    - main
    - develop

build-web:
  stage: build
  image: node:$NODE_VERSION
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 hour
  only:
    - main
    - develop

build-electron:
  stage: build
  image: node:$NODE_VERSION
  script:
    - npm ci
    - npm run build:electron
  artifacts:
    paths:
      - release/
    expire_in: 1 week
  only:
    - tags

deploy-staging:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache rsync openssh
    - eval $(ssh-agent -s)
    - echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
  script:
    - rsync -avz --delete dist/ $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH
    - ssh $DEPLOY_USER@$DEPLOY_HOST "sudo systemctl reload nginx"
  environment:
    name: staging
    url: https://staging.example.com
  only:
    - develop

deploy-production:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache rsync openssh
    - eval $(ssh-agent -s)
    - echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
  script:
    - rsync -avz --delete dist/ $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH
    - ssh $DEPLOY_USER@$DEPLOY_HOST "sudo systemctl reload nginx"
  environment:
    name: production
    url: https://example.com
  when: manual
  only:
    - main
```

## ⚡ 性能优化

### 构建优化

1. **代码分割**
   ```typescript
   // 路由懒加载
   const routes = [
     {
       path: '/dashboard',
       component: () => import('@/views/Dashboard.vue')
     }
   ]
   ```

2. **资源压缩**
   ```bash
   # 安装压缩插件
   npm install -D vite-plugin-compression
   ```

3. **Tree Shaking**
   ```typescript
   // 按需导入
   import { ElButton, ElInput } from 'element-plus'
   ```

### 运行时优化

1. **缓存策略**
   - 静态资源长期缓存
   - HTML 文件不缓存
   - API 响应适当缓存

2. **CDN 加速**
   ```typescript
   // 使用 CDN 加载第三方库
   export default defineConfig({
     build: {
       rollupOptions: {
         external: ['vue', 'vue-router'],
         output: {
           globals: {
             vue: 'Vue',
             'vue-router': 'VueRouter'
           }
         }
       }
     }
   })
   ```

3. **预加载关键资源**
   ```html
   <link rel="preload" href="/assets/critical.css" as="style">
   <link rel="preload" href="/assets/critical.js" as="script">
   ```

## 📊 监控与维护

### 错误监控

```typescript
// 全局错误处理
app.config.errorHandler = (err, vm, info) => {
  console.error('Global error:', err, info)
  // 发送错误到监控服务
  sendErrorToMonitoring(err, info)
}

// 未捕获的 Promise 错误
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
  sendErrorToMonitoring(event.reason)
})
```

### 性能监控

```typescript
// 性能指标收集
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'navigation') {
      // 页面加载时间
      console.log('Page load time:', entry.loadEventEnd - entry.fetchStart)
    }
  }
})

observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] })
```

### 日志管理

```typescript
// 日志工具
class Logger {
  static info(message: string, data?: any) {
    console.log(`[INFO] ${message}`, data)
    this.sendLog('info', message, data)
  }
  
  static error(message: string, error?: Error) {
    console.error(`[ERROR] ${message}`, error)
    this.sendLog('error', message, error)
  }
  
  private static sendLog(level: string, message: string, data?: any) {
    // 发送日志到服务器
    if (import.meta.env.PROD) {
      fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level, message, data, timestamp: Date.now() })
      })
    }
  }
}
```

### 健康检查

```bash
#!/bin/bash
# health-check.sh

# 检查应用是否运行
if curl -f http://localhost/health; then
    echo "Application is healthy"
else
    echo "Application is unhealthy"
    # 重启应用
    sudo systemctl restart nginx
    # 发送告警
    curl -X POST "$WEBHOOK_URL" -d '{"text":"Application is down and restarted"}'
fi
```

## 🔧 故障排除

### 常见问题

1. **构建失败**
   - 检查 Node.js 版本
   - 清除 node_modules 重新安装
   - 检查环境变量配置

2. **部署失败**
   - 检查服务器权限
   - 验证网络连接
   - 查看服务器日志

3. **性能问题**
   - 分析构建产物大小
   - 检查网络请求
   - 优化图片和资源

### 调试工具

```bash
# 分析构建产物
npm install -g webpack-bundle-analyzer
npx webpack-bundle-analyzer dist/assets

# 性能测试
npm install -g lighthouse
lighthouse http://localhost:5173

# 网络分析
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:5173
```

## 📚 参考资源

- [Vite 构建指南](https://vitejs.dev/guide/build.html)
- [Electron Builder 文档](https://www.electron.build/)
- [Nginx 配置指南](https://nginx.org/en/docs/)
- [Docker 部署指南](https://docs.docker.com/)
- [GitHub Actions 文档](https://docs.github.com/en/actions)