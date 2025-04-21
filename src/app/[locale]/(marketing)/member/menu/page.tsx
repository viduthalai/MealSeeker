import { UpdateMenu } from '@/components/member/menu/UpdateMenu';
import { db } from '@/libs/DB';
import { menuListSchema, userListSchema } from '@/models/Schema';
import { eq, or } from 'drizzle-orm';

type IAboutProps = {
  params: Promise<{ slug: string; locale: string }>;
  searchParams: Promise<Record<string, string>>;
};

export async function generateMetadata() {
  return {
    title: 'Member Home',
    description: 'Member Home',
  };
}

export default async function MenuPage(props: IAboutProps) {
  const params = await props.searchParams;
  const memberId = Number(params?.id) || 0;

  const result = await db.query.userListSchema.findFirst({
    where: eq(userListSchema.id, memberId),
  });

  if (!result) {
    return null;
  }

  const menuListData = await db.query.menuListSchema.findMany({
    where: or(
      eq(menuListSchema.user_id, memberId),
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
