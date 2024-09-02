import style from './style.module.css';

import HomeHeader from './components/HomeHeader';
import Recipes from './components/Recipes';

export default function Home() {
  return (
    <div className={style.main}>
      <HomeHeader />
      <Recipes />
    </div>
  );
}
