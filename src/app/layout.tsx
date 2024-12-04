import { Metadata } from 'next';

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
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/img/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/img/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/img/favicon-16x16.png'
        />
        <link rel='manifest' href='/img/site.webmanifest' />
        <meta name='theme-color' content='#ffffff' />
        <meta name='msapplication-TileColor' content='#ffffff' />

        <meta name='author' content='Maria Kim' />
        <link rel='author' href='https://github.com/Globalkmaria' />
        <meta property='og:locale' content='en_US' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://www.ecook.online/' />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta
          property='og:title'
          content='Explore Delicious Recipes | E-COOK'
        />
        <meta
          property='og:image'
          content='https://velog.velcdn.com/images/tjdgus0528/post/47e62a5c-e808-40ab-8eb0-850849f08100/image.png'
        />
        <meta
          property='og:description'
          content='Got a recipe everyone loves? Share your creation with the RecipeHub community and inspire food lovers everywhere!'
        />
        <meta property='og:site_name' content='E-COOK' />
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
