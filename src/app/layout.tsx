'use client';

import '@/styles/global.css';

import StyledComponentsRegistry from '@/lib/registry';
import { Roboto } from 'next/font/google';
import Nav from './components/Nav';
import styled from 'styled-components';

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
        <StyledComponentsRegistry>
          <StyledContainer>
            <Nav />
            {children}
            {modal}
            <div id='modal-root' />
          </StyledContainer>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
