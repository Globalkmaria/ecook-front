'use client';

import { RefObject, useEffect } from 'react';

interface Props {
  onClose: () => void;
  target: RefObject<HTMLElement> | null;
  portalId?: string;
  closeOnOutSideClick?: boolean;
}
function useEscapeKey({
  onClose,
  target,
  portalId = 'modal-root',
  closeOnOutSideClick = true,
}: Props) {
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (!target) return;
      if (!closeOnOutSideClick) return;

      const lastChild = document.getElementById(portalId)?.lastElementChild;
      if (!lastChild) return;
      if (e.key === 'Escape' && target.current === lastChild) onClose();
    };

    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [onClose, target, portalId, closeOnOutSideClick]);
}

export default useEscapeKey;
