'use client';

import { useMutationState } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import style from './style.module.scss';

import { RecipeSimple } from '@/services/requests/recipe/type';

import { mutationKeys } from '@/queries/helpers';
import { isPending } from '@/queries/helpers/checkState';

import { formatTime } from '@/utils/time';

import { getRecipeLink } from '@/helpers/links';

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
  const router = useRouter();
  const time = formatTime({ hours: recipe.hours, minutes: recipe.minutes });
  const recipeLink = getRecipeLink(recipe.key);

  const state = useMutationState({
    filters: {
      mutationKey: mutationKeys.recipes.recipe.delete(recipe.key),
      exact: true,
    },
    select: (state) => state.state,
  });

  const disableRecipeLink = isPending(state[0]);

  const onClick = () => {
    if (disableRecipeLink) return;
    router.push(recipeLink);
  };

  return (
    <li className={style.wrapper}>
      <div className={style['card-menu']}>
        <CardMenu recipeKey={recipe.key} />
      </div>

      <button
        type='button'
        onClick={onClick}
        className={style.card}
        disabled={disableRecipeLink}
      >
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
      </button>
    </li>
  );
}
