import { MutationState } from '@tanstack/react-query';

export const isPending = (state: MutationState) => state?.status === 'pending';
