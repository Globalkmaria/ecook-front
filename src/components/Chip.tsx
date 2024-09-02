'use client';

import { theme } from '@/styles/theme';
import styled from 'styled-components';

const Chip = styled('span')({
  padding: '0.25rem 0.7rem',
  borderRadius: '15px',
  backgroundColor: theme.colors.grey200,
  fontSize: '0.8rem',
  fontWeight: 400,
});

export default Chip;

export const ChipsContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  justifyContent: 'center',
});
