import { Button } from "@/src/components/ui/button";
import dynamic from "next/dynamic";

const SplineViewer = dynamic(() => import("./SplineViewer"), { ssr: false });

export default function Hero() {
  return (
    <div className="hero-section relative min-h-screen w-full bg-transparent overflow-hidden mt-20 md:mt-16 lg:mt-16">
      {/* Background blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#F4B448]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between min-h-[80vh] px-4 sm:px-8 md:px-12 max-w-7xl mx-auto gap-10">
        {/* Left content */}
        <div className="w-full lg:w-1/2 text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 leading-tight">
            Transforming the World's <br /> Assets with{" "}
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
            <span className="text-transparent bg-clip-text animate-gradient bg-gradient-to-r from-yellow-400 via-[#F4B448] to-yellow-400 bg-[length:200%_200%]">
              AREAL
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 max-w-xl">
            AREAL is a Layer-1 Blockchain that makes it easy to buy and sell
            real-world assets in a click. It's built for an open, permissionless
            financial system where anyone can participate.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold px-8"
              onClick={() => (window.location.href = "/contact")}
            >
              Create your Wealth with Areal →
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
              onClick={() => (window.location.href = "/roadmap")}
            >
              View our Roadmap
            </Button>
          </div>
        </div>

        {/* Right: Spline Viewer */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <SplineViewer />
        </div>
      </div>

      {/* Video Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 pb-12 pt-8">
        <a
          href="https://www.youtube.com/@ArealChain"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold text-white mb-6 text-center cursor-pointer">
            See What’s Happening at AREAL
          </h2>
        </a>
        <div className="aspect-video rounded-xl overflow-hidden border-2 border-[#F4B448]/30 shadow-[0_0_25px_#F4B44833]">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/uywf3RlK5aE?autoplay=1&mute=1&loop=1&playlist=uywf3RlK5aE&controls=0&modestbranding=1&showinfo=0&rel=0"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
