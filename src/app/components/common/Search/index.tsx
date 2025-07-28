'use client';

import dynamic from 'next/dynamic';

import Skeleton from '@/components/Skeleton';

const SearchContainer = dynamic(() => import('./SearchContainer'), {
  ssr: false,
  loading: () => <Skeleton />,
});

function Search() {
  return <SearchContainer />;
}

export default Search;
