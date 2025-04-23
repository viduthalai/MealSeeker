'use client';
import { usePathname, useRouter } from '@/libs/i18nNavigation';
import { UserButton } from '@clerk/nextjs';
import { ArrowLeftIcon, Home } from 'lucide-react';
import { getHeaderText } from '../home/utils';

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const title = getHeaderText(pathname);
  return (
    <header className="bg-white shadow header-title  flex items-center justify-between px-4 py-2">
      <div>
        {
          title !== 'My Home' && (
            <ArrowLeftIcon onClick={() => router.back()} />
          )
        }
        {
          title === 'My Home' && (
            <Home />
          )
        }
      </div>
      <div className="text-center">
        {title}
      </div>
      <UserButton />
    </header>
  );
};
