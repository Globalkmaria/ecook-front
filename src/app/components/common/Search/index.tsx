import { Suspense } from 'react';

import Skeleton from '@/components/Skeleton';

import SearchContainer from './SearchContainer';

function Search() {
  return (
    <Suspense fallback={<Skeleton />}>
      <SearchContainer />
    </Suspense>
  );
}

export default Search;
