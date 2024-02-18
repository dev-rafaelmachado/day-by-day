import clientPromise from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const Input = z.object({
  title: z.string(),
  description: z.string(),
  beginAt: z.string(),
  endAt: z.string(),
  tags: z.array(z.string()),
  link: z.string(),
})

export async function POST(request: NextRequest) {
  const client = await clientPromise
  const db = client.db('day-by-day')
  await client.connect()
  try {
    const data = await request.json()
    const body = Input.parse(data)
    const insertData = {
      ...body,
      beginAt: new Date(body.beginAt).toISOString(),
      endAt: new Date(body.endAt).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const register = await db.collection('registers').insertOne({
      ...insertData,
    })
    return NextResponse.json({ ...register, ...insertData }, { status: 201 })
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
