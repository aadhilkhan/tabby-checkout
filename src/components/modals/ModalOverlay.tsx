import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { overlayVariants } from '../../animations/modalTransitions';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface ModalOverlayProps {
  children: ReactNode;
  onClose: () => void;
}

export function ModalOverlay({ children, onClose }: ModalOverlayProps) {
  useBodyScrollLock(true);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center sm:items-center items-end"
      variants={overlayVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div
        className="absolute inset-0 bg-[var(--overlay)]"
        onClick={onClose}
      />
      <div className="relative z-10 w-full sm:w-auto">
        {children}
      </div>
    </motion.div>,
    document.body
  );
}
