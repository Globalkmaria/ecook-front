import style from './style.module.scss';
import Logo from '../components/layout/Logo';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account Deleted - E-COOK',
  description: 'Your account has been successfully deleted from E-COOK.',
};

export default function GoodbyeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={style['layout-container']}>
      <Header />
      <div className={style['layout-content']}>{children}</div>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className={style['layout-header']}>
      <Logo theme='dark' />
    </header>
  );
}

function Footer() {
  return (
    <footer className={style['layout-footer']}>
      © 2025 Maria. All rights reserved.
    </footer>
  );
}
