import Link from 'next/link';

import style from './style.module.scss';

import { RecipeSimple } from '@/service/recipes/type';

import { getLimitedText } from '@/utils/text';
import { formatTime } from '@/utils/time';

import Chip, { ChipsContainer } from '@/components/Chip';
import CustomImage from '@/components/CustomImage';

interface Props {
  recipes: RecipeSimple[];
  isSuccess: boolean;
}

function RecipeList({ recipes, isSuccess }: Props) {
  if (!isSuccess) return <Error />;

  if (!recipes) return <NoResult />;

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

function NoResult() {
  return (
    <div className={style['no-result']}>
      <span>Oops! We couldn’t find any recipes that match your search. 🥺</span>
      <span>
        Try refining your keywords or explore some of our popular recipes for
        inspiration!
      </span>
    </div>
  );
}

function Error() {
  return (
    <div className={style['no-result']}>
      <span>Oops! Something went wrong.</span>
      <span>
        Please double-check your search keywords or try again later. 🥺
      </span>
    </div>
  );
}
