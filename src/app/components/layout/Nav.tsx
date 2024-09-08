import Link from 'next/link';

import style from './Nav.module.scss';

import { Lato } from 'next/font/google';

const libre = Lato({
  weight: ['700'],
  subsets: ['latin'],
});

function Nav() {
  return (
    <nav className={style.wrapper}>
      <div className={style.container}>
        <Link href='/'>
          <h1 className={`${libre.className} ${style.title}`}>E-COOK</h1>
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
