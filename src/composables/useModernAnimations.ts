import { ref, onMounted, onUnmounted, nextTick, type Ref } from 'vue'

// 动画类型定义
export type AnimationType = 
  | 'fadeInUp' 
  | 'fadeInDown' 
  | 'fadeInLeft' 
  | 'fadeInRight'
  | 'slideInUp'
  | 'slideInDown'
  | 'bounce'
  | 'shake'
  | 'pulse'
  | 'spin'

export interface AnimationConfig {
  type: AnimationType
  duration?: number
  delay?: number
  infinite?: boolean
}

// 滚动动画钩子
export function useScrollAnimation(threshold = 0.1) {
  const elements = ref<Map<Element, AnimationConfig>>(new Map())
  let observer: IntersectionObserver | null = null

  const observe = (element: Element, config: AnimationConfig) => {
    if (!observer) {
      createObserver()
    }
    elements.value.set(element, config)
    observer?.observe(element)
  }

  const unobserve = (element: Element) => {
    observer?.unobserve(element)
    elements.value.delete(element)
  }

  const createObserver = () => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const config = elements.value.get(entry.target)
            if (config) {
              animateElement(entry.target as HTMLElement, config)
            }
          }
        })
      },
      { threshold }
    )
  }

  const animateElement = (element: HTMLElement, config: AnimationConfig) => {
    const { type, duration = 300, delay = 0, infinite = false } = config
    
    element.style.animationDuration = `${duration}ms`
    element.style.animationDelay = `${delay}ms`
    element.style.animationIterationCount = infinite ? 'infinite' : '1'
    element.style.animationFillMode = 'both'
    
    element.classList.add(`modern-animate-${type.replace(/([A-Z])/g, '-$1').toLowerCase()}`)
  }

  onUnmounted(() => {
    observer?.disconnect()
  })

  return {
    observe,
    unobserve
  }
}

// 页面过渡动画钩子
export function usePageTransition() {
  const transitionName = ref('page-fade')
  const isTransitioning = ref(false)

  const setTransition = (name: string) => {
    transitionName.value = name
  }

  const startTransition = () => {
    isTransitioning.value = true
  }

  const endTransition = () => {
    isTransitioning.value = false
  }

  return {
    transitionName,
    isTransitioning,
    setTransition,
    startTransition,
    endTransition
  }
}

// 元素动画钩子
export function useElementAnimation() {
  const animate = (element: HTMLElement, config: AnimationConfig) => {
    return new Promise<void>((resolve) => {
      const { type, duration = 300, delay = 0 } = config
      
      element.style.animationDuration = `${duration}ms`
      element.style.animationDelay = `${delay}ms`
      element.style.animationFillMode = 'both'
      
      const animationClass = `modern-animate-${type.replace(/([A-Z])/g, '-$1').toLowerCase()}`
      element.classList.add(animationClass)
      
      const handleAnimationEnd = () => {
        element.classList.remove(animationClass)
        element.removeEventListener('animationend', handleAnimationEnd)
        resolve()
      }
      
      element.addEventListener('animationend', handleAnimationEnd)
    })
  }

  const shake = (element: HTMLElement) => {
    return animate(element, { type: 'shake', duration: 500 })
  }

  const bounce = (element: HTMLElement) => {
    return animate(element, { type: 'bounce', duration: 1000 })
  }

  const pulse = (element: HTMLElement) => {
    return animate(element, { type: 'pulse', duration: 2000 })
  }

  const fadeIn = (element: HTMLElement, direction: 'up' | 'down' | 'left' | 'right' = 'up') => {
    const typeMap = {
      up: 'fadeInUp',
      down: 'fadeInDown',
      left: 'fadeInLeft',
      right: 'fadeInRight'
    }
    return animate(element, { type: typeMap[direction] as AnimationType })
  }

  return {
    animate,
    shake,
    bounce,
    pulse,
    fadeIn
  }
}

// 列表动画钩子
export function useListAnimation() {
  const animateList = (container: HTMLElement, items: HTMLElement[], stagger = 100) => {
    return Promise.all(
      items.map((item, index) => {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            item.classList.add('modern-animate-fade-in-up')
            setTimeout(resolve, 300)
          }, index * stagger)
        })
      })
    )
  }

  const animateListRemoval = (items: HTMLElement[], stagger = 50) => {
    return Promise.all(
      items.map((item, index) => {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            item.style.transition = 'all 300ms ease'
            item.style.opacity = '0'
            item.style.transform = 'translateX(30px)'
            setTimeout(resolve, 300)
          }, index * stagger)
        })
      })
    )
  }

  return {
    animateList,
    animateListRemoval
  }
}

// 拟物化动画钩子
export function useSkeuomorphicAnimations() {
  const pressButton = (element: HTMLElement) => {
    element.style.transform = 'scale(0.96) translateY(2px)'
    element.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.2)'
    
    setTimeout(() => {
      element.style.transform = ''
      element.style.boxShadow = ''
    }, 150)
  }

  const liftCard = (element: HTMLElement) => {
    element.style.transform = 'translateY(-8px) rotateX(5deg)'
    element.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)'
    
    const handleMouseLeave = () => {
      element.style.transform = ''
      element.style.boxShadow = ''
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
    
    element.addEventListener('mouseleave', handleMouseLeave)
  }

  const rippleEffect = (element: HTMLElement, event: MouseEvent) => {
    const ripple = document.createElement('span')
    const rect = element.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2
    
    ripple.style.width = ripple.style.height = size + 'px'
    ripple.style.left = x + 'px'
    ripple.style.top = y + 'px'
    ripple.classList.add('modern-ripple')
    
    element.appendChild(ripple)
    
    setTimeout(() => {
      ripple.remove()
    }, 600)
  }

  return {
    pressButton,
    liftCard,
    rippleEffect
  }
}

// 性能优化的动画钩子
export function usePerformantAnimation() {
  const requestAnimationFrame = window.requestAnimationFrame || ((callback) => setTimeout(callback, 16))
  const cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout

  const smoothTransform = (
    element: HTMLElement,
    property: string,
    from: number,
    to: number,
    duration: number
  ) => {
    return new Promise<void>((resolve) => {
      const startTime = performance.now()
      let animationId: number

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easing = 1 - Math.pow(1 - progress, 3) // easeOut cubic
        const value = from + (to - from) * easing

        element.style.setProperty(property, `${value}px`)

        if (progress < 1) {
          animationId = requestAnimationFrame(animate)
        } else {
          resolve()
        }
      }

      animationId = requestAnimationFrame(animate)

      // 返回取消函数
      return () => cancelAnimationFrame(animationId)
    })
  }

  const morphBetweenElements = (from: HTMLElement, to: HTMLElement, duration = 300) => {
    const fromRect = from.getBoundingClientRect()
    const toRect = to.getBoundingClientRect()

    return Promise.all([
      smoothTransform(from, 'left', fromRect.left, toRect.left, duration),
      smoothTransform(from, 'top', fromRect.top, toRect.top, duration),
      smoothTransform(from, 'width', fromRect.width, toRect.width, duration),
      smoothTransform(from, 'height', fromRect.height, toRect.height, duration)
    ])
  }

  return {
    smoothTransform,
    morphBetweenElements
  }
}

// 手势动画钩子
export function useGestureAnimations() {
  const swipeThreshold = 50
  const velocityThreshold = 0.3

  const useSwipeAnimation = (element: Ref<HTMLElement | null>) => {
    let startX = 0
    let startY = 0
    let startTime = 0

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0]
      startX = touch.clientX
      startY = touch.clientY
      startTime = Date.now()
    }

    const handleTouchEnd = (event: TouchEvent) => {
      const touch = event.changedTouches[0]
      const endX = touch.clientX
      const endY = touch.clientY
      const endTime = Date.now()

      const deltaX = endX - startX
      const deltaY = endY - startY
      const deltaTime = endTime - startTime

      const velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / deltaTime

      if (velocity > velocityThreshold) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // 水平滑动
          if (Math.abs(deltaX) > swipeThreshold) {
            triggerSwipeAnimation(element.value!, deltaX > 0 ? 'right' : 'left')
          }
        } else {
          // 垂直滑动
          if (Math.abs(deltaY) > swipeThreshold) {
            triggerSwipeAnimation(element.value!, deltaY > 0 ? 'down' : 'up')
          }
        }
      }
    }

    const triggerSwipeAnimation = (el: HTMLElement, direction: 'left' | 'right' | 'up' | 'down') => {
      const transformMap = {
        left: 'translateX(-100%)',
        right: 'translateX(100%)',
        up: 'translateY(-100%)',
        down: 'translateY(100%)'
      }

      el.style.transform = transformMap[direction]
      el.style.opacity = '0'

      setTimeout(() => {
        el.style.transform = ''
        el.style.opacity = ''
      }, 300)
    }

    onMounted(() => {
      if (element.value) {
        element.value.addEventListener('touchstart', handleTouchStart)
        element.value.addEventListener('touchend', handleTouchEnd)
      }
    })

    onUnmounted(() => {
      if (element.value) {
        element.value.removeEventListener('touchstart', handleTouchStart)
        element.value.removeEventListener('touchend', handleTouchEnd)
      }
    })
  }

  return {
    useSwipeAnimation
  }
}

// 导出默认的动画工具集合
export function useModernAnimations() {
  return {
    ...useScrollAnimation(),
    ...usePageTransition(),
    ...useElementAnimation(),
    ...useListAnimation(),
    ...useSkeuomorphicAnimations(),
    ...usePerformantAnimation(),
    ...useGestureAnimations()
  }
}