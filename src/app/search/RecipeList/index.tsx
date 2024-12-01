import Link from 'next/link';
import Image from 'next/image';

import style from './style.module.scss';

import { RecipeSimple } from '@/service/recipes/type';

import { getLimitedText } from '@/utils/text';
import { formatTime } from '@/utils/time';

import Chip, { ChipsContainer } from '@/components/Chip';

interface Props {
  recipes: RecipeSimple[];
}

function RecipeList({ recipes }: Props) {
  return (
    <ul className={style.list}>
      {recipes.map((recipe) => (
        <Item key={recipe.id} recipe={recipe} />
      ))}
    </ul>
  );
}

export default RecipeList;

interface ItemProps {
  recipe: RecipeSimple;
}

function Item({ recipe }: ItemProps) {
  const time = formatTime({ hours: recipe.hours, minutes: recipe.minutes });
  const name = getLimitedText(recipe.name, 30);

  return (
    <li className={style.wrapper}>
      <Link href={`/recipes/${recipe.key}`} className={style.card}>
        <div className={style['img-box']}>
          <div className={style['img-wrapper']}>
            <Image
              className={style.img}
              src={recipe.img}
              alt={recipe.name}
              fill
            />
          </div>
        </div>

        <div className={style.info}>
          <span className={style.title}>{name}</span>
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
