import { Metadata } from 'next';
import Image from 'next/image';

import style from './layout.module.scss';

import Logo from '../components/layout/Logo';

export const metadata: Metadata = {
  title: 'Login to Your Account | E-COOK',
  description:
    'Log in to your E-COOK account to discover, save, and share delicious recipes.',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={style.wrapper}>
      <Header />
      <Nav />
      <main className={style['layout-container']}>{children}</main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className={style.logo}>
      <Logo />
    </header>
  );
}

function Nav() {
  return (
    <nav className={style['nav']}>
      <div className={style['img-container']}>
        <Image
          src='/img/signIn.png'
          alt='E-COOK'
          fill
          className={style.img}
          priority
        />
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className={style.footer}>
      © 2025 Maria. All rights reserved.
    </footer>
  );
}
