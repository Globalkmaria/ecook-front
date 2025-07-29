import { Metadata, Viewport } from 'next';

import ConditionalAnalytics from '@/components/ConditionalAnalytics';
import CookieConsent from '@/components/CookieConsent/CookieConsent';
import OrganizationSchema from '@/components/seo/OrganizationSchema';

import { ECOOK_LOGO_URL } from '@/const/contLinks';
import { CookieConsentProvider } from '@/contexts/CookieConsentContext';
import Providers from '@/providers';

import '@/styles/global.scss';

import style from './style.module.scss';

export const metadata: Metadata = {
  title: 'Explore Delicious Recipes | E-COOK',
  description:
    'Got a recipe everyone loves? Share your creation with the E-COOK community and inspire food lovers everywhere!',
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
  authors: [{ name: 'Maria Kim' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.ecook.online',
    siteName: 'E-COOK',
    title: 'Explore Delicious Recipes | E-COOK',
    description:
      'Got a recipe everyone loves? Share your creation with the E-COOK community and inspire food lovers everywhere!',
    images: [
      {
        url: ECOOK_LOGO_URL,
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
        <script
          async
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1333816916423265'
          crossOrigin='anonymous'
        ></script>
      </head>
      <body>
        <CookieConsentProvider>
          <Providers>
            <div className={style.layout_container}>
              {children}
              {modal}
              <div id='modal-root' />
            </div>
          </Providers>
          <OrganizationSchema />
          <CookieConsent />
          <ConditionalAnalytics />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
