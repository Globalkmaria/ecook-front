'use client';

import { useClientStore } from '@/providers/client-store-provider';
import GuestUserPantryBox from './GuestUserPantryBox';

function PantryBoxInfo() {
  const isLoggedIn = useClientStore((state) => state.user.isLoggedIn);
  const Component = isLoggedIn ? GuestUserPantryBox : GuestUserPantryBox;

  return <Component />;
}

export default PantryBoxInfo;
