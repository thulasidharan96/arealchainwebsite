import { Html, Head, Main, NextScript } from "next/document";
import * as gtag from "../lib/gtag";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
          strategy="lazyOnload"
        />

        <Script id="gtag-init" strategy="lazyOnload">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${gtag.GA_TRACKING_ID}', {
      page_path: window.location.pathname,
    });
  `}
        </Script>
        
        {/* Passive event listeners for better scrolling performance */}
        <Script id="passive-listeners" strategy="beforeInteractive">
          {`
            // Enable passive event listeners for better scrolling performance
            let supportsPassive = false;
            try {
              const opts = Object.defineProperty({}, 'passive', {
                get: function() {
                  supportsPassive = true;
                  return true;
                }
              });
              window.addEventListener('test', null, opts);
              window.removeEventListener('test', null, opts);
            } catch (e) {}
            
            // Override addEventListener to use passive listeners for touch and wheel events
            const originalAddEventListener = EventTarget.prototype.addEventListener;
            EventTarget.prototype.addEventListener = function(type, listener, options) {
              let useCapture = false;
              let newOptions = options;
              
              if (options) {
                if (typeof options === 'object') {
                  useCapture = options.capture || false;
                  newOptions = { ...options };
                } else {
                  useCapture = options;
                  newOptions = { capture: useCapture };
                }
              }
              
              // Use passive listeners for touch and wheel events when not explicitly set
              if (supportsPassive && (type === 'touchstart' || type === 'touchmove' || type === 'touchend' || type === 'wheel' || type === 'scroll')) {
                if (!newOptions || typeof newOptions === 'boolean') {
                  newOptions = { passive: true };
                } else if (newOptions.passive === undefined) {
                  newOptions.passive = true;
                }
              }
              
              return originalAddEventListener.call(this, type, listener, newOptions);
            };
          `}
        </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
