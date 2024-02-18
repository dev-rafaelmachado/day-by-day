import { asyncGetRegisters } from '@/utils/services/getRegisters'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

type Params = {
  date: Date
}

export const useGetRegisters = ({ date }: Params) => {
  const queryKey = ['registers-by-date']
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await asyncGetRegisters({
        date,
      }).catch((error) => {
        console.error(error)
        toast.error('Error to get registers')
      })
      return response
    },
  })
  return { data, isLoading }
}
