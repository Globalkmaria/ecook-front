'use client';

import styled from 'styled-components';
import Link from 'next/link';

import { Lato } from 'next/font/google';

const libre = Lato({
  weight: ['700'],
  subsets: ['latin'],
});

function Nav() {
  return (
    <StyledWrapper>
      <StyledContainer>
        <Link href='/'>
          <StyledTitle className={libre.className}>E-COOK</StyledTitle>
        </Link>
      </StyledContainer>
    </StyledWrapper>
  );
}

export default Nav;

const StyledWrapper = styled.nav`
  width: 100%;
`;

const StyledContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
  padding: 1rem;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
`;
