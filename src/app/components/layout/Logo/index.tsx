import Link from 'next/link';

import { HOME_LINK } from '@/helpers/links';

import style from './style.module.scss';

function Logo() {
  return (
    <Link href={HOME_LINK} className={style.logo}>
      <h1 className={style.title}>E-COOK</h1>
    </Link>
  );
}

export default Logo;
