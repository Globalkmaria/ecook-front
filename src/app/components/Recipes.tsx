'use client';

import styled from 'styled-components';
import Recipe from './Recipe';
import { theme } from '@/styles/theme';

function Recipes() {
  const array = Array.from({ length: 18 }, (_, i) => i + 1);
  return (
    <StyledSection>
      {array.map((idx) => (
        <Recipe key={idx} idx={idx} />
      ))}
    </StyledSection>
  );
}

export default Recipes;

const StyledSection = styled('section')({
  display: 'grid',
  gap: '2rem',
  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
  gridAutoRows: '300px',
  gridTemplateAreas: `"item1 item3 item3 item4 item5"
"item2 item3 item3 item9 item9"
"item6 item7 item8 item9 item9"
"item10 item10 item11 item12 item13"
"item10 item10 item16 item16 item17"
"item14 item15 item16 item16 item18"
`,

  [`@media ${theme.devices.laptop}`]: {
    gridTemplateColumns: '1fr 1fr 1fr ',
    gridTemplateAreas: `"item1 item3 item3""item2 item3 item3""item4 item4 item5""item4 item4 item6""item7 item9 item9""item8 item9 item9""item10 item10 item11""item10 item10 item12""item13 item15 item15""item14 item15 item15""item16 item16 item17""item16 item16 item18"`,
    gap: '1.5rem',
  },

  [`@media ${theme.devices.mobile}`]: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
});
