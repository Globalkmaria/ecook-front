import { ChipProps } from '@/components/Chip';

export const getLeftDayChipType = (leftDays: number): ChipProps['type'] =>
  leftDays < 3 ? 'warning' : 'success';
