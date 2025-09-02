<template>
  <div class="modern-background-selector">
    <div class="modern-background-selector__header">
      <h3 class="modern-typography-headline">背景设置</h3>
      <p class="modern-typography-footnote modern-background-selector__description">
        上传自定义背景图片或选择预设背景，实时预览效果
      </p>
    </div>

    <div class="modern-background-selector__controls">
      <!-- 图片上传区域 - 规范化设计 -->
      <div class="modern-background-selector__group">
        <label class="modern-background-selector__label">
          <span class="modern-background-selector__label-icon">🖼️</span>
          上传背景图片
        </label>
        <div class="modern-background-selector__upload-area">
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="modern-background-selector__file-input"
            @change="handleFileSelect"
          >
          
          <div 
            class="modern-background-selector__drop-zone"
            :class="{ 
              'modern-background-selector__drop-zone--dragover': isDragOver,
              'modern-background-selector__drop-zone--has-image': backgroundImage
            }"
            @click="triggerFileSelect"
            @dragover.prevent="handleDragOver"
            @dragleave.prevent="handleDragLeave"
            @drop.prevent="handleDrop"
          >
            <div v-if="!backgroundImage" class="modern-background-selector__upload-prompt">
              <div class="modern-background-selector__upload-icon">📷</div>
              <p class="modern-background-selector__upload-text">
                点击上传或拖拽图片到此处
              </p>
              <p class="modern-background-selector__upload-hint">
                支持 JPG、PNG、WebP 格式，建议分辨率 1920x1080 以上
              </p>
            </div>
            
            <div v-else class="modern-background-selector__preview">
              <img 
                :src="backgroundImage" 
                alt="背景预览"
                class="modern-background-selector__preview-image"
              >
              <div class="modern-background-selector__preview-overlay">
                <button 
                  class="modern-background-selector__action-button modern-background-selector__action-button--primary"
                  @click.stop="triggerFileSelect"
                >
                  <span class="modern-background-selector__button-icon">🔄</span>
                  更换图片
                </button>
                <button 
                  class="modern-background-selector__action-button modern-background-selector__action-button--danger"
                  @click.stop="removeBackground"
                >
                  <span class="modern-background-selector__button-icon">🗑️</span>
                  移除背景
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 预设背景图片 - 规范化设计 -->
      <div class="modern-background-selector__group">
        <label class="modern-background-selector__label">
          <span class="modern-background-selector__label-icon">🎨</span>
          预设背景
        </label>
        <div class="modern-background-selector__presets">
          <button
            v-for="preset in presetBackgrounds"
            :key="preset.id"
            class="modern-background-selector__preset"
            :class="{ 'modern-background-selector__preset--active': backgroundImage === preset.url }"
            @click="selectPreset(preset)"
          >
            <div class="modern-background-selector__preset-thumbnail">
              <img 
                :src="preset.thumbnail" 
                :alt="preset.name"
                class="modern-background-selector__preset-image"
              >
              <div v-if="backgroundImage === preset.url" class="modern-background-selector__preset-check">
                <span class="modern-background-selector__check-icon">✓</span>
              </div>
            </div>
            <span class="modern-background-selector__preset-name">{{ preset.name }}</span>
          </button>
          
          <!-- 无背景选项 -->
          <button
            class="modern-background-selector__preset"
            :class="{ 'modern-background-selector__preset--active': !backgroundImage }"
            @click="removeBackground"
          >
            <div class="modern-background-selector__preset-thumbnail">
              <div class="modern-background-selector__preset-none">
                <span class="modern-background-selector__preset-none-icon">🚫</span>
              </div>
              <div v-if="!backgroundImage" class="modern-background-selector__preset-check">
                <span class="modern-background-selector__check-icon">✓</span>
              </div>
            </div>
            <span class="modern-background-selector__preset-name">无背景</span>
          </button>
        </div>
      </div>

      <!-- 背景设置 - 规范化设计 -->
      <div v-if="backgroundImage" class="modern-background-selector__group">
        <label class="modern-background-selector__label">
          <span class="modern-background-selector__label-icon">⚙️</span>
          显示设置
        </label>
        
        <div class="modern-background-selector__settings-grid">
          <!-- 背景尺寸 -->
          <div class="modern-background-selector__setting">
            <label class="modern-background-selector__setting-label">
              <span class="modern-background-selector__setting-icon">📏</span>
              背景尺寸
            </label>
            <select 
              v-model="backgroundSize" 
              class="modern-background-selector__select"
              @change="handleBackgroundSizeChange"
            >
              <option value="cover">覆盖整个区域</option>
              <option value="contain">完整显示图片</option>
              <option value="auto">原始尺寸</option>
            </select>
          </div>

          <!-- 背景位置 -->
          <div class="modern-background-selector__setting">
            <label class="modern-background-selector__setting-label">
              <span class="modern-background-selector__setting-icon">📍</span>
              背景位置
            </label>
            <select 
              v-model="backgroundPosition" 
              class="modern-background-selector__select"
              @change="handleBackgroundPositionChange"
            >
              <option value="center">居中</option>
              <option value="top">顶部</option>
              <option value="bottom">底部</option>
              <option value="left">左侧</option>
              <option value="right">右侧</option>
              <option value="top left">左上角</option>
              <option value="top right">右上角</option>
              <option value="bottom left">左下角</option>
              <option value="bottom right">右下角</option>
            </select>
          </div>

          <!-- 透明度 -->
          <div class="modern-background-selector__setting modern-background-selector__setting--full">
            <label class="modern-background-selector__setting-label">
              <span class="modern-background-selector__setting-icon">💫</span>
              透明度: {{ Math.round(backgroundOpacity * 100) }}%
            </label>
            <div class="modern-background-selector__slider-container">
              <input
                v-model.number="backgroundOpacity"
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                class="modern-background-selector__slider"
                @input="handleBackgroundOpacityChange"
              >
              <div class="modern-background-selector__slider-track">
                <span class="modern-background-selector__slider-label">10%</span>
                <span class="modern-background-selector__slider-label">50%</span>
                <span class="modern-background-selector__slider-label">100%</span>
              </div>
            </div>
          </div>

          <!-- 模糊效果 -->
          <div class="modern-background-selector__setting modern-background-selector__setting--toggle">
            <label class="modern-background-selector__checkbox-label">
              <input
                v-model="enableBackgroundBlur"
                type="checkbox"
                class="modern-background-selector__checkbox"
                @change="handleBackgroundBlurChange"
              >
              <span class="modern-background-selector__checkbox-custom"></span>
              <span class="modern-background-selector__checkbox-text">
                <span class="modern-background-selector__setting-icon">✨</span>
                启用背景模糊效果
              </span>
            </label>
            <span class="modern-background-selector__setting-hint">
              为背景添加模糊效果，提升内容可读性
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 实时预览 - 增强版 -->
    <div class="modern-background-selector__live-preview">
      <div class="modern-background-selector__preview-header">
        <h4 class="modern-typography-headline">
          <span class="modern-background-selector__preview-icon">👀</span>
          效果预览
        </h4>
        <span class="modern-background-selector__preview-hint">
          实时预览背景设置效果
        </span>
      </div>
      <div 
        class="modern-background-selector__preview-container"
        :style="previewStyle"
      >
        <div class="modern-background-selector__preview-content">
          <div class="modern-background-selector__preview-card">
            <h3 class="modern-background-selector__preview-title">
              现代流畅设计系统
            </h3>
            <p class="modern-background-selector__preview-text">
              这是背景效果的实时预览，展示当前设置下的显示效果
            </p>
            <div class="modern-background-selector__preview-actions">
              <button class="modern-background-selector__preview-button">
                示例按钮
              </button>
              <button class="modern-background-selector__preview-button modern-background-selector__preview-button--secondary">
                次要按钮
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useModernThemeStore } from '@/stores/modern-theme'

const modernThemeStore = useModernThemeStore()

// 响应式数据
const fileInput = ref<HTMLInputElement>()
const backgroundImage = ref(modernThemeStore.config.backgroundImage)
const backgroundSize = ref(modernThemeStore.config.backgroundSize)
const backgroundPosition = ref(modernThemeStore.config.backgroundPosition)
const backgroundOpacity = ref(modernThemeStore.config.backgroundOpacity)
const enableBackgroundBlur = ref(modernThemeStore.config.enableBackgroundBlur)
const isDragOver = ref(false)

// 预设背景图片 - 改进版
const presetBackgrounds = [
  {
    id: 'gradient-1',
    name: '蓝色渐变',
    url: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    thumbnail: 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="70" viewBox="0 0 100 70"%3E%3Cdefs%3E%3ClinearGradient id="grad1" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23667eea;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23764ba2;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="100" height="70" fill="url(%23grad1)" /%3E%3C/svg%3E'
  },
  {
    id: 'gradient-2',
    name: '紫色渐变',
    url: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    thumbnail: 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="70" viewBox="0 0 100 70"%3E%3Cdefs%3E%3ClinearGradient id="grad2" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23f093fb;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23f5576c;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="100" height="70" fill="url(%23grad2)" /%3E%3C/svg%3E'
  },
  {
    id: 'gradient-3',
    name: '绿色渐变',
    url: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    thumbnail: 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="70" viewBox="0 0 100 70"%3E%3Cdefs%3E%3ClinearGradient id="grad3" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%234facfe;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%2300f2fe;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="100" height="70" fill="url(%23grad3)" /%3E%3C/svg%3E'
  },
  {
    id: 'gradient-4',
    name: '橙色渐变',
    url: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    thumbnail: 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="70" viewBox="0 0 100 70"%3E%3Cdefs%3E%3ClinearGradient id="grad4" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23fa709a;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23fee140;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="100" height="70" fill="url(%23grad4)" /%3E%3C/svg%3E'
  },
  {
    id: 'gradient-5',
    name: '深邃夜空',
    url: 'linear-gradient(135deg, #667db6 0%, #0082c8 25%, #0082c8 75%, #667db6 100%)',
    thumbnail: 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="70" viewBox="0 0 100 70"%3E%3Cdefs%3E%3ClinearGradient id="grad5" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23667db6;stop-opacity:1" /%3E%3Cstop offset="25%25" style="stop-color:%230082c8;stop-opacity:1" /%3E%3Cstop offset="75%25" style="stop-color:%230082c8;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23667db6;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="100" height="70" fill="url(%23grad5)" /%3E%3C/svg%3E'
  },
  {
    id: 'gradient-6',
    name: '薄荷清新',
    url: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    thumbnail: 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="70" viewBox="0 0 100 70"%3E%3Cdefs%3E%3ClinearGradient id="grad6" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23a8edea;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23fed6e3;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="100" height="70" fill="url(%23grad6)" /%3E%3C/svg%3E'
  }
]

// 计算属性
const previewStyle = computed(() => {
  const style: Record<string, any> = {}
  
  if (backgroundImage.value) {
    if (backgroundImage.value.startsWith('linear-gradient')) {
      style.background = backgroundImage.value
    } else {
      style.backgroundImage = `url(${backgroundImage.value})`
      style.backgroundSize = backgroundSize.value
      style.backgroundPosition = backgroundPosition.value
      style.backgroundRepeat = 'no-repeat'
    }
    
    style.opacity = backgroundOpacity.value
    
    if (enableBackgroundBlur.value) {
      style.filter = 'blur(2px)'
    }
  }
  
  return style
})

// 方法
const triggerFileSelect = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    processFile(file)
  }
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = true
}

const handleDragLeave = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false
  
  const files = event.dataTransfer?.files
  if (files && files.length > 0) {
    const file = files[0]
    if (file.type.startsWith('image/')) {
      processFile(file)
    }
  }
}

const processFile = (file: File) => {
  try {
    if (!file.type.startsWith('image/')) {
      console.error('无效的文件类型:', file.type)
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const result = e.target?.result as string
        if (result) {
          backgroundImage.value = result
          modernThemeStore.setBackgroundImage(result)
        }
      } catch (error) {
        console.error('处理图片数据失败:', error)
      }
    }
    reader.onerror = () => {
      console.error('读取文件失败')
    }
    reader.readAsDataURL(file)
  } catch (error) {
    console.error('处理文件失败:', error)
  }
}

const selectPreset = (preset: any) => {
  try {
    backgroundImage.value = preset.url
    modernThemeStore.setBackgroundImage(preset.url)
  } catch (error) {
    console.error('选择预设背景失败:', error)
  }
}

const removeBackground = () => {
  try {
    backgroundImage.value = null
    modernThemeStore.setBackgroundImage(null)
  } catch (error) {
    console.error('移除背景失败:', error)
  }
}

const handleBackgroundSizeChange = () => {
  try {
    modernThemeStore.setBackgroundSize(backgroundSize.value)
  } catch (error) {
    console.error('背景尺寸更改失败:', error)
  }
}

const handleBackgroundPositionChange = () => {
  try {
    modernThemeStore.setBackgroundPosition(backgroundPosition.value)
  } catch (error) {
    console.error('背景位置更改失败:', error)
  }
}

const handleBackgroundOpacityChange = () => {
  try {
    modernThemeStore.setBackgroundOpacity(backgroundOpacity.value)
  } catch (error) {
    console.error('背景透明度更改失败:', error)
  }
}

const handleBackgroundBlurChange = () => {
  try {
    modernThemeStore.toggleBackgroundBlur()
  } catch (error) {
    console.error('背景模糊更改失败:', error)
  }
}

// 生命周期
onMounted(() => {
  // 延迟初始化，避免组件未完全加载时的问题
  nextTick(() => {
    // 监听配置变化
    modernThemeStore.$subscribe((mutation, state) => {
      try {
        // 检查是否有背景相关的变更
        const backgroundKeys = ['backgroundImage', 'backgroundSize', 'backgroundPosition', 'backgroundOpacity', 'enableBackgroundBlur']
        let hasBackgroundChanges = false
        
        if (mutation.type === 'patch object' || mutation.type === 'patch function') {
          // 检查是否有背景相关的更改
          if (mutation.payload && typeof mutation.payload === 'object') {
            hasBackgroundChanges = backgroundKeys.some(key => key in mutation.payload)
          }
        } else if (mutation.type === 'direct') {
          // 直接更新时检查状态变化
          hasBackgroundChanges = true
        }
        
        if (hasBackgroundChanges) {
          backgroundImage.value = state.config.backgroundImage
          backgroundSize.value = state.config.backgroundSize
          backgroundPosition.value = state.config.backgroundPosition
          backgroundOpacity.value = state.config.backgroundOpacity
          enableBackgroundBlur.value = state.config.enableBackgroundBlur
        }
      } catch (error) {
        console.error('监听背景配置变化失败:', error)
      }
    })
  })
})
</script>

<style scoped>
.modern-background-selector {
  display: flex;
  flex-direction: column;
  gap: var(--modern-spacing-xl);
  padding: var(--modern-spacing-xl);
  background: var(--background-secondary);
  border-radius: var(--modern-radius-lg);
  border: 1px solid var(--divider);
}

.modern-background-selector__header {
  text-align: center;
  padding-bottom: var(--modern-spacing-md);
  border-bottom: 1px solid var(--divider);
}

.modern-background-selector__description {
  color: var(--text-tertiary);
  margin-top: var(--modern-spacing-xs);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.modern-background-selector__controls {
  display: flex;
  flex-direction: column;
  gap: var(--modern-spacing-xl);
}

.modern-background-selector__group {
  display: flex;
  flex-direction: column;
  gap: var(--modern-spacing-md);
  padding: var(--modern-spacing-lg);
  background: var(--background-primary);
  border-radius: var(--modern-radius-md);
  border: 1px solid var(--divider);
}

.modern-background-selector__label {
  display: flex;
  align-items: center;
  gap: var(--modern-spacing-xs);
  font-size: var(--modern-font-size-subheadline);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--modern-spacing-sm);
}

.modern-background-selector__label-icon {
  font-size: 1.2em;
  opacity: 0.8;
}

.modern-background-selector__file-input {
  display: none;
}

.modern-background-selector__drop-zone {
  border: 2px dashed var(--divider);
  border-radius: var(--modern-radius-lg);
  padding: var(--modern-spacing-xl);
  text-align: center;
  cursor: pointer;
  transition: all var(--modern-duration-fast) var(--modern-easing-ease);
  min-height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: var(--fill-quaternary);
}

.modern-background-selector__drop-zone:hover,
.modern-background-selector__drop-zone--dragover {
  border-color: var(--primary-blue);
  background: var(--fill-tertiary);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 122, 255, 0.15);
}

.modern-background-selector__drop-zone--has-image {
  padding: 0;
  border: none;
  background: transparent;
}

.modern-background-selector__upload-prompt {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--modern-spacing-md);
}

.modern-background-selector__upload-icon {
  font-size: 64px;
  opacity: 0.6;
  margin-bottom: var(--modern-spacing-sm);
}

.modern-background-selector__upload-text {
  font-size: var(--modern-font-size-body);
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
}

.modern-background-selector__upload-hint {
  font-size: var(--modern-font-size-footnote);
  color: var(--text-tertiary);
  margin: 0;
  line-height: 1.4;
}

.modern-background-selector__preview {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modern-background-selector__preview-image {
  max-width: 100%;
  max-height: 180px;
  border-radius: var(--modern-radius-md);
  object-fit: cover;
}

.modern-background-selector__preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--modern-spacing-sm);
  opacity: 0;
  transition: opacity var(--modern-duration-fast) var(--modern-easing-ease);
  border-radius: var(--modern-radius-md);
}

.modern-background-selector__preview:hover .modern-background-selector__preview-overlay {
  opacity: 1;
}

.modern-background-selector__change-button,
.modern-background-selector__remove-button {
  padding: var(--modern-spacing-xs) var(--modern-spacing-md);
  border: none;
  border-radius: var(--modern-radius-sm);
  font-size: var(--modern-font-size-footnote);
  cursor: pointer;
  transition: all var(--modern-duration-fast) var(--modern-easing-ease);
}

.modern-background-selector__change-button {
  background: var(--primary-blue);
  color: white;
}

.modern-background-selector__remove-button {
  background: var(--primary-red);
  color: white;
}

.modern-background-selector__presets {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: var(--modern-spacing-md);
}

.modern-background-selector__preset {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--modern-spacing-xs);
  padding: var(--modern-spacing-sm);
  border: 2px solid var(--divider);
  border-radius: var(--modern-radius-md);
  background: var(--background-primary);
  cursor: pointer;
  transition: all var(--modern-duration-fast) var(--modern-easing-ease);
}

.modern-background-selector__preset:hover {
  border-color: var(--primary-blue);
}

.modern-background-selector__preset--active {
  border-color: var(--primary-blue);
  background: var(--fill-quaternary);
}

.modern-background-selector__preset-image {
  width: 80px;
  height: 60px;
  border-radius: var(--modern-radius-xs);
  object-fit: cover;
}

.modern-background-selector__preset-none {
  width: 80px;
  height: 60px;
  background: var(--fill-tertiary);
  border-radius: var(--modern-radius-xs);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modern-background-selector__preset-none-icon {
  font-size: 24px;
  opacity: 0.6;
}

.modern-background-selector__preset-name {
  font-size: var(--modern-font-size-caption-2);
  color: var(--text-secondary);
  text-align: center;
}

.modern-background-selector__setting {
  display: flex;
  align-items: center;
  gap: var(--modern-spacing-md);
  justify-content: space-between;
}

.modern-background-selector__setting-label {
  font-size: var(--modern-font-size-footnote);
  color: var(--text-secondary);
  min-width: 80px;
}

.modern-background-selector__select {
  padding: var(--modern-spacing-xs) var(--modern-spacing-sm);
  border: 1px solid var(--divider);
  border-radius: var(--modern-radius-sm);
  background: var(--background-primary);
  color: var(--text-primary);
  font-size: var(--modern-font-size-footnote);
  flex: 1;
}

.modern-background-selector__slider {
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: var(--fill-tertiary);
  outline: none;
  appearance: none;
  cursor: pointer;
}

.modern-background-selector__slider::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--primary-blue);
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.modern-background-selector__checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--modern-spacing-sm);
  cursor: pointer;
}

.modern-background-selector__checkbox {
  width: 16px;
  height: 16px;
  border-radius: var(--modern-radius-xs);
  border: 2px solid var(--divider);
  appearance: none;
  cursor: pointer;
  position: relative;
}

.modern-background-selector__checkbox:checked {
  background: var(--primary-blue);
  border-color: var(--primary-blue);
}

.modern-background-selector__checkbox:checked::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 10px;
  font-weight: bold;
}

.modern-background-selector__checkbox-text {
  font-size: var(--modern-font-size-footnote);
  color: var(--text-primary);
}

.modern-background-selector__live-preview {
  margin-top: var(--modern-spacing-lg);
}

.modern-background-selector__preview-container {
  height: 150px;
  border-radius: var(--modern-radius-lg);
  border: 1px solid var(--divider);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: var(--background-primary);
}

.modern-background-selector__preview-content {
  text-align: center;
  color: var(--text-primary);
  z-index: 1;
  position: relative;
  padding: var(--modern-spacing-md);
  background: rgba(255, 255, 255, 0.9);
  border-radius: var(--modern-radius-md);
  backdrop-filter: blur(10px);
}

.modern-background-selector__preview-content h3 {
  margin: 0 0 var(--modern-spacing-xs);
  font-size: var(--modern-font-size-headline);
}

.modern-background-selector__preview-content p {
  margin: 0 0 var(--modern-spacing-sm);
  font-size: var(--modern-font-size-footnote);
  color: var(--text-secondary);
}

.modern-background-selector__preview-button {
  padding: var(--modern-spacing-xs) var(--modern-spacing-md);
  border: none;
  border-radius: var(--modern-radius-sm);
  background: var(--primary-blue);
  color: white;
  font-size: var(--modern-font-size-footnote);
  cursor: pointer;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .modern-background-selector {
    padding: var(--modern-spacing-md);
  }
  
  .modern-background-selector__presets {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: var(--modern-spacing-sm);
  }
  
  .modern-background-selector__setting {
    flex-direction: column;
    align-items: stretch;
    gap: var(--modern-spacing-xs);
  }
}

/* 深色模式适配 */
.dark .modern-background-selector__preview-content {
  background: rgba(0, 0, 0, 0.8);
  color: white;
}

/* 减少动画偏好 */
@media (prefers-reduced-motion: reduce) {
  .modern-background-selector__drop-zone,
  .modern-background-selector__preset,
  .modern-background-selector__preview-overlay {
    transition: none;
  }
}
</style>