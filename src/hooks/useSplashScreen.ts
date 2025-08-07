import { useEffect, useState } from "react";

export function useSplashScreen(onComplete: () => void, maxTime = 8000) {
  const [showSplash, setShowSplash] = useState(true);
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    const fallback = setTimeout(() => {
      if (showSplash) onCompleteWrapper();
    }, maxTime);

    return () => clearTimeout(fallback);
  }, [showSplash]);

  const onCompleteWrapper = () => {
    setIsFinishing(true);
    setTimeout(() => setShowSplash(false), 500);
    onComplete();
  };

  return { showSplash, isFinishing, onCompleteWrapper };
}
