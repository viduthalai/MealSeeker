'use client';

import type { MouseEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export const LoginButton = () => {
    const router = useRouter();

    const handleChange: MouseEventHandler<HTMLButtonElement> = () => {
        router.push('/menu')
        router.refresh();
    };

    return (
        <Button onClick={handleChange} className='w-full mb-3' >

            Login
        </Button>

    );
};
