<template>
  <div class="p-6 space-y-6">
    <!-- 欢迎区域 -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ greeting }}</h1>
        <p class="text-muted-foreground">
          欢迎回来，{{ userStore.userInfo?.name || '用户' }}！今天是 {{ formatDate(new Date(), 'YYYY年MM月DD日') }}
        </p>
      </div>
      <div class="flex items-center space-x-4">
        <Button @click="refreshData">
          <el-icon class="mr-2">
            <Refresh />
          </el-icon>
          刷新数据
        </Button>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent class="p-6">
          <div class="flex items-center">
            <div class="flex-1">
              <p class="text-sm font-medium text-muted-foreground">总用户数</p>
              <p class="text-2xl font-bold">{{ statistics.totalUsers.toLocaleString() }}</p>
            </div>
            <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <el-icon class="text-blue-600 dark:text-blue-400">
                <User />
              </el-icon>
            </div>
          </div>
          <div class="mt-4 flex items-center text-sm">
            <span class="text-green-600 dark:text-green-400">+12%</span>
            <span class="text-muted-foreground ml-1">较上月</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="p-6">
          <div class="flex items-center">
            <div class="flex-1">
              <p class="text-sm font-medium text-muted-foreground">活跃用户</p>
              <p class="text-2xl font-bold">{{ statistics.activeUsers.toLocaleString() }}</p>
            </div>
            <div class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <el-icon class="text-green-600 dark:text-green-400">
                <TrendCharts />
              </el-icon>
            </div>
          </div>
          <div class="mt-4 flex items-center text-sm">
            <span class="text-green-600 dark:text-green-400">+8%</span>
            <span class="text-muted-foreground ml-1">较上月</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="p-6">
          <div class="flex items-center">
            <div class="flex-1">
              <p class="text-sm font-medium text-muted-foreground">总订单</p>
              <p class="text-2xl font-bold">{{ statistics.totalOrders.toLocaleString() }}</p>
            </div>
            <div class="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
              <el-icon class="text-orange-600 dark:text-orange-400">
                <ShoppingCart />
              </el-icon>
            </div>
          </div>
          <div class="mt-4 flex items-center text-sm">
            <span class="text-green-600 dark:text-green-400">+23%</span>
            <span class="text-muted-foreground ml-1">较上月</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="p-6">
          <div class="flex items-center">
            <div class="flex-1">
              <p class="text-sm font-medium text-muted-foreground">总收入</p>
              <p class="text-2xl font-bold">¥{{ statistics.totalRevenue.toLocaleString() }}</p>
            </div>
            <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
              <el-icon class="text-purple-600 dark:text-purple-400">
                <Money />
              </el-icon>
            </div>
          </div>
          <div class="mt-4 flex items-center text-sm">
            <span class="text-green-600 dark:text-green-400">+15%</span>
            <span class="text-muted-foreground ml-1">较上月</span>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- 图表区域 -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card class="col-span-4">
        <CardHeader>
          <CardTitle>数据趋势</CardTitle>
        </CardHeader>
        <CardContent>
          <div ref="chartRef" class="h-80"></div>
        </CardContent>
      </Card>

      <Card class="col-span-3">
        <CardHeader>
          <CardTitle>最近活动</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div v-for="activity in recentActivities" :key="activity.id" class="flex items-center">
              <div class="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
              <div class="flex-1">
                <p class="text-sm font-medium">{{ activity.title }}</p>
                <p class="text-xs text-muted-foreground">{{ formatRelativeTime(activity.time) }}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- 快捷操作 -->
    <Card>
      <CardHeader>
        <CardTitle>快捷操作</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Button variant="outline" class="h-20 flex-col" @click="router.push('/components')">
            <el-icon class="mb-2 text-xl">
              <Grid />
            </el-icon>
            组件示例
          </Button>
          <Button variant="outline" class="h-20 flex-col" @click="router.push('/theme')">
            <el-icon class="mb-2 text-xl">
              <Brush />
            </el-icon>
            主题设置
          </Button>
          <Button variant="outline" class="h-20 flex-col" @click="router.push('/system')">
            <el-icon class="mb-2 text-xl">
              <Setting />
            </el-icon>
            系统设置
          </Button>
          <Button variant="outline" class="h-20 flex-col" @click="handleExport">
            <el-icon class="mb-2 text-xl">
              <Download />
            </el-icon>
            导出数据
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  User,
  TrendCharts,
  ShoppingCart,
  Money,
  Refresh,
  Grid,
  Brush,
  Setting,
  Download
} from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { Button, Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { formatDate, formatRelativeTime, getGreeting } from '@/utils/date'
import * as echarts from 'echarts'

const router = useRouter()
const userStore = useUserStore()
const chartRef = ref<HTMLElement>()

const greeting = ref(getGreeting())

const statistics = reactive({
  totalUsers: 12543,
  activeUsers: 8932,
  totalOrders: 3421,
  totalRevenue: 234567
})

const recentActivities = ref([
  {
    id: 1,
    title: '用户张三完成了订单支付',
    time: new Date(Date.now() - 5 * 60 * 1000)
  },
  {
    id: 2,
    title: '系统自动备份完成',
    time: new Date(Date.now() - 15 * 60 * 1000)
  },
  {
    id: 3,
    title: '新用户李四注册成功',
    time: new Date(Date.now() - 30 * 60 * 1000)
  },
  {
    id: 4,
    title: '产品A库存预警',
    time: new Date(Date.now() - 45 * 60 * 1000)
  },
  {
    id: 5,
    title: '管理员更新了系统配置',
    time: new Date(Date.now() - 60 * 60 * 1000)
  }
])

const initChart = () => {
  if (!chartRef.value) return
  
  const chart = echarts.init(chartRef.value)
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['用户数', '订单数', '收入']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '用户数',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '订单数',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '收入',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410]
      }
    ]
  }
  
  chart.setOption(option)
  
  // 响应式调整
  window.addEventListener('resize', () => {
    chart.resize()
  })
}

const refreshData = () => {
  ElMessage.success('数据刷新成功')
  // 这里可以添加实际的数据刷新逻辑
}

const handleExport = () => {
  ElMessage.info('导出功能开发中...')
  // 这里可以添加实际的导出逻辑
}

onMounted(() => {
  nextTick(() => {
    initChart()
  })
})
</script>