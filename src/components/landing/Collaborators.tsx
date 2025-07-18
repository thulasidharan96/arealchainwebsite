import Image from 'next/image'
import React from 'react'
import { gsap } from "gsap";


export default function Collaborators() {
const partners = [
        { name: "Binance", src: "/partners/binance.png" },
        { name: "Chainlink", src: "/partners/chainlink.png" },
        { name: "Polygon", src: "/partners/polygon.png" },
        { name: "coingecko", src: "/partners/coingecko.png" },
        { name: "Coinbase", src: "/partners/coinbase.png" },
        { name: "Google", src: "/partners/google.png" },
        { name: "Meta", src: "/partners/meta.png" },
        { name: "GitHub", src: "/partners/github.png" },
        { name: "AWS", src: "/partners/aws.png" },
        { name: "Microsoft", src: "/partners/microsoft.png" },
      ];

        const handleCardHover = (e: { currentTarget: gsap.TweenTarget }) => {
          gsap.to(e.currentTarget, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          });
        };
      
        const handleCardLeave = (e: { currentTarget: gsap.TweenTarget }) => {
          gsap.to(e.currentTarget, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        };
  return (
    <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-white mb-4 opacity-0">
                Our Collaborators
              </h2>
              <p className="text-gray-400 mb-12 opacity-0">
                Building the Future of Crypto Real Estate with our Network of
                Trusted Blockchain Partners
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-center">
                {partners.map((partner, i) => (
                  <div
                    key={i}
                    className="partner-logo bg-gray-800/50 p-4 rounded-lg flex items-center justify-center h-20 cursor-pointer"
                    onMouseEnter={handleCardHover}
                    onMouseLeave={handleCardLeave}
                  >
                    <Image
                      src={partner.src}
                      alt={partner.name}
                      width={200}
                      height={200}
                      className="max-h-10 object-contain transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
  )
}
