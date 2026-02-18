import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './Header';
import { pageVariants } from '../../animations/pageTransitions';

export function CheckoutLayout() {
  const location = useLocation();

  return (
    <div className="min-h-full flex flex-col items-center bg-[var(--bg-general)]">
      <div className="w-full sm:w-[500px] sm:my-6 flex-1 sm:flex-none bg-[var(--bg-card)] sm:rounded-3xl sm:shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col">
        <Header />
        <div className="h-px bg-[var(--line-disabled)]" />
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="pt-6 pb-8"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
