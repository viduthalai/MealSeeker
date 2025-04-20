'use client';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import { useRouter } from '@/libs/i18nNavigation';
import { Bell, CompassIcon, Heart, Home, User } from 'lucide-react';
import React from 'react';

type MobileMenuItemProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
};

function MobileMenuItem({ icon, label, active, onClick }: MobileMenuItemProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        'flex h-16 w-full flex-col items-center justify-center gap-1 rounded-none',
        active && 'bg-accent text-accent-foreground',
      )}
      onClick={onClick}
    >
      {icon}
      <span className="text-xs font-normal">{label}</span>
    </Button>
  );
}

export function MobileBottomMenubar() {
  const [active, setActive] = React.useState('');
  const router = useRouter();
  const handleMenuClick = (a = '/') => {
    setActive(a);
    const memberId = localStorage.getItem('MealUserId');
    console.log('Navigate to home page', a);
    const url = a === '' ? `/member/${memberId}` : `/member/${a}?id=${memberId}`;
    router.push(url);
    router.refresh();
  };
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background ">
      <div className="grid grid-cols-5">
        <MobileMenuItem onClick={() => handleMenuClick('')} icon={<Home className="h-5 w-5" />} label="Home" active={active === ''} />
        <MobileMenuItem icon={<CompassIcon className="h-5 w-5" />} label="Discover" active={active === 'discover'} />
        <MobileMenuItem onClick={() => handleMenuClick('menu')} icon={<Bell className="h-5 w-5" />} label="My Menu" active={active === 'menu'} />
        <MobileMenuItem icon={<Heart className="h-5 w-5" />} label="My Recipes" active={active === 'recipes'} />
        <MobileMenuItem icon={<User className="h-5 w-5" />} label="Profile" active={active === 'profile'} />
      </div>
    </div>
  );
}
