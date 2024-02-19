import { GetRegisterByIdDTO } from '@/types/GetRegisterByIdDTO'
import { asyncEditRegister } from '@/utils/services/editRegister'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useEditRegister = () => {
  const queryClient = useQueryClient()
  const { mutate: editRegister, isPending } = useMutation({
    mutationFn: asyncEditRegister,
    onSuccess: (data) => {
      toast.success('Register edited with success.')
      queryClient.setQueryData(
        ['registers-by-date'],
        (oldData: GetRegisterByIdDTO[]) => {
          const newData = oldData.map((register) => {
            if (register._id === data._id) {
              return data
            }
            return register
          })
          return newData
        },
      )
    },
    onError: (error, variables, context) => {
      console.error('onError', error, variables, context)
      toast.error('Error to edit register. Try again later.')
    },
  })
  return { editRegister, isPending }
}
