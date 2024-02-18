'use client'
import { useGetRegisters } from '@/hooks/querys/useGetRegisters'
import { Card } from './Card'
import { Skeleton } from './ui/skeleton'
import { useDeleteRegister } from '@/hooks/querys/useDeleteRegister'

export const List = () => {
  const { removeRegister } = useDeleteRegister()
  const { data, isLoading } = useGetRegisters({ date: new Date() })

  return (
    <div className="flex w-full flex-col items-center gap-4">
      {isLoading && <Skeleton className="h-32  w-4/5 rounded-lg" />}
      {data?.map((register) => {
        return (
          <Card
            key={register._id}
            title={register.title}
            beginAt={register.beginAt}
            endAt={register.endAt}
            description={register.description}
            tags={register.tags}
            link={register.link}
            remove={() => removeRegister({ id: register._id })}
          />
        )
      })}
    </div>
  )
}
