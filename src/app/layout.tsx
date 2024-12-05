import { Metadata, Viewport } from 'next';

import '@/style/global.scss';
import style from './style.module.scss';

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
  applicationName: 'E-COOK',
  authors: [{ name: 'Maria Kim', url: 'https://github.com/Globalkmaria' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.ecook.online/',
    siteName: 'E-COOK',
    title: 'Explore Delicious Recipes | E-COOK',
    description:
      'Got a recipe everyone loves? Share your creation with the RecipeHub community and inspire food lovers everywhere!',
    images: [
      {
        url: 'https://velog.velcdn.com/images/tjdgus0528/post/47e62a5c-e808-40ab-8eb0-850849f08100/image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: {
    icon: [
      { rel: 'icon', url: '/img/favicon-32x32.png', sizes: '32x32' },
      { rel: 'icon', url: '/img/favicon-16x16.png', sizes: '16x16' },
    ],
    apple: '/img/apple-touch-icon.png',
  },
  manifest: '/img/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: 'white',
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
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Lato:wght@700&family=Libre+Bodoni:wght@400..700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'
          rel='stylesheet'
        />
      </head>
      <body>
        <div className={style.layout_container}>
          {children}
          {modal}
          <div id='modal-root' />
        </div>
      </body>
    </html>
  );
}
