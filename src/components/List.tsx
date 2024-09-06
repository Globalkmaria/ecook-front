'use client';

import styled from 'styled-components';

export const ListContainer = styled('ul')``;

export const ListItem = styled('li')`
  margin: 0.5rem 0;
  input {
    margin-right: 1rem;

    &:checked + label {
      color: ${({ theme }) => theme.colors.grey500};
    }
  }
`;
