<template>
  <nav class="modern-tab-bar">
    <div class="modern-tab-bar__content">
      <button
        v-for="item in items"
        :key="item.id"
        :class="getItemClasses(item)"
        @click="handleItemClick(item)"
      >
        <div class="modern-tab-bar__item-icon-container">
          <component
            :is="item.icon"
            :class="getIconClasses(item)"
          />
          <span
            v-if="item.badge"
            class="modern-tab-bar__item-badge"
          >
            {{ item.badge }}
          </span>
        </div>
        <span class="modern-tab-bar__item-label">
          {{ item.label }}
        </span>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface TabBarItem {
  id: string
  label: string
  icon: any
  route?: string
  badge?: string | number
  disabled?: boolean
}

interface Props {
  items: TabBarItem[]
  activeItem?: string
  showLabels?: boolean
}

interface Emits {
  (e: 'item-click', item: TabBarItem): void
}

const props = withDefaults(defineProps<Props>(), {
  activeItem: '',
  showLabels: true
})

const emit = defineEmits<Emits>()

const getItemClasses = (item: TabBarItem) => [
  'modern-tab-bar__item',
  {
    'modern-tab-bar__item--active': isItemActive(item),
    'modern-tab-bar__item--disabled': item.disabled
  }
]

const getIconClasses = (item: TabBarItem) => [
  'modern-tab-bar__item-icon',
  {
    'modern-tab-bar__item-icon--active': isItemActive(item)
  }
]

const isItemActive = (item: TabBarItem): boolean => {
  return props.activeItem === item.id
}

const handleItemClick = (item: TabBarItem) => {
  if (item.disabled) return
  emit('item-click', item)
}
</script>

<style scoped>
.modern-tab-bar {
  position: relative;
  background: var(--modern-background-primary);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid var(--modern-divider);
  padding-bottom: env(safe-area-inset-bottom, 0);
  z-index: 1000;
}

.modern-tab-bar__content {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: var(--modern-spacing-xs) var(--modern-spacing-sm) var(--modern-spacing-sm);
  min-height: 56px;
}

.modern-tab-bar__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--modern-spacing-xs);
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--modern-spacing-xs) var(--modern-spacing-sm);
  border-radius: var(--modern-radius-md);
  transition: all var(--modern-duration-fast) var(--modern-easing-ease);
  position: relative;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  flex: 1;
  max-width: 80px;
  min-height: 48px;
}

.modern-tab-bar__item:hover:not(.modern-tab-bar__item--disabled) {
  background: var(--modern-fill-quaternary);
}

.modern-tab-bar__item:active:not(.modern-tab-bar__item--disabled) {
  background: var(--modern-fill-tertiary);
  transform: scale(0.96);
}

.modern-tab-bar__item--active {
  color: var(--modern-primary-blue);
}

.modern-tab-bar__item--disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

.modern-tab-bar__item-icon-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modern-tab-bar__item-icon {
  width: 24px;
  height: 24px;
  color: var(--modern-text-tertiary);
  transition: all var(--modern-duration-fast) var(--modern-easing-ease);
}

.modern-tab-bar__item-icon--active {
  color: var(--modern-primary-blue);
  transform: scale(1.1);
}

.modern-tab-bar__item-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: var(--modern-primary-red);
  color: white;
  font-size: var(--modern-font-size-caption-2);
  font-weight: 600;
  padding: 2px 6px;
  border-radius: var(--modern-radius-full);
  min-width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  z-index: 1;
}

.modern-tab-bar__item-label {
  font-size: var(--modern-font-size-caption-1);
  font-weight: 400;
  color: var(--modern-text-tertiary);
  transition: all var(--modern-duration-fast) var(--modern-easing-ease);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  line-height: var(--modern-line-height-caption-1);
}

.modern-tab-bar__item--active .modern-tab-bar__item-label {
  color: var(--modern-primary-blue);
  font-weight: 600;
}

/* 活跃指示器 */
.modern-tab-bar__item--active::before {
  content: '';
  position: absolute;
  top: var(--modern-spacing-xs);
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  background: var(--modern-primary-blue);
  border-radius: 50%;
  transition: all var(--modern-duration-fast) var(--modern-easing-ease);
}

/* 响应式设计 */
@media (max-width: 480px) {
  .modern-tab-bar__content {
    padding: var(--modern-spacing-xs);
  }
  
  .modern-tab-bar__item {
    padding: var(--modern-spacing-xs);
    max-width: none;
  }
  
  .modern-tab-bar__item-icon {
    width: 20px;
    height: 20px;
  }
  
  .modern-tab-bar__item-label {
    font-size: var(--modern-font-size-caption-2);
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .modern-tab-bar__content {
    padding: var(--modern-spacing-sm) var(--modern-spacing-md);
  }
  
  .modern-tab-bar__item {
    max-width: 100px;
  }
}

/* 横屏设备优化 */
@media (orientation: landscape) and (max-height: 480px) {
  .modern-tab-bar__content {
    min-height: 48px;
    padding: var(--modern-spacing-xs) var(--modern-spacing-sm);
  }
  
  .modern-tab-bar__item {
    gap: 2px;
    min-height: 40px;
  }
  
  .modern-tab-bar__item-icon {
    width: 20px;
    height: 20px;
  }
  
  .modern-tab-bar__item-label {
    font-size: 10px;
  }
}

/* 高对比度模式支持 */
@media (prefers-contrast: high) {
  .modern-tab-bar {
    border-top: 2px solid var(--modern-text-primary);
  }
  
  .modern-tab-bar__item--active {
    background: var(--modern-primary-blue);
    color: white;
  }
  
  .modern-tab-bar__item--active .modern-tab-bar__item-icon,
  .modern-tab-bar__item--active .modern-tab-bar__item-label {
    color: white;
  }
}

/* 减少动画偏好支持 */
@media (prefers-reduced-motion: reduce) {
  .modern-tab-bar__item,
  .modern-tab-bar__item-icon,
  .modern-tab-bar__item-label,
  .modern-tab-bar__item::before {
    transition: none;
  }
  
  .modern-tab-bar__item:active {
    transform: none;
  }
  
  .modern-tab-bar__item-icon--active {
    transform: none;
  }
}

/* 无标签模式 */
.modern-tab-bar--no-labels .modern-tab-bar__item {
  gap: 0;
}

.modern-tab-bar--no-labels .modern-tab-bar__item-label {
  display: none;
}

.modern-tab-bar--no-labels .modern-tab-bar__item-icon {
  width: 28px;
  height: 28px;
}

/* 暗色主题特殊处理 */
.dark .modern-tab-bar {
  background: rgba(28, 28, 30, 0.9);
}

.dark .modern-tab-bar__item-badge {
  background: var(--modern-primary-red);
}

/* 安全区域支持 */
@supports (padding: env(safe-area-inset-bottom)) {
  .modern-tab-bar {
    padding-bottom: env(safe-area-inset-bottom);
  }
  
  .modern-tab-bar__content {
    padding-left: max(var(--modern-spacing-sm), env(safe-area-inset-left));
    padding-right: max(var(--modern-spacing-sm), env(safe-area-inset-right));
  }
}

/* 触摸设备优化 */
@media (pointer: coarse) {
  .modern-tab-bar__item {
    min-height: 56px;
    padding: var(--modern-spacing-sm);
  }
  
  .modern-tab-bar__item-icon {
    width: 26px;
    height: 26px;
  }
}
</style>