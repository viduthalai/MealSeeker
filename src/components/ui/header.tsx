'use client';
import { usePathname } from '@/libs/i18nNavigation';
import { UserButton } from '@clerk/nextjs';
import { getHeaderText } from '../home/utils';

export const Header = () => {
  const pathname = usePathname();
  const title = getHeaderText(pathname);
  return (
    <header className="bg-white shadow header-title  flex items-center justify-between px-4 py-2">
      <div>

      </div>
      <div className="text-center">
        {title}
      </div>
      <UserButton />
    </header>
  );
};
