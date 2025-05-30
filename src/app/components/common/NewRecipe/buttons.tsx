import { memo } from 'react';

import Button from '@/components/Button';
import Icon from '@/components/Icon';

export function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant='secondary' onClick={onClick}>
      <Icon icon='remove' />
    </Button>
  );
}

export const AddButton = memo(function AddButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button variant='secondary' onClick={onClick}>
      {children}
    </Button>
  );
});
