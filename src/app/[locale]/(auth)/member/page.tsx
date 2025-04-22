import { GenerateMenu } from '@/components/home/GenerateMenu';
import { getGreeting, getMenuItem } from '@/components/home/utils';
import { SunSVG } from '@/components/icons/sun';
import { db } from '@/libs/DB';
import { menuListSchema, userActivitySchema, userListSchema } from '@/models/Schema';
import { SignOutButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { desc, eq, inArray } from 'drizzle-orm';
import Link from 'next/link';

// type IAboutProps = {
//   params: Promise<{ locale: string }>;
// };

export async function generateMetadata() {
  return {
    title: 'Member Home',
    description: 'Member Home',
  };
}

export default async function MemberHome() {
  const user = await currentUser();
  const memberId = user?.id || '';

  const result = await db.query.userListSchema.findFirst({
    where: eq(userListSchema.user_id, memberId.toString()),
  });

  if (!result) {
    return null;
  }
  const { menu_ids = '' } = result || {};

  if (!menu_ids) {
    return (
      <div className="p-4">
        <div className="text-left text-sm">
          <SunSVG />
          {getGreeting()}
        </div>
        <div className="mt-1 text-left font-bold text-md">
          {`${user?.firstName}, ${user?.lastName}`}
        </div>
        <div className="mt-4">
          <p className="text-red-500"> Please add some items to your menu.</p>
        </div>
        <div className="mt-4">
          <Link type="button" href="/member/menu" className="text-blue-500 hover:underline">Add Menu Items</Link>
        </div>
      </div>
    );
  }
  const idsArray = menu_ids?.split(',').map(id => Number.parseInt(id.trim(), 10)) || []; // Convert to array of numbers

  const menuListData = await db.query.menuListSchema.findMany({
    where: inArray(menuListSchema.id, idsArray),
  });

  const activityLimit = menuListData.length >= 10 ? 15 : menuListData.length; // Default to 15 if no menu items are found

  const userActivity = await db.query.userActivitySchema.findMany({
    where: eq(userActivitySchema.user_id, memberId.toString()),
    orderBy: [desc(userActivitySchema.created_at)], // Sort by `created_at` in descending order
    limit: activityLimit, // Limit to the last 10 activities
  });

  const item = getMenuItem(menuListData, userActivity) || {};

  return (
    <>
      <div className="p-4">
        <div>
          <div className="mt-2 text-left text-sm flex  items-center gap-1">
            <SunSVG />
            {getGreeting()}
          </div>
          <div className="mt-1 text-left font-bold text-md">
            {`${user?.firstName}, ${user?.lastName}`}
          </div>

        </div>
        <div>
          <GenerateMenu memberId={memberId} item={item} />
        </div>
        <div className="mt-4">
          <SignOutButton>
            Sign Out
          </SignOutButton>
        </div>
      </div>
    </>
  );
};
