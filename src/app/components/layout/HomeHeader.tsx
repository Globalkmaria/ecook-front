import { Libre_Bodoni } from 'next/font/google';

import style from './HomeHeader.module.scss';

import { joinClassNames } from '@/utils/style';

const libre = Libre_Bodoni({
  subsets: ['latin'],
  style: ['italic', 'normal'],
  weight: ['700'],
});

function HomeHeader() {
  return (
    <header className={joinClassNames(style.header, libre.className)}>
      <div>
        <h1>Easy</h1>
        <h1>& Delicious</h1>
      </div>
      <h1 className={style.header__title}>Recipes</h1>
    </header>
  );
}

export default HomeHeader;