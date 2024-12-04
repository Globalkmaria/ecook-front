import Link from 'next/link';

import style from './style.module.scss';

function Logo() {
  return (
    <Link href='/' className={style.logo}>
      <h1 className={style.title}>E-COOK</h1>
    </Link>
  );
}

export default Logo;
