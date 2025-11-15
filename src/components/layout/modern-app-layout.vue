<template>
  <div class="modern-app-layout">
    <!-- 导航栏 -->
    <ModernNavigationBar
      :title="currentPageTitle"
      :show-back-button="showBackButton"
      :transparent="transparentNavigation"
      :large="largeTitle"
      @back="handleNavigationBack"
    >
      <template #leading>
        <slot name="navigation-leading" />
      </template>
      
      <template #trailing>
        <button
          v-if="showSidebarToggle"
          class="modern-nav-button"
          @click="toggleSidebar"
        >
          <Menu class="w-6 h-6" />
        </button>
        <slot name="navigation-trailing" />
      </template>
    </ModernNavigationBar>
    
    <!-- 侧边栏覆盖层 -->
    <Transition name="sidebar-overlay">
      <div
        v-if="sidebarVisible"
        class="modern-sidebar-overlay"
        @click="closeSidebar"
      />
    </Transition>
    
    <!-- 侧边栏 -->
    <Transition name="sidebar-slide">
      <aside
        v-if="sidebarVisible"
        class="modern-sidebar"
      >
        <ModernSidebarNav
          :sections="navigationSections"
          :active-item="activeNavigationItem"
          @item-click="handleSidebarItemClick"
          @toggle-expand="handleSidebarToggleExpand"
        >
          <template #header>
            <div class="modern-sidebar-header">
              <h2 class="modern-sidebar-title">{{ appTitle }}</h2>
              <button
                class="modern-sidebar-close"
                @click="closeSidebar"
              >
                <X class="w-5 h-5" />
              </button>
            </div>
          </template>
          
          <template #footer>
            <slot name="sidebar-footer" />
          </template>
        </ModernSidebarNav>
      </aside>
    </Transition>
    
    <!-- 主内容区 -->
    <main class="modern-main-content">
      <div class="modern-main-content__container">
        <router-view v-slot="{ Component, route }">
          <Transition
            :name="getTransitionName(route)"
            mode="out-in"
            @enter="onRouteEnter"
            @leave="onRouteLeave"
          >
            <component 
              :is="Component" 
              :key="route.path"
              class="modern-page"
            />
          </Transition>
        </router-view>
      </div>
    </main>
    
    <!-- 底部标签栏 -->
    <ModernTabBar
      v-if="showTabBar"
      :items="tabBarItems"
      :active-item="activeTabItem"
      :show-labels="showTabLabels"
      @item-click="handleTabBarItemClick"
    />
    
    <!-- 全局加载指示器 -->
    <Transition name="loading-fade">
      <div
        v-if="globalLoading"
        class="modern-global-loading"
      >
        <div class="modern-loading-spinner">
          <div class="modern-spinner"></div>
          <p class="modern-loading-text">{{ loadingText }}</p>
        </div>
      </div>
    </Transition>
    
    <!-- 全局通知 -->
    <Transition name="notification-slide">
      <div
        v-if="notification"
        class="modern-notification"
        :class="`modern-notification--${notification.type}`"
      >
        <component
          :is="getNotificationIcon(notification.type)"
          class="modern-notification__icon"
        />
        <div class="modern-notification__content">
          <p class="modern-notification__title">{{ notification.title }}</p>
          <p v-if="notification.message" class="modern-notification__message">
            {{ notification.message }}
          </p>
        </div>
        <button
          class="modern-notification__close"
          @click="clearNotification"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter, type RouteLocationNormalized } from 'vue-router'
import { Menu, X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-vue-next'
import ModernNavigationBar from '../ui/modern-navigation-bar.vue'
import ModernSidebarNav from '../ui/modern-sidebar-nav.vue'
import ModernTabBar from '../ui/modern-tab-bar.vue'

interface NavigationItem {
  id: string
  label: string
  icon: any
  to?: string
  badge?: string | number
  disabled?: boolean
  expandable?: boolean
  expanded?: boolean
  children?: NavigationItem[]
}

interface NavigationSection {
  id: string
  title?: string
  items: NavigationItem[]
}

interface TabBarItem {
  id: string
  label: string
  icon: any
  route?: string
  badge?: string | number
  disabled?: boolean
}

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

interface Props {
  appTitle?: string
  showSidebarToggle?: boolean
  showTabBar?: boolean
  showTabLabels?: boolean
  transparentNavigation?: boolean
  largeTitle?: boolean
  navigationSections?: NavigationSection[]
  tabBarItems?: TabBarItem[]
  globalLoading?: boolean
  loadingText?: string
  notification?: Notification | null
}

interface Emits {
  (e: 'sidebar-toggle', visible: boolean): void
  (e: 'sidebar-item-click', item: NavigationItem): void
  (e: 'tab-item-click', item: TabBarItem): void
  (e: 'navigation-back'): void
  (e: 'route-change', route: RouteLocationNormalized): void
  (e: 'notification-close', notification: Notification): void
}

const props = withDefaults(defineProps<Props>(), {
  appTitle: 'Modern App',
  showSidebarToggle: true,
  showTabBar: false,
  showTabLabels: true,
  transparentNavigation: false,
  largeTitle: false,
  navigationSections: () => [],
  tabBarItems: () => [],
  globalLoading: false,
  loadingText: '加载中...',
  notification: null
})

const emit = defineEmits<Emits>()
const route = useRoute()
const router = useRouter()

// 状态管理
const sidebarVisible = ref(false)
const routeTransitioning = ref(false)

// 计算属性
const currentPageTitle = computed(() => {
  return route.meta?.title as string || route.name as string || '页面'
})

const showBackButton = computed(() => {
  return router.options.history.state.back !== null || route.meta?.showBack === true
})

const activeNavigationItem = computed(() => {
  // 根据当前路由查找活跃的导航项
  for (const section of props.navigationSections) {
    for (const item of section.items) {
      if (item.to === route.path) {
        return item.id
      }
      if (item.children) {
        for (const child of item.children) {
          if (child.to === route.path) {
            return child.id
          }
        }
      }
    }
  }
  return ''
})

const activeTabItem = computed(() => {
  // 根据当前路由查找活跃的标签栏项
  const activeTab = props.tabBarItems.find(item => item.route === route.path)
  return activeTab?.id || ''
})

// 方法
const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value
  emit('sidebar-toggle', sidebarVisible.value)
}

const closeSidebar = () => {
  sidebarVisible.value = false
  emit('sidebar-toggle', false)
}

const handleNavigationBack = () => {
  emit('navigation-back')
}

const handleSidebarItemClick = (item: NavigationItem) => {
  if (item.to) {
    router.push(item.to)
    closeSidebar()
  }
  emit('sidebar-item-click', item)
}

const handleSidebarToggleExpand = (item: NavigationItem) => {
  // 处理侧边栏项目展开/折叠
  console.log('Toggle expand:', item)
}

const handleTabBarItemClick = (item: TabBarItem) => {
  if (item.route) {
    router.push(item.route)
  }
  emit('tab-item-click', item)
}

const getTransitionName = (route: RouteLocationNormalized) => {
  // 根据路由元信息决定过渡动画
  if (route.meta?.transition) {
    return route.meta.transition as string
  }
  return 'fade'
}

const onRouteEnter = () => {
  routeTransitioning.value = false
}

const onRouteLeave = () => {
  routeTransitioning.value = true
}

const getNotificationIcon = (type: string) => {
  const iconMap = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info
  }
  return iconMap[type as keyof typeof iconMap] || Info
}

const clearNotification = () => {
  if (props.notification) {
    emit('notification-close', props.notification)
  }
}

// 监听路由变化
watch(route, (newRoute) => {
  emit('route-change', newRoute)
  // 在移动设备上路由变化时关闭侧边栏
  if (window.innerWidth <= 768) {
    closeSidebar()
  }
})

// 监听窗口大小变化
const handleResize = () => {
  if (window.innerWidth > 768) {
    closeSidebar()
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})
</script>

<style scoped>
.modern-app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--modern-background-primary);
  color: var(--modern-text-primary);
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.modern-nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--modern-primary-blue);
  cursor: pointer;
  padding: var(--modern-spacing-sm);
  border-radius: var(--modern-radius-sm);
  transition: all var(--modern-duration-fast) var(--modern-easing-ease);
  -webkit-tap-highlight-color: transparent;
}

.modern-nav-button:hover {
  background: var(--modern-fill-quaternary);
}

.modern-nav-button:active {
  background: var(--modern-fill-tertiary);
  transform: scale(0.96);
}

.modern-sidebar-overlay {
  position: fixed;
  top: 88px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 998;
}

.modern-sidebar {
  position: fixed;
  top: 88px;
  left: 0;
  bottom: 0;
  width: 280px;
  z-index: 999;
  box-shadow: var(--modern-shadow-lg);
}

.modern-sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--modern-spacing-md);
}

.modern-sidebar-title {
  font-size: var(--modern-font-size-headline);
  font-weight: 700;
  color: var(--modern-text-primary);
  margin: 0;
}

.modern-sidebar-close {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--modern-text-secondary);
  cursor: pointer;
  padding: var(--modern-spacing-xs);
  border-radius: var(--modern-radius-sm);
  transition: all var(--modern-duration-fast) var(--modern-easing-ease);
}

.modern-sidebar-close:hover {
  background: var(--modern-fill-quaternary);
  color: var(--modern-text-primary);
}

.modern-main-content {
  flex: 1;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

.modern-main-content__container {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: var(--modern-fill-tertiary) transparent;
}

.modern-main-content__container::-webkit-scrollbar {
  width: 6px;
}

.modern-main-content__container::-webkit-scrollbar-track {
  background: transparent;
}

.modern-main-content__container::-webkit-scrollbar-thumb {
  background: var(--modern-fill-tertiary);
  border-radius: var(--modern-radius-full);
}

.modern-page {
  min-height: 100%;
  padding: var(--modern-spacing-md);
}

.modern-global-loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modern-loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--modern-spacing-md);
  background: var(--modern-background-secondary);
  padding: var(--modern-spacing-xl);
  border-radius: var(--modern-radius-lg);
  box-shadow: var(--modern-shadow-xl);
}

.modern-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--modern-fill-tertiary);
  border-radius: 50%;
  border-top-color: var(--modern-primary-blue);
  animation: modern-spin 1s linear infinite;
}

@keyframes modern-spin {
  to {
    transform: rotate(360deg);
  }
}

.modern-loading-text {
  font-size: var(--modern-font-size-body);
  color: var(--modern-text-secondary);
  margin: 0;
}

.modern-notification {
  position: fixed;
  top: 88px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--modern-background-secondary);
  border-radius: var(--modern-radius-lg);
  box-shadow: var(--modern-shadow-lg);
  padding: var(--modern-spacing-md);
  display: flex;
  align-items: center;
  gap: var(--modern-spacing-sm);
  max-width: 400px;
  min-width: 280px;
  z-index: 9998;
  border: 1px solid var(--modern-divider);
}

.modern-notification--success {
  border-left: 4px solid var(--modern-primary-green);
}

.modern-notification--error {
  border-left: 4px solid var(--modern-primary-red);
}

.modern-notification--warning {
  border-left: 4px solid var(--modern-primary-orange);
}

.modern-notification--info {
  border-left: 4px solid var(--modern-primary-blue);
}

.modern-notification__icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.modern-notification--success .modern-notification__icon {
  color: var(--modern-primary-green);
}

.modern-notification--error .modern-notification__icon {
  color: var(--modern-primary-red);
}

.modern-notification--warning .modern-notification__icon {
  color: var(--modern-primary-orange);
}

.modern-notification--info .modern-notification__icon {
  color: var(--modern-primary-blue);
}

.modern-notification__content {
  flex: 1;
}

.modern-notification__title {
  font-size: var(--modern-font-size-callout);
  font-weight: 600;
  color: var(--modern-text-primary);
  margin: 0;
  line-height: var(--modern-line-height-callout);
}

.modern-notification__message {
  font-size: var(--modern-font-size-footnote);
  color: var(--modern-text-secondary);
  margin: var(--modern-spacing-xs) 0 0;
  line-height: var(--modern-line-height-footnote);
}

.modern-notification__close {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--modern-text-tertiary);
  cursor: pointer;
  padding: var(--modern-spacing-xs);
  border-radius: var(--modern-radius-sm);
  transition: all var(--modern-duration-fast) var(--modern-easing-ease);
}

.modern-notification__close:hover {
  background: var(--modern-fill-quaternary);
  color: var(--modern-text-primary);
}

/* 过渡动画 */
.sidebar-overlay-enter-active,
.sidebar-overlay-leave-active {
  transition: opacity var(--modern-duration-medium) var(--modern-easing-ease);
}

.sidebar-overlay-enter-from,
.sidebar-overlay-leave-to {
  opacity: 0;
}

.sidebar-slide-enter-active,
.sidebar-slide-leave-active {
  transition: transform var(--modern-duration-medium) var(--modern-easing-ease);
}

.sidebar-slide-enter-from,
.sidebar-slide-leave-to {
  transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--modern-duration-fast) var(--modern-easing-ease);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.loading-fade-enter-active,
.loading-fade-leave-active {
  transition: opacity var(--modern-duration-medium) var(--modern-easing-ease);
}

.loading-fade-enter-from,
.loading-fade-leave-to {
  opacity: 0;
}

.notification-slide-enter-active,
.notification-slide-leave-active {
  transition: all var(--modern-duration-medium) var(--modern-easing-ease);
}

.notification-slide-enter-from,
.notification-slide-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .modern-sidebar-overlay {
    top: 64px;
  }
  
  .modern-sidebar {
    top: 64px;
    width: 100%;
    max-width: 320px;
  }
  
  .modern-page {
    padding: var(--modern-spacing-sm);
  }
  
  .modern-notification {
    top: 64px;
    left: var(--modern-spacing-sm);
    right: var(--modern-spacing-sm);
    transform: none;
    max-width: none;
    min-width: auto;
  }
}

/* 减少动画偏好支持 */
@media (prefers-reduced-motion: reduce) {
  .modern-nav-button,
  .modern-sidebar-close,
  .modern-notification__close,
  .sidebar-overlay-enter-active,
  .sidebar-overlay-leave-active,
  .sidebar-slide-enter-active,
  .sidebar-slide-leave-active,
  .fade-enter-active,
  .fade-leave-active,
  .loading-fade-enter-active,
  .loading-fade-leave-active,
  .notification-slide-enter-active,
  .notification-slide-leave-active {
    transition: none;
  }
  
  .modern-nav-button:active,
  .modern-sidebar-close:active {
    transform: none;
  }
  
  .modern-spinner {
    animation: none;
  }
}
</style>