import RecipeListWrapper from './RecipeListWrapper';
import style from './style.module.scss';

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
        <RecipeListWrapper searchParamsData={searchParamsData} />
      </div>
    </main>
  );
}

export default SearchPage;
