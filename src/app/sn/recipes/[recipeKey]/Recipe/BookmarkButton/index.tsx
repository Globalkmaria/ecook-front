'use client';

import { Suspense } from 'react';

import dynamic from 'next/dynamic';

import { BookmarkButtonSkeleton } from './BookmarkButtonContent';
const BookmarkButtonContent = dynamic(() => import('./BookmarkButtonContent'), {
  ssr: false,
  loading: BookmarkButtonSkeleton,
});

interface Props {
  recipeKey: string;
}

function BookmarkButton({ recipeKey }: Props) {
  return (
    <Suspense fallback={<BookmarkButtonSkeleton />}>
      <BookmarkButtonContent recipeKey={recipeKey} />
    </Suspense>
  );
}

export default BookmarkButton;
