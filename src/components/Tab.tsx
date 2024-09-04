'use client';

import styled from 'styled-components';

export const Tab = styled('button').attrs({
  type: 'button',
})<{
  selected?: boolean;
}>(({ selected }) => ({
  flex: 1,
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  fontWeight: 500,

  borderBottom: `2px solid ${selected ? 'black' : 'transparent'}`,
}));

export const TabsContainer = styled('div')({
  width: '100%',
  display: 'flex',
});
