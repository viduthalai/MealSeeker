import { UpdateMenu } from '@/components/member/menu/UpdateMenu';
import { db } from '@/libs/DB';
import { menuListSchema, userListSchema } from '@/models/Schema';
import { currentUser } from '@clerk/nextjs/server';
import { eq, or } from 'drizzle-orm';

export async function generateMetadata() {
  return {
    title: 'Member Home',
    description: 'Member Home',
  };
}

export default async function MenuPage() {
  const user = await currentUser();
  const memberId: string = user?.id || '';
  const result = await db.query.userListSchema.findFirst({
    where: eq(userListSchema.user_id, memberId.toString()),
  });

  if (!result) {
    return null;
  }

  const menuListData = await db.query.menuListSchema.findMany({
    where: or(
      eq(menuListSchema.user_id, memberId.toString()),
      eq(menuListSchema.is_global, true), // Use `true` (lowercase) for boolean values in JavaScript
    ),
  });

  return (
    <>
      <div className="p-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">Update Menu</h1>
          <div className="text-gray-600 text-sm">This is the update menu page.</div>

          <UpdateMenu userDetails={result} menuList={menuListData} />
        </div>

      </div>
    </>
  );
};
