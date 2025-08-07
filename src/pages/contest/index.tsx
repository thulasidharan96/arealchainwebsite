import Head from "next/head";
import Layout from "@/src/components/layout";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";

export default function Contest() {
  return (
    <Layout>
      <Head>
        <title>ArealCoin Meme-to-Earn Challenge | Areal Chain</title>
        <meta name="description" content="Join the ArealCoin Meme-to-Earn Challenge – where humor meets crypto and big rewards await. Create, share, and win!" />
        <meta property="og:title" content="ArealCoin Meme-to-Earn Challenge | Areal Chain" />
        <meta property="og:description" content="Join the ArealCoin Meme-to-Earn Challenge – where humor meets crypto and big rewards await. Create, share, and win!" />
        <meta property="og:image" content="/coin/areal.png" />
      </Head>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-36 gap-10 overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl animate-pulse z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse z-0" />

        {/* Left Content */}
        <div className="relative z-10 w-full md:w-1/2 text-left flex flex-col items-start">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            <span className="text-yellow-400">ArealCoin's</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-[#F4B448] to-yellow-400 animate-pulse">Meme-to-Earn</span> <br />
            <span className="text-white">Challenge</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-xl">
            Got Memes? Now’s your chance to get rewarded!<br />
            Join the ArealCoin Meme-to-Earn Challenge – where humor meets crypto and big rewards await.
          </p>
          {/* <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-3 rounded-full shadow-lg transition-all duration-300 text-lg">
              Submit Your Meme
            </Button>
            <Button size="lg" variant="outline" className="border-yellow-400 text-yellow-300 hover:bg-yellow-400/10 hover:text-yellow-400 transition-all duration-300 px-8 py-3 rounded-full text-lg">
              See Prizes
            </Button>
          </div> */}
        </div>

        {/* Right Content: Fun Meme Image */}
        <div className="relative z-10 w-full md:w-1/2 flex justify-center items-center">
          <Image
            src="/contest/contest.jpeg"
            alt="Areal Meme Contest"
            width={430}
            height={430}
            className="rounded-2xl shadow-2xl border-4 border-yellow-400/30 bg-gray-900/60"
            priority
          />
        </div>
      </section>

      {/* Contest Details Section */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-400 mb-8 text-center">
          How It Works
        </h2>
        {/* Horizontal Stepper */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12 w-full">
          <div className="flex flex-col items-center flex-1 min-w-[120px]">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-400 text-gray-900 font-bold text-2xl mb-2">1</div>
            <div className="text-gray-100 text-center max-w-[180px]">Create a meme about <span className="text-yellow-300 font-semibold">ArealCoin</span> or the crypto world</div>
          </div>
          <div className="hidden md:block w-12 h-1 bg-yellow-400 rounded-full" />
          <div className="flex flex-col items-center flex-1 min-w-[120px]">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-400 text-gray-900 font-bold text-2xl mb-2">2</div>
            <div className="text-gray-100 text-center max-w-[180px]">Share it with the ArealCoin Community</div>
          </div>
          <div className="hidden md:block w-12 h-1 bg-yellow-400 rounded-full" />
          <div className="flex flex-col items-center flex-1 min-w-[120px]">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-400 text-gray-900 font-bold text-2xl mb-2">3</div>
            <div className="text-gray-100 text-center max-w-[180px]">Vote for your favorite memes – the community decides!</div>
          </div>
        </div>
        <div className="mb-12 text-center">
          <p className="text-xl font-bold text-yellow-200 mb-2">Join Now. Create. Share. WIN.</p>
          <p className="text-lg text-gray-100">Submit Your Meme & Earn Rewards Today!</p>
        </div>
        {/* Prizes Row */}
        <div className="flex flex-col md:flex-row gap-8 md:items-stretch">
          {/* Left: Exclusive Prizes */}
          <div className="flex-1 bg-gray-800/80 rounded-xl p-6 md:p-10 shadow-lg border border-yellow-400/20 flex flex-col justify-start mb-8 md:mb-0 min-h-[320px]">
            <span className="block font-bold text-yellow-300 mb-2 text-lg">WIN exclusive prizes like:</span>
            <ul className="list-disc list-inside space-y-2 text-gray-100">
              <li><span className="font-semibold text-green-400">$2000 CASH</span></li>
              <li><span className="font-semibold text-blue-400">iPhone</span></li>
              <li><span className="font-semibold text-pink-400">ArealCoin NFTs & Whitelist spots</span></li>
            </ul>
          </div>
          {/* Right: Grand Prize & Runner-Ups */}
          <div className="flex-1 bg-gray-800/80 rounded-xl p-6 md:p-10 shadow-lg border border-yellow-400/20 flex flex-col justify-start min-h-[320px]">
            {/* <h3 className="text-2xl font-bold text-yellow-300 mb-4 text-center">HODL. Earn. Win. A Year of Crypto Action. A Prize That Changes Everything.</h3> */}
            <div className="mb-4 text-center flex flex-row items-center gap-1">
              <span className="block font-bold text-yellow-300 mb-2">GRAND PRIZE:</span>
              <span className="block font-semibold text-green-400 mb-2">Studio Apartment OR Premium Car</span>
            </div>
            <div className="text-left">
              <span className="block font-bold text-yellow-300 mb-2">RUNNER-UPS WIN:</span>
              <ul className="list-disc list-inside space-y-1 text-gray-100 inline-block text-left">
                <li><span className="font-semibold text-blue-400">MacBooks</span></li>
                <li><span className="font-semibold text-pink-400">Dream Trips</span></li>
                <li><span className="font-semibold text-yellow-200">Token Airdrops</span></li>
              </ul>
            </div>
          </div>
        </div>
        {/* <div className="mt-8 text-center">
          <Button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all duration-200">
            Submit Your Meme
          </Button>
        </div> */}
      </section>
    </Layout>
  );
}
