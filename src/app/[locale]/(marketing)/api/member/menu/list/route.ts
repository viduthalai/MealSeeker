import { db } from '@/libs/DB';
import { menuListSchema, userListSchema } from '@/models/Schema';
import { eq, or } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const memberId = searchParams.get('memberId') || '';

  if (!memberId) {
    return NextResponse.json({ error: 'Missing memberId' }, { status: 400 });
  }

  const result = await db.query.userListSchema.findFirst({
    where: eq(userListSchema.user_id, memberId),
  });

  const menuListData = await db.query.menuListSchema.findMany({
    where: or(
      eq(menuListSchema.user_id, memberId),
      eq(menuListSchema.is_global, true), // Use `true` (lowercase) for boolean values in JavaScript
    ),
  });
  return NextResponse.json({ menuList: menuListData, selectedMenuIds: result?.menu_ids || '' });
};
