import type { ModernDesignTokens, ModernColorTokens } from '../types/design-tokens'

// 浅色主题色彩令牌
const lightColors: ModernColorTokens = {
  // 系统色彩
  primaryBlue: '#007AFF',
  primaryGreen: '#34C759',
  primaryIndigo: '#5856D6',
  primaryOrange: '#FF9500',
  primaryPink: '#FF2D92',
  primaryPurple: '#AF52DE',
  primaryRed: '#FF3B30',
  primaryTeal: '#5AC8FA',
  primaryYellow: '#FFCC00',

  // 灰度色彩
  neutralGray: '#8E8E93',
  neutralGray2: '#AEAEB2',
  neutralGray3: '#C7C7CC',
  neutralGray4: '#D1D1D6',
  neutralGray5: '#E5E5EA',
  neutralGray6: '#F2F2F7',

  // 语义色彩
  textPrimary: '#000000',
  textSecondary: '#3C3C43',
  textTertiary: '#3C3C4399',
  textQuaternary: '#3C3C432E',
  
  // 背景色彩
  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: '#F2F2F7',
  backgroundTertiary: '#FFFFFF',
  
  // 分组背景
  backgroundGrouped: '#F2F2F7',
  backgroundGroupedSecondary: '#FFFFFF',
  backgroundGroupedTertiary: '#F2F2F7',
  
  // 填充色彩
  fillPrimary: '#78788033',
  fillSecondary: '#78788028',
  fillTertiary: '#7676801E',
  fillQuaternary: '#74748014',
  
  // 分隔线
  divider: '#3C3C4336',
  dividerOpaque: '#C6C6C8'
}

// 深色主题色彩令牌
const darkColors: ModernColorTokens = {
  // 系统色彩
  primaryBlue: '#0A84FF',
  primaryGreen: '#30D158',
  primaryIndigo: '#5E5CE6',
  primaryOrange: '#FF9F0A',
  primaryPink: '#FF375F',
  primaryPurple: '#BF5AF2',
  primaryRed: '#FF453A',
  primaryTeal: '#64D2FF',
  primaryYellow: '#FFD60A',

  // 灰度色彩
  neutralGray: '#8E8E93',
  neutralGray2: '#636366',
  neutralGray3: '#48484A',
  neutralGray4: '#3A3A3C',
  neutralGray5: '#2C2C2E',
  neutralGray6: '#1C1C1E',

  // 语义色彩
  textPrimary: '#FFFFFF',
  textSecondary: '#EBEBF5',
  textTertiary: '#EBEBF599',
  textQuaternary: '#EBEBF52E',
  
  // 背景色彩
  backgroundPrimary: '#000000',
  backgroundSecondary: '#1C1C1E',
  backgroundTertiary: '#2C2C2E',
  
  // 分组背景
  backgroundGrouped: '#000000',
  backgroundGroupedSecondary: '#1C1C1E',
  backgroundGroupedTertiary: '#2C2C2E',
  
  // 填充色彩
  fillPrimary: '#78788033',
  fillSecondary: '#78788028',
  fillTertiary: '#7676801E',
  fillQuaternary: '#74748014',
  
  // 分隔线
  divider: '#54545899',
  dividerOpaque: '#38383A'
}

// 现代流畅设计令牌
export const modernDesignTokens: ModernDesignTokens = {
  colors: {
    light: lightColors,
    dark: darkColors
  },
  
  typography: {
    // 大标题
    largeTitle: {
      fontSize: '34px',
      lineHeight: '41px',
      fontWeight: 400,
      letterSpacing: '0.37px'
    },
    
    // 标题级别
    title1: {
      fontSize: '28px',
      lineHeight: '34px',
      fontWeight: 400,
      letterSpacing: '0.36px'
    },
    
    title2: {
      fontSize: '22px',
      lineHeight: '28px',
      fontWeight: 400,
      letterSpacing: '0.35px'
    },
    
    title3: {
      fontSize: '20px',
      lineHeight: '25px',
      fontWeight: 400,
      letterSpacing: '0.38px'
    },
    
    // 标题
    headline: {
      fontSize: '17px',
      lineHeight: '22px',
      fontWeight: 600,
      letterSpacing: '-0.41px'
    },
    
    // 正文
    body: {
      fontSize: '17px',
      lineHeight: '22px',
      fontWeight: 400,
      letterSpacing: '-0.41px'
    },
    
    // 说明文字
    callout: {
      fontSize: '16px',
      lineHeight: '21px',
      fontWeight: 400,
      letterSpacing: '-0.32px'
    },
    
    // 子标题
    subheadline: {
      fontSize: '15px',
      lineHeight: '20px',
      fontWeight: 400,
      letterSpacing: '-0.24px'
    },
    
    // 脚注
    footnote: {
      fontSize: '13px',
      lineHeight: '18px',
      fontWeight: 400,
      letterSpacing: '-0.08px'
    },
    
    // 说明
    caption1: {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 400,
      letterSpacing: '0px'
    },
    
    caption2: {
      fontSize: '11px',
      lineHeight: '13px',
      fontWeight: 400,
      letterSpacing: '0.07px'
    }
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '40px',
    '3xl': '48px',
    '4xl': '64px'
  },
  
  radius: {
    none: '0px',
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    full: '9999px'
  },
  
  shadow: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)'
  },
  
  animation: {
    duration: {
      fast: '150ms',
      medium: '300ms',
      slow: '500ms'
    },
    easing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  }
}

// 导出快捷访问
export const { colors, typography, spacing, radius, shadow, animation } = modernDesignTokens