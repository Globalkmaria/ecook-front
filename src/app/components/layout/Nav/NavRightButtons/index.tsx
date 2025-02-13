'use client';

import dynamic from 'next/dynamic';

const NavRightButtonsContent = dynamic(
  () => import('./NavRightsButtonsContent'),
  {
    ssr: false,
  },
);

function NavRightButtons() {
  return <NavRightButtonsContent />;
}

export default NavRightButtons;
