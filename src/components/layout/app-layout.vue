<template>
  <div class="app-layout">
    <!-- 侧边栏 -->
    <aside
      class="app-sidebar"
      :class="{
        collapsed: themeStore.config.sidebarCollapsed,
        fixed: themeStore.config.fixedSidebar,
      }"
    >
      <div class="sidebar-header">
        <div class="logo">
          <el-icon v-if="!themeStore.config.sidebarCollapsed" size="24"><Grid /></el-icon>
          <span v-if="!themeStore.config.sidebarCollapsed" class="logo-text">Electron App</span>
          <el-icon v-else size="20"><Grid /></el-icon>
        </div>
      </div>

      <nav class="sidebar-nav">
        <el-menu
          :default-active="$route.path"
          :collapse="themeStore.config.sidebarCollapsed"
          :unique-opened="true"
          router
          class="sidebar-menu"
        >
          <el-menu-item index="/dashboard">
            <el-icon><Odometer /></el-icon>
            <template #title>仪表盘</template>
          </el-menu-item>

          <el-menu-item index="/components">
            <el-icon><Grid /></el-icon>
            <template #title>组件示例</template>
          </el-menu-item>

          <el-menu-item index="/theme">
            <el-icon><Brush /></el-icon>
            <template #title>主题设置</template>
          </el-menu-item>
        </el-menu>
      </nav>
    </aside>

    <!-- 主内容区 -->
    <div class="app-main">
      <!-- 头部 -->
      <header
        class="app-header"
        :class="{
          fixed: themeStore.config.fixedHeader,
        }"
      >
        <div class="header-left">
          <el-button circle :icon="Menu" @click="themeStore.toggleSidebar" />

          <!-- 面包屑 -->
          <el-breadcrumb v-if="themeStore.config.showBreadcrumb" class="breadcrumb">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="$route.meta.title">{{
              $route.meta.title
            }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <div class="header-right">
          <!-- 主题切换 -->
          <ThemeToggle />

          <!-- 用户信息 -->
          <el-dropdown trigger="click">
            <el-avatar :size="32" :src="userStore.avatar" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <!-- 窗口控制按钮 -->
          <WindowControls />
        </div>
      </header>

      <!-- 标签页 -->
      <div v-if="themeStore.config.showTabs" class="app-tabs">
        <el-tabs
          v-model="activeTab"
          type="card"
          closable
          @tab-remove="removeTab"
          @tab-click="handleTabClick"
        >
          <el-tab-pane v-for="tab in tabs" :key="tab.path" :label="tab.title" :name="tab.path" />
        </el-tabs>
      </div>

      <!-- 页面内容 -->
      <main class="app-content">
        <router-view v-slot="{ Component }">
          <transition
            :name="themeStore.config.enableTransition ? themeStore.config.transitionName : 'none'"
            mode="out-in"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </main>

      <!-- 页脚 -->
      <footer v-if="themeStore.config.showFooter" class="app-footer">
        <div class="footer-content">
          <span>© 2024 Electron Template. All rights reserved.</span>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Menu, Grid, Odometer, Brush } from '@element-plus/icons-vue'
import { useThemeStore } from '@/stores/theme'
import { useUserStore } from '@/stores/user'
import ThemeToggle from '@/components/theme-toggle.vue'
import WindowControls from '@/components/window-controls.vue'

const route = useRoute()
const router = useRouter()
const themeStore = useThemeStore()
const userStore = useUserStore()

// 标签页管理
const activeTab = ref(route.path)
const tabs = ref([{ path: '/dashboard', title: '仪表盘' }])

// 监听路由变化，添加标签页
watch(
  () => route.path,
  newPath => {
    activeTab.value = newPath

    // 添加新标签页
    const existingTab = tabs.value.find(tab => tab.path === newPath)
    if (!existingTab && route.meta.title) {
      tabs.value.push({
        path: newPath,
        title: route.meta.title as string,
      })
    }
  },
  { immediate: true }
)

// 移除标签页
const removeTab = (targetName: string) => {
  const targetIndex = tabs.value.findIndex(tab => tab.path === targetName)
  if (targetIndex === -1) return

  tabs.value.splice(targetIndex, 1)

  // 如果关闭的是当前标签页，跳转到其他标签页
  if (targetName === activeTab.value) {
    const nextTab = tabs.value[targetIndex] || tabs.value[targetIndex - 1]
    if (nextTab) {
      router.push(nextTab.path)
    } else {
      router.push('/dashboard')
    }
  }
}

// 点击标签页
const handleTabClick = (tab: any) => {
  router.push(tab.paneName)
}

// 退出登录
const handleLogout = () => {
  userStore.logout()
  router.push('/login')
  ElMessage.success('已退出登录')
}
</script>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* 侧边栏 */
.app-sidebar {
  width: 200px;
  background: var(--el-bg-color);
  border-right: 1px solid var(--el-border-color);
  transition: width 0.3s ease;
  overflow: hidden;
}

.app-sidebar.collapsed {
  width: 64px;
}

.app-sidebar.fixed {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 999;
}

.sidebar-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--el-border-color);
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: bold;
  color: var(--el-text-color-primary);
}

.logo-text {
  white-space: nowrap;
}

.sidebar-nav {
  height: calc(100% - 60px);
  overflow-y: auto;
}

.sidebar-menu {
  border: none;
  height: 100%;
}

/* 主内容区 */
.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-left: 0;
  transition: margin-left 0.3s ease;
}

.fixed-sidebar .app-main {
  margin-left: 200px;
}

.fixed-sidebar.sidebar-collapsed .app-main {
  margin-left: 64px;
}

/* 头部 */
.app-header {
  height: 60px;
  background: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  flex-shrink: 0;
  -webkit-app-region: drag; /* 使整个header可拖拽 */
  user-select: none; /* 防止文本选择 */
}

.app-header.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.fixed-header .app-content {
  padding-top: 60px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
  -webkit-app-region: no-drag; /* 确保左侧按钮可以点击 */
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
  -webkit-app-region: no-drag; /* 确保右侧按钮可以点击 */
}

.breadcrumb {
  margin-left: 16px;
}

/* 标签页 */
.app-tabs {
  background: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color);
  padding: 0 16px;
  flex-shrink: 0;
}

.app-tabs :deep(.el-tabs__header) {
  margin: 0;
}

.app-tabs :deep(.el-tabs__nav-wrap) {
  padding: 8px 0;
}

/* 内容区 */
.app-content {
  flex: 1;
  overflow: auto;
  background: var(--el-bg-color-page);
}

/* 页脚 */
.app-footer {
  height: 48px;
  background: var(--el-bg-color);
  border-top: 1px solid var(--el-border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.footer-content {
  color: var(--el-text-color-secondary);
  font-size: 12px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .app-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1001;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .sidebar-open .app-sidebar {
    transform: translateX(0);
  }

  .app-main {
    margin-left: 0 !important;
  }

  .breadcrumb {
    display: none;
  }
}
</style>
