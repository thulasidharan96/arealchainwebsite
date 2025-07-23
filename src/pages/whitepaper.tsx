import Head from "next/head";
import { useState, useEffect } from "react";

export default function WhitepaperPage() {
  const [showFallback, setShowFallback] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = [
        "android",
        "iphone",
        "ipad",
        "mobile",
        "blackberry",
      ];
      return mobileKeywords.some((keyword) => userAgent.includes(keyword));
    };

    setIsMobile(checkMobile());

    // Check if PDF can be displayed in iframe
    const testIframe = () => {
      const testFrame = document.createElement("iframe");
      testFrame.style.display = "none";
      testFrame.src = "/ArealChain_Whitepaper.pdf";

      testFrame.onload = () => {
        try {
          // Try to access the iframe content
          testFrame.contentDocument;
        } catch (e) {
          setShowFallback(true);
        }
        document.body.removeChild(testFrame);
      };

      testFrame.onerror = () => {
        setShowFallback(true);
        document.body.removeChild(testFrame);
      };

      document.body.appendChild(testFrame);
    };

    // Delay the test to ensure page is loaded
    setTimeout(testIframe, 1000);
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/ArealChain_Whitepaper.pdf";
    link.download = "ArealChain_Whitepaper.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewInNewTab = () => {
    window.open("/ArealChain_Whitepaper.pdf", "_blank");
  };

  if (showFallback || isMobile) {
    return (
      <>
        <Head>
          <title>Whitepaper</title>
          <meta name="description" content="Official whitepaper PDF view" />
          <meta property="og:title" content="Whitepaper" />
          <meta property="og:type" content="document" />
          <meta property="og:url" content="https://arealchain.com/whitepaper" />
          <link rel="icon" href="/favicon.png" />
        </Head>

        <main className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 p-8">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <svg
                className="mx-auto h-16 w-16 text-red-500 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                ArealChain Whitepaper
              </h1>
              <p className="text-gray-600">
                {isMobile
                  ? "PDF viewer not available on mobile devices"
                  : "PDF cannot be displayed in this browser"}
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleViewInNewTab}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                View in New Tab
              </button>

              <button
                onClick={handleDownload}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Download PDF
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              If you're having trouble viewing the PDF, try using a different
              browser or download it directly.
            </p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Whitepaper</title>
        <meta name="description" content="Official whitepaper PDF view" />
        <meta property="og:title" content="Whitepaper" />
        <meta property="og:type" content="document" />
        <meta property="og:url" content="https://arealchain.com/whitepaper" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="min-h-screen w-full relative">
        {/* Fallback buttons for desktop */}
        {/* <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            onClick={handleViewInNewTab}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
          >
            Open in New Tab
          </button>
          <button
            onClick={handleDownload}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors text-sm"
          >
            Download
          </button>
        </div> */}

        <iframe
          src="/ArealChain_Whitepaper.pdf"
          className="w-full h-screen border-none"
          title="Whitepaper"
          onError={() => setShowFallback(true)}
        />
      </main>
    </>
  );
}
