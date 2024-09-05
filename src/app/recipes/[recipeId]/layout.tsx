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
  flex: 1;
  margin: 0 auto;
  padding: 2rem 1rem;
  max-width: 1200px;
  width: 100%;
`;
