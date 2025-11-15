<template>
  <ModernAppLayout
    app-title="现代流畅设计演示"
    :show-sidebar-toggle="true"
    :show-tab-bar="false"
    :navigation-sections="navigationSections"
    :global-loading="loading"
    loading-text="加载组件演示..."
    :notification="notification"
    @sidebar-item-click="handleSidebarClick"
    @notification-close="clearNotification"
  >
    <template #navigation-trailing>
      <ModernButton
        type="plain"
        size="small"
        @click="toggleTheme"
      >
        <component :is="themeIcon" class="w-5 h-5" />
      </ModernButton>
    </template>

    <div class="modern-demo-page">
      <div class="modern-demo-header">
        <h1 class="modern-typography-large-title">现代流畅设计系统</h1>
        <p class="modern-typography-body modern-demo-subtitle">
          基于清晰、服从、深度三大原则的现代组件库演示
        </p>
      </div>

      <!-- 按钮组件演示 -->
      <ModernCard variant="elevated" class="modern-demo-section">
        <template #header>
          <h2 class="modern-typography-title-2">按钮组件</h2>
          <p class="modern-typography-footnote modern-demo-description">
            当前风格：{{ getCurrentStyleDescription() }}
          </p>
          <div class="mt-4 p-4 border border-border rounded-lg bg-muted/20">
            <h4 class="text-sm font-medium mb-2">风格效果预览：</h4>
            <div class="flex gap-2 flex-wrap">
              <button class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                ShadcnUI 按钮
              </button>
              <button class="px-4 py-2 border border-input rounded-md hover:bg-accent">
                描边按钮
              </button>
              <div class="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm">
                次要按钮
              </div>
            </div>
          </div>
        </template>

        <div class="modern-demo-grid">
          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">基础按钮</h3>
            <div class="modern-demo-buttons">
              <ModernButton type="primary">主要按钮</ModernButton>
              <ModernButton type="secondary">次要按钮</ModernButton>
              <ModernButton type="destructive">危险按钮</ModernButton>
              <ModernButton type="plain">朴素按钮</ModernButton>
            </div>
          </div>

          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">按钮尺寸</h3>
            <div class="modern-demo-buttons">
              <ModernButton size="small">小按钮</ModernButton>
              <ModernButton size="medium">中按钮</ModernButton>
              <ModernButton size="large">大按钮</ModernButton>
            </div>
          </div>

          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">按钮状态</h3>
            <div class="modern-demo-buttons">
              <ModernButton :loading="buttonLoading" @click="simulateLoading">
                {{ buttonLoading ? '加载中' : '点击加载' }}
              </ModernButton>
              <ModernButton disabled>禁用按钮</ModernButton>
              <ModernButton rounded>圆角按钮</ModernButton>
            </div>
          </div>
        </div>
      </ModernCard>

      <!-- 卡片组件演示 -->
      <ModernCard variant="elevated" class="modern-demo-section">
        <template #header>
          <h2 class="modern-typography-title-2">卡片组件</h2>
          <p class="modern-typography-footnote modern-demo-description">
            多种变体和交互效果的卡片组件
          </p>
        </template>

        <div class="modern-demo-grid">
          <ModernCard variant="elevated" padding="md">
            <h3 class="modern-typography-headline">悬浮卡片</h3>
            <p class="modern-typography-body">带有阴影效果的悬浮卡片</p>
          </ModernCard>

          <ModernCard variant="outlined" padding="md">
            <h3 class="modern-typography-headline">边框卡片</h3>
            <p class="modern-typography-body">带有边框的简洁卡片</p>
          </ModernCard>

          <ModernCard variant="filled" padding="md">
            <h3 class="modern-typography-headline">填充卡片</h3>
            <p class="modern-typography-body">带有背景填充的卡片</p>
          </ModernCard>

          <ModernCard variant="grouped" padding="md" interactive @click="handleCardClick">
<template>
  <ModernAppLayout
    app-title="现代流畅设计演示"
    :show-sidebar-toggle="true"
    :show-tab-bar="false"
    :navigation-sections="navigationSections"
    :global-loading="loading"
    loading-text="加载组件演示..."
    :notification="notification"
    @sidebar-item-click="handleSidebarClick"
    @notification-close="clearNotification"
  >
    <template #navigation-trailing>
      <ModernButton
        type="plain"
        size="small"
        @click="toggleTheme"
      >
        <component :is="themeIcon" class="w-5 h-5" />
      </ModernButton>
    </template>

    <div class="modern-demo-page">
      <div class="modern-demo-header">
        <h1 class="modern-typography-large-title">现代流畅设计系统</h1>
        <p class="modern-typography-body modern-demo-subtitle">
          基于清晰、服从、深度三大原则的现代组件库演示
        </p>
      </div>

      <!-- 按钮组件演示 -->
      <ModernCard variant="elevated" class="modern-demo-section">
        <template #header>
          <h2 class="modern-typography-title-2">按钮组件</h2>
          <p class="modern-typography-footnote modern-demo-description">
            多种类型和状态的现代按钮组件
          </p>
        </template>

        <div class="modern-demo-grid">
          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">基础按钮</h3>
            <div class="modern-demo-buttons">
              <ModernButton type="primary">主要按钮</ModernButton>
              <ModernButton type="secondary">次要按钮</ModernButton>
              <ModernButton type="destructive">危险按钮</ModernButton>
              <ModernButton type="plain">朴素按钮</ModernButton>
            </div>
          </div>

          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">按钮尺寸</h3>
            <div class="modern-demo-buttons">
              <ModernButton size="small">小按钮</ModernButton>
              <ModernButton size="medium">中按钮</ModernButton>
              <ModernButton size="large">大按钮</ModernButton>
            </div>
          </div>

          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">按钮状态</h3>
            <div class="modern-demo-buttons">
              <ModernButton :loading="buttonLoading" @click="simulateLoading">
                {{ buttonLoading ? '加载中' : '点击加载' }}
              </ModernButton>
              <ModernButton disabled>禁用按钮</ModernButton>
              <ModernButton rounded>圆角按钮</ModernButton>
            </div>
          </div>
        </div>
      </ModernCard>

      <!-- 卡片组件演示 -->
      <ModernCard variant="elevated" class="modern-demo-section">
        <template #header>
          <h2 class="modern-typography-title-2">卡片组件</h2>
          <p class="modern-typography-footnote modern-demo-description">
            多种变体和交互效果的卡片组件
          </p>
        </template>

        <div class="modern-demo-grid">
          <ModernCard variant="elevated" padding="md">
            <h3 class="modern-typography-headline">悬浮卡片</h3>
            <p class="modern-typography-body">带有阴影效果的悬浮卡片</p>
          </ModernCard>

          <ModernCard variant="outlined" padding="md">
            <h3 class="modern-typography-headline">边框卡片</h3>
            <p class="modern-typography-body">带有边框的简洁卡片</p>
          </ModernCard>

          <ModernCard variant="filled" padding="md">
            <h3 class="modern-typography-headline">填充卡片</h3>
            <p class="modern-typography-body">带有背景填充的卡片</p>
          </ModernCard>

          <ModernCard variant="grouped" padding="md" interactive @click="handleCardClick">
            <h3 class="modern-typography-headline">交互卡片</h3>
            <p class="modern-typography-body">可点击的交互式卡片</p>
          </ModernCard>
        </div>
      </ModernCard>

      <!-- 字体系统演示 */\n      <ModernCard variant=\"elevated\" class=\"modern-demo-section\">\n        <template #header>\n          <h2 class=\"modern-typography-title-2\">字体系统</h2>\n          <p class=\"modern-typography-footnote modern-demo-description\">\n            现代流畅的字体层级系统\n          </p>\n        </template>\n\n        <div class=\"modern-demo-typography\">\n          <div class=\"modern-typography-large-title\">大标题 - Large Title</div>\n          <div class=\"modern-typography-title-1\">标题 1 - Title 1</div>\n          <div class=\"modern-typography-title-2\">标题 2 - Title 2</div>\n          <div class=\"modern-typography-title-3\">标题 3 - Title 3</div>\n          <div class=\"modern-typography-headline\">标题 - Headline</div>\n          <div class=\"modern-typography-body\">正文 - Body</div>\n          <div class=\"modern-typography-callout\">说明文字 - Callout</div>\n          <div class=\"modern-typography-subheadline\">子标题 - Subheadline</div>\n          <div class=\"modern-typography-footnote\">脚注 - Footnote</div>\n          <div class=\"modern-typography-caption-1\">说明 1 - Caption 1</div>\n          <div class=\"modern-typography-caption-2\">说明 2 - Caption 2</div>\n        </div>\n      </ModernCard>\n\n      <!-- 主题控制演示 -->\n      <ModernCard variant=\"elevated\" class=\"modern-demo-section\">\n        <template #header>\n          <h2 class=\"modern-typography-title-2\">主题控制</h2>\n          <p class=\"modern-typography-footnote modern-demo-description\">\n            现代主题系统控制面板\n          </p>\n        </template>\n\n        <div class=\"modern-demo-theme-controls\">\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">主题模式</h3>\n            <div class=\"modern-demo-buttons\">\n              <ModernButton \n                :type=\"modernThemeStore.config.mode === 'light' ? 'primary' : 'secondary'\"\n                size=\"small\"\n                @click=\"setThemeMode('light')\"\n              >\n                浅色\n              </ModernButton>\n              <ModernButton \n                :type=\"modernThemeStore.config.mode === 'dark' ? 'primary' : 'secondary'\"\n                size=\"small\"\n                @click=\"setThemeMode('dark')\"\n              >\n                深色\n              </ModernButton>\n              <ModernButton \n                :type=\"modernThemeStore.config.mode === 'auto' ? 'primary' : 'secondary'\"\n                size=\"small\"\n                @click=\"setThemeMode('auto')\"\n              >\n                自动\n              </ModernButton>\n            </div>\n          </div>\n\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">主题色彩</h3>\n            <div class=\"modern-demo-color-palette\">\n              <button\n                v-for=\"color in themeColors\"\n                :key=\"color.name\"\n                :class=\"getColorButtonClasses(color.name)\"\n                :style=\"{ backgroundColor: color.value }\"\n                @click=\"setThemeColor(color.name)\"\n              >\n                <Check v-if=\"modernThemeStore.config.color === color.name\" class=\"w-4 h-4 text-white\" />\n              </button>\n            </div>\n          </div>\n\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">组件风格</h3>\n            <div class=\"modern-demo-buttons\">\n              <ModernButton \n                v-for="style in componentStyles"\n                :key="style.value"\n                :type="modernThemeStore.config.componentStyle === style.value ? 'primary' : 'secondary'"\n                size="small"\n                @click="setComponentStyle(style.value)"\n              >\n                {{ style.name }}\n              </ModernButton>\n            </div>\n            <p class=\"modern-typography-footnote modern-demo-description\">\n              当前风格：{{ getCurrentStyleDescription() }}\n            </p>\n          </div>\n\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">界面选项</h3>\n            <div class=\"modern-demo-toggles\">\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.enableAnimations\"\n                  @change=\"toggleAnimations\"\n                >\n                <span>启用动画</span>\n              </label>\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.enableBlur\"\n                  @change=\"toggleBlur\"\n                >\n                <span>启用模糊效果</span>\n              </label>\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.compactMode\"\n                  @change=\"toggleCompactMode\"\n                >\n                <span>紧凑模式</span>\n              </label>\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.reducedMotion\"\n                  @change=\"toggleReducedMotion\"\n                >\n                <span>减少动画</span>\n              </label>\n            </div>\n          </div>\n        </div>\n      </ModernCard>\n    </div>\n  </ModernAppLayout>\n</template>\n\n<script setup lang=\"ts\">\nimport { ref, computed, onMounted } from 'vue'\nimport { Sun, Moon, Check, Home, Palette, Settings, Layers } from 'lucide-vue-next'\nimport { useModernThemeStore } from '@/stores/modern-theme'\nimport type { ModernThemeMode, ModernThemeColor, ComponentStyle } from '@/stores/modern-theme'\nimport ModernAppLayout from '@/components/layout/modern-app-layout.vue'\nimport { ModernButton, ModernCard } from '@/components/ui'\n\nconst modernThemeStore = useModernThemeStore()\n\n// 状态\nconst loading = ref(false)\nconst buttonLoading = ref(false)\nconst notification = ref<any>(null)\n\n// 导航配置\nconst navigationSections = [\n  {\n    id: 'main',\n    title: '主要功能',\n    items: [\n      { id: 'dashboard', label: '仪表盘', icon: Home, to: '/dashboard' },\n      { id: 'components', label: '组件演示', icon: Layers, to: '/components' },\n      { id: 'theme', label: '主题设置', icon: Palette, to: '/theme' },\n      { id: 'settings', label: '设置', icon: Settings, to: '/settings' }\n    ]\n  }\n]\n\n// 主题色彩选项\nconst themeColors = [\n  { name: 'blue', value: '#007AFF' },\n  { name: 'green', value: '#34C759' },\n  { name: 'purple', value: '#AF52DE' },\n  { name: 'orange', value: '#FF9500' },\n  { name: 'red', value: '#FF3B30' },\n  { name: 'pink', value: '#FF2D92' },\n  { name: 'indigo', value: '#5856D6' },\n  { name: 'teal', value: '#5AC8FA' }\n]\n\n// 组件风格选项\nconst componentStyles = [\n  { name: '现代', value: 'modern' as ComponentStyle, description: '清晰流畅的现代设计' },\n  { name: '经典', value: 'classic' as ComponentStyle, description: '传统稳重的经典设计' },\n  { name: '简约', value: 'minimal' as ComponentStyle, description: '极简主义的纯净设计' },\n  { name: '圆润', value: 'rounded' as ComponentStyle, description: '圆润柔和的可爱设计' },\n  { name: '锐利', value: 'sharp' as ComponentStyle, description: '锐利明确的工业设计' }\n]\n\n// 计算属性\nconst themeIcon = computed(() => {\n  return modernThemeStore.isDark ? Sun : Moon\n})\n\n// 方法\nconst toggleTheme = () => {\n  modernThemeStore.toggleMode()\n}\n\nconst setThemeMode = (mode: ModernThemeMode) => {\n  modernThemeStore.setMode(mode)\n}\n\nconst setThemeColor = (color: ModernThemeColor) => {\n  modernThemeStore.setColor(color)\n}\n\nconst getColorButtonClasses = (colorName: string) => [\n  'modern-demo-color-button',\n  {\n    'modern-demo-color-button--active': modernThemeStore.config.color === colorName\n  }\n]\n\nconst toggleAnimations = () => {\n  modernThemeStore.updateConfig({ \n    enableAnimations: !modernThemeStore.config.enableAnimations \n  })\n}\n\nconst toggleBlur = () => {\n  modernThemeStore.updateConfig({ \n    enableBlur: !modernThemeStore.config.enableBlur \n  })\n}\n\nconst toggleCompactMode = () => {\n  modernThemeStore.updateConfig({ \n    compactMode: !modernThemeStore.config.compactMode \n  })\n}\n\nconst toggleReducedMotion = () => {\n  modernThemeStore.updateConfig({ \n    reducedMotion: !modernThemeStore.config.reducedMotion \n  })\n}\n\nconst setComponentStyle = (style: ComponentStyle) => {\n  modernThemeStore.setComponentStyle(style)\n  showNotification('success', '风格已切换', `已切换到${getStyleName(style)}`)\n}\n\nconst getStyleName = (style: ComponentStyle): string => {\n  const styleMap = {\n    'modern': '现代风格',
    'classic': '经典风格', \n    'minimal': '简约风格',
    'rounded': '圆润风格',
    'sharp': '锐利风格'
  }\n  return styleMap[style]\n}\n\nconst getCurrentStyleDescription = (): string => {\n  const currentStyle = componentStyles.find(s => s.value === modernThemeStore.config.componentStyle)\n  return currentStyle?.description || '现代设计'\n}\n\nconst simulateLoading = () => {\n  buttonLoading.value = true\n  setTimeout(() => {\n    buttonLoading.value = false\n    showNotification('success', '加载完成', '按钮加载演示完成')\n  }, 2000)\n}\n\nconst handleCardClick = () => {\n  showNotification('info', '卡片点击', '您点击了交互式卡片')\n}\n\nconst handleSidebarClick = (item: any) => {\n  console.log('Sidebar item clicked:', item)\n}\n\nconst showNotification = (type: string, title: string, message: string) => {\n  notification.value = {\n    id: Date.now().toString(),\n    type,\n    title,\n    message,\n    duration: 3000\n  }\n  \n  setTimeout(() => {\n    notification.value = null\n  }, 3000)\n}\n\nconst clearNotification = () => {\n  notification.value = null\n}\n\n// 初始化\nonMounted(() => {\n  // 模拟初始加载\n  loading.value = true\n  setTimeout(() => {\n    loading.value = false\n    showNotification('success', '欢迎使用', '现代流畅设计系统加载完成')\n  }, 1500)\n})\n</script>\n\n<style scoped>\n.modern-demo-page {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: var(--modern-spacing-md);\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-xl);\n}\n\n.modern-demo-header {\n  text-align: center;\n  padding: var(--modern-spacing-xl) 0;\n}\n\n.modern-demo-subtitle {\n  color: var(--modern-text-secondary);\n  margin-top: var(--modern-spacing-md);\n  max-width: 600px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.modern-demo-section {\n  width: 100%;\n}\n\n.modern-demo-description {\n  color: var(--modern-text-tertiary);\n  margin-top: var(--modern-spacing-xs);\n}\n\n.modern-demo-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: var(--modern-spacing-lg);\n}\n\n.modern-demo-group {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-md);\n}\n\n.modern-demo-buttons {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--modern-spacing-sm);\n}\n\n.modern-demo-typography {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-md);\n}\n\n.modern-demo-theme-controls {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-xl);\n}\n\n.modern-demo-color-palette {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--modern-spacing-sm);\n}\n\n.modern-demo-color-button {\n  width: 40px;\n  height: 40px;\n  border-radius: var(--modern-radius-md);\n  border: 2px solid transparent;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all var(--modern-duration-fast) var(--modern-easing-ease);\n}\n\n.modern-demo-color-button:hover {\n  transform: scale(1.1);\n  box-shadow: var(--modern-shadow-md);\n}\n\n.modern-demo-color-button--active {\n  border-color: var(--modern-text-primary);\n  box-shadow: var(--modern-shadow-lg);\n}\n\n.modern-demo-toggles {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-md);\n}\n\n.modern-demo-toggle {\n  display: flex;\n  align-items: center;\n  gap: var(--modern-spacing-sm);\n  cursor: pointer;\n  font-size: var(--modern-font-size-body);\n  color: var(--modern-text-primary);\n}\n\n.modern-demo-toggle input[type=\"checkbox\"] {\n  width: 20px;\n  height: 20px;\n  border-radius: var(--modern-radius-xs);\n  border: 2px solid var(--modern-divider);\n  appearance: none;\n  cursor: pointer;\n  position: relative;\n  transition: all var(--modern-duration-fast) var(--modern-easing-ease);\n}\n\n.modern-demo-toggle input[type=\"checkbox\"]:checked {\n  background: var(--modern-primary-blue);\n  border-color: var(--modern-primary-blue);\n}\n\n.modern-demo-toggle input[type=\"checkbox\"]:checked::after {\n  content: '';\n  position: absolute;\n  top: 2px;\n  left: 6px;\n  width: 4px;\n  height: 8px;\n  border: solid white;\n  border-width: 0 2px 2px 0;\n  transform: rotate(45deg);\n}\n\n/* 响应式设计 */\n@media (max-width: 768px) {\n  .modern-demo-page {\n    padding: var(--modern-spacing-sm);\n    gap: var(--modern-spacing-lg);\n  }\n  \n  .modern-demo-grid {\n    grid-template-columns: 1fr;\n    gap: var(--modern-spacing-md);\n  }\n  \n  .modern-demo-buttons {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  \n  .modern-demo-color-palette {\n    justify-content: center;\n  }\n}\n\n/* 高对比度模式支持 */\n@media (prefers-contrast: high) {\n  .modern-demo-color-button {\n    border-width: 3px;\n  }\n}\n\n/* 减少动画偏好支持 */\n@media (prefers-reduced-motion: reduce) {\n  .modern-demo-color-button {\n    transition: none;\n  }\n  \n  .modern-demo-color-button:hover {\n    transform: none;\n  }\n  \n  .modern-demo-toggle input[type=\"checkbox\"] {\n    transition: none;\n  }\n}\n</style>", "original_text": null}]
```

```
<template>
  <ModernAppLayout
    app-title="现代流畅设计演示"
    :show-sidebar-toggle="true"
    :show-tab-bar="false"
    :navigation-sections="navigationSections"
    :global-loading="loading"
    loading-text="加载组件演示..."
    :notification="notification"
    @sidebar-item-click="handleSidebarClick"
    @notification-close="clearNotification"
  >
    <template #navigation-trailing>
      <ModernButton
        type="plain"
        size="small"
        @click="toggleTheme"
      >
        <component :is="themeIcon" class="w-5 h-5" />
      </ModernButton>
    </template>

    <div class="modern-demo-page">
      <div class="modern-demo-header">
        <h1 class="modern-typography-large-title">现代流畅设计系统</h1>
        <p class="modern-typography-body modern-demo-subtitle">
          基于清晰、服从、深度三大原则的现代组件库演示
        </p>
      </div>

      <!-- 按钮组件演示 -->
      <ModernCard variant="elevated" class="modern-demo-section">
        <template #header>
          <h2 class="modern-typography-title-2">按钮组件</h2>
          <p class="modern-typography-footnote modern-demo-description">
            多种类型和状态的现代按钮组件
          </p>
        </template>

        <div class="modern-demo-grid">
          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">基础按钮</h3>
            <div class="modern-demo-buttons">
              <ModernButton type="primary">主要按钮</ModernButton>
              <ModernButton type="secondary">次要按钮</ModernButton>
              <ModernButton type="destructive">危险按钮</ModernButton>
              <ModernButton type="plain">朴素按钮</ModernButton>
            </div>
          </div>

          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">按钮尺寸</h3>
            <div class="modern-demo-buttons">
              <ModernButton size="small">小按钮</ModernButton>
              <ModernButton size="medium">中按钮</ModernButton>
              <ModernButton size="large">大按钮</ModernButton>
            </div>
          </div>

          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">按钮状态</h3>
            <div class="modern-demo-buttons">
              <ModernButton :loading="buttonLoading" @click="simulateLoading">
                {{ buttonLoading ? '加载中' : '点击加载' }}
              </ModernButton>
              <ModernButton disabled>禁用按钮</ModernButton>
              <ModernButton rounded>圆角按钮</ModernButton>
            </div>
          </div>
        </div>
      </ModernCard>

      <!-- 卡片组件演示 -->
      <ModernCard variant="elevated" class="modern-demo-section">
        <template #header>
          <h2 class="modern-typography-title-2">卡片组件</h2>
          <p class="modern-typography-footnote modern-demo-description">
            多种变体和交互效果的卡片组件
          </p>
        </template>

        <div class="modern-demo-grid">
          <ModernCard variant="elevated" padding="md">
            <h3 class="modern-typography-headline">悬浮卡片</h3>
            <p class="modern-typography-body">带有阴影效果的悬浮卡片</p>
          </ModernCard>

          <ModernCard variant="outlined" padding="md">
            <h3 class="modern-typography-headline">边框卡片</h3>
            <p class="modern-typography-body">带有边框的简洁卡片</p>
          </ModernCard>

          <ModernCard variant="filled" padding="md">
            <h3 class="modern-typography-headline">填充卡片</h3>
            <p class="modern-typography-body">带有背景填充的卡片</p>
          </ModernCard>

          <ModernCard variant="grouped" padding="md" interactive @click="handleCardClick">
            <h3 class="modern-typography-headline">交互卡片</h3>
            <p class="modern-typography-body">可点击的交互式卡片</p>
          </ModernCard>
        </div>
      </ModernCard>

      <!-- 字体系统演示 */\n      <ModernCard variant=\"elevated\" class=\"modern-demo-section\">\n        <template #header>\n          <h2 class=\"modern-typography-title-2\">字体系统</h2>\n          <p class=\"modern-typography-footnote modern-demo-description\">\n            现代流畅的字体层级系统\n          </p>\n        </template>\n\n        <div class=\"modern-demo-typography\">\n          <div class=\"modern-typography-large-title\">大标题 - Large Title</div>\n          <div class=\"modern-typography-title-1\">标题 1 - Title 1</div>\n          <div class=\"modern-typography-title-2\">标题 2 - Title 2</div>\n          <div class=\"modern-typography-title-3\">标题 3 - Title 3</div>\n          <div class=\"modern-typography-headline\">标题 - Headline</div>\n          <div class=\"modern-typography-body\">正文 - Body</div>\n          <div class=\"modern-typography-callout\">说明文字 - Callout</div>\n          <div class=\"modern-typography-subheadline\">子标题 - Subheadline</div>\n          <div class=\"modern-typography-footnote\">脚注 - Footnote</div>\n          <div class=\"modern-typography-caption-1\">说明 1 - Caption 1</div>\n          <div class=\"modern-typography-caption-2\">说明 2 - Caption 2</div>\n        </div>\n      </ModernCard>\n\n      <!-- 主题控制演示 -->\n      <ModernCard variant=\"elevated\" class=\"modern-demo-section\">\n        <template #header>\n          <h2 class=\"modern-typography-title-2\">主题控制</h2>\n          <p class=\"modern-typography-footnote modern-demo-description\">\n            现代主题系统控制面板\n          </p>\n        </template>\n\n        <div class=\"modern-demo-theme-controls\">\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">主题模式</h3>\n            <div class=\"modern-demo-buttons\">\n              <ModernButton \n                :type=\"modernThemeStore.config.mode === 'light' ? 'primary' : 'secondary'\"\n                size=\"small\"\n                @click=\"setThemeMode('light')\"\n              >\n                浅色\n              </ModernButton>\n              <ModernButton \n                :type=\"modernThemeStore.config.mode === 'dark' ? 'primary' : 'secondary'\"\n                size=\"small\"\n                @click=\"setThemeMode('dark')\"\n              >\n                深色\n              </ModernButton>\n              <ModernButton \n                :type=\"modernThemeStore.config.mode === 'auto' ? 'primary' : 'secondary'\"\n                size=\"small\"\n                @click=\"setThemeMode('auto')\"\n              >\n                自动\n              </ModernButton>\n            </div>\n          </div>\n\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">主题色彩</h3>\n            <div class=\"modern-demo-color-palette\">\n              <button\n                v-for=\"color in themeColors\"\n                :key=\"color.name\"\n                :class=\"getColorButtonClasses(color.name)\"\n                :style=\"{ backgroundColor: color.value }\"\n                @click=\"setThemeColor(color.name)\"\n              >\n                <Check v-if=\"modernThemeStore.config.color === color.name\" class=\"w-4 h-4 text-white\" />\n              </button>\n            </div>\n          </div>\n\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">组件风格</h3>\n            <div class=\"modern-demo-buttons\">\n              <ModernButton \n                v-for="style in componentStyles"\n                :key="style.value"\n                :type="modernThemeStore.config.componentStyle === style.value ? 'primary' : 'secondary'"\n                size="small"\n                @click="setComponentStyle(style.value)"\n              >\n                {{ style.name }}\n              </ModernButton>\n            </div>\n            <p class=\"modern-typography-footnote modern-demo-description\">\n              当前风格：{{ getCurrentStyleDescription() }}\n            </p>\n          </div>\n\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">界面选项</h3>\n            <div class=\"modern-demo-toggles\">\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.enableAnimations\"\n                  @change=\"toggleAnimations\"\n                >\n                <span>启用动画</span>\n              </label>\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.enableBlur\"\n                  @change=\"toggleBlur\"\n                >\n                <span>启用模糊效果</span>\n              </label>\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.compactMode\"\n                  @change=\"toggleCompactMode\"\n                >\n                <span>紧凑模式</span>\n              </label>\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.reducedMotion\"\n                  @change=\"toggleReducedMotion\"\n                >\n                <span>减少动画</span>\n              </label>\n            </div>\n          </div>\n        </div>\n      </ModernCard>\n    </div>\n  </ModernAppLayout>\n</template>\n\n<script setup lang=\"ts\">\nimport { ref, computed, onMounted } from 'vue'\nimport { Sun, Moon, Check, Home, Palette, Settings, Layers } from 'lucide-vue-next'\nimport { useModernThemeStore } from '@/stores/modern-theme'\nimport type { ModernThemeMode, ModernThemeColor, ComponentStyle } from '@/stores/modern-theme'\nimport ModernAppLayout from '@/components/layout/modern-app-layout.vue'\nimport { ModernButton, ModernCard } from '@/components/ui'\n\nconst modernThemeStore = useModernThemeStore()\n\n// 状态\nconst loading = ref(false)\nconst buttonLoading = ref(false)\nconst notification = ref<any>(null)\n\n// 导航配置\nconst navigationSections = [\n  {\n    id: 'main',\n    title: '主要功能',\n    items: [\n      { id: 'dashboard', label: '仪表盘', icon: Home, to: '/dashboard' },\n      { id: 'components', label: '组件演示', icon: Layers, to: '/components' },\n      { id: 'theme', label: '主题设置', icon: Palette, to: '/theme' },\n      { id: 'settings', label: '设置', icon: Settings, to: '/settings' }\n    ]\n  }\n]\n\n// 主题色彩选项\nconst themeColors = [\n  { name: 'blue', value: '#007AFF' },\n  { name: 'green', value: '#34C759' },\n  { name: 'purple', value: '#AF52DE' },\n  { name: 'orange', value: '#FF9500' },\n  { name: 'red', value: '#FF3B30' },\n  { name: 'pink', value: '#FF2D92' },\n  { name: 'indigo', value: '#5856D6' },\n  { name: 'teal', value: '#5AC8FA' }\n]\n\n// 组件风格选项\nconst componentStyles = [\n  { name: '现代', value: 'modern' as ComponentStyle, description: '清晰流畅的现代设计' },\n  { name: '经典', value: 'classic' as ComponentStyle, description: '传统稳重的经典设计' },\n  { name: '简约', value: 'minimal' as ComponentStyle, description: '极简主义的纯净设计' },\n  { name: '圆润', value: 'rounded' as ComponentStyle, description: '圆润柔和的可爱设计' },\n  { name: '锐利', value: 'sharp' as ComponentStyle, description: '锐利明确的工业设计' }\n]\n\n// 计算属性\nconst themeIcon = computed(() => {\n  return modernThemeStore.isDark ? Sun : Moon\n})\n\n// 方法\nconst toggleTheme = () => {\n  modernThemeStore.toggleMode()\n\n}\n\nconst setThemeMode = (mode: ModernThemeMode) => {\n  modernThemeStore.setMode(mode)\n\n}\n\nconst setThemeColor = (color: ModernThemeColor) => {\n  modernThemeStore.setColor(color)\n\n}\n\nconst getColorButtonClasses = (colorName: string) => [\n  'modern-demo-color-button',\n  {\n    'modern-demo-color-button--active': modernThemeStore.config.color === colorName\n  }\n]\n\nconst toggleAnimations = () => {\n  modernThemeStore.updateConfig({ \n    enableAnimations: !modernThemeStore.config.enableAnimations \n  })\n}\n\nconst toggleBlur = () => {\n  modernThemeStore.updateConfig({ \n    enableBlur: !modernThemeStore.config.enableBlur \n  })\n}\n\nconst toggleCompactMode = () => {\n  modernThemeStore.updateConfig({ \n    compactMode: !modernThemeStore.config.compactMode \n  })\n}\n\nconst toggleReducedMotion = () => {\n  modernThemeStore.updateConfig({ \n    reducedMotion: !modernThemeStore.config.reducedMotion \n  })\n}\n\nconst setComponentStyle = (style: ComponentStyle) => {\n  modernThemeStore.setComponentStyle(style)\n\n  showNotification('success', '风格已切换', `已切换到${getStyleName(style)}`)\n}\n\nconst getStyleName = (style: ComponentStyle): string => {\n  const styleMap = {\n    'modern': '现代风格',
    'classic': '经典风格', \n    'minimal': '简约风格',
    'rounded': '圆润风格',
    'sharp': '锐利风格'
  }\n  return styleMap[style]\n}\n\nconst getCurrentStyleDescription = (): string => {\n  const currentStyle = componentStyles.find(s => s.value === modernThemeStore.config.componentStyle)\n  return currentStyle?.description || '现代设计'\n}\n\nconst simulateLoading = () => {\n  buttonLoading.value = true\n  setTimeout(() => {\n    buttonLoading.value = false\n    showNotification('success', '加载完成', '按钮加载演示完成')\n  }, 2000)\n}\n\nconst handleCardClick = () => {\n\n  showNotification('info', '卡片点击', '您点击了交互式卡片')\n}\n\nconst handleSidebarClick = (item: any) => {\n  console.log('Sidebar item clicked:', item)\n}\n\nconst showNotification = (type: string, title: string, message: string) => {\n  notification.value = {\n    id: Date.now().toString(),\n    type,\n    title,\n    message,\n    duration: 3000\n  }\n  \n  setTimeout(() => {\n    notification.value = null\n  }, 3000)\n}\n\nconst clearNotification = () => {\n  notification.value = null\n}\n\n// 初始化\nonMounted(() => {\n  // 模拟初始加载\n  loading.value = true\n  setTimeout(() => {\n    loading.value = false\n    showNotification('success', '欢迎使用', '现代流畅设计系统加载完成')\n  }, 1500)\n})\n</script>\n\n<style scoped>\n.modern-demo-page {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: var(--modern-spacing-md);\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-xl);\n}\n\n.modern-demo-header {\n  text-align: center;\n  padding: var(--modern-spacing-xl) 0;\n}\n\n.modern-demo-subtitle {\n  color: var(--modern-text-secondary);\n  margin-top: var(--modern-spacing-md);\n  max-width: 600px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.modern-demo-section {\n  width: 100%;\n}\n\n.modern-demo-description {\n  color: var(--modern-text-tertiary);\n  margin-top: var(--modern-spacing-xs);\n}\n\n.modern-demo-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: var(--modern-spacing-lg);\n}\n\n.modern-demo-group {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-md);\n}\n\n.modern-demo-buttons {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--modern-spacing-sm);\n}\n\n.modern-demo-typography {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-md);\n}\n\n.modern-demo-theme-controls {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-xl);\n}\n\n.modern-demo-color-palette {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--modern-spacing-sm);\n}\n\n.modern-demo-color-button {\n  width: 40px;\n  height: 40px;\n  border-radius: var(--modern-radius-md);\n  border: 2px solid transparent;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all var(--modern-duration-fast) var(--modern-easing-ease);\n}\n\n.modern-demo-color-button:hover {\n  transform: scale(1.1);\n  box-shadow: var(--modern-shadow-md);\n}\n\n.modern-demo-color-button--active {\n  border-color: var(--modern-text-primary);\n  box-shadow: var(--modern-shadow-lg);\n}\n\n.modern-demo-toggles {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-md);\n}\n\n.modern-demo-toggle {\n  display: flex;\n  align-items: center;\n  gap: var(--modern-spacing-sm);\n  cursor: pointer;\n  font-size: var(--modern-font-size-body);\n  color: var(--modern-text-primary);\n}\n\n.modern-demo-toggle input[type=\"checkbox\"] {\n  width: 20px;\n  height: 20px;\n  border-radius: var(--modern-radius-xs);\n  border: 2px solid var(--modern-divider);\n  appearance: none;\n  cursor: pointer;\n  position: relative;\n  transition: all var(--modern-duration-fast) var(--modern-easing-ease);\n}\n\n.modern-demo-toggle input[type=\"checkbox\"]:checked {\n  background: var(--modern-primary-blue);\n  border-color: var(--modern-primary-blue);\n}\n\n.modern-demo-toggle input[type=\"checkbox\"]:checked::after {\n  content: '';\n  position: absolute;\n  top: 2px;\n  left: 6px;\n  width: 4px;\n  height: 8px;\n  border: solid white;\n  border-width: 0 2px 2px 0;\n  transform: rotate(45deg);\n}\n\n/* 响应式设计 */\n@media (max-width: 768px) {\n  .modern-demo-page {\n    padding: var(--modern-spacing-sm);\n    gap: var(--modern-spacing-lg);\n  }\n  \n  .modern-demo-grid {\n    grid-template-columns: 1fr;\n    gap: var(--modern-spacing-md);\n  }\n  \n  .modern-demo-buttons {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  \n  .modern-demo-color-palette {\n    justify-content: center;\n  }\n}\n\n/* 高对比度模式支持 */\n@media (prefers-contrast: high) {\n  .modern-demo-color-button {\n    border-width: 3px;\n  }\n}\n\n/* 减少动画偏好支持 */\n@media (prefers-reduced-motion: reduce) {\n  .modern-demo-color-button {\n    transition: none;\n  }\n  \n  .modern-demo-color-button:hover {\n    transform: none;\n  }\n  \n  .modern-demo-toggle input[type=\"checkbox\"] {\n    transition: none;\n  }\n}\n</style>", "original_text": null}]
```

```
<template>
  <ModernAppLayout
    app-title="现代流畅设计演示"
    :show-sidebar-toggle="true"
    :show-tab-bar="false"
    :navigation-sections="navigationSections"
    :global-loading="loading"
    loading-text="加载组件演示..."
    :notification="notification"
    @sidebar-item-click="handleSidebarClick"
    @notification-close="clearNotification"
  >
    <template #navigation-trailing>
      <ModernButton
        type="plain"
        size="small"
        @click="toggleTheme"
      >
        <component :is="themeIcon" class="w-5 h-5" />
      </ModernButton>
    </template>

    <div class="modern-demo-page">
      <div class="modern-demo-header">
        <h1 class="modern-typography-large-title">现代流畅设计系统</h1>
        <p class="modern-typography-body modern-demo-subtitle">
          基于清晰、服从、深度三大原则的现代组件库演示
        </p>
      </div>

      <!-- 按钮组件演示 -->
      <ModernCard variant="elevated" class="modern-demo-section">
        <template #header>
          <h2 class="modern-typography-title-2">按钮组件</h2>
          <p class="modern-typography-footnote modern-demo-description">
            多种类型和状态的现代按钮组件
          </p>
        </template>

        <div class="modern-demo-grid">
          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">基础按钮</h3>
            <div class="modern-demo-buttons">
              <ModernButton type="primary">主要按钮</ModernButton>
              <ModernButton type="secondary">次要按钮</ModernButton>
              <ModernButton type="destructive">危险按钮</ModernButton>
              <ModernButton type="plain">朴素按钮</ModernButton>
            </div>
          </div>

          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">按钮尺寸</h3>
            <div class="modern-demo-buttons">
              <ModernButton size="small">小按钮</ModernButton>
              <ModernButton size="medium">中按钮</ModernButton>
              <ModernButton size="large">大按钮</ModernButton>
            </div>
          </div>

          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">按钮状态</h3>
            <div class="modern-demo-buttons">
              <ModernButton :loading="buttonLoading" @click="simulateLoading">
                {{ buttonLoading ? '加载中' : '点击加载' }}
              </ModernButton>
              <ModernButton disabled>禁用按钮</ModernButton>
              <ModernButton rounded>圆角按钮</ModernButton>
            </div>
          </div>
        </div>
      </ModernCard>

      <!-- 卡片组件演示 -->
      <ModernCard variant="elevated" class="modern-demo-section">
        <template #header>
          <h2 class="modern-typography-title-2">卡片组件</h2>
          <p class="modern-typography-footnote modern-demo-description">
            多种变体和交互效果的卡片组件
          </p>
        </template>

        <div class="modern-demo-grid">
          <ModernCard variant="elevated" padding="md">
            <h3 class="modern-typography-headline">悬浮卡片</h3>
            <p class="modern-typography-body">带有阴影效果的悬浮卡片</p>
          </ModernCard>

          <ModernCard variant="outlined" padding="md">
            <h3 class="modern-typography-headline">边框卡片</h3>
            <p class="modern-typography-body">带有边框的简洁卡片</p>
          </ModernCard>

          <ModernCard variant="filled" padding="md">
            <h3 class="modern-typography-headline">填充卡片</h3>
            <p class="modern-typography-body">带有背景填充的卡片</p>
          </ModernCard>

          <ModernCard variant="grouped" padding="md" interactive @click="handleCardClick">
            <h3 class="modern-typography-headline">交互卡片</h3>
            <p class="modern-typography-body">可点击的交互式卡片</p>
          </ModernCard>
        </div>
      </ModernCard>

      <!-- 字体系统演示 */\n      <ModernCard variant=\"elevated\" class=\"modern-demo-section\">\n        <template #header>\n          <h2 class=\"modern-typography-title-2\">字体系统</h2>\n          <p class=\"modern-typography-footnote modern-demo-description\">\n            现代流畅的字体层级系统\n          </p>\n        </template>\n\n        <div class=\"modern-demo-typography\">\n          <div class=\"modern-typography-large-title\">大标题 - Large Title</div>\n          <div class=\"modern-typography-title-1\">标题 1 - Title 1</div>\n          <div class=\"modern-typography-title-2\">标题 2 - Title 2</div>\n          <div class=\"modern-typography-title-3\">标题 3 - Title 3</div>\n          <div class=\"modern-typography-headline\">标题 - Headline</div>\n          <div class=\"modern-typography-body\">正文 - Body</div>\n          <div class=\"modern-typography-callout\">说明文字 - Callout</div>\n          <div class=\"modern-typography-subheadline\">子标题 - Subheadline</div>\n          <div class=\"modern-typography-footnote\">脚注 - Footnote</div>\n          <div class=\"modern-typography-caption-1\">说明 1 - Caption 1</div>\n          <div class=\"modern-typography-caption-2\">说明 2 - Caption 2</div>\n        </div>\n      </ModernCard>\n\n      <!-- 主题控制演示 -->\n      <ModernCard variant=\"elevated\" class=\"modern-demo-section\">\n        <template #header>\n          <h2 class=\"modern-typography-title-2\">主题控制</h2>\n          <p class=\"modern-typography-footnote modern-demo-description\">\n            现代主题系统控制面板\n          </p>\n        </template>\n\n        <div class=\"modern-demo-theme-controls\">\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">主题模式</h3>\n            <div class=\"modern-demo-buttons\">\n              <ModernButton \n                :type=\"modernThemeStore.config.mode === 'light' ? 'primary' : 'secondary'\"\n                size=\"small\"\n                @click=\"setThemeMode('light')\"\n              >\n                浅色\n              </ModernButton>\n              <ModernButton \n                :type=\"modernThemeStore.config.mode === 'dark' ? 'primary' : 'secondary'\"\n                size=\"small\"\n                @click=\"setThemeMode('dark')\"\n              >\n                深色\n              </ModernButton>\n              <ModernButton \n                :type=\"modernThemeStore.config.mode === 'auto' ? 'primary' : 'secondary'\"\n                size=\"small\"\n                @click=\"setThemeMode('auto')\"\n              >\n                自动\n              </ModernButton>\n            </div>\n          </div>\n\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">主题色彩</h3>\n            <div class=\"modern-demo-color-palette\">\n              <button\n                v-for=\"color in themeColors\"\n                :key=\"color.name\"\n                :class=\"getColorButtonClasses(color.name)\"\n                :style=\"{ backgroundColor: color.value }\"\n                @click=\"setThemeColor(color.name)\"\n              >\n                <Check v-if=\"modernThemeStore.config.color === color.name\" class=\"w-4 h-4 text-white\" />\n              </button>\n            </div>\n          </div>\n\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">组件风格</h3>\n            <div class=\"modern-demo-buttons\">\n              <ModernButton \n                v-for="style in componentStyles"\n                :key="style.value"\n                :type="modernThemeStore.config.componentStyle === style.value ? 'primary' : 'secondary'"\n                size="small"\n                @click="setComponentStyle(style.value)"\n              >\n                {{ style.name }}\n              </ModernButton>\n            </div>\n            <p class=\"modern-typography-footnote modern-demo-description\">\n              当前风格：{{ getCurrentStyleDescription() }}\n            </p>\n          </div>\n\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">界面选项</h3>\n            <div class=\"modern-demo-toggles\">\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.enableAnimations\"\n                  @change=\"toggleAnimations\"\n                >\n                <span>启用动画</span>\n              </label>\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.enableBlur\"\n                  @change=\"toggleBlur\"\n                >\n                <span>启用模糊效果</span>\n              </label>\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.compactMode\"\n                  @change=\"toggleCompactMode\"\n                >\n                <span>紧凑模式</span>\n              </label>\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.reducedMotion\"\n                  @change=\"toggleReducedMotion\"\n                >\n                <span>减少动画</span>\n              </label>\n            </div>\n          </div>\n        </div>\n      </ModernCard>\n    </div>\n  </ModernAppLayout>\n</template>\n\n<script setup lang=\"ts\">\nimport { ref, computed, onMounted } from 'vue'\nimport { Sun, Moon, Check, Home, Palette, Settings, Layers } from 'lucide-vue-next'\nimport { useModernThemeStore } from '@/stores/modern-theme'\nimport type { ModernThemeMode, ModernThemeColor, ComponentStyle } from '@/stores/modern-theme'\nimport ModernAppLayout from '@/components/layout/modern-app-layout.vue'\nimport { ModernButton, ModernCard } from '@/components/ui'\n\nconst modernThemeStore = useModernThemeStore()\n\n// 状态\nconst loading = ref(false)\nconst buttonLoading = ref(false)\nconst notification = ref<any>(null)\n\n// 导航配置\nconst navigationSections = [\n  {\n    id: 'main',\n    title: '主要功能',\n    items: [\n      { id: 'dashboard', label: '仪表盘', icon: Home, to: '/dashboard' },\n      { id: 'components', label: '组件演示', icon: Layers, to: '/components' },\n      { id: 'theme', label: '主题设置', icon: Palette, to: '/theme' },\n      { id: 'settings', label: '设置', icon: Settings, to: '/settings' }\n    ]\n  }\n]\n\n// 主题色彩选项\nconst themeColors = [\n  { name: 'blue', value: '#007AFF' },\n  { name: 'green', value: '#34C759' },\n  { name: 'purple', value: '#AF52DE' },\n  { name: 'orange', value: '#FF9500' },\n  { name: 'red', value: '#FF3B30' },\n  { name: 'pink', value: '#FF2D92' },\n  { name: 'indigo', value: '#5856D6' },\n  { name: 'teal', value: '#5AC8FA' }\n]\n\n// 组件风格选项\nconst componentStyles = [\n  { name: '现代', value: 'modern' as ComponentStyle, description: '清晰流畅的现代设计' },\n  { name: '经典', value: 'classic' as ComponentStyle, description: '传统稳重的经典设计' },\n  { name: '简约', value: 'minimal' as ComponentStyle, description: '极简主义的纯净设计' },\n  { name: '圆润', value: 'rounded' as ComponentStyle, description: '圆润柔和的可爱设计' },\n  { name: '锐利', value: 'sharp' as ComponentStyle, description: '锐利明确的工业设计' }\n]\n\n// 计算属性\nconst themeIcon = computed(() => {\n  return modernThemeStore.isDark ? Sun : Moon\n})\n\n// 方法\nconst toggleTheme = () => {\n  modernThemeStore.toggleMode()\n\n}\n\nconst setThemeMode = (mode: ModernThemeMode) => {\n  modernThemeStore.setMode(mode)\n\n}\n\nconst setThemeColor = (color: ModernThemeColor) => {\n  modernThemeStore.setColor(color)\n\n}\n\nconst getColorButtonClasses = (colorName: string) => [\n  'modern-demo-color-button',\n  {\n    'modern-demo-color-button--active': modernThemeStore.config.color === colorName\n  }\n]\n\nconst toggleAnimations = () => {\n  modernThemeStore.updateConfig({ \n    enableAnimations: !modernThemeStore.config.enableAnimations \n  })\n}\n\nconst toggleBlur = () => {\n  modernThemeStore.updateConfig({ \n    enableBlur: !modernThemeStore.config.enableBlur \n  })\n}\n\nconst toggleCompactMode = () => {\n  modernThemeStore.updateConfig({ \n    compactMode: !modernThemeStore.config.compactMode \n  })\n}\n\nconst toggleReducedMotion = () => {\n  modernThemeStore.updateConfig({ \n    reducedMotion: !modernThemeStore.config.reducedMotion \n  })\n}\n\nconst setComponentStyle = (style: ComponentStyle) => {\n  modernThemeStore.setComponentStyle(style)\n\n  showNotification('success', '风格已切换', `已切换到${getStyleName(style)}`)\n}\n\nconst getStyleName = (style: ComponentStyle): string => {\n  const styleMap = {\n    'modern': '现代风格',
    'classic': '经典风格', \n    'minimal': '简约风格',
    'rounded': '圆润风格',
    'sharp': '锐利风格'
  }\n  return styleMap[style]\n}\n\nconst getCurrentStyleDescription = (): string => {\n  const currentStyle = componentStyles.find(s => s.value === modernThemeStore.config.componentStyle)\n  return currentStyle?.description || '现代设计'\n}\n\nconst simulateLoading = () => {\n  buttonLoading.value = true\n  setTimeout(() => {\n    buttonLoading.value = false\n    showNotification('success', '加载完成', '按钮加载演示完成')\n  }, 2000)\n}\n\nconst handleCardClick = () => {\n\n  showNotification('info', '卡片点击', '您点击了交互式卡片')\n}\n\nconst handleSidebarClick = (item: any) => {\n  console.log('Sidebar item clicked:', item)\n}\n\nconst showNotification = (type: string, title: string, message: string) => {\n  notification.value = {\n    id: Date.now().toString(),\n    type,\n    title,\n    message,\n    duration: 3000\n  }\n  \n  setTimeout(() => {\n    notification.value = null\n  }, 3000)\n}\n\nconst clearNotification = () => {\n  notification.value = null\n}\n\n// 初始化\nonMounted(() => {\n  // 模拟初始加载\n  loading.value = true\n  setTimeout(() => {\n    loading.value = false\n    showNotification('success', '欢迎使用', '现代流畅设计系统加载完成')\n  }, 1500)\n})\n</script>\n\n<style scoped>\n.modern-demo-page {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: var(--modern-spacing-md);\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-xl);\n}\n\n.modern-demo-header {\n  text-align: center;\n  padding: var(--modern-spacing-xl) 0;\n}\n\n.modern-demo-subtitle {\n  color: var(--modern-text-secondary);\n  margin-top: var(--modern-spacing-md);\n  max-width: 600px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.modern-demo-section {\n  width: 100%;\n}\n\n.modern-demo-description {\n  color: var(--modern-text-tertiary);\n  margin-top: var(--modern-spacing-xs);\n}\n\n.modern-demo-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: var(--modern-spacing-lg);\n}\n\n.modern-demo-group {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-md);\n}\n\n.modern-demo-buttons {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--modern-spacing-sm);\n}\n\n.modern-demo-typography {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-md);\n}\n\n.modern-demo-theme-controls {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-xl);\n}\n\n.modern-demo-color-palette {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--modern-spacing-sm);\n}\n\n.modern-demo-color-button {\n  width: 40px;\n  height: 40px;\n  border-radius: var(--modern-radius-md);\n  border: 2px solid transparent;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all var(--modern-duration-fast) var(--modern-easing-ease);\n}\n\n.modern-demo-color-button:hover {\n  transform: scale(1.1);\n  box-shadow: var(--modern-shadow-md);\n}\n\n.modern-demo-color-button--active {\n  border-color: var(--modern-text-primary);\n  box-shadow: var(--modern-shadow-lg);\n}\n\n.modern-demo-toggles {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-md);\n}\n\n.modern-demo-toggle {\n  display: flex;\n  align-items: center;\n  gap: var(--modern-spacing-sm);\n  cursor: pointer;\n  font-size: var(--modern-font-size-body);\n  color: var(--modern-text-primary);\n}\n\n.modern-demo-toggle input[type=\"checkbox\"] {\n  width: 20px;\n  height: 20px;\n  border-radius: var(--modern-radius-xs);\n  border: 2px solid var(--modern-divider);\n  appearance: none;\n  cursor: pointer;\n  position: relative;\n  transition: all var(--modern-duration-fast) var(--modern-easing-ease);\n}\n\n.modern-demo-toggle input[type=\"checkbox\"]:checked {\n  background: var(--modern-primary-blue);\n  border-color: var(--modern-primary-blue);\n}\n\n.modern-demo-toggle input[type=\"checkbox\"]:checked::after {\n  content: '';\n  position: absolute;\n  top: 2px;\n  left: 6px;\n  width: 4px;\n  height: 8px;\n  border: solid white;\n  border-width: 0 2px 2px 0;\n  transform: rotate(45deg);\n}\n\n/* 响应式设计 */\n@media (max-width: 768px) {\n  .modern-demo-page {\n    padding: var(--modern-spacing-sm);\n    gap: var(--modern-spacing-lg);\n  }\n  \n  .modern-demo-grid {\n    grid-template-columns: 1fr;\n    gap: var(--modern-spacing-md);\n  }\n  \n  .modern-demo-buttons {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  \n  .modern-demo-color-palette {\n    justify-content: center;\n  }\n}\n\n/* 高对比度模式支持 */\n@media (prefers-contrast: high) {\n  .modern-demo-color-button {\n    border-width: 3px;\n  }\n}\n\n/* 减少动画偏好支持 */\n@media (prefers-reduced-motion: reduce) {\n  .modern-demo-color-button {\n    transition: none;\n  }\n  \n  .modern-demo-color-button:hover {\n    transform: none;\n  }\n  \n  .modern-demo-toggle input[type=\"checkbox\"] {\n    transition: none;\n  }\n}\n</style>", "original_text": null}]
```

```
<template>
  <ModernAppLayout
    app-title="现代流畅设计演示"
    :show-sidebar-toggle="true"
    :show-tab-bar="false"
    :navigation-sections="navigationSections"
    :global-loading="loading"
    loading-text="加载组件演示..."
    :notification="notification"
    @sidebar-item-click="handleSidebarClick"
    @notification-close="clearNotification"
  >
    <template #navigation-trailing>
      <ModernButton
        type="plain"
        size="small"
        @click="toggleTheme"
      >
        <component :is="themeIcon" class="w-5 h-5" />
      </ModernButton>
    </template>

    <div class="modern-demo-page">
      <div class="modern-demo-header">
        <h1 class="modern-typography-large-title">现代流畅设计系统</h1>
        <p class="modern-typography-body modern-demo-subtitle">
          基于清晰、服从、深度三大原则的现代组件库演示
        </p>
      </div>

      <!-- 按钮组件演示 -->
      <ModernCard variant="elevated" class="modern-demo-section">
        <template #header>
          <h2 class="modern-typography-title-2">按钮组件</h2>
          <p class="modern-typography-footnote modern-demo-description">
            多种类型和状态的现代按钮组件
          </p>
        </template>

        <div class="modern-demo-grid">
          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">基础按钮</h3>
            <div class="modern-demo-buttons">
              <ModernButton type="primary">主要按钮</ModernButton>
              <ModernButton type="secondary">次要按钮</ModernButton>
              <ModernButton type="destructive">危险按钮</ModernButton>
              <ModernButton type="plain">朴素按钮</ModernButton>
            </div>
          </div>

          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">按钮尺寸</h3>
            <div class="modern-demo-buttons">
              <ModernButton size="small">小按钮</ModernButton>
              <ModernButton size="medium">中按钮</ModernButton>
              <ModernButton size="large">大按钮</ModernButton>
            </div>
          </div>

          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">按钮状态</h3>
            <div class="modern-demo-buttons">
              <ModernButton :loading="buttonLoading" @click="simulateLoading">
                {{ buttonLoading ? '加载中' : '点击加载' }}
              </ModernButton>
              <ModernButton disabled>禁用按钮</ModernButton>
              <ModernButton rounded>圆角按钮</ModernButton>
            </div>
          </div>
        </div>
      </ModernCard>

      <!-- 卡片组件演示 -->
      <ModernCard variant="elevated" class="modern-demo-section">
        <template #header>
          <h2 class="modern-typography-title-2">卡片组件</h2>
          <p class="modern-typography-footnote modern-demo-description">
            多种变体和交互效果的卡片组件
          </p>
        </template>

        <div class="modern-demo-grid">
          <ModernCard variant="elevated" padding="md">
            <h3 class="modern-typography-headline">悬浮卡片</h3>
            <p class="modern-typography-body">带有阴影效果的悬浮卡片</p>
          </ModernCard>

          <ModernCard variant="outlined" padding="md">
            <h3 class="modern-typography-headline">边框卡片</h3>
            <p class="modern-typography-body">带有边框的简洁卡片</p>
          </ModernCard>

          <ModernCard variant="filled" padding="md">
            <h3 class="modern-typography-headline">填充卡片</h3>
            <p class="modern-typography-body">带有背景填充的卡片</p>
          </ModernCard>

          <ModernCard variant="grouped" padding="md" interactive @click="handleCardClick">
            <h3 class="modern-typography-headline">交互卡片</h3>
            <p class="modern-typography-body">可点击的交互式卡片</p>
          </ModernCard>
        </div>
      </ModernCard>

      <!-- 字体系统演示 */\n      <ModernCard variant=\"elevated\" class=\"modern-demo-section\">\n        <template #header>\n          <h2 class=\"modern-typography-title-2\">字体系统</h2>\n          <p class=\"modern-typography-footnote modern-demo-description\">\n            现代流畅的字体层级系统\n          </p>\n        </template>\n\n        <div class=\"modern-demo-typography\">\n          <div class=\"modern-typography-large-title\">大标题 - Large Title</div>\n          <div class=\"modern-typography-title-1\">标题 1 - Title 1</div>\n          <div class=\"modern-typography-title-2\">标题 2 - Title 2</div>\n          <div class=\"modern-typography-title-3\">标题 3 - Title 3</div>\n          <div class=\"modern-typography-headline\">标题 - Headline</div>\n          <div class=\"modern-typography-body\">正文 - Body</div>\n          <div class=\"modern-typography-callout\">说明文字 - Callout</div>\n          <div class=\"modern-typography-subheadline\">子标题 - Subheadline</div>\n          <div class=\"modern-typography-footnote\">脚注 - Footnote</div>\n          <div class=\"modern-typography-caption-1\">说明 1 - Caption 1</div>\n          <div class=\"modern-typography-caption-2\">说明 2 - Caption 2</div>\n        </div>\n      </ModernCard>\n\n      <!-- 主题控制演示 -->\n      <ModernCard variant=\"elevated\" class=\"modern-demo-section\">\n        <template #header>\n          <h2 class=\"modern-typography-title-2\">主题控制</h2>\n          <p class=\"modern-typography-footnote modern-demo-description\">\n            现代主题系统控制面板\n          </p>\n        </template>\n\n        <div class=\"modern-demo-theme-controls\">\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">主题模式</h3>\n            <div class=\"modern-demo-buttons\">\n              <ModernButton \n                :type=\"modernThemeStore.config.mode === 'light' ? 'primary' : 'secondary'\"\n                size=\"small\"\n                @click=\"setThemeMode('light')\"\n              >\n                浅色\n              </ModernButton>\n              <ModernButton \n                :type=\"modernThemeStore.config.mode === 'dark' ? 'primary' : 'secondary'\"\n                size=\"small\"\n                @click=\"setThemeMode('dark')\"\n              >\n                深色\n              </ModernButton>\n              <ModernButton \n                :type=\"modernThemeStore.config.mode === 'auto' ? 'primary' : 'secondary'\"\n                size=\"small\"\n                @click=\"setThemeMode('auto')\"\n              >\n                自动\n              </ModernButton>\n            </div>\n          </div>\n\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">主题色彩</h3>\n            <div class=\"modern-demo-color-palette\">\n              <button\n                v-for=\"color in themeColors\"\n                :key=\"color.name\"\n                :class=\"getColorButtonClasses(color.name)\"\n                :style=\"{ backgroundColor: color.value }\"\n                @click=\"setThemeColor(color.name)\"\n              >\n                <Check v-if=\"modernThemeStore.config.color === color.name\" class=\"w-4 h-4 text-white\" />\n              </button>\n            </div>\n          </div>\n\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">组件风格</h3>\n            <div class=\"modern-demo-buttons\">\n              <ModernButton \n                v-for="style in componentStyles"\n                :key="style.value"\n                :type="modernThemeStore.config.componentStyle === style.value ? 'primary' : 'secondary'"\n                size="small"\n                @click="setComponentStyle(style.value)"\n              >\n                {{ style.name }}\n              </ModernButton>\n            </div>\n            <p class=\"modern-typography-footnote modern-demo-description\">\n              当前风格：{{ getCurrentStyleDescription() }}\n            </p>\n          </div>\n\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">界面选项</h3>\n            <div class=\"modern-demo-toggles\">\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.enableAnimations\"\n                  @change=\"toggleAnimations\"\n                >\n                <span>启用动画</span>\n              </label>\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.enableBlur\"\n                  @change=\"toggleBlur\"\n                >\n                <span>启用模糊效果</span>\n              </label>\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.compactMode\"\n                  @change=\"toggleCompactMode\"\n                >\n                <span>紧凑模式</span>\n              </label>\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.reducedMotion\"\n                  @change=\"toggleReducedMotion\"\n                >\n                <span>减少动画</span>\n              </label>\n            </div>\n          </div>\n        </div>\n      </ModernCard>\n    </div>\n  </ModernAppLayout>\n</template>\n\n<script setup lang=\"ts\">\nimport { ref, computed, onMounted } from 'vue'\nimport { Sun, Moon, Check, Home, Palette, Settings, Layers } from 'lucide-vue-next'\nimport { useModernThemeStore } from '@/stores/modern-theme'\nimport type { ModernThemeMode, ModernThemeColor, ComponentStyle } from '@/stores/modern-theme'\nimport ModernAppLayout from '@/components/layout/modern-app-layout.vue'\nimport { ModernButton, ModernCard } from '@/components/ui'\n\nconst modernThemeStore = useModernThemeStore()\n\n// 状态\nconst loading = ref(false)\nconst buttonLoading = ref(false)\nconst notification = ref<any>(null)\n\n// 导航配置\nconst navigationSections = [\n  {\n    id: 'main',\n    title: '主要功能',\n    items: [\n      { id: 'dashboard', label: '仪表盘', icon: Home, to: '/dashboard' },\n      { id: 'components', label: '组件演示', icon: Layers, to: '/components' },\n      { id: 'theme', label: '主题设置', icon: Palette, to: '/theme' },\n      { id: 'settings', label: '设置', icon: Settings, to: '/settings' }\n    ]\n  }\n]\n\n// 主题色彩选项\nconst themeColors = [\n  { name: 'blue', value: '#007AFF' },\n  { name: 'green', value: '#34C759' },\n  { name: 'purple', value: '#AF52DE' },\n  { name: 'orange', value: '#FF9500' },\n  { name: 'red', value: '#FF3B30' },\n  { name: 'pink', value: '#FF2D92' },\n  { name: 'indigo', value: '#5856D6' },\n  { name: 'teal', value: '#5AC8FA' }\n]\n\n// 组件风格选项\nconst componentStyles = [\n  { name: '现代', value: 'modern' as ComponentStyle, description: '清晰流畅的现代设计' },\n  { name: '经典', value: 'classic' as ComponentStyle, description: '传统稳重的经典设计' },\n  { name: '简约', value: 'minimal' as ComponentStyle, description: '极简主义的纯净设计' },\n  { name: '圆润', value: 'rounded' as ComponentStyle, description: '圆润柔和的可爱设计' },\n  { name: '锐利', value: 'sharp' as ComponentStyle, description: '锐利明确的工业设计' }\n]\n\n// 计算属性\nconst themeIcon = computed(() => {\n  return modernThemeStore.isDark ? Sun : Moon\n})\n\n// 方法\nconst toggleTheme = () => {\n  modernThemeStore.toggleMode()\n\n}\n\nconst setThemeMode = (mode: ModernThemeMode) => {\n  modernThemeStore.setMode(mode)\n\n}\n\nconst setThemeColor = (color: ModernThemeColor) => {\n  modernThemeStore.setColor(color)\n\n}\n\nconst getColorButtonClasses = (colorName: string) => [\n  'modern-demo-color-button',\n  {\n    'modern-demo-color-button--active': modernThemeStore.config.color === colorName\n  }\n]\n\nconst toggleAnimations = () => {\n  modernThemeStore.updateConfig({ \n    enableAnimations: !modernThemeStore.config.enableAnimations \n  })\n}\n\nconst toggleBlur = () => {\n  modernThemeStore.updateConfig({ \n    enableBlur: !modernThemeStore.config.enableBlur \n  })\n}\n\nconst toggleCompactMode = () => {\n  modernThemeStore.updateConfig({ \n    compactMode: !modernThemeStore.config.compactMode \n  })\n}\n\nconst toggleReducedMotion = () => {\n  modernThemeStore.updateConfig({ \n    reducedMotion: !modernThemeStore.config.reducedMotion \n  })\n}\n\nconst setComponentStyle = (style: ComponentStyle) => {\n  modernThemeStore.setComponentStyle(style)\n\n  showNotification('success', '风格已切换', `已切换到${getStyleName(style)}`)\n}\n\nconst getStyleName = (style: ComponentStyle): string => {\n  const styleMap = {\n    'modern': '现代风格',
    'classic': '经典风格', \n    'minimal': '简约风格',
    'rounded': '圆润风格',
    'sharp': '锐利风格'
  }\n  return styleMap[style]\n}\n\nconst getCurrentStyleDescription = (): string => {\n  const currentStyle = componentStyles.find(s => s.value === modernThemeStore.config.componentStyle)\n  return currentStyle?.description || '现代设计'\n}\n\nconst simulateLoading = () => {\n  buttonLoading.value = true\n  setTimeout(() => {\n    buttonLoading.value = false\n    showNotification('success', '加载完成', '按钮加载演示完成')\n  }, 2000)\n}\n\nconst handleCardClick = () => {\n\n  showNotification('info', '卡片点击', '您点击了交互式卡片')\n}\n\nconst handleSidebarClick = (item: any) => {\n  console.log('Sidebar item clicked:', item)\n}\n\nconst showNotification = (type: string, title: string, message: string) => {\n  notification.value = {\n    id: Date.now().toString(),\n    type,\n    title,\n    message,\n    duration: 3000\n  }\n  \n  setTimeout(() => {\n    notification.value = null\n  }, 3000)\n}\n\nconst clearNotification = () => {\n  notification.value = null\n}\n\n// 初始化\nonMounted(() => {\n  // 模拟初始加载\n  loading.value = true\n  setTimeout(() => {\n    loading.value = false\n    showNotification('success', '欢迎使用', '现代流畅设计系统加载完成')\n  }, 1500)\n})\n</script>\n\n<style scoped>\n.modern-demo-page {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: var(--modern-spacing-md);\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-xl);\n}\n\n.modern-demo-header {\n  text-align: center;\n  padding: var(--modern-spacing-xl) 0;\n}\n\n.modern-demo-subtitle {\n  color: var(--modern-text-secondary);\n  margin-top: var(--modern-spacing-md);\n  max-width: 600px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.modern-demo-section {\n  width: 100%;\n}\n\n.modern-demo-description {\n  color: var(--modern-text-tertiary);\n  margin-top: var(--modern-spacing-xs);\n}\n\n.modern-demo-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: var(--modern-spacing-lg);\n}\n\n.modern-demo-group {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-md);\n}\n\n.modern-demo-buttons {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--modern-spacing-sm);\n}\n\n.modern-demo-typography {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-md);\n}\n\n.modern-demo-theme-controls {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-xl);\n}\n\n.modern-demo-color-palette {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--modern-spacing-sm);\n}\n\n.modern-demo-color-button {\n  width: 40px;\n  height: 40px;\n  border-radius: var(--modern-radius-md);\n  border: 2px solid transparent;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all var(--modern-duration-fast) var(--modern-easing-ease);\n}\n\n.modern-demo-color-button:hover {\n  transform: scale(1.1);\n  box-shadow: var(--modern-shadow-md);\n}\n\n.modern-demo-color-button--active {\n  border-color: var(--modern-text-primary);\n  box-shadow: var(--modern-shadow-lg);\n}\n\n.modern-demo-toggles {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-md);\n}\n\n.modern-demo-toggle {\n  display: flex;\n  align-items: center;\n  gap: var(--modern-spacing-sm);\n  cursor: pointer;\n  font-size: var(--modern-font-size-body);\n  color: var(--modern-text-primary);\n}\n\n.modern-demo-toggle input[type=\"checkbox\"] {\n  width: 20px;\n  height: 20px;\n  border-radius: var(--modern-radius-xs);\n  border: 2px solid var(--modern-divider);\n  appearance: none;\n  cursor: pointer;\n  position: relative;\n  transition: all var(--modern-duration-fast) var(--modern-easing-ease);\n}\n\n.modern-demo-toggle input[type=\"checkbox\"]:checked {\n  background: var(--modern-primary-blue);\n  border-color: var(--modern-primary-blue);\n}\n\n.modern-demo-toggle input[type=\"checkbox\"]:checked::after {\n  content: '';\n  position: absolute;\n  top: 2px;\n  left: 6px;\n  width: 4px;\n  height: 8px;\n  border: solid white;\n  border-width: 0 2px 2px 0;\n  transform: rotate(45deg);\n}\n\n/* 响应式设计 */\n@media (max-width: 768px) {\n  .modern-demo-page {\n    padding: var(--modern-spacing-sm);\n    gap: var(--modern-spacing-lg);\n  }\n  \n  .modern-demo-grid {\n    grid-template-columns: 1fr;\n    gap: var(--modern-spacing-md);\n  }\n  \n  .modern-demo-buttons {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  \n  .modern-demo-color-palette {\n    justify-content: center;\n  }\n}\n\n/* 高对比度模式支持 */\n@media (prefers-contrast: high) {\n  .modern-demo-color-button {\n    border-width: 3px;\n  }\n}\n\n/* 减少动画偏好支持 */\n@media (prefers-reduced-motion: reduce) {\n  .modern-demo-color-button {\n    transition: none;\n  }\n  \n  .modern-demo-color-button:hover {\n    transform: none;\n  }\n  \n  .modern-demo-toggle input[type=\"checkbox\"] {\n    transition: none;\n  }\n}\n</style>", "original_text": null}]
```

```
<template>
  <ModernAppLayout
    app-title="现代流畅设计演示"
    :show-sidebar-toggle="true"
    :show-tab-bar="false"
    :navigation-sections="navigationSections"
    :global-loading="loading"
    loading-text="加载组件演示..."
    :notification="notification"
    @sidebar-item-click="handleSidebarClick"
    @notification-close="clearNotification"
  >
    <template #navigation-trailing>
      <ModernButton
        type="plain"
        size="small"
        @click="toggleTheme"
      >
        <component :is="themeIcon" class="w-5 h-5" />
      </ModernButton>
    </template>

    <div class="modern-demo-page">
      <div class="modern-demo-header">
        <h1 class="modern-typography-large-title">现代流畅设计系统</h1>
        <p class="modern-typography-body modern-demo-subtitle">
          基于清晰、服从、深度三大原则的现代组件库演示
        </p>
      </div>

      <!-- 按钮组件演示 -->
      <ModernCard variant="elevated" class="modern-demo-section">
        <template #header>
          <h2 class="modern-typography-title-2">按钮组件</h2>
          <p class="modern-typography-footnote modern-demo-description">
            多种类型和状态的现代按钮组件
          </p>
        </template>

        <div class="modern-demo-grid">
          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">基础按钮</h3>
            <div class="modern-demo-buttons">
              <ModernButton type="primary">主要按钮</ModernButton>
              <ModernButton type="secondary">次要按钮</ModernButton>
              <ModernButton type="destructive">危险按钮</ModernButton>
              <ModernButton type="plain">朴素按钮</ModernButton>
            </div>
          </div>

          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">按钮尺寸</h3>
            <div class="modern-demo-buttons">
              <ModernButton size="small">小按钮</ModernButton>
              <ModernButton size="medium">中按钮</ModernButton>
              <ModernButton size="large">大按钮</ModernButton>
            </div>
          </div>

          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">按钮状态</h3>
            <div class="modern-demo-buttons">
              <ModernButton :loading="buttonLoading" @click="simulateLoading">
                {{ buttonLoading ? '加载中' : '点击加载' }}
              </ModernButton>
              <ModernButton disabled>禁用按钮</ModernButton>
              <ModernButton rounded>圆角按钮</ModernButton>
            </div>
          </div>
        </div>
      </ModernCard>

      <!-- 卡片组件演示 -->
      <ModernCard variant="elevated" class="modern-demo-section">
        <template #header>
          <h2 class="modern-typography-title-2">卡片组件</h2>
          <p class="modern-typography-footnote modern-demo-description">
            多种变体和交互效果的卡片组件
          </p>
        </template>

        <div class="modern-demo-grid">
          <ModernCard variant="elevated" padding="md">
            <h3 class="modern-typography-headline">悬浮卡片</h3>
            <p class="modern-typography-body">带有阴影效果的悬浮卡片</p>
          </ModernCard>

          <ModernCard variant="outlined" padding="md">
            <h3 class="modern-typography-headline">边框卡片</h3>
            <p class="modern-typography-body">带有边框的简洁卡片</p>
          </ModernCard>

          <ModernCard variant="filled" padding="md">
            <h3 class="modern-typography-headline">填充卡片</h3>
            <p class="modern-typography-body">带有背景填充的卡片</p>
          </ModernCard>

          <ModernCard variant="grouped" padding="md" interactive @click="handleCardClick">
            <h3 class="modern-typography-headline">交互卡片</h3>
            <p class="modern-typography-body">可点击的交互式卡片</p>
          </ModernCard>
        </div>
      </ModernCard>

      <!-- 字体系统演示 */\n      <ModernCard variant=\"elevated\" class=\"modern-demo-section\">\n        <template #header>\n          <h2 class=\"modern-typography-title-2\">字体系统</h2>\n          <p class=\"modern-typography-footnote modern-demo-description\">\n            现代流畅的字体层级系统\n          </p>\n        </template>\n\n        <div class=\"modern-demo-typography\">\n          <div class=\"modern-typography-large-title\">大标题 - Large Title</div>\n          <div class=\"modern-typography-title-1\">标题 1 - Title 1</div>\n          <div class=\"modern-typography-title-2\">标题 2 - Title 2</div>\n          <div class=\"modern-typography-title-3\">标题 3 - Title 3</div>\n          <div class=\"modern-typography-headline\">标题 - Headline</div>\n          <div class=\"modern-typography-body\">正文 - Body</div>\n          <div class=\"modern-typography-callout\">说明文字 - Callout</div>\n          <div class=\"modern-typography-subheadline\">子标题 - Subheadline</div>\n          <div class=\"modern-typography-footnote\">脚注 - Footnote</div>\n          <div class=\"modern-typography-caption-1\">说明 1 - Caption 1</div>\n          <div class=\"modern-typography-caption-2\">说明 2 - Caption 2</div>\n        </div>\n      </ModernCard>\n\n      <!-- 主题控制演示 -->\n      <ModernCard variant=\"elevated\" class=\"modern-demo-section\">\n        <template #header>\n          <h2 class=\"modern-typography-title-2\">主题控制</h2>\n          <p class=\"modern-typography-footnote modern-demo-description\">\n            现代主题系统控制面板\n          </p>\n        </template>\n\n        <div class=\"modern-demo-theme-controls\">\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">主题模式</h3>\n            <div class=\"modern-demo-buttons\">\n              <ModernButton \n                :type=\"modernThemeStore.config.mode === 'light' ? 'primary' : 'secondary'\"\n                size=\"small\"\n                @click=\"setThemeMode('light')\"\n              >\n                浅色\n              </ModernButton>\n              <ModernButton \n                :type=\"modernThemeStore.config.mode === 'dark' ? 'primary' : 'secondary'\"\n                size=\"small\"\n                @click=\"setThemeMode('dark')\"\n              >\n                深色\n              </ModernButton>\n              <ModernButton \n                :type=\"modernThemeStore.config.mode === 'auto' ? 'primary' : 'secondary'\"\n                size=\"small\"\n                @click=\"setThemeMode('auto')\"\n              >\n                自动\n              </ModernButton>\n            </div>\n          </div>\n\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">主题色彩</h3>\n            <div class=\"modern-demo-color-palette\">\n              <button\n                v-for=\"color in themeColors\"\n                :key=\"color.name\"\n                :class=\"getColorButtonClasses(color.name)\"\n                :style=\"{ backgroundColor: color.value }\"\n                @click=\"setThemeColor(color.name)\"\n              >\n                <Check v-if=\"modernThemeStore.config.color === color.name\" class=\"w-4 h-4 text-white\" />\n              </button>\n            </div>\n          </div>\n\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">组件风格</h3>\n            <div class=\"modern-demo-buttons\">\n              <ModernButton \n                v-for="style in componentStyles"\n                :key="style.value"\n                :type="modernThemeStore.config.componentStyle === style.value ? 'primary' : 'secondary'"\n                size="small"\n                @click="setComponentStyle(style.value)"\n              >\n                {{ style.name }}\n              </ModernButton>\n            </div>\n            <p class=\"modern-typography-footnote modern-demo-description\">\n              当前风格：{{ getCurrentStyleDescription() }}\n            </p>\n          </div>\n\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">界面选项</h3>\n            <div class=\"modern-demo-toggles\">\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.enableAnimations\"\n                  @change=\"toggleAnimations\"\n                >\n                <span>启用动画</span>\n              </label>\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.enableBlur\"\n                  @change=\"toggleBlur\"\n                >\n                <span>启用模糊效果</span>\n              </label>\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.compactMode\"\n                  @change=\"toggleCompactMode\"\n                >\n                <span>紧凑模式</span>\n              </label>\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.reducedMotion\"\n                  @change=\"toggleReducedMotion\"\n                >\n                <span>减少动画</span>\n              </label>\n            </div>\n          </div>\n        </div>\n      </ModernCard>\n    </div>\n  </ModernAppLayout>\n</template>\n\n<script setup lang=\"ts\">\nimport { ref, computed, onMounted } from 'vue'\nimport { Sun, Moon, Check, Home, Palette, Settings, Layers } from 'lucide-vue-next'\nimport { useModernThemeStore } from '@/stores/modern-theme'\nimport type { ModernThemeMode, ModernThemeColor, ComponentStyle } from '@/stores/modern-theme'\nimport ModernAppLayout from '@/components/layout/modern-app-layout.vue'\nimport { ModernButton, ModernCard } from '@/components/ui'\n\nconst modernThemeStore = useModernThemeStore()\n\n// 状态\nconst loading = ref(false)\nconst buttonLoading = ref(false)\nconst notification = ref<any>(null)\n\n// 导航配置\nconst navigationSections = [\n  {\n    id: 'main',\n    title: '主要功能',\n    items: [\n      { id: 'dashboard', label: '仪表盘', icon: Home, to: '/dashboard' },\n      { id: 'components', label: '组件演示', icon: Layers, to: '/components' },\n      { id: 'theme', label: '主题设置', icon: Palette, to: '/theme' },\n      { id: 'settings', label: '设置', icon: Settings, to: '/settings' }\n    ]\n  }\n]\n\n// 主题色彩选项\nconst themeColors = [\n  { name: 'blue', value: '#007AFF' },\n  { name: 'green', value: '#34C759' },\n  { name: 'purple', value: '#AF52DE' },\n  { name: 'orange', value: '#FF9500' },\n  { name: 'red', value: '#FF3B30' },\n  { name: 'pink', value: '#FF2D92' },\n  { name: 'indigo', value: '#5856D6' },\n  { name: 'teal', value: '#5AC8FA' }\n]\n\n// 组件风格选项\nconst componentStyles = [\n  { name: '现代', value: 'modern' as ComponentStyle, description: '清晰流畅的现代设计' },\n  { name: '经典', value: 'classic' as ComponentStyle, description: '传统稳重的经典设计' },\n  { name: '简约', value: 'minimal' as ComponentStyle, description: '极简主义的纯净设计' },\n  { name: '圆润', value: 'rounded' as ComponentStyle, description: '圆润柔和的可爱设计' },\n  { name: '锐利', value: 'sharp' as ComponentStyle, description: '锐利明确的工业设计' }\n]\n\n// 计算属性\nconst themeIcon = computed(() => {\n  return modernThemeStore.isDark ? Sun : Moon\n})\n\n// 方法\nconst toggleTheme = () => {\n  modernThemeStore.toggleMode()\n\n}\n\nconst setThemeMode = (mode: ModernThemeMode) => {\n  modernThemeStore.setMode(mode)\n\n}\n\nconst setThemeColor = (color: ModernThemeColor) => {\n  modernThemeStore.setColor(color)\n\n}\n\nconst getColorButtonClasses = (colorName: string) => [\n  'modern-demo-color-button',\n  {\n    'modern-demo-color-button--active': modernThemeStore.config.color === colorName\n  }\n]\n\nconst toggleAnimations = () => {\n  modernThemeStore.updateConfig({ \n    enableAnimations: !modernThemeStore.config.enableAnimations \n  })\n}\n\nconst toggleBlur = () => {\n  modernThemeStore.updateConfig({ \n    enableBlur: !modernThemeStore.config.enableBlur \n  })\n}\n\nconst toggleCompactMode = () => {\n  modernThemeStore.updateConfig({ \n    compactMode: !modernThemeStore.config.compactMode \n  })\n}\n\nconst toggleReducedMotion = () => {\n  modernThemeStore.updateConfig({ \n    reducedMotion: !modernThemeStore.config.reducedMotion \n  })\n}\n\nconst setComponentStyle = (style: ComponentStyle) => {\n  modernThemeStore.setComponentStyle(style)\n\n  showNotification('success', '风格已切换', `已切换到${getStyleName(style)}`)\n}\n\nconst getStyleName = (style: ComponentStyle): string => {\n  const styleMap = {\n    'modern': '现代风格',
    'classic': '经典风格', \n    'minimal': '简约风格',
    'rounded': '圆润风格',
    'sharp': '锐利风格'
  }\n  return styleMap[style]\n}\n\nconst getCurrentStyleDescription = (): string => {\n  const currentStyle = componentStyles.find(s => s.value === modernThemeStore.config.componentStyle)\n  return currentStyle?.description || '现代设计'\n}\n\nconst simulateLoading = () => {\n  buttonLoading.value = true\n  setTimeout(() => {\n    buttonLoading.value = false\n    showNotification('success', '加载完成', '按钮加载演示完成')\n  }, 2000)\n}\n\nconst handleCardClick = () => {\n\n  showNotification('info', '卡片点击', '您点击了交互式卡片')\n}\n\nconst handleSidebarClick = (item: any) => {\n  console.log('Sidebar item clicked:', item)\n}\n\nconst showNotification = (type: string, title: string, message: string) => {\n  notification.value = {\n    id: Date.now().toString(),\n    type,\n    title,\n    message,\n    duration: 3000\n  }\n  \n  setTimeout(() => {\n    notification.value = null\n  }, 3000)\n}\n\nconst clearNotification = () => {\n  notification.value = null\n}\n\n// 初始化\nonMounted(() => {\n  // 模拟初始加载\n  loading.value = true\n  setTimeout(() => {\n    loading.value = false\n    showNotification('success', '欢迎使用', '现代流畅设计系统加载完成')\n  }, 1500)\n})\n</script>\n\n<style scoped>\n.modern-demo-page {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: var(--modern-spacing-md);\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-xl);\n}\n\n.modern-demo-header {\n  text-align: center;\n  padding: var(--modern-spacing-xl) 0;\n}\n\n.modern-demo-subtitle {\n  color: var(--modern-text-secondary);\n  margin-top: var(--modern-spacing-md);\n  max-width: 600px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.modern-demo-section {\n  width: 100%;\n}\n\n.modern-demo-description {\n  color: var(--modern-text-tertiary);\n  margin-top: var(--modern-spacing-xs);\n}\n\n.modern-demo-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: var(--modern-spacing-lg);\n}\n\n.modern-demo-group {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-md);\n}\n\n.modern-demo-buttons {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--modern-spacing-sm);\n}\n\n.modern-demo-typography {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-md);\n}\n\n.modern-demo-theme-controls {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-xl);\n}\n\n.modern-demo-color-palette {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--modern-spacing-sm);\n}\n\n.modern-demo-color-button {\n  width: 40px;\n  height: 40px;\n  border-radius: var(--modern-radius-md);\n  border: 2px solid transparent;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all var(--modern-duration-fast) var(--modern-easing-ease);\n}\n\n.modern-demo-color-button:hover {\n  transform: scale(1.1);\n  box-shadow: var(--modern-shadow-md);\n}\n\n.modern-demo-color-button--active {\n  border-color: var(--modern-text-primary);\n  box-shadow: var(--modern-shadow-lg);\n}\n\n.modern-demo-toggles {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-md);\n}\n\n.modern-demo-toggle {\n  display: flex;\n  align-items: center;\n  gap: var(--modern-spacing-sm);\n  cursor: pointer;\n  font-size: var(--modern-font-size-body);\n  color: var(--modern-text-primary);\n}\n\n.modern-demo-toggle input[type=\"checkbox\"] {\n  width: 20px;\n  height: 20px;\n  border-radius: var(--modern-radius-xs);\n  border: 2px solid var(--modern-divider);\n  appearance: none;\n  cursor: pointer;\n  position: relative;\n  transition: all var(--modern-duration-fast) var(--modern-easing-ease);\n}\n\n.modern-demo-toggle input[type=\"checkbox\"]:checked {\n  background: var(--modern-primary-blue);\n  border-color: var(--modern-primary-blue);\n}\n\n.modern-demo-toggle input[type=\"checkbox\"]:checked::after {\n  content: '';\n  position: absolute;\n  top: 2px;\n  left: 6px;\n  width: 4px;\n  height: 8px;\n  border: solid white;\n  border-width: 0 2px 2px 0;\n  transform: rotate(45deg);\n}\n\n/* 响应式设计 */\n@media (max-width: 768px) {\n  .modern-demo-page {\n    padding: var(--modern-spacing-sm);\n    gap: var(--modern-spacing-lg);\n  }\n  \n  .modern-demo-grid {\n    grid-template-columns: 1fr;\n    gap: var(--modern-spacing-md);\n  }\n  \n  .modern-demo-buttons {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  \n  .modern-demo-color-palette {\n    justify-content: center;\n  }\n}\n\n/* 高对比度模式支持 */\n@media (prefers-contrast: high) {\n  .modern-demo-color-button {\n    border-width: 3px;\n  }\n}\n\n/* 减少动画偏好支持 */\n@media (prefers-reduced-motion: reduce) {\n  .modern-demo-color-button {\n    transition: none;\n  }\n  \n  .modern-demo-color-button:hover {\n    transform: none;\n  }\n  \n  .modern-demo-toggle input[type=\"checkbox\"] {\n    transition: none;\n  }\n}\n</style>", "original_text": null}]
```

```
<template>
  <ModernAppLayout
    app-title="现代流畅设计演示"
    :show-sidebar-toggle="true"
    :show-tab-bar="false"
    :navigation-sections="navigationSections"
    :global-loading="loading"
    loading-text="加载组件演示..."
    :notification="notification"
    @sidebar-item-click="handleSidebarClick"
    @notification-close="clearNotification"
  >
    <template #navigation-trailing>
      <ModernButton
        type="plain"
        size="small"
        @click="toggleTheme"
      >
        <component :is="themeIcon" class="w-5 h-5" />
      </ModernButton>
    </template>

    <div class="modern-demo-page">
      <div class="modern-demo-header">
        <h1 class="modern-typography-large-title">现代流畅设计系统</h1>
        <p class="modern-typography-body modern-demo-subtitle">
          基于清晰、服从、深度三大原则的现代组件库演示
        </p>
      </div>

      <!-- 按钮组件演示 -->
      <ModernCard variant="elevated" class="modern-demo-section">
        <template #header>
          <h2 class="modern-typography-title-2">按钮组件</h2>
          <p class="modern-typography-footnote modern-demo-description">
            多种类型和状态的现代按钮组件
          </p>
        </template>

        <div class="modern-demo-grid">
          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">基础按钮</h3>
            <div class="modern-demo-buttons">
              <ModernButton type="primary">主要按钮</ModernButton>
              <ModernButton type="secondary">次要按钮</ModernButton>
              <ModernButton type="destructive">危险按钮</ModernButton>
              <ModernButton type="plain">朴素按钮</ModernButton>
            </div>
          </div>

          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">按钮尺寸</h3>
            <div class="modern-demo-buttons">
              <ModernButton size="small">小按钮</ModernButton>
              <ModernButton size="medium">中按钮</ModernButton>
              <ModernButton size="large">大按钮</ModernButton>
            </div>
          </div>

          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">按钮状态</h3>
            <div class="modern-demo-buttons">
              <ModernButton :loading="buttonLoading" @click="simulateLoading">
                {{ buttonLoading ? '加载中' : '点击加载' }}
              </ModernButton>
              <ModernButton disabled>禁用按钮</ModernButton>
              <ModernButton rounded>圆角按钮</ModernButton>
            </div>
          </div>
        </div>
      </ModernCard>

      <!-- 卡片组件演示 -->
      <ModernCard variant="elevated" class="modern-demo-section">
        <template #header>
          <h2 class="modern-typography-title-2">卡片组件</h2>
          <p class="modern-typography-footnote modern-demo-description">
            多种变体和交互效果的卡片组件
          </p>
        </template>

        <div class="modern-demo-grid">
          <ModernCard variant="elevated" padding="md">
            <h3 class="modern-typography-headline">悬浮卡片</h3>
            <p class="modern-typography-body">带有阴影效果的悬浮卡片</p>
          </ModernCard>

          <ModernCard variant="outlined" padding="md">
            <h3 class="modern-typography-headline">边框卡片</h3>
            <p class="modern-typography-body">带有边框的简洁卡片</p>
          </ModernCard>

          <ModernCard variant="filled" padding="md">
            <h3 class="modern-typography-headline">填充卡片</h3>
            <p class="modern-typography-body">带有背景填充的卡片</p>
          </ModernCard>

          <ModernCard variant="grouped" padding="md" interactive @click="handleCardClick">
            <h3 class="modern-typography-headline">交互卡片</h3>
            <p class="modern-typography-body">可点击的交互式卡片</p>
          </ModernCard>
        </div>
      </ModernCard>

      <!-- 字体系统演示 */\n      <ModernCard variant=\"elevated\" class=\"modern-demo-section\">\n        <template #header>\n          <h2 class=\"modern-typography-title-2\">字体系统</h2>\n          <p class=\"modern-typography-footnote modern-demo-description\">\n            现代流畅的字体层级系统\n          </p>\n        </template>\n\n        <div class=\"modern-demo-typography\">\n          <div class=\"modern-typography-large-title\">大标题 - Large Title</div>\n          <div class=\"modern-typography-title-1\">标题 1 - Title 1</div>\n          <div class=\"modern-typography-title-2\">标题 2 - Title 2</div>\n          <div class=\"modern-typography-title-3\">标题 3 - Title 3</div>\n          <div class=\"modern-typography-headline\">标题 - Headline</div>\n          <div class=\"modern-typography-body\">正文 - Body</div>\n          <div class=\"modern-typography-callout\">说明文字 - Callout</div>\n          <div class=\"modern-typography-subheadline\">子标题 - Subheadline</div>\n          <div class=\"modern-typography-footnote\">脚注 - Footnote</div>\n          <div class=\"modern-typography-caption-1\">说明 1 - Caption 1</div>\n          <div class=\"modern-typography-caption-2\">说明 2 - Caption 2</div>\n        </div>\n      </ModernCard>\n\n      <!-- 主题控制演示 -->\n      <ModernCard variant=\"elevated\" class=\"modern-demo-section\">\n        <template #header>\n          <h2 class=\"modern-typography-title-2\">主题控制</h2>\n          <p class=\"modern-typography-footnote modern-demo-description\">\n            现代主题系统控制面板\n          </p>\n        </template>\n\n        <div class=\"modern-demo-theme-controls\">\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">主题模式</h3>\n            <div class=\"modern-demo-buttons\">\n              <ModernButton \n                :type=\"modernThemeStore.config.mode === 'light' ? 'primary' : 'secondary'\"\n                size=\"small\"\n                @click=\"setThemeMode('light')\"\n              >\n                浅色\n              </ModernButton>\n              <ModernButton \n                :type=\"modernThemeStore.config.mode === 'dark' ? 'primary' : 'secondary'\"\n                size=\"small\"\n                @click=\"setThemeMode('dark')\"\n              >\n                深色\n              </ModernButton>\n              <ModernButton \n                :type=\"modernThemeStore.config.mode === 'auto' ? 'primary' : 'secondary'\"\n                size=\"small\"\n                @click=\"setThemeMode('auto')\"\n              >\n                自动\n              </ModernButton>\n            </div>\n          </div>\n\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">主题色彩</h3>\n            <div class=\"modern-demo-color-palette\">\n              <button\n                v-for=\"color in themeColors\"\n                :key=\"color.name\"\n                :class=\"getColorButtonClasses(color.name)\"\n                :style=\"{ backgroundColor: color.value }\"\n                @click=\"setThemeColor(color.name)\"\n              >\n                <Check v-if=\"modernThemeStore.config.color === color.name\" class=\"w-4 h-4 text-white\" />\n              </button>\n            </div>\n          </div>\n\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">组件风格</h3>\n            <div class=\"modern-demo-buttons\">\n              <ModernButton \n                v-for="style in componentStyles"\n                :key="style.value"\n                :type="modernThemeStore.config.componentStyle === style.value ? 'primary' : 'secondary'"\n                size="small"\n                @click="setComponentStyle(style.value)"\n              >\n                {{ style.name }}\n              </ModernButton>\n            </div>\n            <p class=\"modern-typography-footnote modern-demo-description\">\n              当前风格：{{ getCurrentStyleDescription() }}\n            </p>\n          </div>\n\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">界面选项</h3>\n            <div class=\"modern-demo-toggles\">\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.enableAnimations\"\n                  @change=\"toggleAnimations\"\n                >\n                <span>启用动画</span>\n              </label>\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.enableBlur\"\n                  @change=\"toggleBlur\"\n                >\n                <span>启用模糊效果</span>\n              </label>\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.compactMode\"\n                  @change=\"toggleCompactMode\"\n                >\n                <span>紧凑模式</span>\n              </label>\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.reducedMotion\"\n                  @change=\"toggleReducedMotion\"\n                >\n                <span>减少动画</span>\n              </label>\n            </div>\n          </div>\n        </div>\n      </ModernCard>\n    </div>\n  </ModernAppLayout>\n</template>\n\n<script setup lang=\"ts\">\nimport { ref, computed, onMounted } from 'vue'\nimport { Sun, Moon, Check, Home, Palette, Settings, Layers } from 'lucide-vue-next'\nimport { useModernThemeStore } from '@/stores/modern-theme'\nimport type { ModernThemeMode, ModernThemeColor, ComponentStyle } from '@/stores/modern-theme'\nimport ModernAppLayout from '@/components/layout/modern-app-layout.vue'\nimport { ModernButton, ModernCard } from '@/components/ui'\n\nconst modernThemeStore = useModernThemeStore()\n\n// 状态\nconst loading = ref(false)\nconst buttonLoading = ref(false)\nconst notification = ref<any>(null)\n\n// 导航配置\nconst navigationSections = [\n  {\n    id: 'main',\n    title: '主要功能',\n    items: [\n      { id: 'dashboard', label: '仪表盘', icon: Home, to: '/dashboard' },\n      { id: 'components', label: '组件演示', icon: Layers, to: '/components' },\n      { id: 'theme', label: '主题设置', icon: Palette, to: '/theme' },\n      { id: 'settings', label: '设置', icon: Settings, to: '/settings' }\n    ]\n  }\n]\n\n// 主题色彩选项\nconst themeColors = [\n  { name: 'blue', value: '#007AFF' },\n  { name: 'green', value: '#34C759' },\n  { name: 'purple', value: '#AF52DE' },\n  { name: 'orange', value: '#FF9500' },\n  { name: 'red', value: '#FF3B30' },\n  { name: 'pink', value: '#FF2D92' },\n  { name: 'indigo', value: '#5856D6' },\n  { name: 'teal', value: '#5AC8FA' }\n]\n\n// 组件风格选项\nconst componentStyles = [\n  { name: '现代', value: 'modern' as ComponentStyle, description: '清晰流畅的现代设计' },\n  { name: '经典', value: 'classic' as ComponentStyle, description: '传统稳重的经典设计' },\n  { name: '简约', value: 'minimal' as ComponentStyle, description: '极简主义的纯净设计' },\n  { name: '圆润', value: 'rounded' as ComponentStyle, description: '圆润柔和的可爱设计' },\n  { name: '锐利', value: 'sharp' as ComponentStyle, description: '锐利明确的工业设计' }\n]\n\n// 计算属性\nconst themeIcon = computed(() => {\n  return modernThemeStore.isDark ? Sun : Moon\n})\n\n// 方法\nconst toggleTheme = () => {\n  modernThemeStore.toggleMode()\n\n}\n\nconst setThemeMode = (mode: ModernThemeMode) => {\n  modernThemeStore.setMode(mode)\n\n}\n\nconst setThemeColor = (color: ModernThemeColor) => {\n  modernThemeStore.setColor(color)\n\n}\n\nconst getColorButtonClasses = (colorName: string) => [\n  'modern-demo-color-button',\n  {\n    'modern-demo-color-button--active': modernThemeStore.config.color === colorName\n  }\n]\n\nconst toggleAnimations = () => {\n  modernThemeStore.updateConfig({ \n    enableAnimations: !modernThemeStore.config.enableAnimations \n  })\n}\n\nconst toggleBlur = () => {\n  modernThemeStore.updateConfig({ \n    enableBlur: !modernThemeStore.config.enableBlur \n  })\n}\n\nconst toggleCompactMode = () => {\n  modernThemeStore.updateConfig({ \n    compactMode: !modernThemeStore.config.compactMode \n  })\n}\n\nconst toggleReducedMotion = () => {\n  modernThemeStore.updateConfig({ \n    reducedMotion: !modernThemeStore.config.reducedMotion \n  })\n}\n\nconst setComponentStyle = (style: ComponentStyle) => {\n  modernThemeStore.setComponentStyle(style)\n\n  showNotification('success', '风格已切换', `已切换到${getStyleName(style)}`)\n}\n\nconst getStyleName = (style: ComponentStyle): string => {\n  const styleMap = {\n    'modern': '现代风格',
    'classic': '经典风格', \n    'minimal': '简约风格',
    'rounded': '圆润风格',
    'sharp': '锐利风格'
  }\n  return styleMap[style]\n}\n\nconst getCurrentStyleDescription = (): string => {\n  const currentStyle = componentStyles.find(s => s.value === modernThemeStore.config.componentStyle)\n  return currentStyle?.description || '现代设计'\n}\n\nconst simulateLoading = () => {\n  buttonLoading.value = true\n  setTimeout(() => {\n    buttonLoading.value = false\n    showNotification('success', '加载完成', '按钮加载演示完成')\n  }, 2000)\n}\n\nconst handleCardClick = () => {\n\n  showNotification('info', '卡片点击', '您点击了交互式卡片')\n}\n\nconst handleSidebarClick = (item: any) => {\n  console.log('Sidebar item clicked:', item)\n}\n\nconst showNotification = (type: string, title: string, message: string) => {\n  notification.value = {\n    id: Date.now().toString(),\n    type,\n    title,\n    message,\n    duration: 3000\n  }\n  \n  setTimeout(() => {\n    notification.value = null\n  }, 3000)\n}\n\nconst clearNotification = () => {\n  notification.value = null\n}\n\n// 初始化\nonMounted(() => {\n  // 模拟初始加载\n  loading.value = true\n  setTimeout(() => {\n    loading.value = false\n    showNotification('success', '欢迎使用', '现代流畅设计系统加载完成')\n  }, 1500)\n})\n</script>\n\n<style scoped>\n.modern-demo-page {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: var(--modern-spacing-md);\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-xl);\n}\n\n.modern-demo-header {\n  text-align: center;\n  padding: var(--modern-spacing-xl) 0;\n}\n\n.modern-demo-subtitle {\n  color: var(--modern-text-secondary);\n  margin-top: var(--modern-spacing-md);\n  max-width: 600px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.modern-demo-section {\n  width: 100%;\n}\n\n.modern-demo-description {\n  color: var(--modern-text-tertiary);\n  margin-top: var(--modern-spacing-xs);\n}\n\n.modern-demo-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: var(--modern-spacing-lg);\n}\n\n.modern-demo-group {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-md);\n}\n\n.modern-demo-buttons {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--modern-spacing-sm);\n}\n\n.modern-demo-typography {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-md);\n}\n\n.modern-demo-theme-controls {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-xl);\n}\n\n.modern-demo-color-palette {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--modern-spacing-sm);\n}\n\n.modern-demo-color-button {\n  width: 40px;\n  height: 40px;\n  border-radius: var(--modern-radius-md);\n  border: 2px solid transparent;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all var(--modern-duration-fast) var(--modern-easing-ease);\n}\n\n.modern-demo-color-button:hover {\n  transform: scale(1.1);\n  box-shadow: var(--modern-shadow-md);\n}\n\n.modern-demo-color-button--active {\n  border-color: var(--modern-text-primary);\n  box-shadow: var(--modern-shadow-lg);\n}\n\n.modern-demo-toggles {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-md);\n}\n\n.modern-demo-toggle {\n  display: flex;\n  align-items: center;\n  gap: var(--modern-spacing-sm);\n  cursor: pointer;\n  font-size: var(--modern-font-size-body);\n  color: var(--modern-text-primary);\n}\n\n.modern-demo-toggle input[type=\"checkbox\"] {\n  width: 20px;\n  height: 20px;\n  border-radius: var(--modern-radius-xs);\n  border: 2px solid var(--modern-divider);\n  appearance: none;\n  cursor: pointer;\n  position: relative;\n  transition: all var(--modern-duration-fast) var(--modern-easing-ease);\n}\n\n.modern-demo-toggle input[type=\"checkbox\"]:checked {\n  background: var(--modern-primary-blue);\n  border-color: var(--modern-primary-blue);\n}\n\n.modern-demo-toggle input[type=\"checkbox\"]:checked::after {\n  content: '';\n  position: absolute;\n  top: 2px;\n  left: 6px;\n  width: 4px;\n  height: 8px;\n  border: solid white;\n  border-width: 0 2px 2px 0;\n  transform: rotate(45deg);\n}\n\n/* 响应式设计 */\n@media (max-width: 768px) {\n  .modern-demo-page {\n    padding: var(--modern-spacing-sm);\n    gap: var(--modern-spacing-lg);\n  }\n  \n  .modern-demo-grid {\n    grid-template-columns: 1fr;\n    gap: var(--modern-spacing-md);\n  }\n  \n  .modern-demo-buttons {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  \n  .modern-demo-color-palette {\n    justify-content: center;\n  }\n}\n\n/* 高对比度模式支持 */\n@media (prefers-contrast: high) {\n  .modern-demo-color-button {\n    border-width: 3px;\n  }\n}\n\n/* 减少动画偏好支持 */\n@media (prefers-reduced-motion: reduce) {\n  .modern-demo-color-button {\n    transition: none;\n  }\n  \n  .modern-demo-color-button:hover {\n    transform: none;\n  }\n  \n  .modern-demo-toggle input[type=\"checkbox\"] {\n    transition: none;\n  }\n}\n</style>", "original_text": null}]
```

```
<template>
  <ModernAppLayout
    app-title="现代流畅设计演示"
    :show-sidebar-toggle="true"
    :show-tab-bar="false"
    :navigation-sections="navigationSections"
    :global-loading="loading"
    loading-text="加载组件演示..."
    :notification="notification"
    @sidebar-item-click="handleSidebarClick"
    @notification-close="clearNotification"
  >
    <template #navigation-trailing>
      <ModernButton
        type="plain"
        size="small"
        @click="toggleTheme"
      >
        <component :is="themeIcon" class="w-5 h-5" />
      </ModernButton>
    </template>

    <div class="modern-demo-page">
      <div class="modern-demo-header">
        <h1 class="modern-typography-large-title">现代流畅设计系统</h1>
        <p class="modern-typography-body modern-demo-subtitle">
          基于清晰、服从、深度三大原则的现代组件库演示
        </p>
      </div>

      <!-- 按钮组件演示 -->
      <ModernCard variant="elevated" class="modern-demo-section">
        <template #header>
          <h2 class="modern-typography-title-2">按钮组件</h2>
          <p class="modern-typography-footnote modern-demo-description">
            多种类型和状态的现代按钮组件
          </p>
        </template>

        <div class="modern-demo-grid">
          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">基础按钮</h3>
            <div class="modern-demo-buttons">
              <ModernButton type="primary">主要按钮</ModernButton>
              <ModernButton type="secondary">次要按钮</ModernButton>
              <ModernButton type="destructive">危险按钮</ModernButton>
              <ModernButton type="plain">朴素按钮</ModernButton>
            </div>
          </div>

          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">按钮尺寸</h3>
            <div class="modern-demo-buttons">
              <ModernButton size="small">小按钮</ModernButton>
              <ModernButton size="medium">中按钮</ModernButton>
              <ModernButton size="large">大按钮</ModernButton>
            </div>
          </div>

          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">按钮状态</h3>
            <div class="modern-demo-buttons">
              <ModernButton :loading="buttonLoading" @click="simulateLoading">
                {{ buttonLoading ? '加载中' : '点击加载' }}
              </ModernButton>
              <ModernButton disabled>禁用按钮</ModernButton>
              <ModernButton rounded>圆角按钮</ModernButton>
            </div>
          </div>
        </div>
      </ModernCard>

      <!-- 卡片组件演示 -->
      <ModernCard variant="elevated" class="modern-demo-section">
        <template #header>
          <h2 class="modern-typography-title-2">卡片组件</h2>
          <p class="modern-typography-footnote modern-demo-description">
            多种变体和交互效果的卡片组件
          </p>
        </template>

        <div class="modern-demo-grid">
          <ModernCard variant="elevated" padding="md">
            <h3 class="modern-typography-headline">悬浮卡片</h3>
            <p class="modern-typography-body">带有阴影效果的悬浮卡片</p>
          </ModernCard>

          <ModernCard variant="outlined" padding="md">
            <h3 class="modern-typography-headline">边框卡片</h3>
            <p class="modern-typography-body">带有边框的简洁卡片</p>
          </ModernCard>

          <ModernCard variant="filled" padding="md">
            <h3 class="modern-typography-headline">填充卡片</h3>
            <p class="modern-typography-body">带有背景填充的卡片</p>
          </ModernCard>

          <ModernCard variant="grouped" padding="md" interactive @click="handleCardClick">
            <h3 class="modern-typography-headline">交互卡片</h3>
            <p class="modern-typography-body">可点击的交互式卡片</p>
          </ModernCard>
        </div>
      </ModernCard>

      <!-- 字体系统演示 */\n      <ModernCard variant=\"elevated\" class=\"modern-demo-section\">\n        <template #header>\n          <h2 class=\"modern-typography-title-2\">字体系统</h2>\n          <p class=\"modern-typography-footnote modern-demo-description\">\n            现代流畅的字体层级系统\n          </p>\n        </template>\n\n        <div class=\"modern-demo-typography\">\n          <div class=\"modern-typography-large-title\">大标题 - Large Title</div>\n          <div class=\"modern-typography-title-1\">标题 1 - Title 1</div>\n          <div class=\"modern-typography-title-2\">标题 2 - Title 2</div>\n          <div class=\"modern-typography-title-3\">标题 3 - Title 3</div>\n          <div class=\"modern-typography-headline\">标题 - Headline</div>\n          <div class=\"modern-typography-body\">正文 - Body</div>\n          <div class=\"modern-typography-callout\">说明文字 - Callout</div>\n          <div class=\"modern-typography-subheadline\">子标题 - Subheadline</div>\n          <div class=\"modern-typography-footnote\">脚注 - Footnote</div>\n          <div class=\"modern-typography-caption-1\">说明 1 - Caption 1</div>\n          <div class=\"modern-typography-caption-2\">说明 2 - Caption 2</div>\n        </div>\n      </ModernCard>\n\n      <!-- 主题控制演示 -->\n      <ModernCard variant=\"elevated\" class=\"modern-demo-section\">\n        <template #header>\n          <h2 class=\"modern-typography-title-2\">主题控制</h2>\n          <p class=\"modern-typography-footnote modern-demo-description\">\n            现代主题系统控制面板\n          </p>\n        </template>\n\n        <div class=\"modern-demo-theme-controls\">\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">主题模式</h3>\n            <div class=\"modern-demo-buttons\">\n              <ModernButton \n                :type=\"modernThemeStore.config.mode === 'light' ? 'primary' : 'secondary'\"\n                size=\"small\"\n                @click=\"setThemeMode('light')\"\n              >\n                浅色\n              </ModernButton>\n              <ModernButton \n                :type=\"modernThemeStore.config.mode === 'dark' ? 'primary' : 'secondary'\"\n                size=\"small\"\n                @click=\"setThemeMode('dark')\"\n              >\n                深色\n              </ModernButton>\n              <ModernButton \n                :type=\"modernThemeStore.config.mode === 'auto' ? 'primary' : 'secondary'\"\n                size=\"small\"\n                @click=\"setThemeMode('auto')\"\n              >\n                自动\n              </ModernButton>\n            </div>\n          </div>\n\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">主题色彩</h3>\n            <div class=\"modern-demo-color-palette\">\n              <button\n                v-for=\"color in themeColors\"\n                :key=\"color.name\"\n                :class=\"getColorButtonClasses(color.name)\"\n                :style=\"{ backgroundColor: color.value }\"\n                @click=\"setThemeColor(color.name)\"\n              >\n                <Check v-if=\"modernThemeStore.config.color === color.name\" class=\"w-4 h-4 text-white\" />\n              </button>\n            </div>\n          </div>\n\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">组件风格</h3>\n            <div class=\"modern-demo-buttons\">\n              <ModernButton \n                v-for="style in componentStyles"\n                :key="style.value"\n                :type="modernThemeStore.config.componentStyle === style.value ? 'primary' : 'secondary'"\n                size="small"\n                @click="setComponentStyle(style.value)"\n              >\n                {{ style.name }}\n              </ModernButton>\n            </div>\n            <p class=\"modern-typography-footnote modern-demo-description\">\n              当前风格：{{ getCurrentStyleDescription() }}\n            </p>\n          </div>\n\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">界面选项</h3>\n            <div class=\"modern-demo-toggles\">\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.enableAnimations\"\n                  @change=\"toggleAnimations\"\n                >\n                <span>启用动画</span>\n              </label>\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.enableBlur\"\n                  @change=\"toggleBlur\"\n                >\n                <span>启用模糊效果</span>\n              </label>\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.compactMode\"\n                  @change=\"toggleCompactMode\"\n                >\n                <span>紧凑模式</span>\n              </label>\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.reducedMotion\"\n                  @change=\"toggleReducedMotion\"\n                >\n                <span>减少动画</span>\n              </label>\n            </div>\n          </div>\n        </div>\n      </ModernCard>\n    </div>\n  </ModernAppLayout>\n</template>\n\n<script setup lang=\"ts\">\nimport { ref, computed, onMounted } from 'vue'\nimport { Sun, Moon, Check, Home, Palette, Settings, Layers } from 'lucide-vue-next'\nimport { useModernThemeStore } from '@/stores/modern-theme'\nimport type { ModernThemeMode, ModernThemeColor, ComponentStyle } from '@/stores/modern-theme'\nimport ModernAppLayout from '@/components/layout/modern-app-layout.vue'\nimport { ModernButton, ModernCard } from '@/components/ui'\n\nconst modernThemeStore = useModernThemeStore()\n\n// 状态\nconst loading = ref(false)\nconst buttonLoading = ref(false)\nconst notification = ref<any>(null)\n\n// 导航配置\nconst navigationSections = [\n  {\n    id: 'main',\n    title: '主要功能',\n    items: [\n      { id: 'dashboard', label: '仪表盘', icon: Home, to: '/dashboard' },\n      { id: 'components', label: '组件演示', icon: Layers, to: '/components' },\n      { id: 'theme', label: '主题设置', icon: Palette, to: '/theme' },\n      { id: 'settings', label: '设置', icon: Settings, to: '/settings' }\n    ]\n  }\n]\n\n// 主题色彩选项\nconst themeColors = [\n  { name: 'blue', value: '#007AFF' },\n  { name: 'green', value: '#34C759' },\n  { name: 'purple', value: '#AF52DE' },\n  { name: 'orange', value: '#FF9500' },\n  { name: 'red', value: '#FF3B30' },\n  { name: 'pink', value: '#FF2D92' },\n  { name: 'indigo', value: '#5856D6' },\n  { name: 'teal', value: '#5AC8FA' }\n]\n\n// 组件风格选项\nconst componentStyles = [\n  { name: '现代', value: 'modern' as ComponentStyle, description: '清晰流畅的现代设计' },\n  { name: '经典', value: 'classic' as ComponentStyle, description: '传统稳重的经典设计' },\n  { name: '简约', value: 'minimal' as ComponentStyle, description: '极简主义的纯净设计' },\n  { name: '圆润', value: 'rounded' as ComponentStyle, description: '圆润柔和的可爱设计' },\n  { name: '锐利', value: 'sharp' as ComponentStyle, description: '锐利明确的工业设计' }\n]\n\n// 计算属性\nconst themeIcon = computed(() => {\n  return modernThemeStore.isDark ? Sun : Moon\n})\n\n// 方法\nconst toggleTheme = () => {\n  modernThemeStore.toggleMode()\n\n}\n\nconst setThemeMode = (mode: ModernThemeMode) => {\n  modernThemeStore.setMode(mode)\n\n}\n\nconst setThemeColor = (color: ModernThemeColor) => {\n  modernThemeStore.setColor(color)\n\n}\n\nconst getColorButtonClasses = (colorName: string) => [\n  'modern-demo-color-button',\n  {\n    'modern-demo-color-button--active': modernThemeStore.config.color === colorName\n  }\n]\n\nconst toggleAnimations = () => {\n  modernThemeStore.updateConfig({ \n    enableAnimations: !modernThemeStore.config.enableAnimations \n  })\n}\n\nconst toggleBlur = () => {\n  modernThemeStore.updateConfig({ \n    enableBlur: !modernThemeStore.config.enableBlur \n  })\n}\n\nconst toggleCompactMode = () => {\n  modernThemeStore.updateConfig({ \n    compactMode: !modernThemeStore.config.compactMode \n  })\n}\n\nconst toggleReducedMotion = () => {\n  modernThemeStore.updateConfig({ \n    reducedMotion: !modernThemeStore.config.reducedMotion \n  })\n}\n\nconst setComponentStyle = (style: ComponentStyle) => {\n  modernThemeStore.setComponentStyle(style)\n\n  showNotification('success', '风格已切换', `已切换到${getStyleName(style)}`)\n}\n\nconst getStyleName = (style: ComponentStyle): string => {\n  const styleMap = {\n    'modern': '现代风格',
    'classic': '经典风格', \n    'minimal': '简约风格',
    'rounded': '圆润风格',
    'sharp': '锐利风格'
  }\n  return styleMap[style]\n}\n\nconst getCurrentStyleDescription = (): string => {\n  const currentStyle = componentStyles.find(s => s.value === modernThemeStore.config.componentStyle)\n  return currentStyle?.description || '现代设计'\n}\n\nconst simulateLoading = () => {\n  buttonLoading.value = true\n  setTimeout(() => {\n    buttonLoading.value = false\n    showNotification('success', '加载完成', '按钮加载演示完成')\n  }, 2000)\n}\n\nconst handleCardClick = () => {\n\n  showNotification('info', '卡片点击', '您点击了交互式卡片')\n}\n\nconst handleSidebarClick = (item: any) => {\n  console.log('Sidebar item clicked:', item)\n}\n\nconst showNotification = (type: string, title: string, message: string) => {\n  notification.value = {\n    id: Date.now().toString(),\n    type,\n    title,\n    message,\n    duration: 3000\n  }\n  \n  setTimeout(() => {\n    notification.value = null\n  }, 3000)\n}\n\nconst clearNotification = () => {\n  notification.value = null\n}\n\n// 初始化\nonMounted(() => {\n  // 模拟初始加载\n  loading.value = true\n  setTimeout(() => {\n    loading.value = false\n    showNotification('success', '欢迎使用', '现代流畅设计系统加载完成')\n  }, 1500)\n})\n</script>\n\n<style scoped>\n.modern-demo-page {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: var(--modern-spacing-md);\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-xl);\n}\n\n.modern-demo-header {\n  text-align: center;\n  padding: var(--modern-spacing-xl) 0;\n}\n\n.modern-demo-subtitle {\n  color: var(--modern-text-secondary);\n  margin-top: var(--modern-spacing-md);\n  max-width: 600px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.modern-demo-section {\n  width: 100%;\n}\n\n.modern-demo-description {\n  color: var(--modern-text-tertiary);\n  margin-top: var(--modern-spacing-xs);\n}\n\n.modern-demo-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: var(--modern-spacing-lg);\n}\n\n.modern-demo-group {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-md);\n}\n\n.modern-demo-buttons {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--modern-spacing-sm);\n}\n\n.modern-demo-typography {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-md);\n}\n\n.modern-demo-theme-controls {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-xl);\n}\n\n.modern-demo-color-palette {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--modern-spacing-sm);\n}\n\n.modern-demo-color-button {\n  width: 40px;\n  height: 40px;\n  border-radius: var(--modern-radius-md);\n  border: 2px solid transparent;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all var(--modern-duration-fast) var(--modern-easing-ease);\n}\n\n.modern-demo-color-button:hover {\n  transform: scale(1.1);\n  box-shadow: var(--modern-shadow-md);\n}\n\n.modern-demo-color-button--active {\n  border-color: var(--modern-text-primary);\n  box-shadow: var(--modern-shadow-lg);\n}\n\n.modern-demo-toggles {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-md);\n}\n\n.modern-demo-toggle {\n  display: flex;\n  align-items: center;\n  gap: var(--modern-spacing-sm);\n  cursor: pointer;\n  font-size: var(--modern-font-size-body);\n  color: var(--modern-text-primary);\n}\n\n.modern-demo-toggle input[type=\"checkbox\"] {\n  width: 20px;\n  height: 20px;\n  border-radius: var(--modern-radius-xs);\n  border: 2px solid var(--modern-divider);\n  appearance: none;\n  cursor: pointer;\n  position: relative;\n  transition: all var(--modern-duration-fast) var(--modern-easing-ease);\n}\n\n.modern-demo-toggle input[type=\"checkbox\"]:checked {\n  background: var(--modern-primary-blue);\n  border-color: var(--modern-primary-blue);\n}\n\n.modern-demo-toggle input[type=\"checkbox\"]:checked::after {\n  content: '';\n  position: absolute;\n  top: 2px;\n  left: 6px;\n  width: 4px;\n  height: 8px;\n  border: solid white;\n  border-width: 0 2px 2px 0;\n  transform: rotate(45deg);\n}\n\n/* 响应式设计 */\n@media (max-width: 768px) {\n  .modern-demo-page {\n    padding: var(--modern-spacing-sm);\n    gap: var(--modern-spacing-lg);\n  }\n  \n  .modern-demo-grid {\n    grid-template-columns: 1fr;\n    gap: var(--modern-spacing-md);\n  }\n  \n  .modern-demo-buttons {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  \n  .modern-demo-color-palette {\n    justify-content: center;\n  }\n}\n\n/* 高对比度模式支持 */\n@media (prefers-contrast: high) {\n  .modern-demo-color-button {\n    border-width: 3px;\n  }\n}\n\n/* 减少动画偏好支持 */\n@media (prefers-reduced-motion: reduce) {\n  .modern-demo-color-button {\n    transition: none;\n  }\n  \n  .modern-demo-color-button:hover {\n    transform: none;\n  }\n  \n  .modern-demo-toggle input[type=\"checkbox\"] {\n    transition: none;\n  }\n}\n</style>", "original_text": null}]
```

```
<template>
  <ModernAppLayout
    app-title="现代流畅设计演示"
    :show-sidebar-toggle="true"
    :show-tab-bar="false"
    :navigation-sections="navigationSections"
    :global-loading="loading"
    loading-text="加载组件演示..."
    :notification="notification"
    @sidebar-item-click="handleSidebarClick"
    @notification-close="clearNotification"
  >
    <template #navigation-trailing>
      <ModernButton
        type="plain"
        size="small"
        @click="toggleTheme"
      >
        <component :is="themeIcon" class="w-5 h-5" />
      </ModernButton>
    </template>

    <div class="modern-demo-page">
      <div class="modern-demo-header">
        <h1 class="modern-typography-large-title">现代流畅设计系统</h1>
        <p class="modern-typography-body modern-demo-subtitle">
          基于清晰、服从、深度三大原则的现代组件库演示
        </p>
      </div>

      <!-- 按钮组件演示 -->
      <ModernCard variant="elevated" class="modern-demo-section">
        <template #header>
          <h2 class="modern-typography-title-2">按钮组件</h2>
          <p class="modern-typography-footnote modern-demo-description">
            多种类型和状态的现代按钮组件
          </p>
        </template>

        <div class="modern-demo-grid">
          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">基础按钮</h3>
            <div class="modern-demo-buttons">
              <ModernButton type="primary">主要按钮</ModernButton>
              <ModernButton type="secondary">次要按钮</ModernButton>
              <ModernButton type="destructive">危险按钮</ModernButton>
              <ModernButton type="plain">朴素按钮</ModernButton>
            </div>
          </div>

          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">按钮尺寸</h3>
            <div class="modern-demo-buttons">
              <ModernButton size="small">小按钮</ModernButton>
              <ModernButton size="medium">中按钮</ModernButton>
              <ModernButton size="large">大按钮</ModernButton>
            </div>
          </div>

          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">按钮状态</h3>
            <div class="modern-demo-buttons">
              <ModernButton :loading="buttonLoading" @click="simulateLoading">
                {{ buttonLoading ? '加载中' : '点击加载' }}
              </ModernButton>
              <ModernButton disabled>禁用按钮</ModernButton>
              <ModernButton rounded>圆角按钮</ModernButton>
            </div>
          </div>
        </div>
      </ModernCard>

      <!-- 卡片组件演示 -->
      <ModernCard variant="elevated" class="modern-demo-section">
        <template #header>
          <h2 class="modern-typography-title-2">卡片组件</h2>
          <p class="modern-typography-footnote modern-demo-description">
            多种变体和交互效果的卡片组件
          </p>
        </template>

        <div class="modern-demo-grid">
          <ModernCard variant="elevated" padding="md">
            <h3 class="modern-typography-headline">悬浮卡片</h3>
            <p class="modern-typography-body">带有阴影效果的悬浮卡片</p>
          </ModernCard>

          <ModernCard variant="outlined" padding="md">
            <h3 class="modern-typography-headline">边框卡片</h3>
            <p class="modern-typography-body">带有边框的简洁卡片</p>
          </ModernCard>

          <ModernCard variant="filled" padding="md">
            <h3 class="modern-typography-headline">填充卡片</h3>
            <p class="modern-typography-body">带有背景填充的卡片</p>
          </ModernCard>

          <ModernCard variant="grouped" padding="md" interactive @click="handleCardClick">
            <h3 class="modern-typography-headline">交互卡片</h3>
            <p class="modern-typography-body">可点击的交互式卡片</p>
          </ModernCard>
        </div>
      </ModernCard>

      <!-- 字体系统演示 */\n      <ModernCard variant=\"elevated\" class=\"modern-demo-section\">\n        <template #header>\n          <h2 class=\"modern-typography-title-2\">字体系统</h2>\n          <p class=\"modern-typography-footnote modern-demo-description\">\n            现代流畅的字体层级系统\n          </p>\n        </template>\n\n        <div class=\"modern-demo-typography\">\n          <div class=\"modern-typography-large-title\">大标题 - Large Title</div>\n          <div class=\"modern-typography-title-1\">标题 1 - Title 1</div>\n          <div class=\"modern-typography-title-2\">标题 2 - Title 2</div>\n          <div class=\"modern-typography-title-3\">标题 3 - Title 3</div>\n          <div class=\"modern-typography-headline\">标题 - Headline</div>\n          <div class=\"modern-typography-body\">正文 - Body</div>\n          <div class=\"modern-typography-callout\">说明文字 - Callout</div>\n          <div class=\"modern-typography-subheadline\">子标题 - Subheadline</div>\n          <div class=\"modern-typography-footnote\">脚注 - Footnote</div>\n          <div class=\"modern-typography-caption-1\">说明 1 - Caption 1</div>\n          <div class=\"modern-typography-caption-2\">说明 2 - Caption 2</div>\n        </div>\n      </ModernCard>\n\n      <!-- 主题控制演示 -->\n      <ModernCard variant=\"elevated\" class=\"modern-demo-section\">\n        <template #header>\n          <h2 class=\"modern-typography-title-2\">主题控制</h2>\n          <p class=\"modern-typography-footnote modern-demo-description\">\n            现代主题系统控制面板\n          </p>\n        </template>\n\n        <div class=\"modern-demo-theme-controls\">\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">主题模式</h3>\n            <div class=\"modern-demo-buttons\">\n              <ModernButton \n                :type=\"modernThemeStore.config.mode === 'light' ? 'primary' : 'secondary'\"\n                size=\"small\"\n                @click=\"setThemeMode('light')\"\n              >\n                浅色\n              </ModernButton>\n              <ModernButton \n                :type=\"modernThemeStore.config.mode === 'dark' ? 'primary' : 'secondary'\"\n                size=\"small\"\n                @click=\"setThemeMode('dark')\"\n              >\n                深色\n              </ModernButton>\n              <ModernButton \n                :type=\"modernThemeStore.config.mode === 'auto' ? 'primary' : 'secondary'\"\n                size=\"small\"\n                @click=\"setThemeMode('auto')\"\n              >\n                自动\n              </ModernButton>\n            </div>\n          </div>\n\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">主题色彩</h3>\n            <div class=\"modern-demo-color-palette\">\n              <button\n                v-for=\"color in themeColors\"\n                :key=\"color.name\"\n                :class=\"getColorButtonClasses(color.name)\"\n                :style=\"{ backgroundColor: color.value }\"\n                @click=\"setThemeColor(color.name)\"\n              >\n                <Check v-if=\"modernThemeStore.config.color === color.name\" class=\"w-4 h-4 text-white\" />\n              </button>\n            </div>\n          </div>\n\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">组件风格</h3>\n            <div class=\"modern-demo-buttons\">\n              <ModernButton \n                v-for="style in componentStyles"\n                :key="style.value"\n                :type="modernThemeStore.config.componentStyle === style.value ? 'primary' : 'secondary'"\n                size="small"\n                @click="setComponentStyle(style.value)"\n              >\n                {{ style.name }}\n              </ModernButton>\n            </div>\n            <p class=\"modern-typography-footnote modern-demo-description\">\n              当前风格：{{ getCurrentStyleDescription() }}\n            </p>\n          </div>\n\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">界面选项</h3>\n            <div class=\"modern-demo-toggles\">\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.enableAnimations\"\n                  @change=\"toggleAnimations\"\n                >\n                <span>启用动画</span>\n              </label>\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.enableBlur\"\n                  @change=\"toggleBlur\"\n                >\n                <span>启用模糊效果</span>\n              </label>\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.compactMode\"\n                  @change=\"toggleCompactMode\"\n                >\n                <span>紧凑模式</span>\n              </label>\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.reducedMotion\"\n                  @change=\"toggleReducedMotion\"\n                >\n                <span>减少动画</span>\n              </label>\n            </div>\n          </div>\n        </div>\n      </ModernCard>\n    </div>\n  </ModernAppLayout>\n</template>\n\n<script setup lang=\"ts\">\nimport { ref, computed, onMounted } from 'vue'\nimport { Sun, Moon, Check, Home, Palette, Settings, Layers } from 'lucide-vue-next'\nimport { useModernThemeStore } from '@/stores/modern-theme'\nimport type { ModernThemeMode, ModernThemeColor, ComponentStyle } from '@/stores/modern-theme'\nimport ModernAppLayout from '@/components/layout/modern-app-layout.vue'\nimport { ModernButton, ModernCard } from '@/components/ui'\n\nconst modernThemeStore = useModernThemeStore()\n\n// 状态\nconst loading = ref(false)\nconst buttonLoading = ref(false)\nconst notification = ref<any>(null)\n\n// 导航配置\nconst navigationSections = [\n  {\n    id: 'main',\n    title: '主要功能',\n    items: [\n      { id: 'dashboard', label: '仪表盘', icon: Home, to: '/dashboard' },\n      { id: 'components', label: '组件演示', icon: Layers, to: '/components' },\n      { id: 'theme', label: '主题设置', icon: Palette, to: '/theme' },\n      { id: 'settings', label: '设置', icon: Settings, to: '/settings' }\n    ]\n  }\n]\n\n// 主题色彩选项\nconst themeColors = [\n  { name: 'blue', value: '#007AFF' },\n  { name: 'green', value: '#34C759' },\n  { name: 'purple', value: '#AF52DE' },\n  { name: 'orange', value: '#FF9500' },\n  { name: 'red', value: '#FF3B30' },\n  { name: 'pink', value: '#FF2D92' },\n  { name: 'indigo', value: '#5856D6' },\n  { name: 'teal', value: '#5AC8FA' }\n]\n\n// 组件风格选项\nconst componentStyles = [\n  { name: '现代', value: 'modern' as ComponentStyle, description: '清晰流畅的现代设计' },\n  { name: '经典', value: 'classic' as ComponentStyle, description: '传统稳重的经典设计' },\n  { name: '简约', value: 'minimal' as ComponentStyle, description: '极简主义的纯净设计' },\n  { name: '圆润', value: 'rounded' as ComponentStyle, description: '圆润柔和的可爱设计' },\n  { name: '锐利', value: 'sharp' as ComponentStyle, description: '锐利明确的工业设计' }\n]\n\n// 计算属性\nconst themeIcon = computed(() => {\n  return modernThemeStore.isDark ? Sun : Moon\n})\n\n// 方法\nconst toggleTheme = () => {\n  modernThemeStore.toggleMode()\n\n}\n\nconst setThemeMode = (mode: ModernThemeMode) => {\n  modernThemeStore.setMode(mode)\n\n}\n\nconst setThemeColor = (color: ModernThemeColor) => {\n  modernThemeStore.setColor(color)\n\n}\n\nconst getColorButtonClasses = (colorName: string) => [\n  'modern-demo-color-button',\n  {\n    'modern-demo-color-button--active': modernThemeStore.config.color === colorName\n  }\n]\n\nconst toggleAnimations = () => {\n  modernThemeStore.updateConfig({ \n    enableAnimations: !modernThemeStore.config.enableAnimations \n  })\n}\n\nconst toggleBlur = () => {\n  modernThemeStore.updateConfig({ \n    enableBlur: !modernThemeStore.config.enableBlur \n  })\n}\n\nconst toggleCompactMode = () => {\n  modernThemeStore.updateConfig({ \n    compactMode: !modernThemeStore.config.compactMode \n  })\n}\n\nconst toggleReducedMotion = () => {\n  modernThemeStore.updateConfig({ \n    reducedMotion: !modernThemeStore.config.reducedMotion \n  })\n}\n\nconst setComponentStyle = (style: ComponentStyle) => {\n  modernThemeStore.setComponentStyle(style)\n\n  showNotification('success', '风格已切换', `已切换到${getStyleName(style)}`)\n}\n\nconst getStyleName = (style: ComponentStyle): string => {\n  const styleMap = {\n    'modern': '现代风格',
    'classic': '经典风格', \n    'minimal': '简约风格',
    'rounded': '圆润风格',
    'sharp': '锐利风格'
  }\n  return styleMap[style]\n}\n\nconst getCurrentStyleDescription = (): string => {\n  const currentStyle = componentStyles.find(s => s.value === modernThemeStore.config.componentStyle)\n  return currentStyle?.description || '现代设计'\n}\n\nconst simulateLoading = () => {\n  buttonLoading.value = true\n  setTimeout(() => {\n    buttonLoading.value = false\n    showNotification('success', '加载完成', '按钮加载演示完成')\n  }, 2000)\n}\n\nconst handleCardClick = () => {\n\n  showNotification('info', '卡片点击', '您点击了交互式卡片')\n}\n\nconst handleSidebarClick = (item: any) => {\n  console.log('Sidebar item clicked:', item)\n}\n\nconst showNotification = (type: string, title: string, message: string) => {\n  notification.value = {\n    id: Date.now().toString(),\n    type,\n    title,\n    message,\n    duration: 3000\n  }\n  \n  setTimeout(() => {\n    notification.value = null\n  }, 3000)\n}\n\nconst clearNotification = () => {\n  notification.value = null\n}\n\n// 初始化\nonMounted(() => {\n  // 模拟初始加载\n  loading.value = true\n  setTimeout(() => {\n    loading.value = false\n    showNotification('success', '欢迎使用', '现代流畅设计系统加载完成')\n  }, 1500)\n})\n</script>\n\n<style scoped>\n.modern-demo-page {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: var(--modern-spacing-md);\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-xl);\n}\n\n.modern-demo-header {\n  text-align: center;\n  padding: var(--modern-spacing-xl) 0;\n}\n\n.modern-demo-subtitle {\n  color: var(--modern-text-secondary);\n  margin-top: var(--modern-spacing-md);\n  max-width: 600px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.modern-demo-section {\n  width: 100%;\n}\n\n.modern-demo-description {\n  color: var(--modern-text-tertiary);\n  margin-top: var(--modern-spacing-xs);\n}\n\n.modern-demo-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: var(--modern-spacing-lg);\n}\n\n.modern-demo-group {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-md);\n}\n\n.modern-demo-buttons {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--modern-spacing-sm);\n}\n\n.modern-demo-typography {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-md);\n}\n\n.modern-demo-theme-controls {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-xl);\n}\n\n.modern-demo-color-palette {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--modern-spacing-sm);\n}\n\n.modern-demo-color-button {\n  width: 40px;\n  height: 40px;\n  border-radius: var(--modern-radius-md);\n  border: 2px solid transparent;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all var(--modern-duration-fast) var(--modern-easing-ease);\n}\n\n.modern-demo-color-button:hover {\n  transform: scale(1.1);\n  box-shadow: var(--modern-shadow-md);\n}\n\n.modern-demo-color-button--active {\n  border-color: var(--modern-text-primary);\n  box-shadow: var(--modern-shadow-lg);\n}\n\n.modern-demo-toggles {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-md);\n}\n\n.modern-demo-toggle {\n  display: flex;\n  align-items: center;\n  gap: var(--modern-spacing-sm);\n  cursor: pointer;\n  font-size: var(--modern-font-size-body);\n  color: var(--modern-text-primary);\n}\n\n.modern-demo-toggle input[type=\"checkbox\"] {\n  width: 20px;\n  height: 20px;\n  border-radius: var(--modern-radius-xs);\n  border: 2px solid var(--modern-divider);\n  appearance: none;\n  cursor: pointer;\n  position: relative;\n  transition: all var(--modern-duration-fast) var(--modern-easing-ease);\n}\n\n.modern-demo-toggle input[type=\"checkbox\"]:checked {\n  background: var(--modern-primary-blue);\n  border-color: var(--modern-primary-blue);\n}\n\n.modern-demo-toggle input[type=\"checkbox\"]:checked::after {\n  content: '';\n  position: absolute;\n  top: 2px;\n  left: 6px;\n  width: 4px;\n  height: 8px;\n  border: solid white;\n  border-width: 0 2px 2px 0;\n  transform: rotate(45deg);\n}\n\n/* 响应式设计 */\n@media (max-width: 768px) {\n  .modern-demo-page {\n    padding: var(--modern-spacing-sm);\n    gap: var(--modern-spacing-lg);\n  }\n  \n  .modern-demo-grid {\n    grid-template-columns: 1fr;\n    gap: var(--modern-spacing-md);\n  }\n  \n  .modern-demo-buttons {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  \n  .modern-demo-color-palette {\n    justify-content: center;\n  }\n}\n\n/* 高对比度模式支持 */\n@media (prefers-contrast: high) {\n  .modern-demo-color-button {\n    border-width: 3px;\n  }\n}\n\n/* 减少动画偏好支持 */\n@media (prefers-reduced-motion: reduce) {\n  .modern-demo-color-button {\n    transition: none;\n  }\n  \n  .modern-demo-color-button:hover {\n    transform: none;\n  }\n  \n  .modern-demo-toggle input[type=\"checkbox\"] {\n    transition: none;\n  }\n}\n</style>", "original_text": null}]
```

```
<template>
  <ModernAppLayout
    app-title="现代流畅设计演示"
    :show-sidebar-toggle="true"
    :show-tab-bar="false"
    :navigation-sections="navigationSections"
    :global-loading="loading"
    loading-text="加载组件演示..."
    :notification="notification"
    @sidebar-item-click="handleSidebarClick"
    @notification-close="clearNotification"
  >
    <template #navigation-trailing>
      <ModernButton
        type="plain"
        size="small"
        @click="toggleTheme"
      >
        <component :is="themeIcon" class="w-5 h-5" />
      </ModernButton>
    </template>

    <div class="modern-demo-page">
      <div class="modern-demo-header">
        <h1 class="modern-typography-large-title">现代流畅设计系统</h1>
        <p class="modern-typography-body modern-demo-subtitle">
          基于清晰、服从、深度三大原则的现代组件库演示
        </p>
      </div>

      <!-- 按钮组件演示 -->
      <ModernCard variant="elevated" class="modern-demo-section">
        <template #header>
          <h2 class="modern-typography-title-2">按钮组件</h2>
          <p class="modern-typography-footnote modern-demo-description">
            多种类型和状态的现代按钮组件
          </p>
        </template>

        <div class="modern-demo-grid">
          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">基础按钮</h3>
            <div class="modern-demo-buttons">
              <ModernButton type="primary">主要按钮</ModernButton>
              <ModernButton type="secondary">次要按钮</ModernButton>
              <ModernButton type="destructive">危险按钮</ModernButton>
              <ModernButton type="plain">朴素按钮</ModernButton>
            </div>
          </div>

          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">按钮尺寸</h3>
            <div class="modern-demo-buttons">
              <ModernButton size="small">小按钮</ModernButton>
              <ModernButton size="medium">中按钮</ModernButton>
              <ModernButton size="large">大按钮</ModernButton>
            </div>
          </div>

          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">按钮状态</h3>
            <div class="modern-demo-buttons">
              <ModernButton :loading="buttonLoading" @click="simulateLoading">
                {{ buttonLoading ? '加载中' : '点击加载' }}
              </ModernButton>
              <ModernButton disabled>禁用按钮</ModernButton>
              <ModernButton rounded>圆角按钮</ModernButton>
            </div>
          </div>
        </div>
      </ModernCard>

      <!-- 卡片组件演示 -->
      <ModernCard variant="elevated" class="modern-demo-section">
        <template #header>
          <h2 class="modern-typography-title-2">卡片组件</h2>
          <p class="modern-typography-footnote modern-demo-description">
            多种变体和交互效果的卡片组件
          </p>
        </template>

        <div class="modern-demo-grid">
          <ModernCard variant="elevated" padding="md">
            <h3 class="modern-typography-headline">悬浮卡片</h3>
            <p class="modern-typography-body">带有阴影效果的悬浮卡片</p>
          </ModernCard>

          <ModernCard variant="outlined" padding="md">
            <h3 class="modern-typography-headline">边框卡片</h3>
            <p class="modern-typography-body">带有边框的简洁卡片</p>
          </ModernCard>

          <ModernCard variant="filled" padding="md">
            <h3 class="modern-typography-headline">填充卡片</h3>
            <p class="modern-typography-body">带有背景填充的卡片</p>
          </ModernCard>

          <ModernCard variant="grouped" padding="md" interactive @click="handleCardClick">
            <h3 class="modern-typography-headline">交互卡片</h3>
            <p class="modern-typography-body">可点击的交互式卡片</p>
          </ModernCard>
        </div>
      </ModernCard>

      <!-- 字体系统演示 */\n      <ModernCard variant=\"elevated\" class=\"modern-demo-section\">\n        <template #header>\n          <h2 class=\"modern-typography-title-2\">字体系统</h2>\n          <p class=\"modern-typography-footnote modern-demo-description\">\n            现代流畅的字体层级系统\n          </p>\n        </template>\n\n        <div class=\"modern-demo-typography\">\n          <div class=\"modern-typography-large-title\">大标题 - Large Title</div>\n          <div class=\"modern-typography-title-1\">标题 1 - Title 1</div>\n          <div class=\"modern-typography-title-2\">标题 2 - Title 2</div>\n          <div class=\"modern-typography-title-3\">标题 3 - Title 3</div>\n          <div class=\"modern-typography-headline\">标题 - Headline</div>\n          <div class=\"modern-typography-body\">正文 - Body</div>\n          <div class=\"modern-typography-callout\">说明文字 - Callout</div>\n          <div class=\"modern-typography-subheadline\">子标题 - Subheadline</div>\n          <div class=\"modern-typography-footnote\">脚注 - Footnote</div>\n          <div class=\"modern-typography-caption-1\">说明 1 - Caption 1</div>\n          <div class=\"modern-typography-caption-2\">说明 2 - Caption 2</div>\n        </div>\n      </ModernCard>\n\n      <!-- 主题控制演示 -->\n      <ModernCard variant=\"elevated\" class=\"modern-demo-section\">\n        <template #header>\n          <h2 class=\"modern-typography-title-2\">主题控制</h2>\n          <p class=\"modern-typography-footnote modern-demo-description\">\n            现代主题系统控制面板\n          </p>\n        </template>\n\n        <div class=\"modern-demo-theme-controls\">\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">主题模式</h3>\n            <div class=\"modern-demo-buttons\">\n              <ModernButton \n                :type=\"modernThemeStore.config.mode === 'light' ? 'primary' : 'secondary'\"\n                size=\"small\"\n                @click=\"setThemeMode('light')\"\n              >\n                浅色\n              </ModernButton>\n              <ModernButton \n                :type=\"modernThemeStore.config.mode === 'dark' ? 'primary' : 'secondary'\"\n                size=\"small\"\n                @click=\"setThemeMode('dark')\"\n              >\n                深色\n              </ModernButton>\n              <ModernButton \n                :type=\"modernThemeStore.config.mode === 'auto' ? 'primary' : 'secondary'\"\n                size=\"small\"\n                @click=\"setThemeMode('auto')\"\n              >\n                自动\n              </ModernButton>\n            </div>\n          </div>\n\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">主题色彩</h3>\n            <div class=\"modern-demo-color-palette\">\n              <button\n                v-for=\"color in themeColors\"\n                :key=\"color.name\"\n                :class=\"getColorButtonClasses(color.name)\"\n                :style=\"{ backgroundColor: color.value }\"\n                @click=\"setThemeColor(color.name)\"\n              >\n                <Check v-if=\"modernThemeStore.config.color === color.name\" class=\"w-4 h-4 text-white\" />\n              </button>\n            </div>\n          </div>\n\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">组件风格</h3>\n            <div class=\"modern-demo-buttons\">\n              <ModernButton \n                v-for="style in componentStyles"\n                :key="style.value"\n                :type="modernThemeStore.config.componentStyle === style.value ? 'primary' : 'secondary'"\n                size="small"\n                @click="setComponentStyle(style.value)"\n              >\n                {{ style.name }}\n              </ModernButton>\n            </div>\n            <p class=\"modern-typography-footnote modern-demo-description\">\n              当前风格：{{ getCurrentStyleDescription() }}\n            </p>\n          </div>\n\n          <div class=\"modern-demo-group\">\n            <h3 class=\"modern-typography-headline\">界面选项</h3>\n            <div class=\"modern-demo-toggles\">\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.enableAnimations\"\n                  @change=\"toggleAnimations\"\n                >\n                <span>启用动画</span>\n              </label>\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.enableBlur\"\n                  @change=\"toggleBlur\"\n                >\n                <span>启用模糊效果</span>\n              </label>\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.compactMode\"\n                  @change=\"toggleCompactMode\"\n                >\n                <span>紧凑模式</span>\n              </label>\n              <label class=\"modern-demo-toggle\">\n                <input \n                  type=\"checkbox\" \n                  :checked=\"modernThemeStore.config.reducedMotion\"\n                  @change=\"toggleReducedMotion\"\n                >\n                <span>减少动画</span>\n              </label>\n            </div>\n          </div>\n        </div>\n      </ModernCard>\n    </div>\n  </ModernAppLayout>\n</template>\n\n<script setup lang=\"ts\">\nimport { ref, computed, onMounted } from 'vue'\nimport { Sun, Moon, Check, Home, Palette, Settings, Layers } from 'lucide-vue-next'\nimport { useModernThemeStore } from '@/stores/modern-theme'\nimport type { ModernThemeMode, ModernThemeColor, ComponentStyle } from '@/stores/modern-theme'\nimport ModernAppLayout from '@/components/layout/modern-app-layout.vue'\nimport { ModernButton, ModernCard } from '@/components/ui'\n\nconst modernThemeStore = useModernThemeStore()\n\n// 状态\nconst loading = ref(false)\nconst buttonLoading = ref(false)\nconst notification = ref<any>(null)\n\n// 导航配置\nconst navigationSections = [\n  {\n    id: 'main',\n    title: '主要功能',\n    items: [\n      { id: 'dashboard', label: '仪表盘', icon: Home, to: '/dashboard' },\n      { id: 'components', label: '组件演示', icon: Layers, to: '/components' },\n      { id: 'theme', label: '主题设置', icon: Palette, to: '/theme' },\n      { id: 'settings', label: '设置', icon: Settings, to: '/settings' }\n    ]\n  }\n]\n\n// 主题色彩选项\nconst themeColors = [\n  { name: 'blue', value: '#007AFF' },\n  { name: 'green', value: '#34C759' },\n  { name: 'purple', value: '#AF52DE' },\n  { name: 'orange', value: '#FF9500' },\n  { name: 'red', value: '#FF3B30' },\n  { name: 'pink', value: '#FF2D92' },\n  { name: 'indigo', value: '#5856D6' },\n  { name: 'teal', value: '#5AC8FA' }\n]\n\n// 组件风格选项\nconst componentStyles = [\n  { name: '现代', value: 'modern' as ComponentStyle, description: '清晰流畅的现代设计' },\n  { name: '经典', value: 'classic' as ComponentStyle, description: '传统稳重的经典设计' },\n  { name: '简约', value: 'minimal' as ComponentStyle, description: '极简主义的纯净设计' },\n  { name: '圆润', value: 'rounded' as ComponentStyle, description: '圆润柔和的可爱设计' },\n  { name: '锐利', value: 'sharp' as ComponentStyle, description: '锐利明确的工业设计' }\n]\n\n// 计算属性\nconst themeIcon = computed(() => {\n  return modernThemeStore.isDark ? Sun : Moon\n})\n\n// 方法\nconst toggleTheme = () => {\n  modernThemeStore.toggleMode()\n\n}\n\nconst setThemeMode = (mode: ModernThemeMode) => {\n  modernThemeStore.setMode(mode)\n\n}\n\nconst setThemeColor = (color: ModernThemeColor) => {\n  modernThemeStore.setColor(color)\n\n}\n\nconst getColorButtonClasses = (colorName: string) => [\n  'modern-demo-color-button',\n  {\n    'modern-demo-color-button--active': modernThemeStore.config.color === colorName\n  }\n]\n\nconst toggleAnimations = () => {\n  modernThemeStore.updateConfig({ \n    enableAnimations: !modernThemeStore.config.enableAnimations \n  })\n}\n\nconst toggleBlur = () => {\n  modernThemeStore.updateConfig({ \n    enableBlur: !modernThemeStore.config.enableBlur \n  })\n}\n\nconst toggleCompactMode = () => {\n  modernThemeStore.updateConfig({ \n    compactMode: !modernThemeStore.config.compactMode \n  })\n}\n\nconst toggleReducedMotion = () => {\n  modernThemeStore.updateConfig({ \n    reducedMotion: !modernThemeStore.config.reducedMotion \n  })\n}\n\nconst setComponentStyle = (style: ComponentStyle) => {\n  modernThemeStore.setComponentStyle(style)\n\n  showNotification('success', '风格已切换', `已切换到${getStyleName(style)}`)\n}\n\nconst getStyleName = (style: ComponentStyle): string => {\n  const styleMap = {\n    'modern': '现代风格',
    'classic': '经典风格', \n    'minimal': '简约风格',
    'rounded': '圆润风格',
    'sharp': '锐利风格'
  }\n  return styleMap[style]\n}\n\nconst getCurrentStyleDescription = (): string => {\n  const currentStyle = componentStyles.find(s => s.value === modernThemeStore.config.componentStyle)\n  return currentStyle?.description || '现代设计'\n}\n\nconst simulateLoading = () => {\n  buttonLoading.value = true\n  setTimeout(() => {\n    buttonLoading.value = false\n    showNotification('success', '加载完成', '按钮加载演示完成')\n  }, 2000)\n}\n\nconst handleCardClick = () => {\n\n  showNotification('info', '卡片点击', '您点击了交互式卡片')\n}\n\nconst handleSidebarClick = (item: any) => {\n  console.log('Sidebar item clicked:', item)\n}\n\nconst showNotification = (type: string, title: string, message: string) => {\n  notification.value = {\n    id: Date.now().toString(),\n    type,\n    title,\n    message,\n    duration: 3000\n  }\n  \n  setTimeout(() => {\n    notification.value = null\n  }, 3000)\n}\n\nconst clearNotification = () => {\n  notification.value = null\n}\n\n// 初始化\nonMounted(() => {\n  // 模拟初始加载\n  loading.value = true\n  setTimeout(() => {\n    loading.value = false\n    showNotification('success', '欢迎使用', '现代流畅设计系统加载完成')\n  }, 1500)\n})\n</script>\n\n<style scoped>\n.modern-demo-page {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: var(--modern-spacing-md);\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-xl);\n}\n\n.modern-demo-header {\n  text-align: center;\n  padding: var(--modern-spacing-xl) 0;\n}\n\n.modern-demo-subtitle {\n  color: var(--modern-text-secondary);\n  margin-top: var(--modern-spacing-md);\n  max-width: 600px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.modern-demo-section {\n  width: 100%;\n}\n\n.modern-demo-description {\n  color: var(--modern-text-tertiary);\n  margin-top: var(--modern-spacing-xs);\n}\n\n.modern-demo-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: var(--modern-spacing-lg);\n}\n\n.modern-demo-group {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-md);\n}\n\n.modern-demo-buttons {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--modern-spacing-sm);\n}\n\n.modern-demo-typography {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-md);\n}\n\n.modern-demo-theme-controls {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-xl);\n}\n\n.modern-demo-color-palette {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--modern-spacing-sm);\n}\n\n.modern-demo-color-button {\n  width: 40px;\n  height: 40px;\n  border-radius: var(--modern-radius-md);\n  border: 2px solid transparent;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all var(--modern-duration-fast) var(--modern-easing-ease);\n}\n\n.modern-demo-color-button:hover {\n  transform: scale(1.1);\n  box-shadow: var(--modern-shadow-md);\n}\n\n.modern-demo-color-button--active {\n  border-color: var(--modern-text-primary);\n  box-shadow: var(--modern-shadow-lg);\n}\n\n.modern-demo-toggles {\n  display: flex;\n  flex-direction: column;\n  gap: var(--modern-spacing-md);\n}\n\n.modern-demo-toggle {\n  display: flex;\n  align-items: center;\n  gap: var(--modern-spacing-sm);\n  cursor: pointer;\n  font-size: var(--modern-font-size-body);\n  color: var(--modern-text-primary);\n}\n\n.modern-demo-toggle input[type=\"checkbox\"] {\n  width: 20px;\n  height: 20px;\n  border-radius: var(--modern-radius-xs);\n  border: 2px solid var(--modern-divider);\n  appearance: none;\n  cursor: pointer;\n  position: relative;\n  transition: all var(--modern-duration-fast) var(--modern-easing-ease);\n}\n\n.modern-demo-toggle input[type=\"checkbox\"]:checked {\n  background: var(--modern-primary-blue);\n  border-color: var(--modern-primary-blue);\n}\n\n.modern-demo-toggle input[type=\"checkbox\"]:checked::after {\n  content: '';\n  position: absolute;\n  top: 2px;\n  left: 6px;\n  width: 4px;\n  height: 8px;\n  border: solid white;\n  border-width: 0 2px 2px 0;\n  transform: rotate(45deg);\n}\n\n/* 响应式设计 */\n@media (max-width: 768px) {\n  .modern-demo-page {\n    padding: var(--modern-spacing-sm);\n    gap: var(--modern-spacing-lg);\n  }\n  \n  .modern-demo-grid {\n    grid-template-columns: 1fr;\n    gap: var(--modern-spacing-md);\n  }\n  \n  .modern-demo-buttons {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  \n  .modern-demo-color-palette {\n    justify-content: center;\n  }\n}\n\n/* 高对比度模式支持 */\n@media (prefers-contrast: high) {\n  .modern-demo-color-button {\n    border-width: 3px;\n  }\n}\n\n/* 减少动画偏好支持 */\n@media (prefers-reduced-motion: reduce) {\n  .modern-demo-color-button {\n    transition: none;\n  }\n  \n  .modern-demo-color-button:hover {\n    transform: none;\n  }\n  \n  .modern-demo-toggle input[type=\"checkbox\"] {\n    transition: none;\n  }\n}\n</style>", "original_text": null}]
```

```
<template>
  <ModernAppLayout
    app-title="现代流畅设计演示"
    :show-sidebar-toggle="true"
    :show-tab-bar="false"
    :navigation-sections="navigationSections"
    :global-loading="loading"
    loading-text="加载组件演示..."
    :notification="notification"
    @sidebar-item-click="handleSidebarClick"
    @notification-close="clearNotification"
  >
    <template #navigation-trailing>
      <ModernButton
        type="plain"
        size="small"
        @click="toggleTheme"
      >
        <component :is="themeIcon" class="w-5 h-5" />
      </ModernButton>
    </template>

    <div class="modern-demo-page">
      <div class="modern-demo-header">
        <h1 class="modern-typography-large-title">现代流畅设计系统</h1>
        <p class="modern-typography-body modern-demo-subtitle">
          基于清晰、服从、深度三大原则的现代组件库演示
        </p>
      </div>

      <!-- 按钮组件演示 -->
      <ModernCard variant="elevated" class="modern-demo-section">
        <template #header>
          <h2 class="modern-typography-title-2">按钮组件</h2>
          <p class="modern-typography-footnote modern-demo-description">
            多种类型和状态的现代按钮组件
          </p>
        </template>

        <div class="modern-demo-grid">
          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">基础按钮</h3>
            <div class="modern-demo-buttons">
              <ModernButton type="primary">主要按钮</ModernButton>
              <ModernButton type="secondary">次要按钮</ModernButton>
              <ModernButton type="destructive">危险按钮</ModernButton>
              <ModernButton type="plain">朴素按钮</ModernButton>
            </div>
          </div>

          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">按钮尺寸</h3>
            <div class="modern-demo-buttons">
              <ModernButton size="small">小按钮</ModernButton>
              <ModernButton size="medium">中按钮</ModernButton>
              <ModernButton size="large">大按钮</ModernButton>
            </div>
          </div>

          <div class="modern-demo-group">
            <h3 class="modern-typography-headline">按钮状态</h3>
            <div class="modern-demo-buttons">
              <ModernButton :loading="buttonLoading" @click="simulateLoading">
                {{ buttonLoading ? '加载中' : '点击加载' }}
              </ModernButton>
              <ModernButton disabled>禁用按钮</ModernButton>
              <ModernButton rounded>圆角按钮</ModernButton>
            </div>
          </div>
        </div>
      </ModernCard>

      <!-- 卡片组件演示 -->
      <ModernCard variant="elevated" class="modern-demo-section">
        <template #header>
          <h2 class="modern-typography-title-2">卡片组件</h2>
          <p class="modern-typography-footnote modern-demo-description">
            多种变体和交互效果的卡片组件
          </p>
        </template>

        <div class="modern-demo-grid">
          <ModernCard variant="elevated" padding="md">
            <h3 class="modern-typography-headline">悬浮卡片</h3>
            <p class="modern-typography-body">带有阴影效果的悬浮卡片</p>
          </ModernCard>

          <ModernCard variant="outlined" padding="md">
            <h3 class="modern-typography-headline">边框卡片</h3>
            <p class="modern-typography-body">带有边框的简洁卡片</p>
          </ModernCard>

          <ModernCard variant="