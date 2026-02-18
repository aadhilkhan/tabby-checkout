import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './Header';
import { Card } from './Card';
import { pageVariants } from '../../animations/pageTransitions';

export function CheckoutLayout() {
  const location = useLocation();

  return (
    <div className="flex flex-col items-center min-h-full">
      <Header />
      <div className="flex-1 w-full flex flex-col items-center bg-[var(--bg-general)] py-0 sm:py-6">
        <Card className="py-8 flex-1 sm:flex-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </Card>
      </div>
    </div>
  );
}
