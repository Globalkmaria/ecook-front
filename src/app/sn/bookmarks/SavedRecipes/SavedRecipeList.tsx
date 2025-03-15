'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useShallow } from 'zustand/shallow';

import {
  userBookmarkedRecipesOptions,
  recipesBatchOptions,
} from '@/queries/options';

import { getBookmarkedRecipes } from '@/stores/slices/helper';

import useLogout from '@/hooks/useLogout';

import RecipeImgAndInfoCard from '@/app/components/common/RecipeImgAndInfoCard';

import { useClientStore } from '@/providers/client-store-provider';
import { RecipeSimple } from '@/services/requests/recipe/type';
import { isAuthError } from '@/services/utils/authError';

import { getCountText } from './helper';
import style from './style.module.scss';

function SavedRecipeList() {
  const isLoggedIn = useClientStore((state) => state.user.isLoggedIn);

  return isLoggedIn ? <LoginContent /> : <GuestContent />;
}

export default SavedRecipeList;

function GuestContent() {
  const bookmarks = useClientStore(useShallow((state) => state.bookmarks));
  const recipeKeys = getBookmarkedRecipes(bookmarks);
  const enabled = recipeKeys.length > 0;

  const { data, error, isLoading } = useSuspenseQuery(
    recipesBatchOptions({
      query: recipeKeys,
      type: 'keys',
      enabled,
    }),
  );

  return <Content data={data} isLoading={isLoading} error={error} />;
}

function LoginContent() {
  const username = useClientStore((state) => state.user?.username);
  const logout = useLogout();
  const { data, error, isLoading } = useSuspenseQuery(
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

function Content({ data, error }: ContentProps) {
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
