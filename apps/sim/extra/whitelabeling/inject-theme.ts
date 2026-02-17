/**
 * Helper to detect if background is dark
 */
function isDarkBackground(hexColor: string): boolean {
  const hex = hexColor.replace('#', '')
  const r = Number.parseInt(hex.substr(0, 2), 16)
  const g = Number.parseInt(hex.substr(2, 2), 16)
  const b = Number.parseInt(hex.substr(4, 2), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance < 0.5
}

/**
 * Constantes de thème 
 */
const BRAND_PRIMARY_COLOR = '#FF5733'
const BRAND_PRIMARY_HOVER_COLOR = '#FF784E'
const BRAND_ACCENT_COLOR = '#33C1FF'
const BRAND_ACCENT_HOVER_COLOR = '#33D1FF'
const BRAND_BACKGROUND_COLOR = '#F5F5F5'

/**
 * Génère le CSS des variables de thème
 */
export function generateThemeCSS(): string {
  const cssVars: string[] = []

  if (BRAND_PRIMARY_COLOR) {
    cssVars.push(`--brand-primary-hex: ${BRAND_PRIMARY_COLOR};`)
  }

  if (BRAND_PRIMARY_HOVER_COLOR) {
    cssVars.push(`--brand-primary-hover-hex: ${BRAND_PRIMARY_HOVER_COLOR};`)
  }

  if (BRAND_ACCENT_COLOR) {
    cssVars.push(`--brand-accent-hex: ${BRAND_ACCENT_COLOR};`)
  }

  if (BRAND_ACCENT_HOVER_COLOR) {
    cssVars.push(`--brand-accent-hover-hex: ${BRAND_ACCENT_HOVER_COLOR};`)
  }

  if (BRAND_BACKGROUND_COLOR) {
    cssVars.push(`--brand-background-hex: ${BRAND_BACKGROUND_COLOR};`)

    // Ajouter indicateur si le fond est sombre
    const isDark = isDarkBackground(BRAND_BACKGROUND_COLOR)
    if (isDark) {
      cssVars.push(`--brand-is-dark: 1;`)
    }
  }

  return cssVars.length > 0 ? `:root { ${cssVars.join(' ')} }` : ''
}
