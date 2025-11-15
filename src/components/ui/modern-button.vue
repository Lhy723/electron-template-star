<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    :type="nativeType"
    @click="handleClick"
  >
    <span v-if="loading" class="modern-button__loading">
      <div class="modern-spinner"></div>
    </span>
    <span v-else class="modern-button__content">
      <slot name="icon" />
      <span v-if="$slots.default" class="modern-button__text">
        <slot />
      </span>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type ButtonType = 'primary' | 'secondary' | 'destructive' | 'plain' | 'filled' | 'tinted'
type ButtonSize = 'small' | 'medium' | 'large'
type NativeType = 'button' | 'submit' | 'reset'

interface Props {
  type?: ButtonType
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  rounded?: boolean
  nativeType?: NativeType
  block?: boolean
}

interface Emits {
  (e: 'click', event: MouseEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  size: 'medium',
  disabled: false,
  loading: false,
  rounded: false,
  nativeType: 'button',
  block: false
})

const emit = defineEmits<Emits>()

const buttonClasses = computed(() => [
  'modern-button',
  `modern-button--${props.type}`,
  `modern-button--${props.size}`,
  {
    'modern-button--disabled': props.disabled,
    'modern-button--loading': props.loading,
    'modern-button--rounded': props.rounded,
    'modern-button--block': props.block
  }
])

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return
  emit('click', event)
}
</script>

<style scoped>
.modern-button {
  /* 基础样式 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all var(--modern-duration-fast) var(--modern-easing-ease);
  position: relative;
  overflow: hidden;
  outline: none;
  
  /* 现代触感反馈 */
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  
  /* 字体样式 */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  text-decoration: none;
  white-space: nowrap;
}

.modern-button:focus-visible {
  box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.3);
}

/* 按钮类型 */
.modern-button--primary {
  background: var(--modern-primary-blue);
  color: white;
  border-radius: var(--component-border-radius, var(--modern-radius-md));
  border: var(--component-border-width, 0) solid transparent;
  box-shadow: var(--component-shadow, var(--modern-shadow-sm));
  padding: var(--component-padding, 0 var(--modern-spacing-lg));
  font-weight: var(--component-font-weight, 600);
}

.modern-button--primary:hover:not(.modern-button--disabled):not(.modern-button--loading) {
  background: #0056d3;
  transform: scale(0.98);
}

.modern-button--primary:active:not(.modern-button--disabled):not(.modern-button--loading) {
  background: #004bb8;
  transform: scale(0.96);
}

.modern-button--secondary {
  background: var(--modern-fill-secondary);
  color: var(--modern-primary-blue);
  border-radius: var(--component-border-radius, var(--modern-radius-md));
  border: var(--component-border-width, 0) solid transparent;
  box-shadow: var(--component-shadow, none);
  padding: var(--component-padding, 0 var(--modern-spacing-lg));
  font-weight: var(--component-font-weight, 600);
}

.modern-button--secondary:hover:not(.modern-button--disabled):not(.modern-button--loading) {
  background: var(--modern-fill-primary);
  transform: scale(0.98);
}

.modern-button--secondary:active:not(.modern-button--disabled):not(.modern-button--loading) {
  background: var(--modern-fill-tertiary);
  transform: scale(0.96);
}

.modern-button--destructive {
  background: var(--modern-primary-red);
  color: white;
  border-radius: var(--modern-radius-md);
}

.modern-button--destructive:hover:not(.modern-button--disabled):not(.modern-button--loading) {
  background: #e02f25;
  transform: scale(0.98);
}

.modern-button--destructive:active:not(.modern-button--disabled):not(.modern-button--loading) {
  background: #cc2b22;
  transform: scale(0.96);
}

.modern-button--plain {
  background: transparent;
  color: var(--modern-primary-blue);
  border-radius: var(--modern-radius-sm);
}

.modern-button--plain:hover:not(.modern-button--disabled):not(.modern-button--loading) {
  background: var(--modern-fill-quaternary);
}

.modern-button--plain:active:not(.modern-button--disabled):not(.modern-button--loading) {
  background: var(--modern-fill-tertiary);
}

.modern-button--filled {
  background: var(--modern-background-tertiary);
  color: var(--modern-text-primary);
  border-radius: var(--modern-radius-md);
  border: 1px solid var(--modern-divider);
}

.modern-button--filled:hover:not(.modern-button--disabled):not(.modern-button--loading) {
  background: var(--modern-background-secondary);
  transform: scale(0.98);
}

.modern-button--filled:active:not(.modern-button--disabled):not(.modern-button--loading) {
  background: var(--modern-fill-quaternary);
  transform: scale(0.96);
}

.modern-button--tinted {
  background: rgba(0, 122, 255, 0.1);
  color: var(--modern-primary-blue);
  border-radius: var(--modern-radius-md);
}

.modern-button--tinted:hover:not(.modern-button--disabled):not(.modern-button--loading) {
  background: rgba(0, 122, 255, 0.15);
  transform: scale(0.98);
}

.modern-button--tinted:active:not(.modern-button--disabled):not(.modern-button--loading) {
  background: rgba(0, 122, 255, 0.2);
  transform: scale(0.96);
}

/* 尺寸变体 */
.modern-button--small {
  height: 32px;
  padding: 0 var(--modern-spacing-md);
  font-size: var(--modern-font-size-footnote);
  min-width: 64px;
}

.modern-button--medium {
  height: 44px;
  padding: 0 var(--modern-spacing-lg);
  font-size: var(--modern-font-size-body);
  min-width: 88px;
}

.modern-button--large {
  height: 52px;
  padding: 0 var(--modern-spacing-xl);
  font-size: var(--modern-font-size-headline);
  min-width: 120px;
}

/* 圆角变体 */
.modern-button--rounded {
  border-radius: var(--modern-radius-full);
}

/* 块级按钮 */
.modern-button--block {
  width: 100%;
}

/* 按钮内容 */
.modern-button__content {
  display: flex;
  align-items: center;
  gap: var(--modern-spacing-sm);
}

.modern-button__text {
  line-height: 1;
}

/* 加载状态 */
.modern-button__loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modern-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-radius: 50%;
  border-top-color: transparent;
  animation: modern-spin 1s linear infinite;
}

@keyframes modern-spin {
  to {
    transform: rotate(360deg);
  }
}

/* 禁用状态 */
.modern-button--disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none !important;
  pointer-events: none;
}

/* 加载状态 */
.modern-button--loading {
  cursor: not-allowed;
  transform: none !important;
}

.modern-button--loading .modern-button__content {
  opacity: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .modern-button--medium {
    height: 48px;
    font-size: var(--modern-font-size-callout);
  }
  
  .modern-button--large {
    height: 56px;
    font-size: var(--modern-font-size-headline);
  }
}

/* 高对比度模式支持 */
@media (prefers-contrast: high) {
  .modern-button--secondary {
    border: 1px solid var(--modern-text-primary);
  }
  
  .modern-button--plain {
    border: 1px solid var(--modern-primary-blue);
  }
}

/* 减少动画偏好支持 */
@media (prefers-reduced-motion: reduce) {
  .modern-button {
    transition: none;
  }
  
  .modern-button:hover {
    transform: none;
  }
  
  .modern-button:active {
    transform: none;
  }
  
  .modern-spinner {
    animation: none;
  }
}
</style>