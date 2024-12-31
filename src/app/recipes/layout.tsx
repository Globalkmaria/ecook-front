import style from './style.module.scss';

import Nav from '../components/layout/Nav';
import Footer from '../components/layout/Footer';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      <section className={style['layout-container']}>{children}</section>
      <Footer />
    </>
  );
}
