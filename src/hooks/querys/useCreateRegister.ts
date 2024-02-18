import { GetRegisterByIdDTO } from '@/types/GetRegisterByIdDTO'
import { asyncCreateRegister } from '@/utils/services/createRegister'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useCreateRegister = () => {
  const queryClient = useQueryClient()
  const { mutate: addRegister, isPending } = useMutation({
    mutationFn: asyncCreateRegister,
    onSuccess: (data) => {
      toast.success('Register added')
      queryClient.setQueryData(
        ['registers-by-date'],
        (oldData: GetRegisterByIdDTO[]) => {
          return [...oldData, data]
        },
      )
    },
    onError: (error, variables, context) => {
      console.error('onError', error, variables, context)
      toast.error('Error to add register')
    },
  })
  return { addRegister, isPending }
}
