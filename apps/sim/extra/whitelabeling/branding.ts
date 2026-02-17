import { type BrandConfig, type ThemeColors } from '@/lib/branding'

export type { BrandConfig, ThemeColors }

/**
 * Retourne les couleurs du thème
 */
export const getThemeColors = (): ThemeColors => {
  return {
    primaryColor: '#FF5733',
    primaryHoverColor: '#FF784E',
    accentColor: '#33C1FF',
    accentHoverColor: '#33D1FF',
    backgroundColor: '#F5F5F5',
  }
}

/**
 * Retourne la configuration de la marque 
 */
export const getBrandConfig = (): BrandConfig => {
  return {
    name: 'MyBrand',
    logoUrl: '/logo.png',
    faviconUrl: '/favicon.ico',
    customCssUrl: '/styles/custom.css',
    supportEmail: 'support@mybrand.com',
    documentationUrl: 'https://docs.mybrand.com',
    termsUrl: 'https://mybrand.com/terms',
    privacyUrl: 'https://mybrand.com/privacy',
    theme: getThemeColors(),
  }
}

/**
 * Hook pour  la configuration de marque
 */
export const useBrandConfig = () => {
  return getBrandConfig()
}
