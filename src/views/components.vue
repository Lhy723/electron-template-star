<template>
  <div class="p-6 space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">组件示例</h1>
        <p class="text-muted-foreground">展示项目中使用的各种UI组件</p>
      </div>
    </div>

    <!-- 按钮组件 -->
    <Card>
      <CardHeader>
        <CardTitle>按钮组件</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="space-y-2">
          <h4 class="text-sm font-medium">变体</h4>
          <div class="flex flex-wrap gap-2">
            <Button>默认按钮</Button>
            <Button variant="destructive">危险按钮</Button>
            <Button variant="outline">描边按钮</Button>
            <Button variant="secondary">次要按钮</Button>
            <Button variant="ghost">幽灵按钮</Button>
            <Button variant="link">链接按钮</Button>
          </div>
        </div>

        <div class="space-y-2">
          <h4 class="text-sm font-medium">尺寸</h4>
          <div class="flex flex-wrap gap-2 items-center">
            <Button size="sm">小按钮</Button>
            <Button>默认按钮</Button>
            <Button size="lg">大按钮</Button>
            <Button size="icon">
              <el-icon><Plus /></el-icon>
            </Button>
          </div>
        </div>

        <div class="space-y-2">
          <h4 class="text-sm font-medium">状态</h4>
          <div class="flex flex-wrap gap-2">
            <Button disabled>禁用按钮</Button>
            <Button :loading="loading" @click="handleLoading">加载按钮</Button>
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
    <Card>
      <CardHeader>
        <CardTitle>卡片组件</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>简单卡片</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">这是一个简单的卡片示例，包含标题和内容。</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle class="flex items-center">
                <el-icon class="mr-2"><Star /></el-icon>
                带图标卡片
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">这是一个带图标的卡片示例。</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>操作卡片</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground mb-4">这是一个带操作按钮的卡片。</p>
              <Button size="sm">操作</Button>
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
import { Plus, Star } from '@element-plus/icons-vue'
import { Button, Input, Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui'

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
