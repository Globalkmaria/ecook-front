import style from './style.module.scss';

import SearchBar from './SearchBar';
import RecipeListWrapper from './RecipeListWrapper';
import Search from '../components/Search';

export type SearchParams = {
  q?: string;
  type?: string;
};

interface Props {
  searchParams: Promise<SearchParams>;
}

async function SearchPage({ searchParams }: Props) {
  const searchParamsData = await searchParams;

  return (
    <main className={style['wrapper']}>
      <div className={style['page-container']}>
        <Search searchParamsData={searchParamsData} />
        <RecipeListWrapper searchParamsData={searchParamsData} />
      </div>
    </main>
  );
}

export default SearchPage;
