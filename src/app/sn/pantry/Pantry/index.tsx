'use client';

import { useClientStore } from '@/providers/client-store-provider';

import GuestUserPantry from './GuestUserPantry';
import LogInUserPantry from './LogInUserPantry';

function Pantry() {
  const isLoggedIn = useClientStore((state) => state.user.isLoggedIn);
  const Component = isLoggedIn ? LogInUserPantry : GuestUserPantry;

  return <Component />;
}

export default Pantry;
