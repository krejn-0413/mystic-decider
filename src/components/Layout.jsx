import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './Navbar';
import ParticleBackground from './ParticleBackground';

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-ink-paper relative">
      <ParticleBackground />
      <div className="relative z-10 max-w-lg mx-auto px-4 pb-4 md:pt-20">
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
      </div>
      <Navbar />
    </div>
  );
}
