"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/src/lib/utils";
import Image from "next/image";

interface SplashScreenProps {
  isFinishing: boolean;
  onComplete?: () => void;
}

export default function SplashScreen({
  isFinishing,
  onComplete,
}: SplashScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showFallback, setShowFallback] = useState(false);
  const [progress, setProgress] = useState(0);
  const completedRef = useRef(false);

  // Prevent body scroll
  useEffect(() => {
    if (!isFinishing) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isFinishing]);

  // Video setup and fallback logic
  useEffect(() => {
    if (isFinishing) return;

    const video = videoRef.current;
    if (!video) {
      setShowFallback(true);
      return;
    }

    const handleComplete = () => {
      if (completedRef.current) return;
      completedRef.current = true;
      onComplete?.(); // No delay
    };

    const handleVideoEnd = () => handleComplete();
    const handleVideoError = () => {
      setShowFallback(true);
      handleComplete(); // No delay
    };

    video.addEventListener("ended", handleVideoEnd);
    video.addEventListener("error", handleVideoError);

    // Try to play video immediately
    video.currentTime = 0;
    video.play().catch(() => {
      setShowFallback(true);
      handleComplete();
    });

    return () => {
      video.removeEventListener("ended", handleVideoEnd);
      video.removeEventListener("error", handleVideoError);
    };
  }, [isFinishing, onComplete]);

  // Fallback progress bar - instant or very fast
  useEffect(() => {
    if (showFallback && !isFinishing && !completedRef.current) {
      setProgress(100);
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete?.(); // No delay
      }
    }
  }, [showFallback, isFinishing, onComplete]);

  useEffect(() => {
    if (!showFallback && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((e) => {
        // If play fails, fallback
        setShowFallback(true);
      });
    }
  }, [showFallback]);

  if (isFinishing) return null;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center w-screen h-screen overflow-hidden">
      {!showFallback ? (
        // Video splash - show video first
        <video
          ref={videoRef}
          className={cn(
            "max-w-full max-h-full object-contain",
            isMobile && "object-contain"
          )}
          autoPlay
          muted
          playsInline
          preload="auto"
          onLoadedData={() => videoRef.current?.play()}
          onError={() => setShowFallback(true)}
          style={{ maxHeight: "100dvh", maxWidth: "100dvw" }}
        >
          <source src="/intro.mp4" type="video/mp4" />
        </video>
      ) : (
        // Fallback splash - only show when video fails
        <div className="flex flex-col items-center justify-center gap-6 px-4 text-center">
          <div
            className={cn(
              "flex items-center gap-6",
              isMobile && "flex-col gap-4"
            )}
          >
            <Image
              src="/coin/coin.avif"
              alt="Logo"
              width={isMobile ? 80 : 120}
              height={isMobile ? 80 : 120}
              priority
              className="object-contain"
            />
            <Image
              src="/coin/text.avif"
              alt="Text"
              width={isMobile ? 200 : 320}
              height={isMobile ? 100 : 160}
              priority
              className="object-contain"
            />
          </div>

          <h1
            className={cn(
              "text-white font-bold leading-tight",
              isMobile ? "text-lg" : "text-2xl md:text-3xl"
            )}
          >
            Access Real Assets. Anytime. Anywhere
          </h1>

          {/* Progress bar - only shown in fallback */}
          <div className="w-64 max-w-full bg-gray-800 rounded-full h-1.5">
            <div
              className="h-full bg-white rounded-full transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}