import { useState, useEffect } from 'react'

export function useTheme() {
  // Check localStorage for saved preference
  // Default to 'light' if nothing saved
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('meme-theme') || 'light'
  })

  useEffect(() => {
    // Apply theme to the root html element
    document.documentElement.setAttribute('data-theme', theme)
    // Save to localStorage so it persists
    localStorage.setItem('meme-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return { theme, toggleTheme }
}