'use client';

import { useCallback, useMemo, useState } from 'react';

interface ModalHandlers {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

function useModal(initialState?: boolean): ModalHandlers {
  const [isOpen, setIsOpen] = useState(initialState ?? false);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onToggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return useMemo(
    () => ({
      isOpen,
      onOpen,
      onClose,
      onToggle,
    }),
    [isOpen],
  );
}

export default useModal;
