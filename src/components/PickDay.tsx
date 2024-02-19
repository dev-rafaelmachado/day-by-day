'use client'
import { Button } from './ui/button'
import { useSelectedDay } from '@/contexts/SelectedDayContext'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Calendar } from './ui/calendar'
import { Calendar as CalendarIcon } from '@phosphor-icons/react/dist/ssr'

export const PickDay = () => {
  const { selectedDay, setSelectedDay } = useSelectedDay()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'ghost'}
          size="icon"
          className=" flex items-center justify-center p-2 text-cobalt-900 dark:text-white"
        >
          <CalendarIcon size={'1.6rem'} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="ml-8 w-auto rounded-md border-none p-0">
        <Calendar
          className="rounded-md border-none bg-cobalt-800"
          mode="single"
          selected={selectedDay}
          onDayClick={(day) => setSelectedDay(day)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
