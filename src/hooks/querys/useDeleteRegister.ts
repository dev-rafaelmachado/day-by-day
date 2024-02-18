import { GetRegisterByIdDTO } from '@/types/GetRegisterByIdDTO'
import { asyncRemoveRegisters } from '@/utils/services/removeRegister'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useDeleteRegister = () => {
  const queryClient = useQueryClient()
  const { mutate: removeRegister, isPending } = useMutation({
    mutationFn: asyncRemoveRegisters,
    onSuccess: (data) => {
      toast.success('Register removed successfully!')
      queryClient.setQueryData(
        ['registers-by-date'],
        (oldData: GetRegisterByIdDTO[]) => {
          return oldData.filter((register) => register._id !== data.id)
        },
      )
    },
    onError: (error, variables, context) => {
      console.error('onError', error, variables, context)
      toast.error('Error removing register!')
    },
  })
  return { removeRegister, isPending }
}
