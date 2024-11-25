import Link from 'next/link';
import { Lato } from 'next/font/google';

import style from './style.module.scss';

const libre = Lato({
  weight: ['700'],
  subsets: ['latin'],
});

function Logo() {
  return (
    <Link href='/' className={style.logo}>
      <h1 className={`${libre.className} ${style.title}`}>E-COOK</h1>
    </Link>
  );
}

export default Logo;
