// Design settings the admin can change from the Site settings panel.
export const DEFAULT_SETTINGS = {
  theme: 'default', // a THEME_PRESETS key, or 'custom'
  primary: '#0b3fe4',
  accent: '#17b8ff',
  corners: 'rounded', // rounded | soft | sharp
  buttons: 'pill', // pill | rounded | square
  logoPosition: 'left', // left | center
  logoSize: 68,
  logoUrl: '',
  heroAlign: 'left', // left | center
  showAnnouncement: true,
  showTopbarContacts: true,
  showHeaderCta: true,
  customCursor: true,
}

export const THEME_PRESETS = {
  default: { label: 'Alpha blue', primary: '#0b3fe4', accent: '#17b8ff' },
  teal: { label: 'Teal', primary: '#0f766e', accent: '#2dd4bf' },
  purple: { label: 'Purple', primary: '#6d28d9', accent: '#c084fc' },
  emerald: { label: 'Emerald', primary: '#047857', accent: '#34d399' },
  orange: { label: 'Sunset', primary: '#c2410c', accent: '#fbbf24' },
  crimson: { label: 'Crimson', primary: '#be123c', accent: '#fb7185' },
  graphite: { label: 'Graphite', primary: '#334155', accent: '#38bdf8' },
}

const CORNERS = {
  rounded: { '--radius': '14px', '--radius-lg': '22px' },
  soft: { '--radius': '8px', '--radius-lg': '12px' },
  sharp: { '--radius': '2px', '--radius-lg': '4px' },
}

const BUTTONS = { pill: '999px', rounded: '10px', square: '2px' }

// CSS custom properties for the settings; the default theme keeps the stylesheet colours.
export function themeVariables(settings) {
  const vars = { ...CORNERS[settings.corners], '--btn-radius': BUTTONS[settings.buttons] }
  if (settings.theme === 'default') return vars

  const preset = THEME_PRESETS[settings.theme]
  const primary = preset ? preset.primary : settings.primary
  const accent = preset ? preset.accent : settings.accent
  const [h, s, l] = hexToHsl(primary)
  const shade = (lightness) => `hsl(${h} ${s}% ${Math.max(5, Math.min(80, lightness))}%)`

  return {
    ...vars,
    '--blue-900': shade(14),
    '--blue-800': shade(24),
    '--blue-700': primary,
    '--blue-600': shade(l + 6),
    '--blue-500': shade(l + 14),
    '--blue-400': shade(l + 24),
    '--cyan-400': accent,
    '--hero-overlay': `linear-gradient(90deg, hsl(${h} ${s}% 12% / 0.94) 0%, hsl(${h} ${s}% 16% / 0.82) 45%, hsl(${h} ${s}% 22% / 0.6) 100%)`,
    '--footer-bg': shade(9),
    '--grad-dark': `linear-gradient(140deg, ${shade(14)} 0%, ${shade(24)} 55%, ${shade(l - 4)} 100%)`,
  }
}

function hexToHsl(hex) {
  const n = parseInt(hex.replace('#', ''), 16)
  const r = ((n >> 16) & 255) / 255
  const g = ((n >> 8) & 255) / 255
  const b = (n & 255) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return [0, 0, Math.round(l * 100)]
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0)
  else if (max === g) h = (b - r) / d + 2
  else h = (r - g) / d + 4
  return [Math.round(h * 60), Math.round(s * 100), Math.round(l * 100)]
}
