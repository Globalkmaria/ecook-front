'use client';

import { theme } from '@/styles/theme';
import { Libre_Bodoni } from 'next/font/google';
import styled from 'styled-components';

const libre = Libre_Bodoni({
  subsets: ['latin'],
  style: ['italic', 'normal'],
  weight: ['700'],
});

function HomeHeader() {
  return (
    <StyledHeader>
      <div>
        <h1 className={libre.className}>Easy</h1>
        <h1 className={libre.className}>& Delicious</h1>
      </div>
      <StyledRecipes>Recipes</StyledRecipes>
    </StyledHeader>
  );
}

export default HomeHeader;

const StyledHeader = styled('header')({
  display: 'flex',
  flexDirection: 'column',
  fontWeight: 600,
  marginBottom: '2rem',

  h1: {
    fontSize: '5rem',
  },

  [`@media ${theme.devices.laptop}`]: {
    h1: {
      fontSize: '4rem',
    },
  },

  [`@media ${theme.devices.mobile}`]: {
    h1: {
      fontSize: '2rem',
    },
  },
});

const StyledRecipes = styled('h1')({
  alignSelf: 'flex-end',
});
