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
import SmoothScroll from "../components/SmoothScroll";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [isFinishing, setIsFinishing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle splash screen completion
  const handleSplashComplete = () => {
    setIsFinishing(true);

    // Hide the splash screen after fade-out animation
    setTimeout(() => {
      setShowSplash(false);
    }, 500); // Keep this to match the fade-out duration in SplashScreen
  };

  // Fallback timer in case splash screen doesn't complete naturally
  useEffect(() => {
    // Maximum time to show splash screen (fallback)
    const maxSplashTime = 8000; // 8 seconds maximum

    const fallbackTimer = setTimeout(() => {
      if (showSplash) {
        console.log("Splash screen fallback timeout reached");
        handleSplashComplete();
      }
    }, maxSplashTime);

    return () => {
      clearTimeout(fallbackTimer);
    };
  }, [showSplash]);

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
    <>
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
                <SmoothScroll>
                  <Head>
                    <link
                      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
                      rel="stylesheet"
                    />
                    <link rel="icon" href="/favicon.png" />
                    <title>ArealChain</title>
                    <meta
                      name="description"
                      content="Own fractional real estate tokens with ArealChain. Fast, secure, and decentralized Layer 1 RWA platform."
                    />
                    <meta
                      property="og:title"
                      content="ArealChain – Tokenize Real Estate"
                    />
                    <meta
                      property="og:description"
                      content="Invest in tokenized real estate and access global properties."
                    />
                  </Head>

                  {showSplash && (
                    <SplashScreen
                      isFinishing={isFinishing}
                      onComplete={handleSplashComplete}
                    />
                  )}

                  <div
                    className={`transition-opacity duration-500 ${
                      showSplash
                        ? "opacity-0 pointer-events-none"
                        : "opacity-100"
                    }`}
                  >
                    <Component {...pageProps} />
                  </div>
                </SmoothScroll>
              </WalletProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </AuthProvider>
    </>
  );
}
