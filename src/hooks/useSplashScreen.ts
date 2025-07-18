import { useState, useEffect } from "react";

export const useSplashScreen = (minDisplayTime: number = 3000) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFinishing(true);

      // Give time for exit animation
      setTimeout(() => {
        setIsLoading(false);
      }, 600);
    }, minDisplayTime);

    return () => clearTimeout(timer);
  }, [minDisplayTime]);

  const completeSplash = () => {
    setIsFinishing(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };

  return {
    isLoading,
    isFinishing,
    completeSplash,
  };
};
