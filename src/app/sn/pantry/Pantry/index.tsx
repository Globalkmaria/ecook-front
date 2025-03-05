'use client';

import { useClientStore } from '@/providers/client-store-provider';

import GuestUserPantry from './GuestUserPantry';

function Pantry() {
  const isLoggedIn = useClientStore((state) => state.user.isLoggedIn);
  const Component = isLoggedIn ? GuestUserPantry : GuestUserPantry;

  return <Component />;
}

export default Pantry;
