import { Button } from '@/components/ui/button'
import { Card } from '../components/Card'
import { Header } from '../components/Header'
import { Plus } from '@phosphor-icons/react/dist/ssr'

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <Header />
      <main className="dark:bg-cobalt-700 flex h-[calc(100%-64px)] w-full items-center justify-center bg-hoki-100 transition-colors">
        <section className="relative h-full w-3/5 py-8">
          <div className="flex w-full flex-col items-center gap-4">
            <Card
              title="Fazer Café"
              beginAt="2022-01-01T08:10:00"
              endAt="2022-01-01T08:15:00"
              description="Acordei e fui fazer café logo cedo"
              tags={['cozinha', 'café']}
              link="https://www.google.com"
            />
            <Card
              title="Estudar Tailwind"
              beginAt="2022-01-01T08:15:00"
              endAt="2022-01-01T09:00:00"
              description="Estudei um pouco sobre TailwindCSS"
              tags={['estudo', 'tailwind']}
            />
          </div>
          <Button
            variant={'secondary'}
            size="icon"
            className="text-white absolute bottom-4 left-2 flex items-center justify-center p-2"
          >
            <Plus size={'1.2rem'} />
          </Button>
        </section>
        <section className="h-full w-2/5 bg-hoki-700 dark:bg-hoki-900"></section>
      </main>
    </div>
  )
}
