'use client'

import { useTheme } from '@/hooks/useTheme'
import { GithubLogo, Moon, Sun } from '@phosphor-icons/react'

export const Header = () => {
  const { darkMode, toggleTheme } = useTheme()
  return (
    <header className="text-white flex h-16 w-full items-center justify-between bg-hoki-950 px-10 font-display">
      <h1 className="text-3xl font-bold">Day By Day</h1>
      <div className="flex gap-10">
        <a className="" href="https://github.com/dev-rafaelmachado">
          <GithubLogo size={'1.6rem'} />
        </a>
        <button onClick={toggleTheme}>
          {!darkMode ? <Moon size={'1.6rem'} /> : <Sun size={'1.6rem'} />}
        </button>
      </div>
    </header>
  )
}
