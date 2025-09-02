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
              'border-muted': themeStore.config.mode !== 'light',
            }"
            @click="setTheme('light')"
          >
            <div class="space-y-2">
              <div class="flex items-center space-x-2">
                <el-icon><Sunny /></el-icon>
                <span class="font-medium">浅色模式</span>
              </div>
              <div class="text-sm text-muted-foreground">明亮清爽的界面风格</div>
            </div>
            <div v-if="themeStore.config.mode === 'light'" class="absolute top-2 right-2">
              <el-icon class="text-primary"><Check /></el-icon>
            </div>
          </div>

          <div
            class="relative cursor-pointer rounded-lg border-2 p-4 transition-colors"
            :class="{
              'border-primary': themeStore.config.mode === 'dark',
              'border-muted': themeStore.config.mode !== 'dark',
            }"
            @click="setTheme('dark')"
          >
            <div class="space-y-2">
              <div class="flex items-center space-x-2">
                <el-icon><Moon /></el-icon>
                <span class="font-medium">深色模式</span>
              </div>
              <div class="text-sm text-muted-foreground">护眼的深色界面风格</div>
            </div>
            <div v-if="themeStore.config.mode === 'dark'" class="absolute top-2 right-2">
              <el-icon class="text-primary"><Check /></el-icon>
            </div>
          </div>

          <div
            class="relative cursor-pointer rounded-lg border-2 p-4 transition-colors"
            :class="{
              'border-primary': themeStore.config.mode === 'auto',
              'border-muted': themeStore.config.mode !== 'auto',
            }"
            @click="setTheme('auto')"
          >
            <div class="space-y-2">
              <div class="flex items-center space-x-2">
                <el-icon><Monitor /></el-icon>
                <span class="font-medium">跟随系统</span>
              </div>
              <div class="text-sm text-muted-foreground">根据系统设置自动切换</div>
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
              'border-muted': themeStore.config.color !== color.value,
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

    <!-- 组件风格 -->
    <Card>
      <CardHeader>
        <CardTitle>组件风格</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid gap-3 xs:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <div
            v-for="style in availableComponentStyles"
            :key="style.value"
            class="component-style-selector relative cursor-pointer rounded-lg border-2 p-3 sm:p-4 transition-all duration-200 hover:shadow-md group"
            :class="{
              'border-primary bg-primary/5 shadow-sm': modernThemeStore.config.componentStyle === style.value,
              'border-muted hover:border-primary/50 hover:bg-primary/2': modernThemeStore.config.componentStyle !== style.value,
            }"
            @click="setComponentStyle(style.value)"
          >
            <div class="space-y-3">
              <!-- 风格图标 -->
              <div class="flex items-center justify-center">
                <el-icon class="text-2xl text-primary/80">
                  <component :is="style.icon" />
                </el-icon>
              </div>
              
              <!-- 风格预览元素 -->
              <div class="flex items-center justify-center">
                <div class="component-style-preview">
                  <!-- 按钮预览 -->
                  <div 
                    class="preview-button transition-all duration-200"
                    :class="getButtonPreviewClasses(style.value)"
                  >
                    <div class="w-2 h-2 bg-current rounded-full opacity-60"></div>
                  </div>
                  
                  <!-- 卡片预览 -->
                  <div 
                    class="preview-card transition-all duration-200 ml-2"
                    :class="getCardPreviewClasses(style.value)"
                  >
                    <div class="w-full h-1 bg-current opacity-20 mb-1" :class="getStyleShapeClasses(style.value)"></div>
                    <div class="w-3/4 h-1 bg-current opacity-15" :class="getStyleShapeClasses(style.value)"></div>
                  </div>
                </div>
              </div>
              
              <!-- 风格名称 -->
              <div class="text-center">
                <div class="text-sm font-medium text-foreground">{{ style.name }}</div>
                <div class="text-xs text-muted-foreground mt-1">{{ style.description }}</div>
                
                <!-- 特性标签 -->
                <div class="flex flex-wrap justify-center gap-1 mt-2">
                  <span 
                    v-for="feature in style.features" 
                    :key="feature"
                    class="feature-tag text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
                  >
                    {{ feature }}
                  </span>
                </div>
              </div>
            </div>
            
            <!-- 选中标识 -->
            <div v-if="modernThemeStore.config.componentStyle === style.value" class="absolute top-2 right-2">
              <el-icon class="text-primary text-sm"><Check /></el-icon>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- iOS 风格效果设置 -->
    <Card>
      <CardHeader>
        <CardTitle>🎆 iOS 风格效果</CardTitle>
        <p class="text-sm text-muted-foreground">添加经典的 iOS 毛玻璃效果和交互动效</p>
      </CardHeader>
      <CardContent class="space-y-6">
        <!-- 毛玻璃强度设置 -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium">毛玻璃效果</div>
              <div class="text-sm text-muted-foreground">调整毛玻球模糊强度</div>
            </div>
            <el-switch 
              v-model="modernThemeStore.config.enableBlur" 
              @change="modernThemeStore.updateConfig({ enableBlur: $event })"
            />
          </div>
          
          <div v-if="modernThemeStore.config.enableBlur" class="space-y-2">
            <label class="text-sm font-medium">模糊强度</label>
            <div class="grid gap-2 grid-cols-4">
              <Button
                v-for="intensity in glassIntensityOptions"
                :key="intensity.value"
                :variant="modernThemeStore.config.glassIntensity === intensity.value ? 'default' : 'outline'"
                size="sm"
                @click="setGlassIntensity(intensity.value)"
                class="flex flex-col gap-1 h-auto py-2"
              >
                <div class="text-xs font-medium">{{ intensity.name }}</div>
                <div class="w-full h-2 rounded-full border opacity-60" :class="getGlassPreviewClass(intensity.value)"></div>
                <div class="text-xs text-muted-foreground">{{ intensity.description }}</div>
              </Button>
            </div>
          </div>
        </div>

        <!-- 交互反馈设置 -->
        <div class="space-y-3">
          <div>
            <div class="font-medium">交互反馈</div>
            <div class="text-sm text-muted-foreground">设置组件交互的动效强度</div>
          </div>
          
          <div class="grid gap-2 grid-cols-2 md:grid-cols-4">
            <Button
              v-for="feedback in interactionFeedbackOptions"
              :key="feedback.value"
              :variant="modernThemeStore.config.interactionFeedback === feedback.value ? 'default' : 'outline'"
              size="sm"
              @click="setInteractionFeedback(feedback.value)"
              class="flex flex-col gap-1 h-auto py-2"
            >
              <el-icon class="text-lg"><component :is="feedback.icon" /></el-icon>
              <div class="text-xs font-medium">{{ feedback.name }}</div>
              <div class="text-xs text-muted-foreground text-center">{{ feedback.description }}</div>
            </Button>
          </div>
        </div>

        <!-- 动效细节设置 -->
        <div class="space-y-4">
          <div>
            <div class="font-medium">动效细节</div>
            <div class="text-sm text-muted-foreground">自定义具体的动效行为</div>
          </div>
          
          <div class="grid gap-4 md:grid-cols-2">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-sm font-medium">弹性动画</div>
                <div class="text-xs text-muted-foreground">启用弹性缩放动效</div>
              </div>
              <el-switch 
                v-model="modernThemeStore.config.enableSpringAnimations" 
                @change="modernThemeStore.toggleSpringAnimations"
              />
            </div>

            <div class="flex items-center justify-between">
              <div>
                <div class="text-sm font-medium">波纹效果</div>
                <div class="text-xs text-muted-foreground">点击时显示波纹扩散</div>
              </div>
              <el-switch 
                v-model="modernThemeStore.config.enableRippleEffect" 
                @change="modernThemeStore.toggleRippleEffect"
              />
            </div>

            <div class="flex items-center justify-between">
              <div>
                <div class="text-sm font-medium">背景效果</div>
                <div class="text-xs text-muted-foreground">启用模糊背景效果</div>
              </div>
              <el-switch 
                v-model="modernThemeStore.config.enableBackdropEffects" 
                @change="modernThemeStore.toggleBackdropEffects"
              />
            </div>

            <div class="flex items-center justify-between">
              <div>
                <div class="text-sm font-medium">视差效果</div>
                <div class="text-xs text-muted-foreground">卡片悬停时的 3D 效果</div>
              </div>
              <el-switch 
                v-model="modernThemeStore.config.enableParallax" 
                @change="modernThemeStore.toggleParallax"
              />
            </div>

            <div class="flex items-center justify-between">
              <div>
                <div class="text-sm font-medium">渐变背景</div>
                <div class="text-xs text-muted-foreground">组件使用渐变背景</div>
              </div>
              <el-switch 
                v-model="modernThemeStore.config.enableGradientBackgrounds" 
                @change="modernThemeStore.toggleGradientBackgrounds"
              />
            </div>
          </div>
        </div>

        <!-- iOS 专业预设 -->
        <div class="space-y-3">
          <div>
            <div class="font-medium">iOS 专业预设</div>
            <div class="text-sm text-muted-foreground">一键应用经典 iOS 风格设置</div>
          </div>
          
          <div class="grid gap-2 md:grid-cols-2">
            <Button
              variant="outline"
              size="sm"
              @click="applyiOSPreset('iosClassic')"
              class="flex flex-col gap-2 h-auto py-3"
            >
              <div class="text-sm font-medium">🎆 iOS 经典</div>
              <div class="text-xs text-muted-foreground text-center">
                超重毛玻璃 + 强交互 + 全效果
              </div>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              @click="applyiOSPreset('iosModern')"
              class="flex flex-col gap-2 h-auto py-3"
            >
              <div class="text-sm font-medium">🌃 iOS 现代</div>
              <div class="text-xs text-muted-foreground text-center">
                重度毛玻璃 + 现代深色 + 署触觉
              </div>
            </Button>
          </div>
        </div>

        <!-- 效果预览 -->
        <div class="space-y-3">
          <div>
            <div class="font-medium">效果预览</div>
            <div class="text-sm text-muted-foreground">预览当前 iOS 风格设置的效果</div>
          </div>
          
          <div class="ios-effect-preview p-4 rounded-lg border" :class="getPreviewClasses()">
            <div class="flex gap-3 items-center">
              <div 
                class="ios-preview-button px-4 py-2 rounded-lg cursor-pointer" 
                :class="getIOSButtonPreviewClasses()"
                @click="testInteractionFeedback"
              >
                点击测试
              </div>
              
              <div 
                class="ios-preview-card p-3 rounded-lg flex-1" 
                :class="getIOSCardPreviewClasses()"
              >
                <div class="text-sm font-medium">毛玻璃卡片</div>
                <div class="text-xs text-muted-foreground mt-1">悬停查看效果</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- 字体设置 -->
    <Card>
      <CardHeader>
        <CardTitle>🔤 字体设置</CardTitle>
        <p class="text-sm text-muted-foreground">自定义应用的字体家族、大小和粗细</p>
      </CardHeader>
      <CardContent>
        <ModernFontSelector />
      </CardContent>
    </Card>

    <!-- 背景设置 -->
    <Card>
      <CardHeader>
        <CardTitle>🇫️ 背景设置</CardTitle>
        <p class="text-sm text-muted-foreground">上传自定义背景图片或选择预设背景</p>
      </CardHeader>
      <CardContent>
        <ModernBackgroundSelector />
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
            <el-switch
              v-model="themeStore.config.sidebarCollapsed"
              @change="themeStore.saveTheme"
            />
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
          <el-select
            v-model="themeStore.config.transitionName"
            @change="themeStore.saveTheme"
            class="w-full"
          >
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
              :class="{
                'border-primary':
                  JSON.stringify(themeStore.config) === JSON.stringify(themePresets.default),
              }"
              @click="loadPreset('default')"
            >
              默认主题
            </Button>
            <Button
              variant="outline"
              :class="{
                'border-primary':
                  JSON.stringify(themeStore.config) === JSON.stringify(themePresets.dark),
              }"
              @click="loadPreset('dark')"
            >
              深色主题
            </Button>
            <Button
              variant="outline"
              :class="{
                'border-primary':
                  JSON.stringify(themeStore.config) === JSON.stringify(themePresets.minimal),
              }"
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
// import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Sunny, Moon, Monitor, Check, RefreshLeft, Download, Upload, 
  MagicStick, Trophy, Minus, CirclePlus, SwitchButton } from '@element-plus/icons-vue'
import { useThemeStore, themeColors, themePresets } from '@/stores/theme'
import { useModernThemeStore } from '@/stores/modern-theme'
import { Button, Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { ModernFontSelector, ModernBackgroundSelector } from '@/components/ui'
import type { ThemeMode, ThemeColor } from '@/stores/theme'
import type { ComponentStyle, GlassIntensity, InteractionFeedback } from '@/stores/modern-theme'

const themeStore = useThemeStore()
const modernThemeStore = useModernThemeStore()

// iOS 风格选项数据
const glassIntensityOptions = [
  { 
    label: '轻度', 
    name: '轻度',
    value: 'light' as GlassIntensity, 
    description: '轻微模糊效果' 
  },
  { 
    label: '中度', 
    name: '中度',
    value: 'medium' as GlassIntensity, 
    description: '标准模糊效果' 
  },
  { 
    label: '重度', 
    name: '重度',
    value: 'heavy' as GlassIntensity, 
    description: '强烈模糊效果' 
  },
  { 
    label: '极重', 
    name: '极重',
    value: 'ultra' as GlassIntensity, 
    description: '极强模糊效果' 
  }
]

const interactionFeedbackOptions = [
  { 
    label: '无反馈', 
    name: '无反馈',
    value: 'none' as InteractionFeedback, 
    description: '关闭交互反馈',
    icon: Minus
  },
  { 
    label: '轻微', 
    name: '轻微',
    value: 'minimal' as InteractionFeedback, 
    description: '轻微交互反馈',
    icon: CirclePlus
  },
  { 
    label: '标准', 
    name: '标准',
    value: 'standard' as InteractionFeedback, 
    description: '标准交互反馈',
    icon: Check
  },
  { 
    label: '增强', 
    name: '增强',
    value: 'enhanced' as InteractionFeedback, 
    description: '增强交互反馈',
    icon: MagicStick
  }
]

const availableColors = [
  { name: '蓝色', value: 'blue' as ThemeColor },
  { name: '绿色', value: 'green' as ThemeColor },
  { name: '紫色', value: 'purple' as ThemeColor },
  { name: '橙色', value: 'orange' as ThemeColor },
  { name: '红色', value: 'red' as ThemeColor },
]

const availableComponentStyles = [
  {
    name: '现代风格',
    value: 'modern' as ComponentStyle,
    description: '清晰流畅的现代设计',
    icon: MagicStick,
    features: ['中等圆角', '清晰阴影', '流畅动画']
  },
  {
    name: '经典风格', 
    value: 'classic' as ComponentStyle,
    description: '传统稳重的经典设计',
    icon: Trophy,
    features: ['小圆角', '精细边框', '稳重感']
  },
  {
    name: '简约风格',
    value: 'minimal' as ComponentStyle, 
    description: '极简主义的纯净设计',
    icon: Minus,
    features: ['无圆角', '极简边框', '纯净美学']
  },
  {
    name: '圆润风格',
    value: 'rounded' as ComponentStyle,
    description: '圆润柔和的可爱设计',
    icon: CirclePlus,
    features: ['大圆角', '柔和阴影', '可爱风格']
  },
  {
    name: '锐利风格',
    value: 'sharp' as ComponentStyle,
    description: '锐利明确的工业设计',
    icon: SwitchButton,
    features: ['无圆角', '加粗边框', '精确线条']
  }
]

const setTheme = (theme: ThemeMode) => {
  // 同时设置两个主题store的模式
  themeStore.setThemeMode(theme)
  modernThemeStore.setMode(theme)
  ElMessage.success(
    `已切换到${theme === 'light' ? '浅色' : theme === 'dark' ? '深色' : '自动'}模式`
  )
}

const setPrimaryColor = (color: ThemeColor) => {
  themeStore.setThemeColor(color)
  ElMessage.success('主题色已更新')
}

const setComponentStyle = (style: ComponentStyle) => {
  modernThemeStore.setComponentStyle(style)
  ElMessage.success(`已切换到${getStyleName(style)}`)
}

const getStyleName = (style: ComponentStyle): string => {
  const styleMap = {
    'modern': '现代风格',
    'classic': '经典风格', 
    'minimal': '简约风格',
    'rounded': '圆润风格',
    'sharp': '锐利风格'
  }
  return styleMap[style]
}

const getButtonPreviewClasses = (style: ComponentStyle): string => {
  const baseClasses = 'w-8 h-6 bg-primary/80 flex items-center justify-center text-white text-xs'
  const styleClasses = {
    'modern': 'rounded-md shadow-sm',
    'classic': 'rounded-sm border border-primary/20',
    'minimal': 'rounded-none',
    'rounded': 'rounded-full shadow-md',
    'sharp': 'rounded-none border-2 border-primary/40'
  }
  return `${baseClasses} ${styleClasses[style]}`
}

const getCardPreviewClasses = (style: ComponentStyle): string => {
  const baseClasses = 'w-10 h-6 bg-background border p-1'
  const styleClasses = {
    'modern': 'rounded-lg border-border shadow-sm',
    'classic': 'rounded border-gray-300',
    'minimal': 'rounded-none border-gray-200',
    'rounded': 'rounded-xl border-border shadow-md',
    'sharp': 'rounded-none border-2 border-gray-400'
  }
  return `${baseClasses} ${styleClasses[style]}`
}

const getStyleShapeClasses = (style: ComponentStyle): string => {
  const shapeMap = {
    'modern': 'rounded-sm',
    'classic': 'rounded-xs',
    'minimal': 'rounded-none',
    'rounded': 'rounded-full',
    'sharp': 'rounded-none'
  }
  return shapeMap[style]
}

// iOS 风格效果相关方法
const setGlassIntensity = (intensity: GlassIntensity) => {
  modernThemeStore.setGlassIntensity(intensity)
  ElMessage.success(`毛玻璃强度已设置为${getGlassIntensityLabel(intensity)}`)
}

const setInteractionFeedback = (feedback: InteractionFeedback) => {
  modernThemeStore.setInteractionFeedback(feedback)
  ElMessage.success(`交互反馈已设置为${getInteractionFeedbackLabel(feedback)}`)
}

const toggleSpringAnimations = () => {
  modernThemeStore.toggleSpringAnimations()
  const status = modernThemeStore.config.enableSpringAnimations ? '开启' : '关闭'
  ElMessage.success(`弹性动画已${status}`)
}

const toggleRippleEffect = () => {
  modernThemeStore.toggleRippleEffect()
  const status = modernThemeStore.config.enableRippleEffect ? '开启' : '关闭'
  ElMessage.success(`波纹效果已${status}`)
}

const toggleBackdropEffects = () => {
  modernThemeStore.toggleBackdropEffects()
  const status = modernThemeStore.config.enableBackdropEffects ? '开启' : '关闭'
  ElMessage.success(`背景效果已${status}`)
}

const toggleParallax = () => {
  modernThemeStore.toggleParallax()
  const status = modernThemeStore.config.enableParallax ? '开启' : '关闭'
  ElMessage.success(`视差效果已${status}`)
}

const applyiOSClassicPreset = () => {
  modernThemeStore.applyPreset('iosClassic')
  ElMessage.success('已应用 iOS 经典风格预设')
}

const applyiOSModernPreset = () => {
  modernThemeStore.applyPreset('iosModern')
  ElMessage.success('已应用 iOS 现代风格预设')
}

const testInteractionFeedback = () => {
  // 模拟交互反馈测试
  const feedback = modernThemeStore.config.interactionFeedback
  ElMessage.info(`测试 ${getInteractionFeedbackLabel(feedback)} 交互反馈`)
  
  // 添加视觉反馈动画
  const preview = document.querySelector('.ios-effects-preview')
  if (preview) {
    preview.classList.add(`ios-spring`)
    setTimeout(() => {
      preview.classList.remove(`ios-spring`)
    }, 500)
  }
}

// 获取标签的辅助方法
const getGlassIntensityLabel = (intensity: GlassIntensity): string => {
  return glassIntensityOptions.find(option => option.value === intensity)?.label || intensity
}

const getInteractionFeedbackLabel = (feedback: InteractionFeedback): string => {
  return interactionFeedbackOptions.find(option => option.value === feedback)?.label || feedback
}

// 计算预览效果的类名
const getPreviewEffectClasses = () => {
  const classes = ['ios-effects-preview', 'ios-glass-card', 'ios-interactive']
  
  // 添加毛玻璃强度类
  classes.push(`glass-${modernThemeStore.config.glassIntensity}`)
  
  // 添加交互反馈类
  classes.push(`interaction-${modernThemeStore.config.interactionFeedback}`)
  
  // 添加动效类
  if (modernThemeStore.config.enableSpringAnimations) {
    classes.push('enable-spring')
  }
  if (modernThemeStore.config.enableRippleEffect) {
    classes.push('enable-ripple')
  }
  if (modernThemeStore.config.enableBackdropEffects) {
    classes.push('enable-backdrop')
  }
  if (modernThemeStore.config.enableParallax) {
    classes.push('enable-parallax')
  }
  
  return classes.join(' ')
}

// iOS 效果预览相关方法
const getPreviewClasses = () => {
  return getPreviewEffectClasses()
}

const getIOSButtonPreviewClasses = () => {
  const classes = ['ios-glass-button', 'ios-interactive']
  
  // 添加毛玻璃强度类
  classes.push(`glass-${modernThemeStore.config.glassIntensity}`)
  
  // 添加交互反馈类
  classes.push(`interaction-${modernThemeStore.config.interactionFeedback}`)
  
  return classes.join(' ')
}

const getIOSCardPreviewClasses = () => {
  const classes = ['ios-glass-card', 'ios-interactive']
  
  // 添加毛玻璃强度类
  classes.push(`glass-${modernThemeStore.config.glassIntensity}`)
  
  // 添加交互反馈类
  classes.push(`interaction-${modernThemeStore.config.interactionFeedback}`)
  
  return classes.join(' ')
}

const getGlassPreviewClass = (intensity: GlassIntensity): string => {
  const classMap = {
    light: 'border-gray-200 bg-gray-50',
    medium: 'border-gray-300 bg-gray-100', 
    heavy: 'border-gray-400 bg-gray-200',
    ultra: 'border-gray-500 bg-gray-300'
  }
  return classMap[intensity]
}

// 修正预设应用方法名
const applyiOSPreset = (presetType: string) => {
  if (presetType === 'iosClassic') {
    applyiOSClassicPreset()
  } else if (presetType === 'iosModern') {
    applyiOSModernPreset()
  }
}

const loadPreset = (presetName: keyof typeof themePresets) => {
  themeStore.loadPreset(presetName)
  ElMessage.success(
    `已加载${presetName === 'default' ? '默认' : presetName === 'dark' ? '深色' : '简约'}主题预设`
  )
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
  input.onchange = e => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = e => {
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

<style scoped>
.component-style-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 6px;
  min-height: 32px;
  transition: all 0.2s ease;
}

.preview-button {
  transition: all 0.2s ease;
}

.preview-card {
  transition: all 0.2s ease;
}

.dark .component-style-preview {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
}

/* 组件风格选择器的悬停效果 */
.component-style-selector:hover .preview-button {
  transform: scale(1.05);
}

.component-style-selector:hover .preview-card {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.component-style-selector:hover .component-style-preview {
  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
}

.dark .component-style-selector:hover .component-style-preview {
  background: linear-gradient(135deg, #334155 0%, #1e293b 100%);
}

/* 选中状态的动画效果 */
.component-style-selector.selected .component-style-preview {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  transform: scale(1.02);
}

.dark .component-style-selector.selected .component-style-preview {
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
}

/* 响应式设计 */
@media (max-width: 640px) {
  .component-style-preview {
    min-height: 28px;
    padding: 4px;
  }
  
  .preview-button {
    width: 6px;
    height: 4px;
  }
  
  .preview-card {
    width: 8px;
    height: 4px;
  }
}

@media (min-width: 1024px) {
  .component-style-preview {
    min-height: 36px;
    padding: 8px;
  }
}

/* 特性标签的响应式设计 */
@media (max-width: 768px) {
  .feature-tag {
    font-size: 10px;
    padding: 1px 6px;
  }
}

/* 动画组合 */
.component-style-selector {
  transform-origin: center;
}

.component-style-selector:active {
  transform: scale(0.98);
}

.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

/* 无障碍支持 */
.component-style-selector:focus {
  outline: 2px solid rgba(59, 130, 246, 0.5);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .component-style-selector,
  .preview-button,
  .preview-card,
  .component-style-preview {
    transition: none;
  }
  
  .component-style-selector:hover .preview-button,
  .component-style-selector:hover .preview-card {
    transform: none;
  }
}
</style>
