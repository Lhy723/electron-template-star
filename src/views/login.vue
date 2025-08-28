<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
    <Card class="w-full max-w-md">
      <CardHeader class="space-y-1">
        <CardTitle class="text-2xl text-center">欢迎登录</CardTitle>
        <p class="text-sm text-muted-foreground text-center">
          请输入您的账号和密码
        </p>
      </CardHeader>
      <CardContent class="space-y-4">
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules"
          @submit.prevent="handleLogin"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              size="large"
              :prefix-icon="User"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              size="large"
              :prefix-icon="Lock"
              show-password
              @keyup.enter="handleLogin"
            />
          </el-form-item>
          <el-form-item>
            <div class="flex items-center justify-between w-full">
              <el-checkbox v-model="loginForm.remember">
                记住密码
              </el-checkbox>
              <el-link type="primary" :underline="false">
                忘记密码？
              </el-link>
            </div>
          </el-form-item>
          <el-form-item>
            <Button
              type="button"
              class="w-full"
              size="lg"
              :disabled="loading"
              @click="handleLogin"
            >
              <el-icon v-if="loading" class="animate-spin mr-2">
                <Loading />
              </el-icon>
              {{ loading ? '登录中...' : '登录' }}
            </Button>
          </el-form-item>
        </el-form>
        
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <span class="w-full border-t" />
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-background px-2 text-muted-foreground">
              或者
            </span>
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <Button variant="outline" @click="handleGuestLogin">
            <el-icon class="mr-2">
              <User />
            </el-icon>
            游客登录
          </Button>
          <Button variant="outline" @click="handleDemoLogin">
            <el-icon class="mr-2">
              <Star />
            </el-icon>
            演示账号
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { User, Lock, Loading, Star } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { Button, Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import type { LoginForm } from '@/types'

const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)
const loginFormRef = ref<FormInstance>()

const loginForm = reactive<LoginForm>({
  username: '',
  password: '',
  remember: false
})

const loginRules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ]
}

const handleLogin = async () => {
  if (!loginFormRef.value) return
  
  try {
    await loginFormRef.value.validate()
    loading.value = true
    
    const success = await userStore.login(loginForm)
    
    if (success) {
      ElMessage.success('登录成功')
      router.push('/dashboard')
    } else {
      ElMessage.error('登录失败，请检查用户名和密码')
    }
  } catch (error) {
    console.error('登录错误:', error)
    ElMessage.error('登录过程中发生错误')
  } finally {
    loading.value = false
  }
}

const handleGuestLogin = async () => {
  loading.value = true
  try {
    const success = await userStore.login({
      username: 'guest',
      password: 'guest123',
      remember: false
    })
    
    if (success) {
      ElMessage.success('游客登录成功')
      router.push('/dashboard')
    }
  } catch (error) {
    ElMessage.error('游客登录失败')
  } finally {
    loading.value = false
  }
}

const handleDemoLogin = async () => {
  loading.value = true
  try {
    const success = await userStore.login({
      username: 'admin',
      password: 'admin123',
      remember: false
    })
    
    if (success) {
      ElMessage.success('演示账号登录成功')
      router.push('/dashboard')
    }
  } catch (error) {
    ElMessage.error('演示账号登录失败')
  } finally {
    loading.value = false
  }
}
</script>