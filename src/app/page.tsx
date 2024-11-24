import style from './style.module.scss';

import HomeNav from './components/layout/HomeNav';

import HomeHeader from './components/HomeHeader';
import Recipes from './components/List/Recipes';
import Search from './components/Search';

export default function Home() {
  return (
    <>
      <HomeNav />
      <div className={style.wrapper}>
        <div className={style.page_container}>
          <HomeHeader />
          <Search />
          <Recipes />
        </div>
      </div>
    </>
  );
}
