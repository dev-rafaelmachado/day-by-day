import { Header } from '../components/Header'
import { AddModal } from '@/components/AddModal'
import { List } from '@/components/List'
import { PickDay } from '@/components/PickDay'

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <Header />
      <main className="flex h-[calc(100%-64px)] w-full items-center justify-center bg-hoki-100 transition-colors dark:bg-cobalt-700">
        <section className="relative h-full w-full pb-8 lg:w-3/5 ">
          <List />
          <div className="absolute bottom-4 left-2 flex flex-col gap-2">
            <PickDay />
            <AddModal />
          </div>
        </section>
        <section className="hidden h-full w-0 bg-hoki-700 dark:bg-hoki-900 lg:block lg:w-2/5"></section>
      </main>
    </div>
  )
}
