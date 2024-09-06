'use client';

import styled from 'styled-components';

const Chip = styled.span`
  padding: 0.25rem 0.7rem;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.grey200};
  font-size: 0.8rem;
  font-weight: 400;
`;

export default Chip;

export const ChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`;
