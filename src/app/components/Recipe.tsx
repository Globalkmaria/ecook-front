import Image from 'next/image';
import { Libre_Bodoni } from 'next/font/google';

import style from './Recipe.module.scss';

import Chip, { ChipsContainer } from '@/components/Chip';
import Link from 'next/link';
import { recipes } from '@/data/recipe';

const libre = Libre_Bodoni({
  subsets: ['latin'],
  style: ['italic', 'normal'],
  weight: ['700'],
});

interface Props {
  idx: string;
}

function Recipe({ idx }: Props) {
  const recipe = idx ? recipes[idx] : null;

  if (recipe === null) return null;

  return (
    <Link
      className={style[`item--${idx}`]}
      scroll={false}
      href={`/recipes/${idx}`}
    >
      <div className={style.container}>
        <div className={style['hover-content']}>
          <div className={style['hover-content__img-box']}>
            <Image src={`/img/img${idx}.png`} fill alt={recipe.name} />
          </div>
          <h2 className={`${libre.className} ${style['hover-content__name']}`}>
            {recipe.name}
          </h2>
        </div>

        <div className={style['img-wrapper']}>
          <div className={`${style[`item--${idx}`]} ${style['img-box']}`}>
            <Image src={`/img/img${idx}.png`} fill alt={recipe.name} />
          </div>
        </div>

        <div className={style.information}>
          <div className={style.information__header}>
            <h2 className={style.information__title}> {recipe.name}</h2>
            <ChipsContainer>
              {recipe.filters.map((chip) => (
                <Chip key={chip}>{chip}</Chip>
              ))}
            </ChipsContainer>
          </div>
          <p className={style.information__text}>{recipe.description}</p>
        </div>
      </div>
    </Link>
  );
}

export default Recipe;
