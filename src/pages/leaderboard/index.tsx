"use client";

import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { Badge } from "@/src/components/ui/badge";
import { cn } from "@/src/lib/utils";
import {
  Trophy,
  Award,
  Medal,
  Loader2,
  Users,
  AlertTriangle,
  DatabaseZap,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Layout from "@/src/components/layout";
import type { LeaderboardEntry } from "@/src/types";

gsap.registerPlugin(ScrollTrigger);

const rankConfig = {
  1: {
    icon: Trophy,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    borderColor: "border-amber-400/30",
    shadow: "shadow-amber-400/20",
  },
  2: {
    icon: Award,
    color: "text-slate-300",
    bgColor: "bg-slate-300/10",
    borderColor: "border-slate-300/30",
    shadow: "shadow-slate-300/20",
  },
  3: {
    icon: Medal,
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    borderColor: "border-orange-400/30",
    shadow: "shadow-orange-400/20",
  },
};

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("/api/leaderboard");
        if (!response.ok) {
          const errorResult = await response.json();
          throw new Error(
            errorResult.message ||
              `Error: ${response.status} ${response.statusText}`
          );
        }
        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          setLeaderboard(result.data);
        } else {
          console.error(
            "API response for leaderboard is not in expected format:",
            result
          );
          throw new Error(
            result.message || "Failed to load leaderboard: Invalid data format."
          );
        }
      } catch (err: any) {
        console.error("Failed to fetch leaderboard:", err);
        setError(
          err.message || "An unknown error occurred while fetching data."
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    if (!isLoading && listRef.current) {
      const cards = gsap.utils.toArray(".leaderboard-card");
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }
  }, [isLoading, leaderboard]);

  return (
    <Layout>
      <Head>
        <title>Referral Leaderboard | Areal</title>
        <meta
          name="description"
          content="See the top referrers in the Areal community."
        />
      </Head>

      <div className="bg-transparent min-h-screen">
        <div className="pt-32 pb-16 px-4 text-center">
          <Badge className="mb-6 bg-[#F4B448]/20 text-[#F4B448] border-[#F4B448]/30 hover:bg-[#F4B448]/30 transition-colors">
            <Users className="w-4 h-4 mr-2" />
            Top Referrers
          </Badge>
          <h1 className="text-5xl font-bold text-white mb-6">Leaderboard</h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Celebrating our top community members driving the future of Areal.
          </p>
        </div>

        <div className="max-w-4xl mx-auto pb-24 px-4">
          <div className="flex justify-between items-center text-xs text-gray-500 font-bold uppercase px-6 py-3">
            <span className="w-1/6">Rank</span>
            <span className="w-3/6">User</span>
            <span className="w-1/6 text-right">Referrals</span>
            <span className="w-1/6 text-right">Earnings</span>
          </div>

          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 text-[#F4B448] animate-spin" />
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center justify-center py-20 text-center text-red-400 bg-red-500/10 rounded-lg">
              <AlertTriangle className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Could not load data</h3>
              <p className="text-sm text-red-400/80">{error}</p>
            </div>
          )}

          {!isLoading && !error && leaderboard.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400 bg-gray-800/10 rounded-lg">
              <DatabaseZap className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">No Leaderboard Data</h3>
              <p className="text-sm text-gray-500">
                There is no data to display at the moment. Check back later!
              </p>
            </div>
          )}

          {!isLoading && !error && leaderboard.length > 0 && (
            <div ref={listRef} className="space-y-3">
              {leaderboard.map((user, index) => {
                const rank = index + 1;
                const config = rankConfig[rank as keyof typeof rankConfig];
                const isTopThree = !!config;

                return (
                  <div
                    key={user.userUid}
                    className={cn(
                      "leaderboard-card flex items-center p-4 rounded-xl border-2 transition-all duration-300 transform hover:-translate-y-1",
                      isTopThree
                        ? `${config.bgColor} ${config.borderColor} hover:shadow-lg ${config.shadow}`
                        : "bg-gray-800/20 border-gray-700/50 hover:bg-gray-700/30"
                    )}
                  >
                    <div className="w-1/6 flex items-center font-bold">
                      {isTopThree ? (
                        <config.icon
                          className={cn("w-6 h-6 mr-3", config.color)}
                        />
                      ) : (
                        <span className="text-lg text-gray-400 w-6 text-center mr-3">
                          {rank}
                        </span>
                      )}
                      <span
                        className={cn(
                          "text-xl",
                          isTopThree ? config.color : "text-white"
                        )}
                      >
                        {rank}
                      </span>
                    </div>

                    <div className="w-3/6">
                      <p className="font-bold text-white text-lg">
                        {user.username}
                      </p>
                      <p className="text-xs text-gray-500">
                        UID: {user.userUid}
                      </p>
                    </div>

                    <div className="w-1/6 text-right font-semibold text-lg text-white">
                      {user.totalReferrals.toLocaleString()}
                    </div>

                    <div className="w-1/6 text-right font-bold text-lg text-green-400">
                      ${user.totalEarnings.toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
