import { Metadata } from 'next';

import style from './style.module.scss';

import { getProfile } from '@/service/users';

import { AvatarImg } from '@/components/Avatar';
import Icon from '@/components/Icon';

import { getHomeRecipes, getRecipes } from '@/service/recipes';
import { notFound } from 'next/navigation';
import RecipeList from './RecipeList';

export type UserPageParams = {
  username: string;
};

interface Props {
  params: Promise<UserPageParams>;
}

export const revalidate = 86400; // 1 day

export const dynamicParams = true;

export async function generateStaticParams() {
  const result = await getHomeRecipes();
  if (!result.ok) return [];

  const users = new Set(
    result.data.map((recipe) => ({
      username: recipe.user.username,
    })),
  );

  return [...users];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = (await params).username;

  const result = await getProfile(username);

  if (!result.ok) return {};

  const data = result.data;
  return {
    title: `User Profile - Explore Recipes by ${data.username} | E-COOK`,
    description: `Check out recipes shared by ${data.username} on E-COOK. Discover their culinary creations and find inspiration for your next meal.'`,
  };
}

async function UserPage({ params }: Props) {
  const { username } = await params;

  if (!username) return notFound();

  const [profileResult, recipesResult] = await Promise.all([
    getProfile(username),
    getRecipes(username, 'username'),
  ]);
  if (!profileResult.ok || !recipesResult.ok) return notFound();

  const user = profileResult.data;
  const imgUser = {
    img: user.img ?? null,
    username: user.username,
  };
  const recipes = recipesResult.data;

  return (
    <main className={style.wrapper}>
      <div className={style.container}>
        <header className={style.profile}>
          <div className={style.avatar}>
            <AvatarImg user={imgUser} size={100} />
          </div>
          <div className={style.info}>
            <span className={style.username}>{user.username}</span>
            <span>
              <span className={style.recipes}>{user.totalPosts}</span>
              {` recipes`}
            </span>
          </div>
        </header>

        <hr className={style.border} />

        <section>
          <div className={style.tabs}>
            <span className={style.tab}>
              <Icon icon='grid' /> RECIPES
            </span>
          </div>

          <RecipeList recipes={recipes} />
        </section>
      </div>
    </main>
  );
}

export default UserPage;
