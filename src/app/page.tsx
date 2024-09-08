import HomeHeader from './components/layout/HomeHeader';
import Recipes from './components/List/Recipes';
import style from './style.module.scss';

export default function Home() {
  return (
    <div className={style.page_container}>
      <HomeHeader />
      <Recipes />
    </div>
  );
}
