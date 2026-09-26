import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppProvider, useApp } from './context/AppContext';
import { LandingChoiceScreen } from './components/LandingChoiceScreen';
import { Navbar } from './components/Navbar';
import { FoodExperienceView } from './components/FoodExperience/FoodExperienceView';
import { DrinksExperienceView } from './components/DrinksExperience/DrinksExperienceView';
import { FoodDetailModal } from './components/FoodExperience/FoodDetailModal';
import { DrinksCustomizationModal } from './components/DrinksExperience/DrinksCustomizationModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { CheckoutModal } from './components/CheckoutModal';
import { FloatingCartBar } from './components/FloatingCartBar';

const AppContent: React.FC = () => {
  const { experience } = useApp();

  return (
    <div className="min-h-screen bg-[#0d0a08] text-white selection:bg-[#c95d2c] selection:text-white font-sans antialiased overflow-x-clip">
      <AnimatePresence mode="wait">
        {experience === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <LandingChoiceScreen />
          </motion.div>
        ) : experience === 'food' ? (
          <motion.div
            key="food"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <Navbar />
            <main>
              <FoodExperienceView />
            </main>
          </motion.div>
        ) : (
          <motion.div
            key="drinks"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <Navbar />
            <main>
              <DrinksExperienceView />
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Interactive Overlays & Modals */}
      <FoodDetailModal />
      <DrinksCustomizationModal />
      <CartDrawer />
      <SearchModal />
      <CheckoutModal />
      <FloatingCartBar />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
