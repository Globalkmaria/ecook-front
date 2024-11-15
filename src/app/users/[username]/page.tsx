import Link from 'next/link';
import Image from 'next/image';

import style from './style.module.scss';

import { RecipeSimple } from '@/service/recipes/type';
import { getProfile } from '@/service/users';

import { formatTime } from '@/utils/time';
import { AvatarImg } from '@/components/Avatar';
import Icon from '@/components/Icon';
import Chip, { ChipsContainer } from '@/components/Chip';

interface Props {
  params: { username: string };
}

async function UserPage({ params }: Props) {
  if (!params.username) return null;

  const result = await getProfile(params.username);
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

          <div className={style.list}>
            {recipes.map((recipe) => (
              <Card key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default UserPage;

interface CardProps {
  recipe: RecipeSimple;
}

function Card({ recipe }: CardProps) {
  const time = formatTime({ hours: recipe.hours, minutes: recipe.minutes });

  return (
    <Link href={`/recipes/${recipe.id}`} className={style.card}>
      <Image
        className={style.img}
        src={recipe.img}
        alt={recipe.name}
        width={300}
        height={300}
        objectFit='contain'
      />

      <div className={style.info}>
        <span className={style.title}>{recipe.name}</span>
        <span className={style.time}>{time}</span>
        <div className={style.chip}>
          <ChipsContainer>
            {recipe.tags.map((tag) => (
              <Chip key={tag.id}>{tag.name}</Chip>
            ))}
          </ChipsContainer>
        </div>
      </div>
    </Link>
  );
}
