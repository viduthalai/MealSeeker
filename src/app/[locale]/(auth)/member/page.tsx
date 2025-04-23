import { GenerateMenu } from '@/components/home/GenerateMenu';
import { getGreeting, getMenuItem } from '@/components/home/utils';
import { SunSVG } from '@/components/icons/sun';
import { db } from '@/libs/DB';
import { menuListSchema, userActivitySchema, userListSchema } from '@/models/Schema';
import { currentUser } from '@clerk/nextjs/server';
import { desc, eq, inArray } from 'drizzle-orm';
import Image from 'next/image';
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
  const memberId = user?.id?.toString();

  if (!memberId) {
    return null; // Handle the case where the user is not authenticated
  }

  const result = await db.query.userListSchema.findFirst({
    where: eq(userListSchema.user_id, memberId),
  });

  if (!result || !result.menu_ids) {
    // write a insert query to insert the user into the userListSchema
    if (!result) {
      await db.insert(userListSchema).values({
        user_id: memberId,
        name: `${user?.firstName} ${user?.lastName}`,
        email: user?.emailAddresses[0]?.emailAddress || '',
        created_at: new Date(),
        updated_at: new Date(),
        is_active: true,
      });
    }
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
          <Link type="button" href="/member/menu?firstTime=true" className="text-blue-500 hover:underline">Add Menu Items</Link>
        </div>
      </div>
    );
  }

  const menu_ids = result.menu_ids; // Assuming menu_ids is a string of comma-separated IDs
  const idsArray = menu_ids?.split(',').map(id => Number.parseInt(id.trim(), 10)) || []; // Convert to array of numbers

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

  const item = getMenuItem(menuListData, userActivity) || {};

  return (
    <>
      <div>
        <div className="relative">
          <Image
            src="/assets/images/member/homeHeader1.png"
            alt="User Avatar"
            layout="responsive"
            width={0}
            height="250"
            className="rounded-lg shadow-md w-full"
            style={{ maxHeight: '220px', height: '250px' }}
          />
          <div className="greeting-container absolute left-10 bottom-5 p-4">
            <div className="text-left text-2xl flex items-center gap-1">
              <SunSVG />
              {getGreeting()}
            </div>
            <div className="mt-1 text-left font-bold text-2xl">
              {`${user?.firstName}, ${user?.lastName}`}
            </div>
          </div>
        </div>
        <div>
          <GenerateMenu memberId={memberId} item={item} />
        </div>
      </div>
    </>
  );
};
