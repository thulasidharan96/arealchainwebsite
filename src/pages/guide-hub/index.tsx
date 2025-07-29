import React, { useState } from "react";
import { Play, Eye, ThumbsUp } from "lucide-react";
import Layout from "@/src/components/layout";

const videoTutorials = [
  {
    id: 1,
    title: "What is ArealChain? (Complete Intro for Beginners)",
    description:
      "Understand what ArealChain does, why it exists, and how it solves real estate inefficiencies.",
    category: "understand",
    duration: "9:45",
    views: "12.1K",
    likes: "1.3K",
    difficulty: "Beginner",
    youtube: "https://www.youtube.com/watch?v=video1",
    thumbnail: "https://img.youtube.com/vi/video1/hqdefault.jpg",
    tags: ["ArealChain", "Intro", "Blockchain"],
  },
  {
    id: 2,
    title: "How to Buy Tokens on ArealChain (Full Walkthrough)",
    description:
      "Step-by-step guide to connect your wallet and purchase AREAL tokens securely.",
    category: "buy",
    duration: "12:30",
    views: "9.2K",
    likes: "987",
    difficulty: "Beginner",
    youtube: "https://www.youtube.com/watch?v=video2",
    thumbnail: "https://img.youtube.com/vi/video2/hqdefault.jpg",
    tags: ["Buy", "Tokens", "Wallet"],
  },
  {
    id: 3,
    title: "How to Tokenize Your Property on ArealChain",
    description:
      "Easily tokenize your land, house, or commercial building into tradable assets.",
    category: "tokenize",
    duration: "14:10",
    views: "8.6K",
    likes: "721",
    difficulty: "Intermediate",
    youtube: "https://www.youtube.com/watch?v=video3",
    thumbnail: "https://img.youtube.com/vi/video3/hqdefault.jpg",
    tags: ["Tokenization", "Smart Contract", "Property"],
  },
];

const ArealGuideHub = () => {
  return (
    <Layout>
      <div className="bg-black text-white min-h-screen py-16 px-4">
        <div className="relative isolate overflow-hidden bg-gradient-to-br from-black via-[#0c0c0c] to-gray-900 text-white py-24 px-6 sm:px-12 lg:px-20">
          {/* Floating AREAL Logos - for animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-40px] left-[-30px] w-32 h-32 bg-[#F4B448]/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-[-60px] right-[-20px] w-40 h-40 bg-[#F4B448]/10 rounded-full blur-2xl animate-pulse delay-1000" />
          </div>

          {/* Glass Card Center */}
          <div className="relative z-10 mx-auto max-w-4xl text-center backdrop-blur-sm bg-white/5 rounded-3xl border border-white/10 p-10 shadow-xl">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              Your Gateway to <span className="text-[#F4B448]">ArealChain</span>{" "}
              Mastery
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl mb-8">
              Dive into beginner-friendly video tutorials, walkthroughs, and
              step-by-step guides to unlock the full potential of tokenized real
              estate on ArealChain.
            </p>

            {/* CTA Buttons */}
            {/* <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href="#"
                className="bg-[#F4B448] text-black px-6 py-3 rounded-full font-semibold text-sm hover:scale-105 transition-transform shadow-lg"
              >
                Start Watching Now
              </a>
              <a
                href="#videos"
                className="border border-white/20 text-white px-6 py-3 rounded-full text-sm hover:bg-white/10 transition"
              >
                Explore Video Guides
              </a>
            </div> */}
          </div>
        </div>

        <h1 className="text-4xl font-extrabold text-center mb-12">
          Explore AREAL Guides
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoTutorials.map((video) => (
            <a
              key={video.id}
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
                <div className="absolute top-3 left-3 px-3 py-1 text-xs font-bold text-white rounded-full bg-gradient-to-r ${getDifficultyColor(video.difficulty)}">
                  {video.difficulty}
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-xs text-white rounded">
                  {video.duration}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2 text-white group-hover:text-[#F4B448]">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-400 mb-3">
                  {video.description}
                </p>
                <div className="flex justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {video.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    {video.likes}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ArealGuideHub;
