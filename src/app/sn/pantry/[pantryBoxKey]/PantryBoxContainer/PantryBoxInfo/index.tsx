'use client';

import { useClientStore } from '@/providers/client-store-provider';

import GuestUserPantryBox from './GuestUserPantryBox';
import LoginUserPantryBox from './LoginUserPantryBox';

function PantryBoxInfo() {
  const isLoggedIn = useClientStore((state) => state.user.isLoggedIn);
  const Component = isLoggedIn ? LoginUserPantryBox : GuestUserPantryBox;

  return <Component />;
}

export default PantryBoxInfo;
