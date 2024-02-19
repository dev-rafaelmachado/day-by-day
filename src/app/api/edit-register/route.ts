import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const Input = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  beginAt: z.string().optional(),
  endAt: z.string().optional(),
  tags: z.array(z.string()).optional(),
  link: z.string().optional(),
})

const Params = z.object({
  id: z.string(),
})

export async function PUT(req: NextRequest) {
  const client = await clientPromise
  const db = client.db('day-by-day')
  await client.connect()
  try {
    const data = await req.json()
    const body = Input.parse(data)
    const { searchParams } = new URL(req.url)
    const query = {
      id: searchParams.get('id'),
    }
    const { id } = Params.parse(query)

    const insertData = {
      ...body,
      beginAt: body.beginAt ? new Date(body.beginAt) : undefined,
      endAt: body.endAt ? new Date(body.endAt) : undefined,
      updatedAt: new Date(),
    }

    await db
      .collection('registers')
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: insertData },
        { upsert: true },
      )
    return NextResponse.json({ _id: id, ...insertData }, { status: 200 })
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
