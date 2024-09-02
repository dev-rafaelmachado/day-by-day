'use client'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { GitCommit } from '@phosphor-icons/react'

export default function Page() {
  return (
    <main className="flex h-[calc(100%-64px)] w-full items-center justify-center bg-hoki-100 transition-colors dark:bg-cobalt-700">
      <div className="flex flex-col gap-2">
        <Button
          onClick={() => signIn('github')}
          className="neumorphism dark:bg-secondary-color flex h-8 items-center justify-center gap-2  rounded-lg px-6 py-5 font-medium transition-colors hover:bg-hoki-500 hover:text-white"
        >
          <GitCommit className="h-6 w-6" />
          <span className="">Continuar com Github</span>
        </Button>
      </div>
    </main>
  )
}
