<template>
  <div class="ios-components-page p-6 space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">组件示例</h1>
        <p class="text-muted-foreground">展示项目中使用的各种UI组件，体验iOS风格的毛玻璃效果和交互动效</p>
      </div>
    </div>

    <!-- iOS 风格展示区 -->
    <Card class="ios-showcase-card ios-glass-card ios-interactive">
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <div class="ios-icon-glow">
            <el-icon class="text-xl text-primary"><MagicStick /></el-icon>
          </div>
          iOS 风格效果展示
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-6">
        <!-- 毛玻璃效果演示 -->
        <div class="ios-demo-section">
          <h4 class="text-sm font-medium mb-4 flex items-center gap-2">
            <div class="ios-indicator"></div>
            毛玻璃效果层级
          </h4>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="ios-glass-demo ios-glass-light ios-interactive">
              <div class="ios-demo-content">
                <span class="ios-demo-label">轻度模糊</span>
                <div class="ios-demo-icon">✨</div>
              </div>
            </div>
            <div class="ios-glass-demo ios-glass-medium ios-interactive">
              <div class="ios-demo-content">
                <span class="ios-demo-label">中度模糊</span>
                <div class="ios-demo-icon">🌟</div>
              </div>
            </div>
            <div class="ios-glass-demo ios-glass-heavy ios-interactive">
              <div class="ios-demo-content">
                <span class="ios-demo-label">重度模糊</span>
                <div class="ios-demo-icon">💫</div>
              </div>
            </div>
            <div class="ios-glass-demo ios-glass-ultra ios-interactive">
              <div class="ios-demo-content">
                <span class="ios-demo-label">极强模糊</span>
                <div class="ios-demo-icon">⭐</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 交互动效演示 -->
        <div class="ios-demo-section">
          <h4 class="text-sm font-medium mb-4 flex items-center gap-2">
            <div class="ios-indicator"></div>
            交互动效体验
          </h4>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <button 
              class="ios-interactive-demo ios-spring ios-ripple"
              @click="triggerSpringAnimation"
            >
              <div class="ios-demo-content">
                <span class="ios-demo-label">弹簧动画</span>
                <div class="ios-demo-icon">🚀</div>
              </div>
            </button>
            <button 
              class="ios-interactive-demo ios-bounce ios-ripple"
              @click="triggerBounceAnimation"
            >
              <div class="ios-demo-content">
                <span class="ios-demo-label">反弹效果</span>
                <div class="ios-demo-icon">⚡</div>
              </div>
            </button>
            <button 
              class="ios-interactive-demo ios-pulse ios-ripple"
              @click="triggerPulseAnimation"
            >
              <div class="ios-demo-content">
                <span class="ios-demo-label">脉冲动画</span>
                <div class="ios-demo-icon">💎</div>
              </div>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- 按钮组件 -->
    <Card class="ios-glass-light ios-interactive">
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <div class="ios-icon-glow">
            <el-icon class="text-primary"><Pointer /></el-icon>
          </div>
          按钮组件
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="space-y-2">
          <h4 class="text-sm font-medium">变体</h4>
          <div class="flex flex-wrap gap-2">
            <Button class="ios-ripple">默认按钮</Button>
            <Button variant="destructive" class="ios-ripple">危险按钮</Button>
            <Button variant="outline" class="ios-ripple">描边按钮</Button>
            <Button variant="secondary" class="ios-ripple">次要按钮</Button>
            <Button variant="ghost" class="ios-ripple">幽灵按钮</Button>
            <Button variant="link" class="ios-ripple">链接按钮</Button>
          </div>
        </div>

        <div class="space-y-2">
          <h4 class="text-sm font-medium">尺寸</h4>
          <div class="flex flex-wrap gap-2 items-center">
            <Button size="sm" class="ios-ripple">小按钮</Button>
            <Button class="ios-ripple">默认按钮</Button>
            <Button size="lg" class="ios-ripple">大按钮</Button>
            <Button size="icon" class="ios-ripple">
              <el-icon><Plus /></el-icon>
            </Button>
          </div>
        </div>

        <div class="space-y-2">
          <h4 class="text-sm font-medium">状态</h4>
          <div class="flex flex-wrap gap-2">
            <Button disabled>禁用按钮</Button>
            <Button :loading="loading" @click="handleLoading" class="ios-ripple">加载按钮</Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- 输入框组件 -->
    <Card>
      <CardHeader>
        <CardTitle>输入框组件</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid gap-4 md:grid-cols-2">
          <div class="space-y-2">
            <label class="text-sm font-medium">基础输入框</label>
            <Input v-model="inputValue" placeholder="请输入内容" />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">密码输入框</label>
            <Input v-model="passwordValue" type="password" placeholder="请输入密码" />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">禁用状态</label>
            <Input disabled placeholder="禁用输入框" />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">只读状态</label>
            <Input readonly value="只读内容" />
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- 卡片组件 -->
    <Card class="ios-glass-light ios-interactive">
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <div class="ios-icon-glow">
            <el-icon class="text-primary"><Grid /></el-icon>
          </div>
          卡片组件
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4 md:grid-cols-3">
          <Card class="ios-glass-medium ios-interactive ios-spring">
            <CardHeader>
              <CardTitle>简单卡片</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">这是一个简单的卡片示例，包含标题和内容。</p>
            </CardContent>
          </Card>

          <Card class="ios-glass-medium ios-interactive ios-spring">
            <CardHeader>
              <CardTitle class="flex items-center">
                <el-icon class="mr-2 text-yellow-500"><Star /></el-icon>
                带图标卡片
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">这是一个带图标的卡片示例。</p>
            </CardContent>
          </Card>

          <Card class="ios-glass-medium ios-interactive ios-spring">
            <CardHeader>
              <CardTitle>操作卡片</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground mb-4">这是一个带操作按钮的卡片。</p>
              <Button size="sm" class="ios-ripple">操作</Button>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>

    <!-- 徽章组件 -->
    <Card>
      <CardHeader>
        <CardTitle>徽章组件</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="space-y-2">
          <h4 class="text-sm font-medium">变体</h4>
          <div class="flex flex-wrap gap-2">
            <Badge>默认徽章</Badge>
            <Badge variant="secondary">次要徽章</Badge>
            <Badge variant="destructive">危险徽章</Badge>
            <Badge variant="outline">描边徽章</Badge>
          </div>
        </div>

        <div class="space-y-2">
          <h4 class="text-sm font-medium">使用场景</h4>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span>状态：</span>
              <Badge variant="secondary">进行中</Badge>
              <Badge>已完成</Badge>
              <Badge variant="destructive">已取消</Badge>
            </div>
            <div class="flex items-center gap-2">
              <span>优先级：</span>
              <Badge variant="destructive">高</Badge>
              <Badge variant="outline">中</Badge>
              <Badge variant="secondary">低</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Element Plus 组件 -->
    <Card>
      <CardHeader>
        <CardTitle>Element Plus 组件</CardTitle>
      </CardHeader>
      <CardContent class="space-y-6">
        <!-- 表单组件 -->
        <div class="space-y-4">
          <h4 class="text-sm font-medium">表单组件</h4>
          <el-form :model="form" label-width="100px" class="max-w-md">
            <el-form-item label="用户名">
              <el-input v-model="form.username" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email" type="email" placeholder="请输入邮箱" />
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="form.gender">
                <el-radio label="male">男</el-radio>
                <el-radio label="female">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="爱好">
              <el-checkbox-group v-model="form.hobbies">
                <el-checkbox label="reading">阅读</el-checkbox>
                <el-checkbox label="music">音乐</el-checkbox>
                <el-checkbox label="sports">运动</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="城市">
              <el-select v-model="form.city" placeholder="请选择城市">
                <el-option label="北京" value="beijing" />
                <el-option label="上海" value="shanghai" />
                <el-option label="广州" value="guangzhou" />
                <el-option label="深圳" value="shenzhen" />
              </el-select>
            </el-form-item>
          </el-form>
        </div>

        <!-- 数据展示组件 -->
        <div class="space-y-4">
          <h4 class="text-sm font-medium">数据展示</h4>
          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <h5 class="text-xs font-medium mb-2">标签</h5>
              <div class="space-x-2">
                <el-tag>标签一</el-tag>
                <el-tag type="success">标签二</el-tag>
                <el-tag type="info">标签三</el-tag>
                <el-tag type="warning">标签四</el-tag>
                <el-tag type="danger">标签五</el-tag>
              </div>
            </div>

            <div>
              <h5 class="text-xs font-medium mb-2">进度条</h5>
              <div class="space-y-2">
                <el-progress :percentage="50" />
                <el-progress :percentage="100" status="success" />
                <el-progress :percentage="70" status="warning" />
                <el-progress :percentage="30" status="exception" />
              </div>
            </div>
          </div>
        </div>

        <!-- 反馈组件 -->
        <div class="space-y-4">
          <h4 class="text-sm font-medium">反馈组件</h4>
          <div class="flex flex-wrap gap-2">
            <el-button @click="showMessage('success')">成功消息</el-button>
            <el-button @click="showMessage('warning')">警告消息</el-button>
            <el-button @click="showMessage('info')">信息消息</el-button>
            <el-button @click="showMessage('error')">错误消息</el-button>
            <el-button @click="showNotification">通知</el-button>
            <el-button @click="showConfirm">确认框</el-button>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElNotification, ElMessageBox } from 'element-plus'
import { Plus, Star, MagicStick, Pointer, Grid } from '@element-plus/icons-vue'
import { Button, Input, Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui'
import { useModernThemeStore } from '@/stores/modern-theme'

const modernThemeStore = useModernThemeStore()
const loading = ref(false)
const inputValue = ref('')
const passwordValue = ref('')

const form = reactive({
  username: '',
  email: '',
  gender: 'male',
  hobbies: [],
  city: '',
})

const handleLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}

// iOS 风格交互动画方法
const triggerSpringAnimation = (event: Event) => {
  const target = event.currentTarget as HTMLElement
  target.classList.add('ios-spring-active')
  setTimeout(() => {
    target.classList.remove('ios-spring-active')
  }, 600)
  ElMessage.success('弹簧动画触发！')
}

const triggerBounceAnimation = (event: Event) => {
  const target = event.currentTarget as HTMLElement
  target.classList.add('ios-bounce-active')
  setTimeout(() => {
    target.classList.remove('ios-bounce-active')
  }, 800)
  ElMessage.info('反弹效果触发！')
}

const triggerPulseAnimation = (event: Event) => {
  const target = event.currentTarget as HTMLElement
  target.classList.add('ios-pulse-active')
  setTimeout(() => {
    target.classList.remove('ios-pulse-active')
  }, 1000)
  ElMessage.warning('脉冲动画触发！')
}

const showMessage = (type: 'success' | 'warning' | 'info' | 'error') => {
  const messages = {
    success: '操作成功！',
    warning: '请注意！',
    info: '这是一条信息',
    error: '操作失败！',
  }
  ElMessage[type](messages[type])
}

const showNotification = () => {
  ElNotification({
    title: '通知标题',
    message: '这是一条通知消息',
    type: 'info',
  })
}

const showConfirm = () => {
  ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      ElMessage.success('删除成功!')
    })
    .catch(() => {
      ElMessage.info('已取消删除')
    })
}
</script>

<style scoped>
/* iOS 风格组件示例页面特效 */
.ios-components-page {
  background: var(--modern-background-primary);
  min-height: 100vh;
}

/* iOS 风格展示卡片 */
.ios-showcase-card {
  position: relative;
  overflow: hidden;
}

.ios-showcase-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--modern-primary-blue),
    transparent
  );
  opacity: 0.6;
}

/* 图标发光效果 */
.ios-icon-glow {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--modern-fill-secondary);
}

.ios-icon-glow::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 10px;
  background: linear-gradient(
    135deg,
    var(--modern-primary-blue),
    var(--modern-primary-purple)
  );
  opacity: 0.1;
  z-index: -1;
}

/* 指示器 */
.ios-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--modern-primary-blue);
  box-shadow: 0 0 8px var(--modern-primary-blue);
  animation: ios-pulse 2s infinite;
}

@keyframes ios-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
}

/* 毛玻璃演示卡片 */
.ios-glass-demo {
  position: relative;
  height: 120px;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all var(--ios-duration-medium) var(--ios-ease-spring);
}

.ios-glass-demo:hover {
  transform: translateY(-4px);
}

.ios-glass-demo:active {
  transform: translateY(-2px) scale(0.98);
}

.ios-demo-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
}

.ios-demo-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--modern-text-primary);
  text-align: center;
}

.ios-demo-icon {
  font-size: 24px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

/* 交互动效演示按钮 */
.ios-interactive-demo {
  position: relative;
  height: 100px;
  border-radius: 16px;
  background: var(--modern-fill-secondary);
  border: 1px solid var(--modern-divider);
  cursor: pointer;
  overflow: hidden;
  transition: all var(--ios-duration-medium) var(--ios-ease-spring);
}

.ios-interactive-demo:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}

.ios-interactive-demo:active {
  transform: scale(0.95);
}

/* 动画效果状态 */
.ios-spring-active {
  animation: ios-spring-bounce 0.6s var(--ios-ease-spring);
}

.ios-bounce-active {
  animation: ios-bounce-effect 0.8s ease-out;
}

.ios-pulse-active {
  animation: ios-pulse-effect 1s ease-in-out;
}

@keyframes ios-spring-bounce {
  0% { transform: scale(1); }
  50% { transform: scale(1.1) rotateZ(2deg); }
  100% { transform: scale(1); }
}

@keyframes ios-bounce-effect {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -8px, 0);
  }
  70% {
    transform: translate3d(0, -4px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
}

@keyframes ios-pulse-effect {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 var(--modern-primary-blue);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(0, 122, 255, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 122, 255, 0);
  }
}

/* 特殊背景效果 */
.ios-demo-section {
  position: relative;
  padding: 16px;
  border-radius: 12px;
  background: var(--modern-background-secondary);
  border: 1px solid var(--modern-divider);
}

.ios-demo-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 16px;
  right: 16px;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--modern-primary-blue),
    transparent
  );
  opacity: 0.3;
}

/* 组件增强效果 */
.ios-glass-light .ios-ripple,
.ios-glass-medium .ios-ripple,
.ios-glass-heavy .ios-ripple {
  position: relative;
  overflow: hidden;
}

.ios-glass-light .ios-ripple::before,
.ios-glass-medium .ios-ripple::before,
.ios-glass-heavy .ios-ripple::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transition: width 0.3s, height 0.3s, top 0.3s, left 0.3s;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.ios-glass-light .ios-ripple:active::before,
.ios-glass-medium .ios-ripple:active::before,
.ios-glass-heavy .ios-ripple:active::before {
  width: 200px;
  height: 200px;
  top: calc(50% - 100px);
  left: calc(50% - 100px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .ios-glass-demo,
  .ios-interactive-demo {
    height: 80px;
  }
  
  .ios-demo-icon {
    font-size: 18px;
  }
  
  .ios-demo-label {
    font-size: 10px;
  }
}
</style>
