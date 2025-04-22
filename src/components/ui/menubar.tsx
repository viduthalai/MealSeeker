'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from '@/libs/i18nNavigation';
import { Bell, CompassIcon, Heart, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

type MobileMenuItemProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
};

function MobileMenuItem({ icon, label, active, onClick, disabled }: MobileMenuItemProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        'flex h-16 w-full flex-col items-center justify-center gap-1 rounded-none',
        active && 'bg-accent text-accent-foreground',
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
      <span className="text-xs font-normal">{label}</span>
    </Button>
  );
}

export function MobileBottomMenubar() {
  const path = usePathname();
  const menu = path.split('/').pop() || '';
  const [active, setActive] = React.useState(menu);
  const router = useRouter();
  const handleMenuClick = (a = 'home') => {
    setActive(a);
    const url = a === 'home' ? `/member` : `/member/${a}`;
    router.push(url);
    router.refresh();
  };
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background ">
      <div className="grid grid-cols-5">
        <MobileMenuItem onClick={() => handleMenuClick('home')} icon={<Home className="h-5 w-5" />} label="Home" active={active === 'home' || active === 'member'} />
        <MobileMenuItem disabled icon={<CompassIcon className="h-5 w-5" />} label="Discover" active={active === 'discover'} />
        <MobileMenuItem onClick={() => handleMenuClick('menu')} icon={<Bell className="h-5 w-5" />} label="My Menu" active={active === 'menu'} />
        <MobileMenuItem disabled icon={<Heart className="h-5 w-5" />} label="My Recipes" active={active === 'recipes'} />
      </div>
    </div>
  );
}
