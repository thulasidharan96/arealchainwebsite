import { Html, Head, Main, NextScript } from "next/document";
import * as gtag from "../lib/gtag";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
