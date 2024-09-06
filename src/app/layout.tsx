import '@/style/global.scss';
import style from './style.module.scss';

import { Roboto } from 'next/font/google';
import Nav from './components/Nav';
import Footer from './components/Footer';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={roboto.className}>
        <div className={style.layout_container}>
          <Nav />
          {children}
          {modal}
          <div id='modal-root' />
          <Footer />
        </div>
      </body>
    </html>
  );
}
