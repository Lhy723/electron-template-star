// 现代流畅设计令牌类型定义

// 色彩令牌接口
export interface ModernColorTokens {
  // 系统色彩
  primaryBlue: string
  primaryGreen: string  
  primaryIndigo: string
  primaryOrange: string
  primaryPink: string
  primaryPurple: string
  primaryRed: string
  primaryTeal: string
  primaryYellow: string

  // 灰度色彩
  neutralGray: string
  neutralGray2: string
  neutralGray3: string
  neutralGray4: string
  neutralGray5: string
  neutralGray6: string

  // 语义色彩
  textPrimary: string
  textSecondary: string
  textTertiary: string
  textQuaternary: string
  
  // 背景色彩
  backgroundPrimary: string
  backgroundSecondary: string
  backgroundTertiary: string
  
  // 分组背景
  backgroundGrouped: string
  backgroundGroupedSecondary: string
  backgroundGroupedTertiary: string
  
  // 填充色彩
  fillPrimary: string
  fillSecondary: string
  fillTertiary: string
  fillQuaternary: string
  
  // 分隔线
  divider: string
  dividerOpaque: string
}

// 字体令牌接口
export interface ModernTypographyToken {
  fontSize: string
  lineHeight: string
  fontWeight: number
  letterSpacing: string
}

export interface ModernTypographyTokens {
  // 大标题
  largeTitle: ModernTypographyToken
  
  // 标题级别
  title1: ModernTypographyToken
  title2: ModernTypographyToken
  title3: ModernTypographyToken
  
  // 标题
  headline: ModernTypographyToken
  
  // 正文
  body: ModernTypographyToken
  
  // 说明文字
  callout: ModernTypographyToken
  
  // 子标题
  subheadline: ModernTypographyToken
  
  // 脚注
  footnote: ModernTypographyToken
  
  // 说明
  caption1: ModernTypographyToken
  caption2: ModernTypographyToken
}

// 间距令牌接口
export interface ModernSpacingTokens {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
  '3xl': string
  '4xl': string
}

// 圆角令牌接口
export interface ModernRadiusTokens {
  none: string
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
  full: string
}

// 阴影令牌接口
export interface ModernShadowTokens {
  none: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
}

// 动画令牌接口
export interface ModernAnimationTokens {
  duration: {
    fast: string
    medium: string
    slow: string
  }
  easing: {
    ease: string
    easeIn: string
    easeOut: string
    easeInOut: string
    bounce: string
  }
}

// 设计令牌主接口
export interface ModernDesignTokens {
  colors: {
    light: ModernColorTokens
    dark: ModernColorTokens
  }
  typography: ModernTypographyTokens
  spacing: ModernSpacingTokens
  radius: ModernRadiusTokens
  shadow: ModernShadowTokens
  animation: ModernAnimationTokens
}