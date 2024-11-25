import Image from 'next/image';

import style from './layout.module.scss';

import Logo from '../components/layout/Logo';

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
        <Image src='/img/bg1.png' alt='E-COOK' fill className={style.img} />
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className={style.footer}>
      © 2024 Maria. All rights reserved.
    </footer>
  );
}
