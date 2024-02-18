'use client'
import { useGetRegisters } from '@/hooks/querys/useGetRegisters'
import { Card } from './Card'

export const List = () => {
  const { data, isError, isLoading } = useGetRegisters({ date: new Date() })
  return (
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
  )
}
