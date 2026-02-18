import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { CheckoutProvider } from './context/CheckoutContext';
import { CheckoutLayout } from './components/layout/CheckoutLayout';
import { OtpScreen } from './components/screens/OtpScreen';
import { PlanSelectionScreen } from './components/screens/PlanSelectionScreen';
import { PaymentScreen } from './components/screens/PaymentScreen';
import { SuccessScreen } from './components/screens/SuccessScreen';
import { ROUTES } from './config/routes';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<CheckoutLayout />}>
          <Route index element={<OtpScreen />} />
          <Route path={ROUTES.PLAN} element={<PlanSelectionScreen />} />
          <Route path={ROUTES.PAYMENT} element={<PaymentScreen />} />
          <Route path={ROUTES.SUCCESS} element={<SuccessScreen />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CheckoutProvider>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </CheckoutProvider>
    </ThemeProvider>
  );
}
