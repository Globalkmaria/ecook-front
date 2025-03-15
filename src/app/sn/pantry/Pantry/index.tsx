'use client';

import { Suspense } from 'react';

import dynamic from 'next/dynamic';

import { useClientStore } from '@/providers/client-store-provider';

import PantryBoxesSkeleton from './PantryBoxes/PantryBoxesSkeleton';

const GuestUserPantry = dynamic(() => import('./GuestUserPantry'), {
  ssr: false,
  loading: PantryBoxesSkeleton,
});
const LogInUserPantry = dynamic(() => import('./LogInUserPantry'), {
  ssr: false,
  loading: PantryBoxesSkeleton,
});

function Pantry() {
  const isLoggedIn = useClientStore((state) => state.user.isLoggedIn);
  const Component = isLoggedIn ? LogInUserPantry : GuestUserPantry;

  return (
    <Suspense fallback={<PantryBoxesSkeleton />}>
      <Component />
    </Suspense>
  );
}

export default Pantry;
