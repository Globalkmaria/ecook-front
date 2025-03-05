import style from './style.module.scss';

import Pantry from './Pantry';

function PantryPage() {
  return (
    <main className={style['page']}>
      <div className={style['page__container']}>
        <header className={style['header']}>
          <h2 className={style['title']}>Pantry</h2>
          <p className={style['description']}>
            Track your ingredients and find recipes you can make with what you
            have. <br /> Simple, smart, and waste-free cooking!
          </p>
        </header>
        <Pantry />
      </div>
    </main>
  );
}

export default PantryPage;
