import Link from 'next/link';
import { Lato } from 'next/font/google';

import style from './HomeNav.module.scss';

import NavRightButtons from './Nav/NavRightButtons';

const libre = Lato({
  weight: ['700'],
  subsets: ['latin'],
});

async function HomeNav() {
  return (
    <nav className={style.wrapper}>
      <div className={style.container}>
        <Link href='/'>
          <h1 className={`${libre.className} ${style.title}`}>E-COOK</h1>
        </Link>
        <NavRightButtons />
      </div>
    </nav>
  );
}

export default HomeNav;
