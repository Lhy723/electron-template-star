<template>
  <nav class="modern-sidebar-nav">
    <div class="modern-sidebar-nav__header">
      <slot name="header">
        <div class="modern-sidebar-nav__logo">
          <h2 class="modern-sidebar-nav__title">导航菜单</h2>
        </div>
      </slot>
    </div>
    
    <div class="modern-sidebar-nav__content">
      <div 
        v-for="section in sections" 
        :key="section.id"
        class="modern-sidebar-nav__section"
      >
        <h3 
          v-if="section.title"
          class="modern-sidebar-nav__section-title"
        >
          {{ section.title }}
        </h3>
        
        <ul class="modern-sidebar-nav__list">
          <li 
            v-for="item in section.items"
            :key="item.id"
            class="modern-sidebar-nav__item"
          >
            <component
              :is="item.to ? 'router-link' : 'button'"
              :to="item.to"
              :class="getItemClasses(item)"
              @click="handleItemClick(item)"
            >
              <component
                v-if="item.icon"
                :is="item.icon"
                class="modern-sidebar-nav__item-icon"
              />
              <span class="modern-sidebar-nav__item-text">
                {{ item.label }}
              </span>
              <span
                v-if="item.badge"
                class="modern-sidebar-nav__item-badge"
              >
                {{ item.badge }}
              </span>
              <ChevronRight
                v-if="item.expandable"
                :class="getChevronClasses(item)"
              />
            </component>
            
            <!-- 子菜单 -->
            <Transition name="expand">
              <ul
                v-if="item.children && item.expanded"
                class="modern-sidebar-nav__submenu"
              >
                <li
                  v-for="child in item.children"
                  :key="child.id"
                  class="modern-sidebar-nav__item modern-sidebar-nav__item--child"
                >
                  <component
                    :is="child.to ? 'router-link' : 'button'"
                    :to="child.to"
                    :class="getItemClasses(child)"
                    @click="handleItemClick(child)"
                  >
                    <component
                      v-if="child.icon"
                      :is="child.icon"
                      class="modern-sidebar-nav__item-icon"
                    />
                    <span class="modern-sidebar-nav__item-text">
                      {{ child.label }}
                    </span>
                    <span
                      v-if="child.badge"
                      class="modern-sidebar-nav__item-badge"
                    >
                      {{ child.badge }}
                    </span>
                  </component>
                </li>
              </ul>
            </Transition>
          </li>
        </ul>
      </div>
    </div>
    
    <div class="modern-sidebar-nav__footer">
      <slot name="footer" />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronRight } from 'lucide-vue-next'

interface NavigationItem {
  id: string
  label: string
  icon?: any
  to?: string
  badge?: string | number
  active?: boolean
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

interface Props {
  sections: NavigationSection[]
  activeItem?: string
}

interface Emits {
  (e: 'item-click', item: NavigationItem): void
  (e: 'toggle-expand', item: NavigationItem): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const route = useRoute()

const expandedItems = ref<Set<string>>(new Set())

const getItemClasses = (item: NavigationItem) => [
  'modern-sidebar-nav__link',
  {
    'modern-sidebar-nav__link--active': isItemActive(item),
    'modern-sidebar-nav__link--disabled': item.disabled
  }
]

const getChevronClasses = (item: NavigationItem) => [
  'modern-sidebar-nav__chevron',
  {
    'modern-sidebar-nav__chevron--expanded': item.expanded || expandedItems.value.has(item.id)
  }
]

const isItemActive = (item: NavigationItem): boolean => {
  if (props.activeItem) {
    return props.activeItem === item.id
  }
  
  if (item.to) {
    return route.path === item.to || route.path.startsWith(item.to + '/')
  }
  
  return false
}

const handleItemClick = (item: NavigationItem) => {
  if (item.disabled) return
  
  if (item.expandable) {
    const isExpanded = expandedItems.value.has(item.id)
    if (isExpanded) {
      expandedItems.value.delete(item.id)
    } else {
      expandedItems.value.add(item.id)
    }
    emit('toggle-expand', item)
  }
  
  emit('item-click', item)
}
</script>

<style scoped>
.modern-sidebar-nav {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--modern-background-secondary);
  width: 280px;
  overflow: hidden;
}

.modern-sidebar-nav__header {
  padding: var(--modern-spacing-lg) var(--modern-spacing-md) var(--modern-spacing-md);
  border-bottom: 1px solid var(--modern-divider);
  flex-shrink: 0;
}

.modern-sidebar-nav__logo {
  display: flex;
  align-items: center;
  gap: var(--modern-spacing-sm);
}

.modern-sidebar-nav__title {
  font-size: var(--modern-font-size-headline);
  font-weight: 700;
  color: var(--modern-text-primary);
  margin: 0;
  line-height: var(--modern-line-height-headline);
}

.modern-sidebar-nav__content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: var(--modern-spacing-md) 0;
  scrollbar-width: thin;
  scrollbar-color: var(--modern-fill-tertiary) transparent;
}

.modern-sidebar-nav__content::-webkit-scrollbar {
  width: 6px;
}

.modern-sidebar-nav__content::-webkit-scrollbar-track {
  background: transparent;
}

.modern-sidebar-nav__content::-webkit-scrollbar-thumb {
  background: var(--modern-fill-tertiary);
  border-radius: var(--modern-radius-full);
}

.modern-sidebar-nav__section {
  margin-bottom: var(--modern-spacing-lg);
}

.modern-sidebar-nav__section:last-child {
  margin-bottom: 0;
}

.modern-sidebar-nav__section-title {
  font-size: var(--modern-font-size-caption-1);
  font-weight: 600;
  color: var(--modern-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 var(--modern-spacing-sm);
  padding: 0 var(--modern-spacing-md);
  line-height: var(--modern-line-height-caption-1);
}

.modern-sidebar-nav__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.modern-sidebar-nav__item {
  margin-bottom: 2px;
}

.modern-sidebar-nav__item--child {
  margin-left: var(--modern-spacing-lg);
}

.modern-sidebar-nav__link {
  display: flex;
  align-items: center;
  width: 100%;
  padding: var(--modern-spacing-sm) var(--modern-spacing-md);
  border: none;
  background: transparent;
  color: var(--modern-text-primary);
  text-decoration: none;
  font-size: var(--modern-font-size-body);
  font-weight: 400;
  line-height: var(--modern-line-height-body);
  letter-spacing: -0.41px;
  border-radius: var(--modern-radius-md);
  margin: 0 var(--modern-spacing-xs);
  transition: all var(--modern-duration-fast) var(--modern-easing-ease);
  cursor: pointer;
  position: relative;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  min-height: 44px;
}

.modern-sidebar-nav__link:hover:not(.modern-sidebar-nav__link--disabled) {
  background: var(--modern-fill-quaternary);
  color: var(--modern-text-primary);
}

.modern-sidebar-nav__link:active:not(.modern-sidebar-nav__link--disabled) {
  background: var(--modern-fill-tertiary);
  transform: scale(0.98);
}

.modern-sidebar-nav__link--active {
  background: var(--modern-primary-blue);
  color: white;
  font-weight: 600;
}

.modern-sidebar-nav__link--active:hover {
  background: var(--modern-primary-blue);
  color: white;
}

.modern-sidebar-nav__link--disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

.modern-sidebar-nav__item-icon {
  width: 20px;
  height: 20px;
  margin-right: var(--modern-spacing-sm);
  flex-shrink: 0;
}

.modern-sidebar-nav__item-text {
  flex: 1;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.modern-sidebar-nav__item-badge {
  background: var(--modern-primary-red);
  color: white;
  font-size: var(--modern-font-size-caption-2);
  font-weight: 600;
  padding: 2px 6px;
  border-radius: var(--modern-radius-full);
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: var(--modern-spacing-xs);
  line-height: 1;
}

.modern-sidebar-nav__link--active .modern-sidebar-nav__item-badge {
  background: rgba(255, 255, 255, 0.3);
  color: white;
}

.modern-sidebar-nav__chevron {
  width: 16px;
  height: 16px;
  margin-left: var(--modern-spacing-xs);
  transition: transform var(--modern-duration-fast) var(--modern-easing-ease);
  flex-shrink: 0;
}

.modern-sidebar-nav__chevron--expanded {
  transform: rotate(90deg);
}

.modern-sidebar-nav__submenu {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.modern-sidebar-nav__footer {
  padding: var(--modern-spacing-md);
  border-top: 1px solid var(--modern-divider);
  flex-shrink: 0;
}

/* 展开动画 */
.expand-enter-active,
.expand-leave-active {
  transition: all var(--modern-duration-medium) var(--modern-easing-ease);
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 500px;
  opacity: 1;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .modern-sidebar-nav {
    width: 100%;
    max-width: 320px;
  }
  
  .modern-sidebar-nav__link {
    padding: var(--modern-spacing-md);
    min-height: 48px;
  }
  
  .modern-sidebar-nav__item-icon {
    width: 24px;
    height: 24px;
  }
}

/* 高对比度模式支持 */
@media (prefers-contrast: high) {
  .modern-sidebar-nav__link {
    border: 1px solid transparent;
  }
  
  .modern-sidebar-nav__link--active {
    border-color: var(--modern-text-primary);
  }
  
  .modern-sidebar-nav__link:hover:not(.modern-sidebar-nav__link--disabled) {
    border-color: var(--modern-text-primary);
  }
}

/* 减少动画偏好支持 */
@media (prefers-reduced-motion: reduce) {
  .modern-sidebar-nav__link,
  .modern-sidebar-nav__chevron,
  .expand-enter-active,
  .expand-leave-active {
    transition: none;
  }
  
  .modern-sidebar-nav__link:active {
    transform: none;
  }
}

/* 暗色主题特殊处理 */
.dark .modern-sidebar-nav__item-badge {
  background: var(--modern-primary-red);
}

.dark .modern-sidebar-nav__link--active .modern-sidebar-nav__item-badge {
  background: rgba(255, 255, 255, 0.2);
}
</style>