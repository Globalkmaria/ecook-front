import { Metadata } from 'next';

import style from './style.module.scss';

import { getProfile } from '@/service/users';

import { AvatarImg } from '@/components/Avatar';
import Icon from '@/components/Icon';

import Cards from './Cards/Cards';

interface Props {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const recipeKey = (await params).username;

  const result = await getProfile(recipeKey);

  if (!result.ok) return {};

  const data = result.data;
  return {
    title: `User Profile - Explore Recipes by ${data.user.username} | E-COOK`,
    description: `Check out recipes shared by ${data.user.username} on E-COOK. Discover their culinary creations and find inspiration for your next meal.'`,
  };
}

async function UserPage({ params }: Props) {
  const { username } = await params;

  if (!username) return null;

  const result = await getProfile(username);
  if (!result.ok) return null;

  const { user, recipes } = result.data;

  return (
    <main className={style.wrapper}>
      <div className={style.container}>
        <header className={style.profile}>
          <div className={style.avatar}>
            <AvatarImg
              user={{
                img: user.img ?? null,
                username: user.username,
              }}
              size={100}
            />
          </div>
          <div className={style.info}>
            <span className={style.username}>{user.username}</span>
            <span>
              <span className={style.recipes}>{recipes.length}</span>
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

          <Cards recipes={recipes} />
        </section>
      </div>
    </main>
  );
}

export default UserPage;
