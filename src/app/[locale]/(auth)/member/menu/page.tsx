import { UpdateMenu } from '@/components/member/menu/UpdateMenu';
import { currentUser } from '@clerk/nextjs/server';

export async function generateMetadata() {
  return {
    title: 'Member Home',
    description: 'Member Home',
  };
}

export default async function MenuPage() {
  const user = await currentUser();
  const memberId: string = user?.id || '';

  if (!memberId) {
    return null; // Handle the case where the user is not authenticated
  }

  return (
    <>
      <div className="p-4">
        <UpdateMenu memberId={memberId} />
      </div>
    </>
  );
};
