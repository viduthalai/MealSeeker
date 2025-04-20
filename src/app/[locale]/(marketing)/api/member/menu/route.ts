import { db } from '@/libs/DB';
import { logger } from '@/libs/Logger';
import { menuListSchema, userListSchema } from '@/models/Schema';
import { eq } from 'drizzle-orm';
// Import the `eq` function

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

  // const data = {
  //   menuName: values.menuName,
  //   isBreakfast: values.isBreakfast,
  //   isLunch: values.isLunch,
  //   isDinner: values.isDinner,
  //   cuisine_id: values.cuisine_id,
  //   user_id: userDetails?.id || 0,
  // };

  const user_id = json?.user_id ?? 0;
  const menuName = json?.menuName ?? '';
  const isBreakfast = json?.isBreakfast ?? false;
  const isLunch = json?.isLunch ?? false;
  const isDinner = json?.isDinner ?? false;
  const cuisine_id = json?.cuisine_id ?? '';
  const item_type = json?.item_type ?? '';
  let menu_ids = json?.menu_ids ?? '';

  const count = await db
    .insert(menuListSchema)
    .values({
      cuisine_id: cuisine_id.toString(),
      breakfast: isBreakfast,
      lunch: isLunch,
      dinner: isDinner,
      item: menuName.toString(),
      item_type,
      user_id,
    })
    .returning();

  logger.info('Menu has been added');

  if (!count[0]?.id) {
    return NextResponse.json({ error: 'Failed to add menu item' }, { status: 500 });
  }

  if (count[0]?.id) {
    menu_ids = menu_ids ? `${menu_ids},${count[0]?.id}` : count[0]?.id.toString();
    // Update the user_list with the new menu_ids
    // Use `eq` to compare the user_id in the where clause
    const update = await db
      .update(userListSchema)
      .set({
        menu_ids: menu_ids.toString(),
      })
      .where(eq(userListSchema.id, user_id)) // Use `eq` for the condition
      .returning();

    return NextResponse.json({
      menu_id: count[0]?.id,
      update_list: update[0]?.menu_ids,
      message: 'Menu item added successfully',
    });
  }

  return NextResponse.json({
    user_id: count[0]?.id,
    message: 'Menu item added successfully',
  });
};

export const POST = async (request: Request) => {
  const json = await request.json();

  // const parse = CounterValidation.safeParse(json);

  // if (!parse.success) {
  //   return NextResponse.json(parse.error.format(), { status: 422 });
  // }

  const user_id = json?.user_id ?? 0;
  const menu_ids = json?.menu_ids ?? '';

  const update = await db
    .update(userListSchema)
    .set({
      menu_ids: menu_ids.toString(),
    })
    .where(eq(userListSchema.id, user_id)) // Use `eq` for the condition
    .returning();

  logger.info('User menu has been updated');

  return NextResponse.json({
    user_id: update[0]?.id,
    menu_ids: update[0]?.menu_ids,
    message: 'User menu updated successfully',
  });
};
