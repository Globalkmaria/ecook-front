'use client';

import { useCallback, useState } from 'react';

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

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
}

export default useModal;
