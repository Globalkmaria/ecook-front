import { Libre_Bodoni } from 'next/font/google';

import style from './HomeHeader.module.scss';

const libre = Libre_Bodoni({
  subsets: ['latin'],
  style: ['italic', 'normal'],
  weight: ['700'],
});

function HomeHeader() {
  return (
    <header className={style.header}>
      <div>
        <h1 className={libre.className}>Easy</h1>
        <h1 className={libre.className}>& Delicious</h1>
      </div>
      <h1 className={style.header__title}>Recipes</h1>
    </header>
  );
}

export default HomeHeader;
