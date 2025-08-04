import React from "react";
import { Play } from "lucide-react"; // Only Play is needed now
import Layout from "@/src/components/layout";

const videoTutorials = [
  {
    id: 1,
    title:
      "The Foundation of Digital Real Estate | Own Land Digitally with ArealChain",
    youtube: "http://www.youtube.com/watch?v=px_a1TKWwdo",
    thumbnail: "https://img.youtube.com/vi/px_a1TKWwdo/maxresdefault.jpg",
  },
  {
    id: 2,
    title:
      "ArealChain Explained: Simplifying Real Estate Investment with Blockchain",
    youtube: "https://www.youtube.com/watch?v=TAXlgvbMxZ0",
    thumbnail: "https://img.youtube.com/vi/TAXlgvbMxZ0/maxresdefault.jpg",
  },
  {
    id: 3,
    title: "How ArealChain Makes Property Ownership Smart and Transparent",
    youtube: "https://www.youtube.com/watch?v=L8AnOQoOaOg",
    thumbnail: "https://img.youtube.com/vi/L8AnOQoOaOg/maxresdefault.jpg",
  },
  {
    id: 4,
    title:
      "Revolutionizing Land Ownership with ArealChain's Blockchain Technology",
    youtube: "https://www.youtube.com/watch?v=-88KVaGqQFA",
    thumbnail: "https://img.youtube.com/vi/-88KVaGqQFA/maxresdefault.jpg",
  },
];

const ArealGuideHub = () => {
  return (
    <Layout>
      <div className=" text-white min-h-screen py-16">
        <div className=" text-white min-h-[100vh] py-16 flex items-center justify-center">
          {/* Glass Card Center */}
          <div className="relative z-10 mx-auto max-w-4xl text-center backdrop-blur-sm bg-white/5 rounded-3xl border border-white/10 p-10 shadow-xl">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-6">
              Your Gateway to <span className="text-[#F4B448]">ArealChain</span>{" "}
              Mastery
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl mb-8">
              Dive into beginner-friendly video tutorials, walkthroughs, and
              step-by-step guides to unlock the full potential of tokenized real
              estate on ArealChain.
            </p>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
          Explore AREAL Guides
        </h2>

        <div className="flex justify-center">
          {/* Center the grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full justify-center items-center">
            {/* Responsive grid with max-width */}
            {videoTutorials.map((video) => (
              <a
                // key={video.id}
                href={video.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-[#F4B448] transition-all duration-300"
              >
                <div className="relative aspect-video">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
                    <div className="w-14 h-14 bg-[#F4B448] rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-black" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#F4B448]">
                    {video.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ArealGuideHub;
