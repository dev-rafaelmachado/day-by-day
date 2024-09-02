'use client'
import { AddModal } from '@/components/AddModal'
import { List } from '@/components/List'
import { PickDay } from '@/components/PickDay'
import { Button } from '@/components/ui/button'
import { UserContext } from '@/contexts/UserContext'
import { signOut } from 'next-auth/react'
import { useContext } from 'react'

export default function Dashboard() {
  const { user } = useContext(UserContext)
  console.log(user)

  const handleExit = () => {
    signOut()
  }
  return (
    <div className="h-screen w-screen">
      <main className="flex h-[calc(100%-64px)] w-full items-center justify-center bg-hoki-100 transition-colors dark:bg-cobalt-700">
        <section className="relative h-full w-full pb-8 lg:w-3/5 ">
          <List />
          <div className="absolute bottom-4 left-2 flex flex-col gap-2">
            <PickDay />
            <AddModal />
          </div>
        </section>
        <section className="hidden h-full w-0 bg-hoki-700 dark:bg-hoki-900 lg:block lg:w-2/5"></section>
        <Button
          onClick={handleExit}
          className="neumorphism dark:bg-secondary-color flex h-8 items-center justify-center gap-2  rounded-lg px-6 py-5 font-medium transition-colors hover:hover:bg-hoki-500 hover:text-white"
        >
          <span className="">Sair</span>
        </Button>
      </main>
    </div>
  )
}
