<template>
  <div :class="cardClasses" @click="handleClick">
    <div v-if="$slots.header" class="modern-card__header">
      <slot name="header" />
    </div>
    <div class="modern-card__content">
      <slot />
    </div>
    <div v-if="$slots.footer" class="modern-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type CardVariant = 'elevated' | 'outlined' | 'filled' | 'grouped'
type CardPadding = 'none' | 'sm' | 'md' | 'lg'

interface Props {
  variant?: CardVariant
  interactive?: boolean
  padding?: CardPadding
  rounded?: boolean
  shadow?: boolean
}

interface Emits {
  (e: 'click', event: MouseEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'elevated',
  interactive: false,
  padding: 'md',
  rounded: false,
  shadow: false
})

const emit = defineEmits<Emits>()

const cardClasses = computed(() => [
  'modern-card',
  `modern-card--${props.variant}`,
  `modern-card--padding-${props.padding}`,
  {
    'modern-card--interactive': props.interactive,
    'modern-card--rounded': props.rounded,
    'modern-card--shadow': props.shadow
  }
])

const handleClick = (event: MouseEvent) => {
  if (props.interactive) {
    emit('click', event)
  }
}
</script>

<style scoped>
.modern-card {
  background: var(--modern-background-secondary);
  border-radius: var(--modern-radius-lg);
  overflow: hidden;
  transition: all var(--modern-duration-medium) var(--modern-easing-ease);
  position: relative;
  border: 1px solid transparent;
}

/* 卡片变体 */
.modern-card--elevated {
  background: var(--modern-background-tertiary);
  box-shadow: var(--modern-shadow-sm);
}

.modern-card--outlined {
  background: var(--modern-background-tertiary);
  border: 1px solid var(--modern-divider);
}

.modern-card--filled {
  background: var(--modern-fill-tertiary);
}

.modern-card--grouped {
  background: var(--modern-background-grouped-secondary);
  border-radius: var(--modern-radius-md);
}

/* 交互状态 */
.modern-card--interactive {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}

.modern-card--interactive:hover {
  transform: translateY(-2px);
  box-shadow: var(--modern-shadow-md);
}

.modern-card--interactive:active {
  transform: translateY(0);
  box-shadow: var(--modern-shadow-sm);
}

.modern-card--interactive.modern-card--grouped:hover {
  background: var(--modern-background-grouped-tertiary);
  transform: scale(0.98);
}

.modern-card--interactive.modern-card--grouped:active {
  background: var(--modern-fill-quaternary);
  transform: scale(0.96);
}

/* 圆角变体 */
.modern-card--rounded {
  border-radius: var(--modern-radius-2xl);
}

/* 阴影变体 */
.modern-card--shadow {
  box-shadow: var(--modern-shadow-lg);
}

/* 内边距变体 */
.modern-card--padding-none .modern-card__content {
  padding: 0;
}

.modern-card--padding-sm .modern-card__content {
  padding: var(--modern-spacing-sm);
}

.modern-card--padding-md .modern-card__content {
  padding: var(--modern-spacing-md);
}

.modern-card--padding-lg .modern-card__content {
  padding: var(--modern-spacing-lg);
}

/* 卡片区域 */
.modern-card__header {
  padding: var(--modern-spacing-md) var(--modern-spacing-md) 0;
  border-bottom: 1px solid var(--modern-divider);
  margin-bottom: var(--modern-spacing-md);
}

.modern-card__header:last-child {
  margin-bottom: 0;
}

.modern-card__content {
  flex: 1;
  min-height: 0;
}

.modern-card__footer {
  padding: 0 var(--modern-spacing-md) var(--modern-spacing-md);
  border-top: 1px solid var(--modern-divider);
  margin-top: var(--modern-spacing-md);
}

.modern-card__footer:first-child {
  margin-top: 0;
}

/* 头部和底部内边距调整 */
.modern-card--padding-none .modern-card__header,
.modern-card--padding-none .modern-card__footer {
  padding-left: var(--modern-spacing-md);
  padding-right: var(--modern-spacing-md);
}

.modern-card--padding-sm .modern-card__header {
  padding: var(--modern-spacing-sm) var(--modern-spacing-sm) 0;
  margin-bottom: var(--modern-spacing-sm);
}

.modern-card--padding-sm .modern-card__footer {
  padding: 0 var(--modern-spacing-sm) var(--modern-spacing-sm);
  margin-top: var(--modern-spacing-sm);
}

.modern-card--padding-lg .modern-card__header {
  padding: var(--modern-spacing-lg) var(--modern-spacing-lg) 0;
  margin-bottom: var(--modern-spacing-lg);
}

.modern-card--padding-lg .modern-card__footer {
  padding: 0 var(--modern-spacing-lg) var(--modern-spacing-lg);
  margin-top: var(--modern-spacing-lg);
}

/* 分组卡片特殊样式 */
.modern-card--grouped {
  margin-bottom: var(--modern-spacing-sm);
}

.modern-card--grouped:last-child {
  margin-bottom: 0;
}

.modern-card--grouped .modern-card__header,
.modern-card--grouped .modern-card__footer {
  border-color: var(--modern-divider);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .modern-card {
    border-radius: var(--modern-radius-md);
  }
  
  .modern-card--rounded {
    border-radius: var(--modern-radius-lg);
  }
  
  .modern-card__content {
    padding: var(--modern-spacing-sm);
  }
  
  .modern-card--padding-md .modern-card__content {
    padding: var(--modern-spacing-sm);
  }
  
  .modern-card--padding-lg .modern-card__content {
    padding: var(--modern-spacing-md);
  }
}

/* 高对比度模式支持 */
@media (prefers-contrast: high) {
  .modern-card--elevated,
  .modern-card--filled {
    border: 1px solid var(--modern-text-primary);
  }
}

/* 减少动画偏好支持 */
@media (prefers-reduced-motion: reduce) {
  .modern-card {
    transition: none;
  }
  
  .modern-card--interactive:hover {
    transform: none;
  }
  
  .modern-card--interactive:active {
    transform: none;
  }
}

/* 暗色主题特殊处理 */
.dark .modern-card--elevated {
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.3),
    0 1px 2px rgba(0, 0, 0, 0.6);
}

.dark .modern-card--interactive:hover {
  box-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.3),
    0 2px 4px rgba(0, 0, 0, 0.6);
}

.dark .modern-card--shadow {
  box-shadow: 
    0 10px 15px rgba(0, 0, 0, 0.3),
    0 4px 6px rgba(0, 0, 0, 0.6);
}
</style>