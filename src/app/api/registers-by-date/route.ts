import { NextRequest, NextResponse } from 'next/server'

import clientPromise from '../../../lib/mongodb'
import { z } from 'zod'

const Input = z.object({
  date: z.string(),
})

export async function GET(req: NextRequest) {
  const client = await clientPromise
  const db = client.db('day-by-day')
  await client.connect()
  try {
    const { searchParams } = new URL(req.url)
    const query = {
      date: searchParams.get('date'),
    }
    const { date } = Input.parse(query)

    const dateObj = new Date(date)
    const startOfDay = new Date(
      dateObj.getFullYear(),
      dateObj.getMonth(),
      dateObj.getDate(),
    )
    const endOfDay = new Date(
      dateObj.getFullYear(),
      dateObj.getMonth(),
      dateObj.getDate() + 1,
    )

    const register = await db
      .collection('registers')
      .find({
        beginAt: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      })
      .toArray()

    return NextResponse.json({ register }, { status: 200 })
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
