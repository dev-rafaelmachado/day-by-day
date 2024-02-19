import BaseApi from '@/lib/axios'
import { GetRegisterByIdDTO } from '@/types/GetRegisterByIdDTO'
import { UpdateRegisterDTO } from '@/types/UpdateRegisterDTO'

const asyncEditRegister = async ({
  id,
  title,
  description,
  beginAt,
  endAt,
  tags,
  link,
}: UpdateRegisterDTO & {
  id: string
}) => {
  try {
    const response = await BaseApi.put<GetRegisterByIdDTO>(
      '/edit-register',
      {
        title,
        description,
        beginAt,
        endAt,
        tags,
        link,
      },
      {
        params: {
          id,
        },
      },
    )
    return response.data
  } catch (err: unknown) {
    const error = err as Error
    throw new Error(error.message)
  }
}

export { asyncEditRegister }
