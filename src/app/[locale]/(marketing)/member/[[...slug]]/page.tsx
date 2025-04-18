import { GenerateMenu } from '@/components/home/GenerateMenu';
import { getGreeting, getRandomMenuItem } from '@/components/home/utils';
import { SunSVG } from '@/components/icons/sun';
import { db } from '@/libs/DB';
import { menuListSchema, userListSchema } from '@/models/Schema';
import { eq, inArray } from 'drizzle-orm';

type IAboutProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata() {
  return {
    title: 'Member Home',
    description: 'Member Home',
  };
}

export default async function MemberHome(props: IAboutProps) {
  const { slug = [] } = await props.params;
  // const mealTime = getMealTime();
  const memberId = Number(slug[0]) || 0;
  const result = await db.query.userListSchema.findFirst({
    where: eq(userListSchema.id, memberId),
  });

  if (!result) {
    return null;
  }
  const { name = 'User', menu_ids = '' } = result || {};
  const idsArray = menu_ids.split(',').map(id => Number.parseInt(id.trim(), 10)); // Convert to array of numbers

  const menuListData: any = await db.query.menuListSchema.findMany({
    where: inArray(menuListSchema.id, idsArray),
  });

  const item = getRandomMenuItem(menuListData) || {};

  // const cuisineDetails = await db.query.cuisineListSchema.findMany({
  //   where: eq(cuisineListSchema.id, Number(item.cuisine_id)),
  // });

  return (
    <>
      <div className="p-4">
        <div>
          <div className="mt-2 text-left text-sm flex  items-center gap-1">
            <SunSVG />
            {getGreeting()}
          </div>
          <div className="mt-1 text-left font-bold text-md">
            {name}
          </div>

        </div>
        <div>
          <GenerateMenu item={item} />
        </div>
      </div>
    </>
  );
};
