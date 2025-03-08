'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useShallow } from 'zustand/shallow';

import {
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} from '@/queries/hooks';
import { bookmarkListOptions } from '@/queries/options';

import useLogout from '@/hooks/useLogout';

import { IconType } from '@/components/Icon/const';
import IconButton from '@/components/IconButton';

import { useClientStore } from '@/providers/client-store-provider';
import { isUnauthorizedError } from '@/services/utils/authError';

import style from './style.module.scss';
import { RecipePageParams } from '../../page';

interface Props {
  recipeKey: string;
}

function BookmarkButtonContent({ recipeKey }: Props) {
  const isLoggedIn = useClientStore((state) => state.user.isLoggedIn);
  const Button = isLoggedIn ? LoginBookmarkButton : NoLoginBookmarkButton;

  return <Button recipeKey={recipeKey} />;
}

export default BookmarkButtonContent;

function NoLoginBookmarkButton({ recipeKey }: Props) {
  const [isBookmarked, addBookmark, removeBookmark] = useClientStore(
    useShallow((state) => [
      state.hasBookmark(recipeKey),
      state.addBookmark,
      state.removeBookmark,
    ]),
  );

  const icon: IconType = isBookmarked ? 'bookmarkFill' : 'bookmarkOutline';

  const onClick = () => {
    isBookmarked ? removeBookmark(recipeKey) : addBookmark(recipeKey);
  };

  return <BookmarkIconButton disable={false} icon={icon} onClick={onClick} />;
}

function LoginBookmarkButton() {
  const logout = useLogout();
  const params = useParams<RecipePageParams>();
  const { mutate: addBookmark, isPending: isAddBookmarkLoading } =
    useAddBookmarkMutation();
  const { mutate: removeBookmark, isPending: isRemoveBookmarkLoading } =
    useRemoveBookmarkMutation();
  const bookmarks = useQuery(
    bookmarkListOptions({
      enabled: true,
    }),
  );

  if (bookmarks.isLoading) return <BookmarkButtonSkeleton />;
  if (isUnauthorizedError(bookmarks.error)) {
    logout();
    return null;
  }

  const disable =
    !!bookmarks.error ||
    bookmarks.isLoading ||
    isAddBookmarkLoading ||
    isRemoveBookmarkLoading;

  const isSaved = bookmarks.data?.has(params.recipeKey);
  const icon: IconType = isSaved ? 'bookmarkFill' : 'bookmarkOutline';

  const onClick = () => {
    isSaved ? removeBookmark(params.recipeKey) : addBookmark(params.recipeKey);
  };

  return <BookmarkIconButton disable={disable} icon={icon} onClick={onClick} />;
}

function BookmarkIconButton({
  disable,
  icon,
  onClick,
}: {
  disable: boolean;
  icon: IconType;
  onClick: () => void;
}) {
  return (
    <IconButton
      disabled={disable}
      icon={icon}
      onClick={onClick}
      className={style['button']}
    />
  );
}

function BookmarkButtonSkeleton() {
  return (
    <IconButton icon='bookmarkOutline' disabled className={style['button']} />
  );
}
