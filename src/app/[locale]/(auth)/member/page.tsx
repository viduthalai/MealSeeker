import { GenerateMenu } from '@/components/home/GenerateMenu';
import { getGreeting } from '@/components/home/utils';
import { SunSVG } from '@/components/icons/sun';
import { db } from '@/libs/DB';
import { userListSchema } from '@/models/Schema';
import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import Link from 'next/link';

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

  const menu_ids = result?.menu_ids; // Assuming menu_ids is a string of comma-separated IDs

  return (
    <>
      <div>

        <GenerateMenu
          user={{
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            memberId,
          }}
          menuIds={menu_ids}
        />
      </div>
    </>
  );
};
