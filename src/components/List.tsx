'use client'
import { useGetRegisters } from '@/hooks/querys/useGetRegisters'
import { Card } from './Card'
import { Skeleton } from './ui/skeleton'
import { useDeleteRegister } from '@/hooks/querys/useDeleteRegister'
import { useSelectedDay } from '@/contexts/SelectedDayContext'
import { useEffect } from 'react'

export const List = () => {
  const { removeRegister } = useDeleteRegister()
  const { selectedDay } = useSelectedDay()
  const { data, isLoading, refetch } = useGetRegisters({ date: selectedDay })

  useEffect(() => {
    refetch()
  }, [selectedDay, refetch])

  return (
    <div className="flex h-full w-full flex-col items-center gap-4 overflow-y-auto pt-4">
      {isLoading && (
        <>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-4/5 rounded-lg" />
          ))}
        </>
      )}
      {!isLoading &&
        data?.map((register) => {
          return (
            <Card
              key={register._id}
              id={register._id}
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
