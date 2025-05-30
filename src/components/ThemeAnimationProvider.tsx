import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';

interface ThemeAnimationProviderProps {
  children: React.ReactNode;
}

export function ThemeAnimationProvider({ children }: ThemeAnimationProviderProps) {
  const { theme } = useTheme();
  const [showAnimation, setShowAnimation] = useState(false);
  const [prevTheme, setPrevTheme] = useState<string | null>(null);

  useEffect(() => {
    // Only show animation if theme has changed and not on initial render
    if (prevTheme && prevTheme !== theme) {
      setShowAnimation(true);
      const timer = setTimeout(() => setShowAnimation(false), 1000);
      return () => clearTimeout(timer);
    }
    setPrevTheme(theme);
  }, [theme, prevTheme]);

  return (
    <>
      {children}
      
      <AnimatePresence>
        {showAnimation && (
          <motion.div
            key="theme-animation"
            initial={{ scale: 0, opacity: 0.8, borderRadius: '100%' }}
            animate={{ 
              scale: 20, 
              opacity: 0,
              borderRadius: '100%',
              transition: { duration: 1, ease: 'easeInOut' }
            }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: '3rem',
              right: '8rem',
              width: '30px',
              height: '30px',
              zIndex: 9999,
              backgroundColor: theme === 'dark' ? '#1e293b' : '#f9f5ff',
              pointerEvents: 'none'
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}