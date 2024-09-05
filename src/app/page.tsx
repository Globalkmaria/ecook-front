'use client';

import HomeHeader from './components/HomeHeader';
import Recipes from './components/Recipes';
import styled from 'styled-components';

export default function Home() {
  return (
    <StyledContainer>
      <HomeHeader />
      <Recipes />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 1rem 1rem;
`;
