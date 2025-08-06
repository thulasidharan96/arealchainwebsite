import { useEffect, useState } from "react";

export function useSplashScreen(onComplete: () => void, maxTime = 8000) {
  const [showSplash, setShowSplash] = useState(true);
  const [isFinishing, setIsFinishing] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fallback = setTimeout(() => {
      if (showSplash && !isFinishing) {
        onCompleteWrapper();
      }
    }, maxTime);

    return () => clearTimeout(fallback);
  }, [showSplash, isFinishing]);

  const onCompleteWrapper = () => {
    if (isFinishing) return; // Prevent multiple calls
    
    setIsFinishing(true);
    setIsTransitioning(true);
    
    // Start transition immediately
    setTimeout(() => {
      setShowSplash(false);
      setIsTransitioning(false);
      onComplete();
    }, 300); // Reduced from 500ms for faster transition
  };

  return { showSplash, isFinishing, isTransitioning, onCompleteWrapper };
}
