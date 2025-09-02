<template>
  <div :class="containerClasses">
    <label
      v-if="label"
      :for="inputId"
      :class="labelClasses"
    >
      {{ label }}
      <span v-if="required" class="modern-input__required">*</span>
    </label>
    
    <div class="modern-input__wrapper">
      <div
        v-if="$slots.prefix || prefixIcon"
        class="modern-input__prefix"
      >
        <component
          v-if="prefixIcon"
          :is="prefixIcon"
          class="modern-input__icon"
        />
        <slot name="prefix" />
      </div>
      
      <input
        :id="inputId"
        ref="inputRef"
        v-model="inputValue"
        :type="inputType"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :class="inputClasses"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        @keydown="handleKeydown"
      />
      
      <div
        v-if="$slots.suffix || suffixIcon || showPasswordToggle || clearable"
        class="modern-input__suffix"
      >
        <button
          v-if="clearable && inputValue && !disabled"
          type="button"
          class="modern-input__clear"
          @click="handleClear"
        >
          <X class="modern-input__icon" />
        </button>
        
        <button
          v-if="showPasswordToggle"
          type="button"
          class="modern-input__password-toggle"
          @click="togglePasswordVisibility"
        >
          <component
            :is="showPassword ? EyeOff : Eye"
            class="modern-input__icon"
          />
        </button>
        
        <component
          v-if="suffixIcon"
          :is="suffixIcon"
          class="modern-input__icon"
        />
        <slot name="suffix" />
      </div>
      
      <!-- 焦点指示器 -->
      <div class="modern-input__focus-indicator" />
      
      <!-- 加载指示器 -->
      <div
        v-if="loading"
        class="modern-input__loading"
      >
        <div class="modern-spinner"></div>
      </div>
    </div>
    
    <!-- 帮助文本或错误信息 -->
    <Transition name="message-slide">
      <div
        v-if="errorMessage || helpText"
        :class="messageClasses"
      >
        <component
          v-if="errorMessage"
          :is="AlertCircle"
          class="modern-input__message-icon"
        />
        <component
          v-else-if="helpText"
          :is="Info"
          class="modern-input__message-icon"
        />
        {{ errorMessage || helpText }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { X, Eye, EyeOff, AlertCircle, Info } from 'lucide-vue-next'
import { useModernAnimations } from '@/composables/useModernAnimations'

type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
type InputSize = 'small' | 'medium' | 'large'
type InputVariant = 'outlined' | 'filled' | 'borderless'

interface Props {
  modelValue?: string | number
  type?: InputType
  size?: InputSize
  variant?: InputVariant
  label?: string
  placeholder?: string
  helpText?: string
  errorMessage?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  clearable?: boolean
  loading?: boolean
  prefixIcon?: any
  suffixIcon?: any
  autofocus?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'input', event: Event): void
  (e: 'clear'): void
  (e: 'keydown', event: KeyboardEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  size: 'medium',
  variant: 'outlined',
  disabled: false,
  readonly: false,
  required: false,
  clearable: false,
  loading: false,
  autofocus: false
})

const emit = defineEmits<Emits>()
const { shake } = useModernAnimations()

// 状态
const inputRef = ref<HTMLInputElement>()
const isFocused = ref(false)
const showPassword = ref(false)
const inputId = `modern-input-${Math.random().toString(36).substr(2, 9)}`

// 计算属性
const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const inputType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type
})

const showPasswordToggle = computed(() => {
  return props.type === 'password' && !props.disabled && !props.readonly
})

const containerClasses = computed(() => [
  'modern-input',
  `modern-input--${props.size}`,
  `modern-input--${props.variant}`,
  {
    'modern-input--focused': isFocused.value,
    'modern-input--disabled': props.disabled,
    'modern-input--readonly': props.readonly,
    'modern-input--error': props.errorMessage,
    'modern-input--loading': props.loading
  }
])

const labelClasses = computed(() => [
  'modern-input__label',
  {
    'modern-input__label--floating': isFocused.value || inputValue.value,
    'modern-input__label--error': props.errorMessage
  }
])

const inputClasses = computed(() => [
  'modern-input__field',
  {
    'modern-input__field--has-prefix': props.prefixIcon || $slots.prefix,
    'modern-input__field--has-suffix': props.suffixIcon || $slots.suffix || props.clearable || showPasswordToggle.value
  }
])

const messageClasses = computed(() => [
  'modern-input__message',
  {
    'modern-input__message--error': props.errorMessage,
    'modern-input__message--help': props.helpText && !props.errorMessage
  }
])

// 方法
const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

const handleInput = (event: Event) => {
  emit('input', event)
}

const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event)
  
  // Enter 键触发动画
  if (event.key === 'Enter' && inputRef.value) {
    inputRef.value.classList.add('modern-input__field--enter')
    setTimeout(() => {
      inputRef.value?.classList.remove('modern-input__field--enter')
    }, 150)
  }
}

const handleClear = () => {
  inputValue.value = ''
  emit('clear')
  inputRef.value?.focus()
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const focus = () => {
  inputRef.value?.focus()
}

const blur = () => {
  inputRef.value?.blur()
}

const shakeInput = () => {
  if (inputRef.value) {
    shake(inputRef.value.parentElement!)
  }
}

// 监听错误消息变化，触发摇摆动画
watch(() => props.errorMessage, (newError, oldError) => {
  if (newError && !oldError) {
    nextTick(() => {
      shakeInput()
    })
  }
})

// 自动聚焦
onMounted(() => {
  if (props.autofocus && inputRef.value) {
    nextTick(() => {
      inputRef.value?.focus()
    })
  }
})

// 暴露方法
defineExpose({
  focus,
  blur,
  shakeInput
})
</script>

<style scoped>
.modern-input {
  display: flex;
  flex-direction: column;
  gap: var(--modern-spacing-xs);
  width: 100%;
}

.modern-input__label {
  font-size: var(--modern-font-size-footnote);
  font-weight: 500;
  color: var(--modern-text-secondary);
  transition: all var(--modern-duration-fast) var(--modern-easing-ease);
  transform-origin: left top;
  pointer-events: none;
  user-select: none;
}

.modern-input__label--floating {
  transform: translateY(-4px) scale(0.9);
  color: var(--modern-primary-blue);
}

.modern-input__label--error {
  color: var(--modern-primary-red);
}

.modern-input__required {
  color: var(--modern-primary-red);
  margin-left: 2px;
}

.modern-input__wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--modern-background-tertiary);
  border-radius: var(--modern-radius-md);
  overflow: hidden;
  transition: all var(--modern-duration-fast) var(--modern-easing-ease);
}

/* 变体样式 */
.modern-input--outlined .modern-input__wrapper {
  border: 1px solid var(--modern-divider);
  background: var(--modern-background-primary);
}

.modern-input--filled .modern-input__wrapper {
  background: var(--modern-fill-tertiary);
  border: 1px solid transparent;
}

.modern-input--borderless .modern-input__wrapper {
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--modern-divider);
  border-radius: 0;
}

/* 焦点状态 */
.modern-input--focused.modern-input--outlined .modern-input__wrapper {
  border-color: var(--modern-primary-blue);
  box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
}

.modern-input--focused.modern-input--filled .modern-input__wrapper {
  background: var(--modern-fill-secondary);
  border-color: var(--modern-primary-blue);
}

.modern-input--focused.modern-input--borderless .modern-input__wrapper {
  border-bottom-color: var(--modern-primary-blue);
}

/* 错误状态 */
.modern-input--error.modern-input--outlined .modern-input__wrapper {
  border-color: var(--modern-primary-red);
  box-shadow: 0 0 0 3px rgba(255, 59, 48, 0.1);
}

.modern-input--error.modern-input--filled .modern-input__wrapper {
  background: rgba(255, 59, 48, 0.05);
  border-color: var(--modern-primary-red);
}

.modern-input--error.modern-input--borderless .modern-input__wrapper {
  border-bottom-color: var(--modern-primary-red);
}

/* 禁用状态 */
.modern-input--disabled .modern-input__wrapper {
  opacity: 0.5;
  cursor: not-allowed;
}

.modern-input__field {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: var(--modern-text-primary);
  font-size: var(--modern-font-size-body);
  font-weight: 400;
  line-height: var(--modern-line-height-body);
  transition: all var(--modern-duration-fast) var(--modern-easing-ease);
}

.modern-input__field::placeholder {
  color: var(--modern-text-quaternary);
  transition: opacity var(--modern-duration-fast) var(--modern-easing-ease);
}

.modern-input__field:focus::placeholder {
  opacity: 0.7;
}

/* 尺寸变体 */
.modern-input--small .modern-input__field {
  padding: var(--modern-spacing-xs) var(--modern-spacing-sm);
  font-size: var(--modern-font-size-footnote);
  min-height: 32px;
}

.modern-input--medium .modern-input__field {
  padding: var(--modern-spacing-sm) var(--modern-spacing-md);
  min-height: 44px;
}

.modern-input--large .modern-input__field {
  padding: var(--modern-spacing-md) var(--modern-spacing-lg);
  font-size: var(--modern-font-size-callout);
  min-height: 52px;
}

.modern-input__field--has-prefix {
  padding-left: 0;
}

.modern-input__field--has-suffix {
  padding-right: 0;
}

.modern-input__prefix,
.modern-input__suffix {
  display: flex;
  align-items: center;
  gap: var(--modern-spacing-xs);
  color: var(--modern-text-tertiary);
}

.modern-input__prefix {
  padding-left: var(--modern-spacing-md);
}

.modern-input__suffix {
  padding-right: var(--modern-spacing-md);
}

.modern-input__icon {
  width: 18px;
  height: 18px;
  color: currentColor;
}

.modern-input__clear,
.modern-input__password-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--modern-text-tertiary);
  cursor: pointer;
  padding: var(--modern-spacing-xs);
  border-radius: var(--modern-radius-xs);
  transition: all var(--modern-duration-fast) var(--modern-easing-ease);
}

.modern-input__clear:hover,
.modern-input__password-toggle:hover {
  background: var(--modern-fill-quaternary);
  color: var(--modern-text-secondary);
}

.modern-input__focus-indicator {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--modern-primary-blue);
  transform: translateX(-50%);
  transition: width var(--modern-duration-medium) var(--modern-easing-ease);
}

.modern-input--focused .modern-input__focus-indicator {
  width: 100%;
}

.modern-input--borderless .modern-input__focus-indicator {
  display: block;
}

.modern-input--outlined .modern-input__focus-indicator,
.modern-input--filled .modern-input__focus-indicator {
  display: none;
}

.modern-input__loading {
  position: absolute;
  right: var(--modern-spacing-md);
  top: 50%;
  transform: translateY(-50%);
}

.modern-input__message {
  display: flex;
  align-items: center;
  gap: var(--modern-spacing-xs);
  font-size: var(--modern-font-size-caption-1);
  font-weight: 400;
  line-height: var(--modern-line-height-caption-1);
}

.modern-input__message--error {
  color: var(--modern-primary-red);
}

.modern-input__message--help {
  color: var(--modern-text-tertiary);
}

.modern-input__message-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

/* Enter 键动画 */
.modern-input__field--enter {
  transform: scale(1.02);
}

/* 消息滑动动画 */
.message-slide-enter-active,
.message-slide-leave-active {
  transition: all var(--modern-duration-fast) var(--modern-easing-ease);
}

.message-slide-enter-from,
.message-slide-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .modern-input--large .modern-input__field {
    font-size: var(--modern-font-size-body);
    min-height: 48px;
  }
}

/* 高对比度模式支持 */
@media (prefers-contrast: high) {
  .modern-input--outlined .modern-input__wrapper {
    border-width: 2px;
  }
  
  .modern-input--focused.modern-input--outlined .modern-input__wrapper {
    border-width: 3px;
  }
}

/* 减少动画偏好支持 */
@media (prefers-reduced-motion: reduce) {
  .modern-input__wrapper,
  .modern-input__label,
  .modern-input__field,
  .modern-input__focus-indicator,
  .modern-input__clear,
  .modern-input__password-toggle,
  .message-slide-enter-active,
  .message-slide-leave-active {
    transition: none;
  }
  
  .modern-input__field--enter {
    transform: none;
  }
}

/* 暗色主题优化 */
.dark .modern-input--filled .modern-input__wrapper {
  background: var(--modern-neutral-gray-6);
}

.dark .modern-input--focused.modern-input--filled .modern-input__wrapper {
  background: var(--modern-neutral-gray-5);
}
</style>