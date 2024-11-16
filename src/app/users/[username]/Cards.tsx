import Link from 'next/link';
import Image from 'next/image';
import style from './Cards.module.scss';

import { RecipeSimple } from '@/service/recipes/type';

import { formatTime } from '@/utils/time';

import Chip, { ChipsContainer } from '@/components/Chip';
import IconButton from '@/components/IconButton';

interface Props {
  recipes: RecipeSimple[];
}

function Cards({ recipes }: Props) {
  return (
    <ul className={style.list}>
      {recipes.map((recipe) => (
        <Card key={recipe.id} recipe={recipe} />
      ))}
    </ul>
  );
}

export default Cards;

interface CardProps {
  recipe: RecipeSimple;
}

function Card({ recipe }: CardProps) {
  const time = formatTime({ hours: recipe.hours, minutes: recipe.minutes });

  return (
    <li className={style.wrapper}>
      <IconButton className={style.more} icon='more' />
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
    </li>
  );
}
