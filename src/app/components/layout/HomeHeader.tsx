import { Libre_Bodoni } from 'next/font/google';

import style from './HomeHeader.module.scss';

import { joinClassNames } from '@/utils/style';

const libre = Libre_Bodoni({
  subsets: ['latin'],
  style: ['italic', 'normal'],
  weight: ['600', '400'],
});

function HomeHeader() {
  return (
    <header className={joinClassNames(style.header, libre.className)}>
      <h1 className={style.title}>Discover the joy of cooking</h1>
      <p className={style.description}>
        Explore a world of delicious recipes, from timeless classics to modern
        creations, crafted to inspire your next culinary adventure
      </p>
    </header>
  );
}

export default HomeHeader;
