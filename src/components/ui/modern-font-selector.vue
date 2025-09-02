<template>
  <div class="modern-font-selector">
    <div class="modern-font-selector__header">
      <h3 class="modern-typography-headline">字体设置</h3>
      <p class="modern-typography-footnote modern-font-selector__description">
        选择系统中可用的字体，实时预览效果
      </p>
    </div>

    <div class="modern-font-selector__controls">
      <!-- 字体家族选择 -->
      <div class="modern-font-selector__group">
        <label class="modern-font-selector__label">字体家族</label>
        <select 
          v-model="selectedFont" 
          class="modern-font-selector__select"
          @change="handleFontChange"
        >
          <option 
            v-for="font in availableFonts" 
            :key="font" 
            :value="font"
            :style="{ fontFamily: font }"
          >
            {{ getFontDisplayName(font) }}
          </option>
        </select>
      </div>

      <!-- 字体大小设置 -->
      <div class="modern-font-selector__group">
        <label class="modern-font-selector__label">
          字体大小: {{ fontSize }}px
        </label>
        <div class="modern-font-selector__slider-container">
          <input
            v-model.number="fontSize"
            type="range"
            min="12"
            max="24"
            step="1"
            class="modern-font-selector__slider"
            @input="handleFontSizeChange"
          >
          <div class="modern-font-selector__size-indicators">
            <span class="modern-font-selector__size-mark">12px</span>
            <span class="modern-font-selector__size-mark">16px</span>
            <span class="modern-font-selector__size-mark">20px</span>
            <span class="modern-font-selector__size-mark">24px</span>
          </div>
        </div>
      </div>

      <!-- 字体粗细设置 -->
      <div class="modern-font-selector__group">
        <label class="modern-font-selector__label">字体粗细</label>
        <div class="modern-font-selector__weight-buttons">
          <button
            v-for="weight in fontWeights"
            :key="weight.value"
            :class="[
              'modern-font-selector__weight-button',
              { 'modern-font-selector__weight-button--active': fontWeight === weight.value }
            ]"
            @click="handleFontWeightChange(weight.value)"
          >
            {{ weight.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- 字体预览 -->
    <div class="modern-font-selector__preview">
      <h4 class="modern-typography-headline">预览效果</h4>
      <div 
        class="modern-font-selector__preview-text"
        :style="previewStyle"
      >
        <div class="modern-font-selector__preview-line">
          现代流畅设计系统 Modern Fluent Design
        </div>
        <div class="modern-font-selector__preview-line">
          ABCDEFGHIJKLMNOPQRSTUVWXYZ
        </div>
        <div class="modern-font-selector__preview-line">
          abcdefghijklmnopqrstuvwxyz
        </div>
        <div class="modern-font-selector__preview-line">
          1234567890 !@#$%^&*()
        </div>
        <div class="modern-font-selector__preview-line">
          这是一段中文文本演示效果，包含各种标点符号。
        </div>
      </div>
    </div>

    <!-- 重置按钮 -->
    <div class="modern-font-selector__actions">
      <button 
        class="modern-font-selector__reset-button"
        @click="resetToDefault"
      >
        重置为默认字体
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useModernThemeStore } from '@/stores/modern-theme'

const modernThemeStore = useModernThemeStore()

// 响应式数据
const selectedFont = ref(modernThemeStore.config.fontFamily)
const fontSize = ref(modernThemeStore.config.fontSize)
const fontWeight = ref(modernThemeStore.config.fontWeight)
const availableFonts = ref<string[]>([])

// 字体粗细选项
const fontWeights = [
  { label: '细', value: '300' },
  { label: '正常', value: '400' },
  { label: '中等', value: '500' },
  { label: '粗', value: '600' },
  { label: '特粗', value: '700' }
]

// 计算属性
const previewStyle = computed(() => ({
  fontFamily: selectedFont.value,
  fontSize: `${fontSize.value}px`,
  fontWeight: fontWeight.value
}))

// 方法
const getFontDisplayName = (font: string): string => {
  const fontName = font.split(',')[0].trim().replace(/['"]/g, '')
  
  const displayNames: Record<string, string> = {
    'system-ui': '系统默认字体',
    'Arial': 'Arial',
    'Helvetica': 'Helvetica',
    'Times New Roman': 'Times New Roman',
    'Georgia': 'Georgia',
    'Verdana': 'Verdana',
    'Tahoma': 'Tahoma',
    'Trebuchet MS': 'Trebuchet MS',
    'Impact': 'Impact',
    'Courier New': 'Courier New',
    'Lucida Console': 'Lucida Console',
    '微软雅黑': '微软雅黑',
    '黑体': '黑体',
    '宋体': '宋体',
    '仿宋': '仿宋',
    '楷体': '楷体',
    'SF Pro Display': 'SF Pro Display',
    'SF Pro Text': 'SF Pro Text',
    'SF Mono': 'SF Mono',
    'Roboto': 'Roboto',
    'Open Sans': 'Open Sans',
    'Lato': 'Lato',
    'Montserrat': 'Montserrat',
    'Source Sans Pro': 'Source Sans Pro',
    'Ubuntu': 'Ubuntu',
    'Nunito': 'Nunito',
    'Poppins': 'Poppins'
  }
  
  return displayNames[fontName] || fontName
}

const handleFontChange = () => {
  try {
    modernThemeStore.setFontFamily(selectedFont.value)
  } catch (error) {
    console.error('字体更改失败:', error)
  }
}

const handleFontSizeChange = () => {
  try {
    modernThemeStore.setFontSize(fontSize.value)
  } catch (error) {
    console.error('字体大小更改失败:', error)
  }
}

const handleFontWeightChange = (weight: string) => {
  try {
    fontWeight.value = weight
    modernThemeStore.setFontWeight(weight)
  } catch (error) {
    console.error('字体粗细更改失败:', error)
  }
}

const resetToDefault = () => {
  selectedFont.value = 'system-ui, -apple-system, sans-serif'
  fontSize.value = 16
  fontWeight.value = '400'
  
  modernThemeStore.setFontFamily(selectedFont.value)
  modernThemeStore.setFontSize(fontSize.value)
  modernThemeStore.setFontWeight(fontWeight.value)
}

const loadAvailableFonts = () => {
  try {
    availableFonts.value = modernThemeStore.getAvailableFonts()
    console.log('加载可用字体:', availableFonts.value.length, '个')
  } catch (error) {
    console.error('加载字体列表失败:', error)
    // 设置默认字体列表
    availableFonts.value = [
      'system-ui, -apple-system, sans-serif',
      'Arial, sans-serif',
      'Helvetica, sans-serif',
      'Times New Roman, serif',
      '微软雅黑, Microsoft YaHei, sans-serif'
    ]
  }
}

// 生命周期
onMounted(() => {
  // 延迟初始化，避免组件未完全加载时的问题
  nextTick(() => {
    loadAvailableFonts()
    
    // 监听配置变化
    modernThemeStore.$subscribe((mutation, state) => {
      try {
        // 检查是否有字体相关的变更
        const fontKeys = ['fontFamily', 'fontSize', 'fontWeight']
        let hasFontChanges = false
        
        if (mutation.type === 'patch object' || mutation.type === 'patch function') {
          // 检查是否有字体相关的更改
          if (mutation.payload && typeof mutation.payload === 'object') {
            hasFontChanges = fontKeys.some(key => key in mutation.payload)
          }
        } else if (mutation.type === 'direct') {
          // 直接更新时检查状态变化
          hasFontChanges = true
        }
        
        if (hasFontChanges) {
          selectedFont.value = state.config.fontFamily
          fontSize.value = state.config.fontSize
          fontWeight.value = state.config.fontWeight
        }
      } catch (error) {
        console.error('监听字体配置变化失败:', error)
      }
    })
  })
})
</script>

<style scoped>
.modern-font-selector {
  display: flex;
  flex-direction: column;
  gap: var(--modern-spacing-lg);
  padding: var(--modern-spacing-lg);
  background: var(--background-secondary);
  border-radius: var(--modern-radius-lg);
  border: 1px solid var(--divider);
}

.modern-font-selector__header {
  text-align: center;
}

.modern-font-selector__description {
  color: var(--text-tertiary);
  margin-top: var(--modern-spacing-xs);
}

.modern-font-selector__controls {
  display: flex;
  flex-direction: column;
  gap: var(--modern-spacing-lg);
}

.modern-font-selector__group {
  display: flex;
  flex-direction: column;
  gap: var(--modern-spacing-sm);
}

.modern-font-selector__label {
  font-size: var(--modern-font-size-subheadline);
  font-weight: 600;
  color: var(--text-primary);
}

.modern-font-selector__select {
  padding: var(--modern-spacing-sm) var(--modern-spacing-md);
  border: 1px solid var(--divider);
  border-radius: var(--modern-radius-md);
  background: var(--background-primary);
  color: var(--text-primary);
  font-size: var(--modern-font-size-body);
  transition: all var(--modern-duration-fast) var(--modern-easing-ease);
}

.modern-font-selector__select:focus {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
}

.modern-font-selector__slider-container {
  position: relative;
}

.modern-font-selector__slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: var(--fill-tertiary);
  outline: none;
  appearance: none;
  cursor: pointer;
}

.modern-font-selector__slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--primary-blue);
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all var(--modern-duration-fast) var(--modern-easing-ease);
}

.modern-font-selector__slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
}

.modern-font-selector__size-indicators {
  display: flex;
  justify-content: space-between;
  margin-top: var(--modern-spacing-xs);
}

.modern-font-selector__size-mark {
  font-size: var(--modern-font-size-caption-2);
  color: var(--text-tertiary);
}

.modern-font-selector__weight-buttons {
  display: flex;
  gap: var(--modern-spacing-xs);
  flex-wrap: wrap;
}

.modern-font-selector__weight-button {
  padding: var(--modern-spacing-xs) var(--modern-spacing-md);
  border: 1px solid var(--divider);
  border-radius: var(--modern-radius-sm);
  background: var(--background-primary);
  color: var(--text-primary);
  font-size: var(--modern-font-size-footnote);
  cursor: pointer;
  transition: all var(--modern-duration-fast) var(--modern-easing-ease);
}

.modern-font-selector__weight-button:hover {
  background: var(--fill-quaternary);
}

.modern-font-selector__weight-button--active {
  background: var(--primary-blue);
  color: white;
  border-color: var(--primary-blue);
}

.modern-font-selector__preview {
  padding: var(--modern-spacing-lg);
  background: var(--background-primary);
  border: 1px solid var(--divider);
  border-radius: var(--modern-radius-md);
}

.modern-font-selector__preview-text {
  margin-top: var(--modern-spacing-md);
}

.modern-font-selector__preview-line {
  margin-bottom: var(--modern-spacing-sm);
  line-height: 1.5;
  color: var(--text-primary);
}

.modern-font-selector__actions {
  display: flex;
  justify-content: center;
}

.modern-font-selector__reset-button {
  padding: var(--modern-spacing-sm) var(--modern-spacing-lg);
  border: 1px solid var(--divider);
  border-radius: var(--modern-radius-md);
  background: var(--background-primary);
  color: var(--text-secondary);
  font-size: var(--modern-font-size-footnote);
  cursor: pointer;
  transition: all var(--modern-duration-fast) var(--modern-easing-ease);
}

.modern-font-selector__reset-button:hover {
  background: var(--fill-quaternary);
  color: var(--text-primary);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .modern-font-selector {
    padding: var(--modern-spacing-md);
    gap: var(--modern-spacing-md);
  }
  
  .modern-font-selector__weight-buttons {
    justify-content: center;
  }
}

/* 深色模式适配 */
.dark .modern-font-selector__slider::-webkit-slider-thumb {
  background: var(--primary-blue);
}

/* 高对比度模式 */
@media (prefers-contrast: high) {
  .modern-font-selector__select,
  .modern-font-selector__weight-button {
    border-width: 2px;
  }
}

/* 减少动画偏好 */
@media (prefers-reduced-motion: reduce) {
  .modern-font-selector__select,
  .modern-font-selector__weight-button,
  .modern-font-selector__reset-button,
  .modern-font-selector__slider::-webkit-slider-thumb {
    transition: none;
  }
}
</style>