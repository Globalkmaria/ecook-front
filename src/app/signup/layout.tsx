import { Metadata } from 'next';
import Image from 'next/image';

import style from './layout.module.scss';
import Logo from '../components/layout/Logo';

export const metadata: Metadata = {
  title: 'Sign Up for E-COOK - Join Our Foodie Community',
  description:
    'Create your E-COOK account to share your favorite recipes, explore new ones, and connect with a vibrant community of food lovers.',
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
      <main className={style.main}>{children}</main>
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
          src='/img/bg1.png'
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
