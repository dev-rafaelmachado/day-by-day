import BaseApi from '@/lib/axios'
import { CreateRegisterDTO } from '@/types/CreateRegisterDTO'
import { GetRegisterByIdDTO } from '@/types/GetRegisterByIdDTO'

const asyncCreateRegister = async ({
  title,
  description,
  beginAt,
  endAt,
  tags,
  link,
}: CreateRegisterDTO) => {
  try {
    const response = await BaseApi.post<GetRegisterByIdDTO>('/add-register', {
      title,
      description,
      beginAt,
      endAt,
      tags,
      link,
    })
    return response.data
  } catch (err: unknown) {
    const error = err as Error
    throw new Error(error.message)
  }
}

export { asyncCreateRegister }
