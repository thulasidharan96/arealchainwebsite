import "@/src/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/src/components/theme-provider";
import Head from "next/head";
import { useEffect, useState } from "react";
import SplashScreen from "@/src/components/SplashScreen";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/wagmi.config";
import { AuthProvider } from "../providers/auth-provider";
import { WalletProvider } from "@/src/contexts/WalletContext";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [isFinishing, setIsFinishing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Always show the splash screen on a hard reload.
    // The empty dependency array ensures this only runs on the initial app mount,
    // not on subsequent page navigations.

    // Start the fade-out transition after the text animation
    const finishTimer = setTimeout(() => {
      setIsFinishing(true);
    }, 2000); // Duration of the zoom-out animation

    // Hide the splash screen component completely after the fade-out
    const hideTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2500); // 2s text animation + 0.5s container fade-out

    return () => {
      clearTimeout(finishTimer);
      clearTimeout(hideTimer);
    };
  }, []); // The empty dependency array is key here

  useEffect(() => {
    // Do not run the counter animation while the splash screen is visible
    if (showSplash) return;

    // Improved counter animation using IntersectionObserver
    const counters = document.querySelectorAll<HTMLElement>(".counter");
    if (counters.length === 0) return;

    const observers: IntersectionObserver[] = [];

    counters.forEach((counter) => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !counter.dataset.animated) {
            counter.dataset.animated = "true";
            const target = parseFloat(
              counter.getAttribute("data-value") || "0"
            );

            // Determine the number of decimal places from the target value
            const targetString = counter.getAttribute("data-value") || "0";
            const decimalPlaces = targetString.includes(".")
              ? targetString.split(".")[1].length
              : 0;

            let current = 0;
            const duration = 1500; // Animation duration in ms
            const stepTime = 1000 / 60; // Assume 60 fps
            const totalSteps = duration / stepTime;
            const increment = target / totalSteps;

            const updateCounter = () => {
              current += increment;
              if (current < target) {
                counter.innerText = current.toFixed(decimalPlaces);
                requestAnimationFrame(updateCounter);
              } else {
                counter.innerText = target.toFixed(decimalPlaces);
              }
            };
            updateCounter();
            observer.unobserve(counter);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(counter);
      observers.push(observer);
    });

    // Cleanup function to disconnect all observers on component unmount
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [pageProps, showSplash]); // Re-run on page navigation or when splash is hidden

  if (!mounted) {
    return null;
  }

  return (
    <AuthProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <WalletProvider>
              <Head>
                <link rel="icon" href="/favicon.png" />
                <title>Layer 1 Blockchain for RWA</title>
              </Head>

              {showSplash && <SplashScreen isFinishing={isFinishing} />}

              <div style={{ visibility: showSplash ? "hidden" : "visible" }}>
                <Component {...pageProps} />
              </div>
            </WalletProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </AuthProvider>
  );
}
