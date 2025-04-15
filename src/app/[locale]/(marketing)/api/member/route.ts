import { db } from '@/libs/DB';
import { logger } from '@/libs/Logger';
import { userActivitySchema } from '@/models/Schema';

import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export const PUT = async (request: Request) => {
  const json = await request.json();

  // const parse = CounterValidation.safeParse(json);

  // if (!parse.success) {
  //   return NextResponse.json(parse.error.format(), { status: 422 });
  // }

  // The default value is 0 when there is no `x-e2e-random-id` header
  const headersNext = await headers();
  for (const [key, value] of headersNext.entries()) {
    console.log(`${key}: ${value}`);
  }

  const user_id = json?.user_id ?? 0;
  const cuisine_id = json?.cuisine_id ?? '';
  const meal_time = json?.meal_time ?? '';

  const count = await db
    .insert(userActivitySchema)
    .values({
      user_id,
      cuisine_id: cuisine_id.toString(),
      meal_time: meal_time.toString(),
    })
    // .onConflictDoUpdate({
    //   target: userActivitySchema.id,
    //   set: { user_id: sql`${userActivitySchema.id} + ${parse.data.increment}` },
    // })
    .returning();

  logger.info('Counter has been incremented');

  return NextResponse.json({
    user_id: count[0]?.user_id,
  });
};
