import Link from 'next/link';

import style from './Recipe.module.scss';

import { RecipeSimple } from '@/services/recipes/type';

import { getLimitedText } from '@/utils/text';

import Chip, { ChipsContainer } from '@/components/Chip';
import CustomImage from '@/components/CustomImage';

interface Props {
  recipe: RecipeSimple;
  idx: number;
}

function Recipe({ recipe, idx }: Props) {
  const limitedName = getLimitedText(recipe.name, 20);

  return (
    <Link
      className={style[`item--${idx + 1}`]}
      scroll={false}
      href={`/recipes/${recipe.key}`}
    >
      <div className={style.container}>
        <div className={style['hover-content']}>
          <div className={style['hover-content__img-box']}>
            <CustomImage src={recipe.img} fill alt={recipe.name} />
          </div>
          <h2 className={style['hover-content__name']}>{limitedName}</h2>
        </div>

        <div className={style['img-wrapper']}>
          <div className={`${style[`item--${idx}`]} ${style['img-box']}`}>
            <CustomImage src={recipe.img} fill alt={recipe.name} />
          </div>
        </div>

        <div className={style.information}>
          <div className={style.information__header}>
            <h2 className={style.information__title}>{recipe.name}</h2>
          </div>
          <div className={style.information__text}>
            <ChipsContainer>
              {recipe.tags.map((tag) => (
                <Chip key={tag.id}>{tag.name}</Chip>
              ))}
            </ChipsContainer>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Recipe;
