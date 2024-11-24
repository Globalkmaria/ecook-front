import Link from 'next/link';
import { Lato } from 'next/font/google';

import style from './Nav.module.scss';

import Search from '../../Search';
import NavRightButtons from './NavRightButtons';

const libre = Lato({
  weight: ['700'],
  subsets: ['latin'],
});

async function Nav() {
  return (
    <nav className={style.wrapper}>
      <div className={style.container}>
        <Link href='/'>
          <h1 className={`${libre.className} ${style.title}`}>E-COOK</h1>
        </Link>
        <Search />
        <NavRightButtons />
      </div>
    </nav>
  );
}

export default Nav;
