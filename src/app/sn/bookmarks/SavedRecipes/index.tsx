'use client';

import { useQuery } from '@tanstack/react-query';

import style from './style.module.scss';

import { RecipeSimple } from '@/services/recipe/type';
import { isAuthError } from '@/services/utils/authError';

import { userBookmarkedRecipesOptions } from '@/queries/options';

import useLogout from '@/hooks/useLogout';

import { useClientStore } from '@/providers/client-store-provider';

import RecipeImgAndInfoCard from '@/app/components/common/RecipeImgAndInfoCard';

import { getCountText } from './helper';

function SavedRecipes() {
  return (
    <section>
      <h2 className={style['title']}>Saved Recipes</h2>
      <Content />
    </section>
  );
}

export default SavedRecipes;

function Content() {
  const username = useClientStore((state) => state.user?.username);
  const logout = useLogout();
  const { data, error, isLoading } = useQuery(
    userBookmarkedRecipesOptions({
      username: username ?? '',
      enabled: !!username,
    }),
  );

  if (isLoading) return <ContentSkeleton />;

  if (error) {
    if (isAuthError(error)) {
      logout();
      return;
    }
    return <ErrorMessage />;
  }

  if (!data) return null;

  const countText = getCountText((data?.search || []).length);

  return (
    <div>
      <span className={style['count']}>{countText}</span>
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

function ContentSkeleton() {
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

function ErrorMessage() {
  return <div>Something went wrong. Please try again later.</div>;
}
