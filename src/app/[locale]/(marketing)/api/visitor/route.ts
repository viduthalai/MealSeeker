import { db } from '@/libs/DB';
import { logger } from '@/libs/Logger';
import { userListSchema } from '@/models/Schema';
import { and, eq } from 'drizzle-orm';

import { NextResponse } from 'next/server';

export const PUT = async (request: Request) => {
  const json = await request.json();

  // const parse = CounterValidation.safeParse(json);

  // if (!parse.success) {
  //   return NextResponse.json(parse.error.format(), { status: 422 });
  // }

  // The default value is 0 when there is no `x-e2e-random-id` header
  // const headersNext = await headers();

  const name = json?.name || 'naem';
  const email = json?.email || 'ema';
  const password = json?.password || 'ema';
  const menu_ids = json?.menu_ids || '0,1';

  try {
    const user = await db
      .insert(userListSchema)
      .values({
        name,
        password,
        email,
        menu_ids,
      })
      .returning();
    logger.info('User registered successfully');
    return NextResponse.json({
      status: 'success',
      user_id: user[0]?.id,
    });
  } catch (error) {
    logger.info('Login faile error:', error);
    return NextResponse.json({ status: 'error', message: 'Database connection failed' });
  }
};

// create a login get api
export const POST = async (request: Request) => {
  const json = await request.json();

  // const parse = CounterValidation.safeParse(json);

  // if (!parse.success) {
  //   return NextResponse.json(parse.error.format(), { status: 422 });
  // }

  // The default value is 0 when there is no `x-e2e-random-id` header
  // const headersNext = await headers();

  const email = json?.email || 'ema';
  const password = json?.password || 'ema';

  try {
    const user = await db

      .select()
      .from(userListSchema)
      .where(
        and(
          eq(userListSchema.email, email),
          eq(userListSchema.password, password),
        ),
      )
      .limit(1);
    logger.info('User login successfully');
    console.log('🚀 ~ POST ~ user:', user);
    if (user.length === 0) {
      return NextResponse.json({ status: 'error', message: 'User not found' });
    }
    return NextResponse.json({
      status: 'success',
      user_id: user[0]?.id,
    });
  } catch (error) {
    logger.error('Database connection error:', error);
    return NextResponse.json({ status: 'error', message: 'Database connection failed' }, { status: 500 });
  }
};
//
