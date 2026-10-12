import { useEffect } from 'react'
import { useSettings } from './content-context.js'
import { themeVariables } from './theme.js'

// Pushes the admin's design settings onto <html> as CSS variables and data attributes.
export default function ThemeApplier() {
  const settings = useSettings()
  const vars = themeVariables(settings)
  const key = JSON.stringify(vars)

  useEffect(() => {
    const root = document.documentElement
    const applied = JSON.parse(key)
    for (const [name, value] of Object.entries(applied)) root.style.setProperty(name, value)
    return () => {
      for (const name of Object.keys(applied)) root.style.removeProperty(name)
    }
  }, [key])

  useEffect(() => {
    const root = document.documentElement
    root.dataset.logo = settings.logoPosition
    root.dataset.hero = settings.heroAlign
    root.style.setProperty('--logo-size', `${settings.logoSize}px`)
  }, [settings.logoPosition, settings.heroAlign, settings.logoSize])

  return null
}
