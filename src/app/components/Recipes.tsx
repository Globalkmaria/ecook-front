'use client';

import styled from 'styled-components';
import Recipe from './Recipe';
import { theme } from '@/styles/theme';

const StyledSection = styled('section')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
  gridAutoRows: '300px',
  gridTemplateAreas: `"item1 item3 item3 item4 item5"
"item2 item3 item3 item9 item9"
"item6 item7 item8 item9 item9"
"item10 item10 item11 item12 item13"
"item10 item10 item16 item16 item17"
"item14 item15 item16 item16 item18"
`,
  [`@media (max-width: ${theme.devices.laptop}px)`]: {
    gridTemplateAreas: `"item1 item3 item3"
"item2 item3 item3"
"item4 item4 item5"
"item4 item4 item6"`,
  },
  [`@media (max-width: ${theme.devices.mobile}px)`]: {
    display: 'flex',
    flexDirection: 'row',
  },
});

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
