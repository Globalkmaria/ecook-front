import { MutationState } from '@tanstack/react-query';

export const isPending = (state: MutationState) => state?.status === 'pending';

export const isPendingOrSuccess = (state: MutationState) =>
  state?.status === 'pending' || state?.status === 'success';
