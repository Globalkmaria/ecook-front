import style from './style.module.scss';

import { getRecipes } from '@/services/recipes';

import RecipeList from './RecipeList';
import { SearchParams } from './page';

interface Props {
  searchParamsData: SearchParams;
}

async function RecipeListWrapper({ searchParamsData }: Props) {
  const { q, type } = searchParamsData;

  const recipes = await getRecipes(q, type);

  if (!recipes.ok) return <Error />;
  if (!recipes.data.length) return <NoResult />;

  return <RecipeList recipes={recipes.data} />;
}

export default RecipeListWrapper;

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
