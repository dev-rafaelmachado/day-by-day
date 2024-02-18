import BaseApi from '@/lib/axios'

type Params = {
  id: string
}

const asyncRemoveRegisters = async ({ id }: Params) => {
  try {
    const response = await BaseApi.delete<{ id: string }>('/remove-register', {
      params: { id },
    })
    return response.data
  } catch (err: unknown) {
    const error = err as Error
    throw new Error(error.message)
  }
}

export { asyncRemoveRegisters }
