import Head from "next/head";

export default function WhitepaperPage() {
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

      <main className="min-h-screen w-full">
        <iframe
          src="/ArealChain_Whitepaper.pdf"
          className="w-full h-screen border-none"
          title="Whitepaper"
        ></iframe>
      </main>
    </>
  );
}
