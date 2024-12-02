import style from './style.module.scss';

import HomeNav from './components/layout/HomeNav';

import HomeHeader from './components/HomeHeader';
import Recipes from './components/List/Recipes';
import Footer from './components/layout/Footer';
import Search from './components/Search';

export const revalidate = 86400; // 24 hours

export default function Home() {
  return (
    <>
      <HomeNav />
      <div className={style.wrapper}>
        <div className={style['page-container']}>
          <HomeHeader />
          <div className={style.search}>
            <div className={style['search-container']}>
              <Search />
            </div>
          </div>
          <Recipes />
        </div>
      </div>
      <Footer />
    </>
  );
}
