import { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import '@/style/global.scss';
import style from './style.module.scss';

import { UserStoreProvider } from '@/providers/user-store-provider';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Explore Delicious Recipes | E-COOK',
  description:
    'Got a recipe everyone loves? Share your creation with the RecipeHub community and inspire food lovers everywhere!',
  keywords: [
    'cooking ideas',
    'recipe',
    'recipes',
    'cookbook',
    'food',
    'delicious',
    'share',
  ],
};

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
          <UserStoreProvider>
            {children}
            {modal}
            <div id='modal-root' />
          </UserStoreProvider>
        </div>
      </body>
    </html>
  );
}
