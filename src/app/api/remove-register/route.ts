import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const Input = z.object({
  id: z.string(),
})

export async function DELETE(req: NextRequest) {
  const client = await clientPromise
  const db = client.db('day-by-day')
  await client.connect()
  try {
    const { searchParams } = new URL(req.url)
    const query = {
      id: searchParams.get('id'),
    }
    const { id } = Input.parse(query)

    await db.collection('registers').deleteOne({ _id: new ObjectId(id) })
    return NextResponse.json({ id }, { status: 200 })
  } catch (err: unknown) {
    const error = err as Error
    return NextResponse.json(
      {
        message:
          error instanceof z.ZodError
            ? error.errors
            : error?.message || 'An error occurred',
        code: 'error',
        status: 500,
      },
      { status: 500 },
    )
  } finally {
    await client.close()
  }
}
