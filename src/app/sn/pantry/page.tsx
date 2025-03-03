import style from './style.module.scss';

import Pantry from './Pantry';

function PantryPage() {
  return (
    <main className={style['page']}>
      <div className={style['page__container']}>
        <h2 className={style['title']}>Pantry</h2>
        <Pantry />
      </div>
    </main>
  );
}

export default PantryPage;
