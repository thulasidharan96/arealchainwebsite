import "@/src/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
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

  useEffect(() => {
    setMounted(true);

    // Initialize Botpress when component mounts
    const initBotpress = () => {
      // Wait for Botpress to be available
      const checkBotpress = () => {
        if (typeof window !== "undefined" && (window as any).botpressWebChat) {
          console.log("Botpress webchat is available");
          // Botpress is loaded and should initialize automatically
        } else {
          // Retry after a short delay
          setTimeout(checkBotpress, 100);
        }
      };
      checkBotpress();
    };

    // Initialize after mount
    setTimeout(initBotpress, 1000);
  }, []);

  const { showSplash, isFinishing, isTransitioning, onCompleteWrapper } = useSplashScreen(() => {
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
        {/* Preload video for faster splash screen */}
        <link rel="preload" as="video" href="/intro.mp4" type="video/mp4" />
      </Head>

      {/* Botpress Webchat Scripts */}
      <Script
        src="https://cdn.botpress.cloud/webchat/v3.1/inject.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("Botpress inject script loaded");
        }}
      />
      <Script
        src="https://files.bpcontent.cloud/2025/07/24/06/20250724062946-UBTFYGGR.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("Botpress config script loaded");
          // Force re-initialize if needed
          if (
            typeof window !== "undefined" &&
            (window as any).botpressWebChat
          ) {
            try {
              (window as any).botpressWebChat.init();
            } catch (e) {
              console.log("Botpress already initialized");
            }
          }
        }}
      />

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
                    className={`transition-opacity duration-300 ${
                      showSplash || isTransitioning
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
