<template>
  <div class="window-controls">
    <button class="control-btn minimize-btn" @click="minimize" title="最小化">
      <svg width="12" height="12" viewBox="0 0 12 12">
        <rect x="2" y="5" width="8" height="2" fill="currentColor" />
      </svg>
    </button>
    
    <button class="control-btn maximize-btn" @click="toggleMaximize" :title="isMaximized ? '还原' : '最大化'">
      <svg v-if="!isMaximized" width="12" height="12" viewBox="0 0 12 12">
        <rect x="2" y="2" width="8" height="8" stroke="currentColor" stroke-width="1.5" fill="none" />
      </svg>
      <svg v-else width="12" height="12" viewBox="0 0 12 12">
        <rect x="2" y="3" width="6" height="6" stroke="currentColor" stroke-width="1.5" fill="none" />
        <rect x="4" y="1" width="6" height="6" stroke="currentColor" stroke-width="1.5" fill="none" />
      </svg>
    </button>
    
    <button class="control-btn close-btn" @click="close" title="关闭">
      <svg width="12" height="12" viewBox="0 0 12 12">
        <path d="M2 2 L10 10 M10 2 L2 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 声明全局窗口控制API类型
declare global {
  interface Window {
    windowControls: {
      minimize: () => Promise<void>
      maximize: () => Promise<void>
      unmaximize: () => Promise<void>
      close: () => Promise<void>
      isMaximized: () => Promise<boolean>
    }
  }
}

const isMaximized = ref(false)

// 检查窗口最大化状态
const checkMaximizedState = async () => {
  if (window.windowControls) {
    isMaximized.value = await window.windowControls.isMaximized()
  }
}

// 最小化窗口
const minimize = async () => {
  if (window.windowControls) {
    await window.windowControls.minimize()
  }
}

// 切换最大化状态
const toggleMaximize = async () => {
  if (window.windowControls) {
    if (isMaximized.value) {
      await window.windowControls.unmaximize()
    } else {
      await window.windowControls.maximize()
    }
    await checkMaximizedState()
  }
}

// 关闭窗口
const close = async () => {
  if (window.windowControls) {
    await window.windowControls.close()
  }
}

onMounted(() => {
  checkMaximizedState()
  
  // 监听窗口大小变化事件
  window.addEventListener('resize', checkMaximizedState)
})
</script>

<style scoped>
.window-controls {
  display: flex;
  align-items: center;
  height: 100%;
  -webkit-app-region: no-drag; /* 确保按钮可以点击 */
}

.control-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 32px;
  border: none;
  background: transparent;
  color: var(--el-text-color-primary);
  cursor: pointer;
  transition: background-color 0.2s ease;
  -webkit-app-region: no-drag;
}

.control-btn:hover {
  background-color: var(--el-fill-color-light);
}

.control-btn:active {
  background-color: var(--el-fill-color);
}

.close-btn:hover {
  background-color: #e81123;
  color: white;
}

.close-btn:active {
  background-color: #c50e1f;
  color: white;
}

/* 确保SVG图标居中 */
.control-btn svg {
  display: block;
}
</style>