/**
 * Modern EdTech Theme Configuration
 * Provides consistent design system across the application
 */
export const theme = {
  // Color Palette
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
    white: '#ffffff',
    black: '#000000',
  },

  // Typography
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      thai: ['Sarabun', 'sans-serif'],
      mono: ['JetBrains Mono', 'Consolas', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  // Spacing
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',  // 2px
    base: '0.25rem', // 4px
    md: '0.375rem', // 6px
    lg: '0.5rem',   // 8px
    xl: '0.75rem',  // 12px
    '2xl': '1rem',   // 16px
    '3xl': '1.5rem', // 24px
    full: '9999px',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },

  // Animation
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  // Breakpoints (for responsive design)
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Component specific styles
  components: {
    button: {
      primary: {
        backgroundColor: '#3b82f6',
        color: '#ffffff',
        borderColor: '#3b82f6',
        hoverBackgroundColor: '#2563eb',
        activeBackgroundColor: '#1e40af',
      },
      secondary: {
        backgroundColor: '#f1f5f9',
        color: '#334155',
        borderColor: '#cbd5e1',
        hoverBackgroundColor: '#e2e8f0',
        activeBackgroundColor: '#cbd5e1',
      },
      success: {
        backgroundColor: '#22c55e',
        color: '#ffffff',
        borderColor: '#22c55e',
        hoverBackgroundColor: '#16a34a',
        activeBackgroundColor: '#15803d',
      },
      warning: {
        backgroundColor: '#f59e0b',
        color: '#ffffff',
        borderColor: '#f59e0b',
        hoverBackgroundColor: '#d97706',
        activeBackgroundColor: '#b45309',
      },
      danger: {
        backgroundColor: '#ef4444',
        color: '#ffffff',
        borderColor: '#ef4444',
        hoverBackgroundColor: '#dc2626',
        activeBackgroundColor: '#b91c1c',
      },
    },
    card: {
      backgroundColor: '#ffffff',
      borderColor: '#e5e5e5',
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      borderRadius: '0.5rem',
    },
    input: {
      backgroundColor: '#ffffff',
      borderColor: '#d4d4d4',
      focusBorderColor: '#3b82f6',
      errorBorderColor: '#ef4444',
      borderRadius: '0.375rem',
    },
  },
};

// CSS custom properties injection
export const injectTheme = () => {
  const root = document.documentElement;
  
  // Inject colors
  Object.entries(theme.colors).forEach(([colorName, colorValues]) => {
    if (typeof colorValues === 'object') {
      Object.entries(colorValues).forEach(([shade, value]) => {
        root.style.setProperty(`--color-${colorName}-${shade}`, value);
      });
    } else {
      root.style.setProperty(`--color-${colorName}`, colorValues);
    }
  });

  // Inject typography
  Object.entries(theme.typography.fontFamily).forEach(([key, value]) => {
    root.style.setProperty(`--font-family-${key}`, value.join(', '));
  });

  Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
    root.style.setProperty(`--font-size-${key}`, value);
  });

  // Inject spacing
  Object.entries(theme.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--spacing-${key}`, value);
  });

  // Inject border radius
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    root.style.setProperty(`--border-radius-${key}`, value);
  });
};

export default theme;
