import { NextRequest, NextResponse } from 'next/server'

import clientPromise from '../../../lib/mongodb'
import { z } from 'zod';

const Input = z.object({
  date: z.string()
});

export async function GET(req: NextRequest) {
  const client = await clientPromise
  const db = client.db('day-by-day')
  await client.connect()
  try {
    const {searchParams} = new URL(req.url);
    const query = {
      date: searchParams.get('date')
    }
    const { date } = Input.parse(query);
    const register = await db 
      .collection('registers')
      .findOne({ date })

    return NextResponse.json({ register }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json(
      {
        message: err instanceof z.ZodError ? err.errors : err?.message || 'An error occurred',
        code: 'error',
        status: 500,
      },
      { status: 500 },
    )
  } finally {
    await client.close()
  }
}
