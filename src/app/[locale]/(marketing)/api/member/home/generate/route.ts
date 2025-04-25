import { db } from '@/libs/DB';
import { menuListSchema, userActivitySchema } from '@/models/Schema';
import { desc, eq, inArray } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const memberId = searchParams.get('memberId') || '';
  const menu_ids = searchParams.get('menuIds') || '';

  const idsArray = menu_ids?.split(',').map(id => Number.parseInt(id.trim(), 10)) || []; // Convert to array of numbers

  if (!memberId) {
    return NextResponse.json({ error: 'Missing memberId' }, { status: 400 });
  }

  const menuListData = await db.query.menuListSchema.findMany({
    where: inArray(menuListSchema.id, idsArray),
    // where: eq(userListSchema.user_id, memberId.toString()),
  });

  const activityLimit = menuListData.length >= 10 ? 15 : menuListData.length; // Default to 15 if no menu items are found

  const userActivity = await db.query.userActivitySchema.findMany({
    where: eq(userActivitySchema.user_id, memberId),
    orderBy: [desc(userActivitySchema.created_at)], // Sort by `created_at` in descending order
    limit: activityLimit, // Limit to the last 10 activities
  });

  return NextResponse.json({ menuList: menuListData, userActivity: userActivity || '' });
};
