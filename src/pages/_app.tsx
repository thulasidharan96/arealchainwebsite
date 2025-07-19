import "@/src/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@/src/components/theme-provider";
import { WagmiProvider } from "wagmi";
import { config } from "@/wagmi.config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../providers/auth-provider";
import { WalletProvider } from "@/src/contexts/WalletContext";
import { useSplashScreen } from "@/src/hooks/useSplashScreen";

// Dynamically import heavy components
const SplashScreen = dynamic(() => import("@/src/components/SplashScreen"), {
  ssr: false,
});
const SmoothScroll = dynamic(() => import("@/src/components/SmoothScroll"), {
  ssr: false,
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { showSplash, isFinishing, onCompleteWrapper } = useSplashScreen(() => {
    // Optional callback logic on splash complete
  });

  // IntersectionObserver Counter Animation (if needed)
  useEffect(() => {
    if (showSplash) return;

    const counters = document.querySelectorAll<HTMLElement>(".counter");
    const observers: IntersectionObserver[] = [];

    counters.forEach((counter) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !counter.dataset.animated) {
            counter.dataset.animated = "true";

            const target = parseFloat(
              counter.getAttribute("data-value") || "0"
            );
            const decimalPlaces =
              (counter.getAttribute("data-value") || "0").split(".")[1]
                ?.length || 0;

            let current = 0;
            const duration = 1500;
            const step = target / (duration / (1000 / 60));

            const animate = () => {
              current += step;
              if (current < target) {
                counter.innerText = current.toFixed(decimalPlaces);
                requestAnimationFrame(animate);
              } else {
                counter.innerText = target.toFixed(decimalPlaces);
              }
            };

            animate();
            observer.unobserve(counter);
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(counter);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [pageProps, showSplash]);

  if (!mounted) return null;

  return (
    <>
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
        <meta property="og:title" content="ArealChain – Tokenize Real Estate" />
        <meta
          property="og:description"
          content="Invest in tokenized real estate and access global properties."
        />
      </Head>

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
                  {showSplash && (
                    <SplashScreen
                      isFinishing={isFinishing}
                      onComplete={onCompleteWrapper}
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
