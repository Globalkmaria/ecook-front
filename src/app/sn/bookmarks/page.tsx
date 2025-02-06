import style from './style.module.scss';

import SavedRecipes from './SavedRecipes';

async function BookmarkPage() {
  return (
    <main className={style['page']}>
      <div className={style['page__container']}>
        <SavedRecipes />
      </div>
    </main>
  );
}

export default BookmarkPage;
