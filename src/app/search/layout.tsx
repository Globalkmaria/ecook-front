import { cookies } from 'next/headers';
import { Metadata } from 'next';

import style from './style.module.scss';

import Nav from '../components/layout/Nav';
import Footer from '../components/layout/Footer';
import { parseUserFromCookies } from '../helper';

export const metadata: Metadata = {
  title: 'Search Recipes | E-COOK',
  description:
    'Find the perfect recipe for any occasion. Search through a wide variety of delicious recipes shared by food enthusiasts worldwide.',
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const user = parseUserFromCookies(cookieStore);
  return (
    <>
      <Nav user={user} />
      <section className={style['layout-container']}>{children}</section>
      <Footer />
    </>
  );
}
