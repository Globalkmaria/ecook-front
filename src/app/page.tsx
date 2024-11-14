import Link from 'next/link';
import HomeHeader from './components/layout/HomeHeader';
import Recipes from './components/List/Recipes';
import style from './style.module.scss';

export default function Home() {
  return (
    <div className={style.wrapper}>
      <div className={style.page_container}>
        <Link href='/recipes/new'>+ new Recipes</Link>
        <HomeHeader />
        <Recipes />
      </div>
    </div>
  );
}
