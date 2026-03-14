import { useState, useEffect } from 'react';

export function useSettingsOnboarding() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Resize listener for accurate position metrics
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Onboarding initialization sequence
  useEffect(() => {
    // Double check localStorage on mount
    const seen = localStorage.getItem('settings-onboarding');
    
    if (!seen) {
      // Show pulse after 2 seconds
      const pulseTimer = setTimeout(() => {
        setShowOnboarding(true);
      }, 2000);

      // Show tooltip after 2.3 seconds
      const tooltipTimer = setTimeout(() => {
        setShowTooltip(true);
      }, 2300);

      // Hide everything after 5 seconds
      const hideTimer = setTimeout(() => {
        setShowOnboarding(false);
        setShowTooltip(false);
        localStorage.setItem('settings-onboarding', 'true');
      }, 5000);

      return () => {
        clearTimeout(pulseTimer);
        clearTimeout(tooltipTimer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  return { showOnboarding, showTooltip, isMobile };
}
