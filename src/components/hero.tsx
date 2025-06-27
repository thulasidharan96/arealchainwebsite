import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { BlobAnimation } from "@/src/components/ui/BlobAnimation";
import SplineViewer from "./SplineViewer";

export default function Hero() {
  return (
    <div className="hero-section relative min-h-screen max-w-7xl bg-transparent overflow-hidden mt-16">
      {/* <BlobAnimation /> */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#F4B448]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
      </div>
      <div className="z-10 flex items-center justify-between min-h-screen px-4">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white my-8 leading-tight">
            Transforming the World's <br />
            Assets with{" "}
            <span className="text-transparent bg-clip-text animate-gradient bg-gradient-to-r from-yellow-400 via-[#F4B448] to-yellow-400 bg-[length:200%_200%]">
              AREAL
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            AREAL is a Layer-1, Blockchain that makes it easy to Buy and Sell
            real-world assets in a click. It's built for an open, permissionless
            financial system where anyone can participate.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
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
              View our Roadmap{" "}
            </Button>
          </div>

          {/* Video placeholder */}
          {/* <div className="relative max-w-4xl mx-auto">
            <div className="aspect-video rounded-xl overflow-hidden border-2 border-[#F4B448]/30 shadow-[0_0_25px_#F4B44833]">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/wu5bA6-weUk?autoplay=1&mute=1&loop=1&playlist=wu5bA6-weUk&controls=0&modestbranding=1&showinfo=0&rel=0"
                title="Introducing the identity behind the innovation."
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div> */}
        </div>
        <div className="z-10">
          <SplineViewer />
        </div>
      </div>
      <div className="relative max-w-4xl mx-auto">
        <div className="aspect-video rounded-xl overflow-hidden border-2 border-[#F4B448]/30 shadow-[0_0_25px_#F4B44833]">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/wu5bA6-weUk?autoplay=1&mute=1&loop=1&playlist=wu5bA6-weUk&controls=0&modestbranding=1&showinfo=0&rel=0"
            title="Introducing the identity behind the innovation."
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
