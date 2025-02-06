'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import style from './style.module.scss';

import { useClientStore } from '@/providers/client-store-provider';

import useLogout from '@/hooks/useLogout';

import bookmarkListOptions from '@/queries/bookmarkListOptions';
import useAddBookmarkMutation from '@/queries/hooks/useAddBookmarkMutation';
import useRemoveBookmarkMutation from '@/queries/hooks/useRemoveBookmarkMutation';

import { IconType } from '@/components/Icon/const';
import IconButton from '@/components/IconButton';

import { RecipePageParams } from '../../page';

function BookmarkButton() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return <BookmarkButtonContent />;
}

export default BookmarkButton;

function BookmarkButtonSkeleton() {
  return (
    <IconButton icon='bookmarkOutline' disabled className={style['button']} />
  );
}

function BookmarkButtonContent() {
  const logout = useLogout();
  const params = useParams<RecipePageParams>();
  const { mutate: addBookmark, isPending: isAddBookmarkLoading } =
    useAddBookmarkMutation();
  const { mutate: removeBookmark, isPending: isRemoveBookmarkLoading } =
    useRemoveBookmarkMutation();
  const isLoggedIn = useClientStore((state) => state.user.isLoggedIn);
  const bookmarks = useQuery(
    bookmarkListOptions({
      enabled: isLoggedIn,
    }),
  );

  if (bookmarks.isLoading) return <BookmarkButtonSkeleton />;
  if (isLoggedIn && bookmarks.error) {
    logout();
    return null;
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
