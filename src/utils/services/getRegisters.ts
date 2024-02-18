import BaseApi from '@/lib/axios'
import { GetRegisterByIdDTO } from '@/types/GetRegisterByIdDTO'

type Params = {
  date: Date
}

const asyncGetRegisters = async ({ date }: Params) => {
  try {
    const response = await BaseApi.get<GetRegisterByIdDTO[]>(
      '/registers-by-date',
      {
        params: { date },
      },
    )
    return response.data
  } catch (err: unknown) {
    const error = err as Error
    throw new Error(error.message)
  }
}

export { asyncGetRegisters }
