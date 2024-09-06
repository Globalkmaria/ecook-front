'use client';

import styled from 'styled-components';
import Recipe from './Recipe';

import { recipeIds } from '@/data/recipe';

function Recipes() {
  return (
    <StyledSection>
      {recipeIds.map((idx) => (
        <Recipe key={idx} idx={idx} />
      ))}
    </StyledSection>
  );
}

export default Recipes;

const StyledSection = styled.section`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 300px;
  grid-template-areas:
    'item1 item3 item3 item4 item5'
    'item2 item3 item3 item9 item9'
    'item6 item7 item8 item9 item9'
    'item10 item10 item11 item12 item13'
    'item10 item10 item16 item16 item17'
    'item14 item15 item16 item16 item18';

  /* @media ${({ theme }) => theme.devices.laptop} {
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      'item1 item3 item3'
      'item2 item3 item3'
      'item4 item4 item5'
      'item4 item4 item6'
      'item7 item9 item9'
      'item8 item9 item9'
      'item10 item10 item11'
      'item10 item10 item12'
      'item13 item15 item15'
      'item14 item15 item15'
      'item16 item16 item17'
      'item16 item16 item18';
    gap: 1.5rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  } */
`;
