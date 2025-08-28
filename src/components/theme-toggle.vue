<template>
  <div class="theme-toggle">
    <el-dropdown trigger="click" @command="handleCommand">
      <el-button circle :icon="currentIcon" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="light">
            <el-icon><Sunny /></el-icon>
            <span class="ml-2">浅色模式</span>
          </el-dropdown-item>
          <el-dropdown-item command="dark">
            <el-icon><Moon /></el-icon>
            <span class="ml-2">深色模式</span>
          </el-dropdown-item>
          <el-dropdown-item command="auto">
            <el-icon><Monitor /></el-icon>
            <span class="ml-2">跟随系统</span>
          </el-dropdown-item>
          <el-dropdown-item divided command="settings">
            <el-icon><Setting /></el-icon>
            <span class="ml-2">主题设置</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Sunny, Moon, Monitor, Setting } from '@element-plus/icons-vue'
import { useThemeStore } from '@/stores/theme'
import type { ThemeMode } from '@/stores/theme'

const router = useRouter()
const themeStore = useThemeStore()

// 当前图标
const currentIcon = computed(() => {
  switch (themeStore.config.mode) {
    case 'light':
      return Sunny
    case 'dark':
      return Moon
    case 'auto':
    default:
      return Monitor
  }
})

// 处理命令
const handleCommand = (command: string) => {
  if (command === 'settings') {
    router.push('/theme')
  } else {
    themeStore.setThemeMode(command as ThemeMode)
  }
}
</script>

<style scoped>
.theme-toggle {
  display: inline-block;
}

.ml-2 {
  margin-left: 0.5rem;
}
</style>