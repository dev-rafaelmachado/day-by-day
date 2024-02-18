import clientPromise from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const Input = z.object({
  title: z.string(),
  description: z.string().optional(),
  beginAt: z.string(),
  endAt: z.string().optional(),
  tags: z.array(z.string()).optional(),
  link: z.string().optional(),
})

export async function POST(req: NextRequest) {
  const client = await clientPromise
  const db = client.db('day-by-day')
  await client.connect()
  try {
    const data = await req.json()
    const body = Input.parse(data)
    const insertData = {
      ...body,
      beginAt: new Date(body.beginAt),
      endAt: body.endAt ? new Date(body.endAt) : undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const register = await db.collection('registers').insertOne({
      ...insertData,
    })
    return NextResponse.json(
      { _id: register.insertedId, ...insertData },
      { status: 201 },
    )
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
