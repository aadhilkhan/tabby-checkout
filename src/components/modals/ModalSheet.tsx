import { type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModalOverlay } from './ModalOverlay';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { popupVariants, bottomSheetVariants } from '../../animations/modalTransitions';

interface ModalSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function ModalSheet({ isOpen, onClose, children }: ModalSheetProps) {
  const isDesktop = useMediaQuery('(min-width: 640px)');

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay onClose={onClose}>
          <motion.div
            className={
              isDesktop
                ? 'bg-[var(--bg-card)] rounded-[24px] w-[500px] max-h-[90vh] overflow-y-auto'
                : 'bg-[var(--bg-card)] rounded-t-[24px] w-full max-h-[90vh] overflow-y-auto'
            }
            variants={isDesktop ? popupVariants : bottomSheetVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
}
