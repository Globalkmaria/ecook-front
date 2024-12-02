import { Suspense } from 'react';

import Skeleton from '@/components/Skeleton';

import Search from './SearchContainer';

function Wrapper() {
  return (
    <Suspense fallback={<Skeleton />}>
      <Search />
    </Suspense>
  );
}

export default Wrapper;
