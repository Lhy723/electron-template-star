<template>
  <div class="p-6 space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">主题设置</h1>
        <p class="text-muted-foreground">自定义应用的外观和主题</p>
      </div>
    </div>

    <!-- 主题模式 -->
    <Card>
      <CardHeader>
        <CardTitle>主题模式</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid gap-4 md:grid-cols-3">
          <div 
            class="relative cursor-pointer rounded-lg border-2 p-4 transition-colors"
            :class="{
              'border-primary': themeStore.config.mode === 'light',
              'border-muted': themeStore.config.mode !== 'light'
            }"
            @click="setTheme('light')"
          >
            <div class="space-y-2">
              <div class="flex items-center space-x-2">
                <el-icon><Sunny /></el-icon>
                <span class="font-medium">浅色模式</span>
              </div>
              <div class="text-sm text-muted-foreground">
                明亮清爽的界面风格
              </div>
            </div>
            <div v-if="themeStore.config.mode === 'light'" class="absolute top-2 right-2">
              <el-icon class="text-primary"><Check /></el-icon>
            </div>
          </div>

          <div 
            class="relative cursor-pointer rounded-lg border-2 p-4 transition-colors"
            :class="{
              'border-primary': themeStore.config.mode === 'dark',
              'border-muted': themeStore.config.mode !== 'dark'
            }"
            @click="setTheme('dark')"
          >
            <div class="space-y-2">
              <div class="flex items-center space-x-2">
                <el-icon><Moon /></el-icon>
                <span class="font-medium">深色模式</span>
              </div>
              <div class="text-sm text-muted-foreground">
                护眼的深色界面风格
              </div>
            </div>
            <div v-if="themeStore.config.mode === 'dark'" class="absolute top-2 right-2">
              <el-icon class="text-primary"><Check /></el-icon>
            </div>
          </div>

          <div 
            class="relative cursor-pointer rounded-lg border-2 p-4 transition-colors"
            :class="{
              'border-primary': themeStore.config.mode === 'auto',
              'border-muted': themeStore.config.mode !== 'auto'
            }"
            @click="setTheme('auto')"
          >
            <div class="space-y-2">
              <div class="flex items-center space-x-2">
                <el-icon><Monitor /></el-icon>
                <span class="font-medium">跟随系统</span>
              </div>
              <div class="text-sm text-muted-foreground">
                根据系统设置自动切换
              </div>
            </div>
            <div v-if="themeStore.config.mode === 'auto'" class="absolute top-2 right-2">
              <el-icon class="text-primary"><Check /></el-icon>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- 主题色彩 -->
    <Card>
      <CardHeader>
        <CardTitle>主题色彩</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid gap-4 md:grid-cols-5">
          <div 
            v-for="color in availableColors" 
            :key="color.name"
            class="relative cursor-pointer rounded-lg border-2 p-4 transition-colors"
            :class="{
              'border-primary': themeStore.config.color === color.value,
              'border-muted': themeStore.config.color !== color.value
            }"
            @click="setPrimaryColor(color.value)"
          >
            <div class="space-y-2">
              <div 
                class="w-8 h-8 rounded-full mx-auto"
                :style="{ backgroundColor: themeColors[color.value].primary }"
              ></div>
              <div class="text-center text-sm font-medium">{{ color.name }}</div>
            </div>
            <div v-if="themeStore.config.color === color.value" class="absolute top-1 right-1">
              <el-icon class="text-primary text-sm"><Check /></el-icon>
            </div>
          </div>
        </div>
        
        <div class="space-y-2">
          <label class="text-sm font-medium">预设主题</label>
          <div class="flex flex-wrap gap-2">
            <Button 
              v-for="(preset, key) in themePresets" 
              :key="key"
              variant="outline" 
              size="sm"
              @click="loadPreset(key)"
            >
              {{ key === 'default' ? '默认' : key === 'dark' ? '深色' : '简约' }}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- 布局设置 -->
    <Card>
      <CardHeader>
        <CardTitle>布局设置</CardTitle>
      </CardHeader>
      <CardContent class="space-y-6">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium">侧边栏折叠</div>
              <div class="text-sm text-muted-foreground">折叠侧边栏以节省空间</div>
            </div>
            <el-switch v-model="themeStore.config.sidebarCollapsed" @change="themeStore.saveTheme" />
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium">显示面包屑</div>
              <div class="text-sm text-muted-foreground">在页面顶部显示导航路径</div>
            </div>
            <el-switch v-model="themeStore.config.showBreadcrumb" @change="themeStore.saveTheme" />
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium">显示标签页</div>
              <div class="text-sm text-muted-foreground">显示已访问页面的标签</div>
            </div>
            <el-switch v-model="themeStore.config.showTabs" @change="themeStore.saveTheme" />
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium">显示页脚</div>
              <div class="text-sm text-muted-foreground">在页面底部显示页脚信息</div>
            </div>
            <el-switch v-model="themeStore.config.showFooter" @change="themeStore.saveTheme" />
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium">固定头部</div>
              <div class="text-sm text-muted-foreground">滚动时保持头部固定</div>
            </div>
            <el-switch v-model="themeStore.config.fixedHeader" @change="themeStore.saveTheme" />
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium">固定侧边栏</div>
              <div class="text-sm text-muted-foreground">保持侧边栏始终可见</div>
            </div>
            <el-switch v-model="themeStore.config.fixedSidebar" @change="themeStore.saveTheme" />
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- 动画设置 -->
    <Card>
      <CardHeader>
        <CardTitle>动画设置</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <div class="font-medium">启用过渡动画</div>
            <div class="text-sm text-muted-foreground">开启界面过渡动画效果</div>
          </div>
          <el-switch v-model="themeStore.config.enableTransition" @change="themeStore.saveTheme" />
        </div>
        
        <div class="space-y-2">
          <label class="text-sm font-medium">过渡动画类型</label>
          <el-select v-model="themeStore.config.transitionName" @change="themeStore.saveTheme" class="w-full">
            <el-option label="淡入淡出" value="fade" />
            <el-option label="滑动" value="slide" />
            <el-option label="缩放" value="zoom" />
            <el-option label="无动画" value="none" />
          </el-select>
        </div>
      </CardContent>
    </Card>

    <!-- 字体设置 -->
    <Card>
      <CardHeader>
        <CardTitle>字体设置</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="space-y-2">
          <label class="text-sm font-medium">主题预设</label>
          <div class="grid gap-2 md:grid-cols-3">
            <Button 
              variant="outline" 
              :class="{ 'border-primary': JSON.stringify(themeStore.config) === JSON.stringify(themePresets.default) }"
              @click="loadPreset('default')"
            >
              默认主题
            </Button>
            <Button 
              variant="outline" 
              :class="{ 'border-primary': JSON.stringify(themeStore.config) === JSON.stringify(themePresets.dark) }"
              @click="loadPreset('dark')"
            >
              深色主题
            </Button>
            <Button 
              variant="outline" 
              :class="{ 'border-primary': JSON.stringify(themeStore.config) === JSON.stringify(themePresets.minimal) }"
              @click="loadPreset('minimal')"
            >
              简约主题
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- 操作按钮 -->
    <div class="flex justify-between">
      <Button variant="outline" @click="resetTheme">
        <el-icon class="mr-2"><RefreshLeft /></el-icon>
        重置为默认
      </Button>
      
      <div class="space-x-2">
        <Button variant="outline" @click="exportTheme">
          <el-icon class="mr-2"><Download /></el-icon>
          导出主题
        </Button>
        <Button @click="importTheme">
          <el-icon class="mr-2"><Upload /></el-icon>
          导入主题
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import {
  Sunny,
  Moon,
  Monitor,
  Check,
  RefreshLeft,
  Download,
  Upload
} from '@element-plus/icons-vue'
import { useThemeStore, themeColors, themePresets } from '@/stores/theme'
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import type { ThemeMode, ThemeColor } from '@/stores/theme'

const themeStore = useThemeStore()
const customColor = ref('#3b82f6')

const availableColors = [
  { name: '蓝色', value: 'blue' as ThemeColor },
  { name: '绿色', value: 'green' as ThemeColor },
  { name: '紫色', value: 'purple' as ThemeColor },
  { name: '橙色', value: 'orange' as ThemeColor },
  { name: '红色', value: 'red' as ThemeColor }
]

const setTheme = (theme: ThemeMode) => {
  themeStore.setThemeMode(theme)
  ElMessage.success(`已切换到${theme === 'light' ? '浅色' : theme === 'dark' ? '深色' : '自动'}模式`)
}

const setPrimaryColor = (color: ThemeColor) => {
  themeStore.setThemeColor(color)
  ElMessage.success('主题色已更新')
}

const loadPreset = (presetName: keyof typeof themePresets) => {
  themeStore.loadPreset(presetName)
  ElMessage.success(`已加载${presetName === 'default' ? '默认' : presetName === 'dark' ? '深色' : '简约'}主题预设`)
}

const resetTheme = () => {
  themeStore.resetTheme()
  ElMessage.success('主题已重置为默认设置')
}

const exportTheme = () => {
  const themeConfig = themeStore.exportTheme()
  
  const blob = new Blob([JSON.stringify(themeConfig, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'theme-config.json'
  a.click()
  URL.revokeObjectURL(url)
  
  ElMessage.success('主题配置已导出')
}

const importTheme = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const config = JSON.parse(e.target?.result as string)
          themeStore.importTheme(config)
          ElMessage.success('主题配置已导入')
        } catch (error) {
          ElMessage.error('主题配置文件格式错误')
        }
      }
      reader.readAsText(file)
    }
  }
  input.click()
}
</script>