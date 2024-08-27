'use client';

import styled from 'styled-components';

function HomeContainer({ children }: { children: React.ReactNode }) {
  return <StyledMain>{children}</StyledMain>;
}

export default HomeContainer;

const StyledMain = styled('main')({
  margin: '0 auto',
  maxWidth: '1200px',
  padding: '1rem 1rem',
});
