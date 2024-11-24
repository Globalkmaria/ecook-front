import Link from 'next/link';
import { Lato } from 'next/font/google';

import style from './Nav.module.scss';

import { AvatarImg } from '@/components/Avatar';
import Anchor from '@/components/Anchor';

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
        <div className={style['right-buttons']}>
          <Anchor href='/recipes/new'>+ New recipes</Anchor>
          <Link href={`/users/${USER.username}`}>
            <AvatarImg user={USER} size={48} />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default HomeNav;

const USER = {
  id: 1,
  username: 'johndoe',
  img: '/img/img1.png',
};
