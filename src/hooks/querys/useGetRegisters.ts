import { asyncGetRegisters } from '@/utils/services/getRegisters'
import { useQuery } from '@tanstack/react-query'

type Params = {
  date: Date
}

export const useGetRegisters = ({ date }: Params) => {
  const queryKey = ['registers-by-date']
  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await asyncGetRegisters({
        date,
      })
      return response
    },
  })
  return { data, isError, isLoading }
}
