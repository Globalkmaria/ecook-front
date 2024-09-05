'use client';

import styled from 'styled-components';

function RecipeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <StyledContainer>{children}</StyledContainer>;
}

export default RecipeLayout;

const StyledContainer = styled.section`
  margin: 0 auto;
  max-width: 1200px;
  padding: 2rem 1rem;
  height: 100%;
`;
