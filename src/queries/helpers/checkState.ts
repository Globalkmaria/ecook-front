import { MutationState } from '@tanstack/react-query';

export const isPendingOrSuccess = (state: MutationState) =>
  state?.status === 'pending' || state?.status === 'success';
