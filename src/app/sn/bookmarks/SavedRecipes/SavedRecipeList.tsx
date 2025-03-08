'use client';

import { useQuery } from '@tanstack/react-query';
import { useShallow } from 'zustand/shallow';

import style from './style.module.scss';

import { RecipeSimple } from '@/services/requests/recipe/type';
import { isAuthError } from '@/services/utils/authError';

import { getBookmarkedRecipes } from '@/stores/slices/helper';

import { useClientStore } from '@/providers/client-store-provider';

import {
  userBookmarkedRecipesOptions,
  recipesBatchOptions,
} from '@/queries/options';

import useLogout from '@/hooks/useLogout';

import RecipeImgAndInfoCard from '@/app/components/common/RecipeImgAndInfoCard';

import { getCountText } from './helper';

function SavedRecipeList() {
  const isLoggedIn = useClientStore((state) => state.user.isLoggedIn);

  return isLoggedIn ? <LoginContent /> : <NotLoggedInContent />;
}

function NotLoggedInContent() {
  const bookmarks = useClientStore(useShallow((state) => state.bookmarks));
  const recipeKeys = getBookmarkedRecipes(bookmarks);
  const enabled = recipeKeys.length > 0;

  const { data, error, isLoading } = useQuery(
    recipesBatchOptions({
      query: recipeKeys,
      type: 'keys',
      enabled,
    }),
  );

  return <Content data={data} isLoading={isLoading} error={error} />;
}

export default SavedRecipeList;

function LoginContent() {
  const username = useClientStore((state) => state.user?.username);
  const logout = useLogout();
  const { data, error, isLoading } = useQuery(
    userBookmarkedRecipesOptions({
      username: username ?? '',
      enabled: !!username,
    }),
  );

  if (isAuthError(error)) {
    logout();
    return;
  }

  return <Content data={data} isLoading={isLoading} error={error} />;
}

interface ContentProps {
  data?: {
    search: RecipeSimple[];
    recommend: RecipeSimple[];
  };
  isLoading: boolean;
  error: Error | null;
}

function Content({ data, isLoading, error }: ContentProps) {
  if (isLoading) return <ListSkeleton />;

  if (error) return <ErrorMessage />;

  if (!data || !data.search.length) return <NoContent />;

  const countText = getCountText((data?.search || []).length);

  return (
    <div>
      <span className={style['text']}>{countText}</span>
      <List recipes={data?.search ?? []} />
    </div>
  );
}

function List({ recipes }: { recipes: RecipeSimple[] }) {
  if (!recipes.length) return null;

  return (
    <ul className={style['list']}>
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <RecipeImgAndInfoCard.Card recipe={recipe} />
        </li>
      ))}
    </ul>
  );
}

function ListSkeleton() {
  const list = Array.from({ length: 4 });
  return (
    <ul className={style['list']}>
      {list.map((_, index) => (
        <li key={index}>
          <RecipeImgAndInfoCard.Skeleton />
        </li>
      ))}
    </ul>
  );
}

function NoContent() {
  return (
    <>
      <p>No saved recipes yet.</p>
      <p>Save recipes by clicking the bookmark icon on the recipe page</p>
    </>
  );
}

function ErrorMessage() {
  return <div>Something went wrong. Please try again later.</div>;
}
