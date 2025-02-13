'use client';

import dynamic from 'next/dynamic';

const BookmarkButtonContent = dynamic(() => import('./BookmarkButtonContent'), {
  ssr: false,
});

interface Props {
  recipeKey: string;
}

function BookmarkButton({ recipeKey }: Props) {
  return <BookmarkButtonContent recipeKey={recipeKey} />;
}

export default BookmarkButton;
