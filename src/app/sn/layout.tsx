import style from './style.module.scss';
import Footer from '../components/layout/Footer';
import Nav from '../components/layout/Nav';

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
