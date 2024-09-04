import '@/styles/global.css';

import StyledComponentsRegistry from '@/lib/registry';
import Nav from './components/Nav';

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <StyledComponentsRegistry>
          <Nav />
          {children}
          {modal}
          <div id='modal-root' />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
