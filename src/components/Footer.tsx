'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const Footer = () => {
  const pathname = usePathname();
  const router = useRouter();
  const lastValue = pathname.split('/').filter(Boolean).pop(); // Extract the last value
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Access localStorage only on the client side
    const storedUserId = localStorage?.getItem('MealUserId');
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setUserId(storedUserId);
  }, [lastValue]);

  useEffect(() => {
    if (userId && lastValue !== userId) {
      console.log('🚀 ~DONT change in URL :', userId);
      localStorage.removeItem('MealUserId');
      router.push(`/`);
      router.refresh();
    }
  }, [userId, lastValue, router]);

  return <></>;
};
