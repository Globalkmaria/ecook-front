import Image from 'next/image';
import { Libre_Bodoni } from 'next/font/google';

import style from './Recipe.module.scss';

import Chip, { ChipsContainer } from '@/components/Chip';
import Link from 'next/link';
import { RecipeSimple } from '@/service/recipes/type';

const libre = Libre_Bodoni({
  subsets: ['latin'],
  style: ['italic', 'normal'],
  weight: ['700'],
});

interface Props {
  recipe: RecipeSimple;
  idx: number;
}

function Recipe({ recipe, idx }: Props) {
  return (
    <Link
      className={style[`item--${idx}`]}
      scroll={false}
      href={`/recipes/${recipe.id}`}
    >
      <div className={style.container}>
        <div className={style['hover-content']}>
          <div className={style['hover-content__img-box']}>
            <Image src={recipe.img} fill alt={recipe.name} />
          </div>
          <h2 className={`${libre.className} ${style['hover-content__name']}`}>
            {recipe.name}
          </h2>
        </div>

        <div className={style['img-wrapper']}>
          <div className={`${style[`item--${idx}`]} ${style['img-box']}`}>
            <Image src={recipe.img} fill alt={recipe.name} />
          </div>
        </div>

        <div className={style.information}>
          <div className={style.information__header}>
            <h2 className={style.information__title}>{recipe.name}</h2>
            <ChipsContainer>
              {recipe.tags.map((tag) => (
                <Chip key={tag.id}>{tag.name}</Chip>
              ))}
            </ChipsContainer>
          </div>
          <p className={style.information__text}>{recipe.simpleDescription}</p>
        </div>
      </div>
    </Link>
  );
}

export default Recipe;
