'use client';

import { HTMLAttributes, useRef } from 'react';

import useModal from '@/hooks/useModal';

import { Dropbox, DropboxStyleProps, DropboxWrapper } from './Dropbox';
import IconButton from './IconButton';

interface Props
  extends DropboxStyleProps,
    React.PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
}

function MoreButton({
  children,
  vertical,
  horizontal,
  disabled,
  ...resProps
}: Props) {
  const { isOpen, onClose, onToggle } = useModal();
  const ref = useRef<HTMLDivElement>(null);

  const onMouseLeave = () => onClose();

  return (
    <DropboxWrapper ref={ref}>
      <IconButton icon={'more'} onClick={onToggle} />
      {isOpen && (
        <Dropbox
          containerRef={ref}
          onCloseModal={onClose}
          vertical={vertical}
          horizontal={horizontal}
          onMouseLeave={onMouseLeave}
          {...resProps}
        >
          {children}
        </Dropbox>
      )}
    </DropboxWrapper>
  );
}

export { MoreButton };
