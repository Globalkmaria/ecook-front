import Link from 'next/link';

import style from './style.module.scss';

import { RecipeSimple } from '@/services/recipe/type';

import { getLimitedText } from '@/utils/text';
import { formatTime } from '@/utils/time';

import { getRecipeLink } from '@/helpers/links';

import Chip, { ChipsContainer } from '@/components/Chip';
import CustomImage from '@/components/CustomImage';
import Avatar from '@/components/Avatar';

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
      <Link href={getRecipeLink(recipe.key)} className={style.card}>
        <div className={style['top-overlay']}>
          <div className={style['avatar']}>
            <Avatar user={recipe.user} />
          </div>
        </div>
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
