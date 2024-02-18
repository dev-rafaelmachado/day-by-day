import { useState, useEffect } from 'react'

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDarkMode)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('darkMode', darkMode.toString())
  }, [darkMode])

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode)
  }

  return { darkMode, toggleTheme }
}
