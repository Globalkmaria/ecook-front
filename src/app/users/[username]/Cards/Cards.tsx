import Link from 'next/link';

import style from './Cards.module.scss';

import { RecipeSimple } from '@/services/recipe/type';

import { formatTime } from '@/utils/time';
import { getLimitedText } from '@/utils/text';

import { getRecipeLink } from '@/helpers/link';

import Chip, { ChipsContainer } from '@/components/Chip';
import CustomImage from '@/components/CustomImage';

import CardMenu from './CardMenu';

interface Props {
  recipes: RecipeSimple[];
}

function Cards({ recipes }: Props) {
  return (
    <ul className={style.list}>
      {recipes.map((recipe) => (
        <Card key={recipe.key} recipe={recipe} />
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
  const name = getLimitedText(recipe.name, 30);
  const recipeLink = getRecipeLink(recipe.key);

  return (
    <li className={style.wrapper}>
      <CardMenu recipeKey={recipe.key} />
      <Link href={recipeLink} className={style.card}>
        <div className={style['img-box']}>
          <div className={style['img-wrapper']}>
            <CustomImage
              loadingClassName={style['img-placeholder']}
              imgClassName={style.img}
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
