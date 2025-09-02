<template>
  <header :class="navigationBarClasses">
    <div class="modern-navigation-bar__content">
      <!-- 左侧区域 -->
      <div class="modern-navigation-bar__leading">
        <button
          v-if="showBackButton"
          class="modern-navigation-bar__back-button"
          @click="handleBack"
        >
          <ChevronLeft class="modern-navigation-bar__back-icon" />
          <span v-if="backTitle" class="modern-navigation-bar__back-title">
            {{ backTitle }}
          </span>
        </button>
        <slot name="leading" />
      </div>
      
      <!-- 中央标题区域 -->
      <div class="modern-navigation-bar__center">
        <Transition name="title-fade" mode="out-in">
          <h1 
            v-if="title"
            :key="title"
            :class="titleClasses"
          >
            {{ title }}
          </h1>
        </Transition>
        <slot name="center" />
      </div>
      
      <!-- 右侧区域 -->
      <div class="modern-navigation-bar__trailing">
        <slot name="trailing" />
      </div>
    </div>
    
    <!-- 分隔线 -->
    <div v-if="showDivider" class="modern-navigation-bar__divider" />
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronLeft } from 'lucide-vue-next'

interface Props {
  title?: string
  showBackButton?: boolean
  backTitle?: string
  transparent?: boolean
  large?: boolean
  showDivider?: boolean
  sticky?: boolean
}

interface Emits {
  (e: 'back'): void
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  showBackButton: false,
  backTitle: '',
  transparent: false,
  large: false,
  showDivider: true,
  sticky: true
})

const emit = defineEmits<Emits>()
const router = useRouter()

const navigationBarClasses = computed(() => [
  'modern-navigation-bar',
  {
    'modern-navigation-bar--transparent': props.transparent,
    'modern-navigation-bar--large': props.large,
    'modern-navigation-bar--sticky': props.sticky
  }
])

const titleClasses = computed(() => [
  'modern-navigation-bar__title',
  {
    'modern-navigation-bar__title--large': props.large
  }
])

const handleBack = () => {
  emit('back')
  if (router.options.history.state.back) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.modern-navigation-bar {
  position: relative;
  z-index: 1000;
  background: var(--modern-background-primary);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  height: 88px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: var(--modern-spacing-sm);
  transition: all var(--modern-duration-medium) var(--modern-easing-ease);
}

.modern-navigation-bar--sticky {
  position: sticky;
  top: 0;
}

.modern-navigation-bar--transparent {
  background: transparent;
}

.modern-navigation-bar--large {
  height: 108px;
  padding-bottom: var(--modern-spacing-md);
}

.modern-navigation-bar__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 44px;
  padding: 0 var(--modern-spacing-md);
  position: relative;
}

.modern-navigation-bar__leading,
.modern-navigation-bar__trailing {
  flex: 1;
  display: flex;
  align-items: center;
  min-width: 0;
}

.modern-navigation-bar__leading {
  justify-content: flex-start;
}

.modern-navigation-bar__trailing {
  justify-content: flex-end;
}

.modern-navigation-bar__center {
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 0;
  position: relative;
}

.modern-navigation-bar__title {
  font-size: var(--modern-font-size-headline);
  font-weight: 600;
  color: var(--modern-text-primary);
  margin: 0;
  text-align: center;
  line-height: var(--modern-line-height-headline);
  letter-spacing: -0.41px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.modern-navigation-bar__title--large {
  font-size: var(--modern-font-size-title-2);
  font-weight: 700;
  line-height: var(--modern-line-height-title-2);
  letter-spacing: 0.35px;
}

.modern-navigation-bar__back-button {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: var(--modern-primary-blue);
  font-size: var(--modern-font-size-body);
  cursor: pointer;
  padding: var(--modern-spacing-sm);
  margin-left: calc(-1 * var(--modern-spacing-sm));
  border-radius: var(--modern-radius-sm);
  transition: all var(--modern-duration-fast) var(--modern-easing-ease);
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  font-weight: 400;
  line-height: var(--modern-line-height-body);
  letter-spacing: -0.41px;
}

.modern-navigation-bar__back-button:hover {
  background: var(--modern-fill-quaternary);
}

.modern-navigation-bar__back-button:active {
  background: var(--modern-fill-tertiary);
  transform: scale(0.96);
}

.modern-navigation-bar__back-icon {
  width: 20px;
  height: 20px;
  margin-right: var(--modern-spacing-xs);
}

.modern-navigation-bar__back-title {
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.modern-navigation-bar__divider {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--modern-divider);
  opacity: 0.5;
}

/* 标题过渡动画 */
.title-fade-enter-active,
.title-fade-leave-active {
  transition: opacity var(--modern-duration-fast) var(--modern-easing-ease);
}

.title-fade-enter-from,
.title-fade-leave-to {
  opacity: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .modern-navigation-bar {
    height: 64px;
    padding-bottom: var(--modern-spacing-xs);
  }
  
  .modern-navigation-bar--large {
    height: 80px;
    padding-bottom: var(--modern-spacing-sm);
  }
  
  .modern-navigation-bar__content {
    padding: 0 var(--modern-spacing-sm);
  }
  
  .modern-navigation-bar__title {
    font-size: var(--modern-font-size-callout);
  }
  
  .modern-navigation-bar__title--large {
    font-size: var(--modern-font-size-headline);
  }
  
  .modern-navigation-bar__back-title {
    max-width: 80px;
  }
}

/* 平板设备 */
@media (min-width: 769px) and (max-width: 1024px) {
  .modern-navigation-bar__content {
    padding: 0 var(--modern-spacing-lg);
  }
}

/* 桌面设备 */
@media (min-width: 1025px) {
  .modern-navigation-bar__content {
    padding: 0 var(--modern-spacing-xl);
  }
}

/* 高对比度模式支持 */
@media (prefers-contrast: high) {
  .modern-navigation-bar {
    border-bottom: 2px solid var(--modern-text-primary);
  }
  
  .modern-navigation-bar__back-button {
    border: 1px solid var(--modern-primary-blue);
  }
}

/* 减少动画偏好支持 */
@media (prefers-reduced-motion: reduce) {
  .modern-navigation-bar,
  .modern-navigation-bar__back-button,
  .title-fade-enter-active,
  .title-fade-leave-active {
    transition: none;
  }
  
  .modern-navigation-bar__back-button:active {
    transform: none;
  }
}

/* 暗色主题特殊处理 */
.dark .modern-navigation-bar {
  background: rgba(0, 0, 0, 0.8);
}

.dark .modern-navigation-bar--transparent {
  background: transparent;
}

/* 窗口控件区域支持 (Electron) */
.modern-navigation-bar__content {
  -webkit-app-region: no-drag;
}

.modern-navigation-bar {
  -webkit-app-region: drag;
}

.modern-navigation-bar__leading *,
.modern-navigation-bar__center *,
.modern-navigation-bar__trailing * {
  -webkit-app-region: no-drag;
}

/* 安全区域支持 */
@supports (padding: env(safe-area-inset-left)) {
  .modern-navigation-bar__content {
    padding-left: max(var(--modern-spacing-md), env(safe-area-inset-left));
    padding-right: max(var(--modern-spacing-md), env(safe-area-inset-right));
  }
  
  @media (max-width: 768px) {
    .modern-navigation-bar__content {
      padding-left: max(var(--modern-spacing-sm), env(safe-area-inset-left));
      padding-right: max(var(--modern-spacing-sm), env(safe-area-inset-right));
    }
  }
}
</style>