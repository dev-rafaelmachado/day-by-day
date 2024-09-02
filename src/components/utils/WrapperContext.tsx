import { SelectedDayProvider } from '@/contexts/SelectedDayContext'
import { UserContextProvider } from '@/contexts/UserContext'
import { WrapperSessionContext } from '@/contexts/WrapperSessionContext'
import ReactQueryProvider from '@/lib/provider/reactQuery'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const WrapperContext = ({ children }: Props) => {
  return (
    <WrapperSessionContext>
      <UserContextProvider>
        <SelectedDayProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </SelectedDayProvider>
      </UserContextProvider>
    </WrapperSessionContext>
  )
}
