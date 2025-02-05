import style from './style.module.scss';

import { getRecipes } from '@/services/recipes';
import { RecipeSimple } from '@/services/recipe/type';
import { checkSearchType } from '@/services/recipes/helper';

import RecipeList from './RecipeList';
import { SearchParams } from './page';

interface Props {
  searchParamsData: SearchParams;
}

async function RecipeListWrapper({ searchParamsData }: Props) {
  const { q, type } = searchParamsData;

  if (!checkSearchType(type)) return <TypeNotFound />;
  if (!q) return <NoSearch />;

  const recipes = await getRecipes(q, type);

  if (!recipes.ok) return <Error />;
  if (!recipes.data.search.length)
    return <NoResult recipes={recipes.data.recommend} />;

  return <RecipeList recipes={recipes.data.search} />;
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

function TypeNotFound() {
  return (
    <div className={style['no-result']}>
      <span>Oops! Something went wrong.</span>
      <span>Please double-check your search type. 🥺</span>
    </div>
  );
}

function NoSearch() {
  return (
    <div className={style['no-result']}>
      <span>Oops! Something went wrong.</span>
      <span>Please enter a search keyword. 🥺</span>
    </div>
  );
}

function NoResult({ recipes }: { recipes: RecipeSimple[] }) {
  return (
    <div>
      <div className={style['no-result']}>
        <span>
          Oops! We couldn’t find any recipes that match your search. 🥺
        </span>
      </div>
      <h3 className={style['title']}>Explore the Latest Recipes</h3>
      <RecipeList recipes={recipes} />
    </div>
  );
}
