import Search from './components/common/Search';
import HomeHeader from './components/homePage/HomeHeader';
import Recent from './components/homePage/Recent';
import Recommend from './components/homePage/Recommend';
import Footer from './components/layout/Footer';
import HomeNav from './components/layout/HomeNav';
import style from './style.module.scss';

export const revalidate = 86400; // 1 day

export default async function HomePage() {
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
          <Recommend />
          <Recent />
        </div>
      </div>
      <Footer />
    </>
  );
}
