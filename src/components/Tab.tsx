'use client';

import styled from 'styled-components';

export const Tab = styled.button.attrs({
  type: 'button',
})<{ selected?: boolean }>`
  flex: 1;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 500;
  border-bottom: 2px solid
    ${({ selected }) => (selected ? 'black' : 'transparent')};
`;

export const TabsContainer = styled.div`
  width: 100%;
  display: flex;
`;
