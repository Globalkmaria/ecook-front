'use client';

import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useShallow } from 'zustand/shallow';

import style from './style.module.scss';

import { useClientStore } from '@/providers/client-store-provider';

import { checkIsUnauthorizedError } from '@/services/utils/authError';

import bookmarkListOptions from '@/queries/bookmarkListOptions';
import useAddBookmarkMutation from '@/queries/hooks/useAddBookmarkMutation';
import useRemoveBookmarkMutation from '@/queries/hooks/useRemoveBookmarkMutation';

import { IconType } from '@/components/Icon/const';
import IconButton from '@/components/IconButton';

import { RecipePageParams } from '../../page';

function BookmarkButton() {
  return (
    <Suspense fallback={<BookmarkButtonSkeleton />}>
      <BookmarkButtonContent />
    </Suspense>
  );
}

export default BookmarkButton;

function BookmarkButtonSkeleton() {
  return <IconButton icon='bookmarkOutline' disabled />;
}

function BookmarkButtonContent() {
  const router = useRouter();
  const params = useParams<RecipePageParams>();
  const { mutate: addBookmark, isPending: isAddBookmarkLoading } =
    useAddBookmarkMutation();
  const { mutate: removeBookmark, isPending: isRemoveBookmarkLoading } =
    useRemoveBookmarkMutation();
  const [isLoggedIn, resetUser] = useClientStore(
    useShallow((state) => [state.user.isLoggedIn, state.resetUser]),
  );
  const bookmarks = useQuery(
    bookmarkListOptions({
      enabled: isLoggedIn,
    }),
  );

  if (checkIsUnauthorizedError(bookmarks.error)) {
    resetUser();
    router.replace('/login');
    return;
  }

  const disableButton =
    !!bookmarks.error ||
    bookmarks.isLoading ||
    isAddBookmarkLoading ||
    isRemoveBookmarkLoading;

  const isSaved = bookmarks.data?.has(params.recipeKey);
  const icon: IconType = isSaved ? 'bookmarkFill' : 'bookmarkOutline';

  const onClick = () => {
    if (!isLoggedIn) {
      alert('Please login to use bookmark');
      return;
    }

    isSaved ? removeBookmark(params.recipeKey) : addBookmark(params.recipeKey);
  };

  return (
    <IconButton
      disabled={disableButton}
      icon={icon}
      onClick={onClick}
      className={style['button']}
    />
  );
}
