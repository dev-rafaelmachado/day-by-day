'use client'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

type SelectedDayType = {
  selectedDay: Date
  setSelectedDay: Dispatch<SetStateAction<Date>>
}

type Props = {
  children: ReactNode
}

const SelectedDayContext = createContext<SelectedDayType | undefined>(undefined)

export const useSelectedDay = () => {
  const context = useContext(SelectedDayContext)
  if (!context) {
    throw new Error(
      'useSelectedDay deve ser usado dentro de um SelectedDayProvider',
    )
  }
  return context
}

export const SelectedDayProvider = ({ children }: Props) => {
  const [selectedDay, setSelectedDay] = useState<Date>(new Date())

  const contextValue: SelectedDayType = {
    selectedDay,
    setSelectedDay,
  }

  return (
    <SelectedDayContext.Provider value={contextValue}>
      {children}
    </SelectedDayContext.Provider>
  )
}
