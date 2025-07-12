import { useState } from "react";
import Link from "next/link";
import Layout from "@/src/components/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import {
  getAllAnnouncements,
  getAnnouncementsByCategory,
} from "@/src/lib/announcementData";
import type { Announcement } from "@/src/lib/announcementData";
import SplineAnnouncement from "@/src/components/SplineAnnouncement";

export default function Announcement() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const allAnnouncements = getAllAnnouncements();
  const filteredAnnouncements = getAnnouncementsByCategory(selectedCategory); // Filter by category

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <Layout>
      <div className="relative z-0">
        <SplineAnnouncement />
        <div className="relative z-10">
          <div className="min-h-screen bg-transparent">
            <div className="pt-32 pb-20 px-4">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h1 className="text-5xl font-bold text-white mb-6">
                    Areal Announcements
                  </h1>
                  <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                    Stay informed with the latest announcements, updates, and
                    news related to Areal.
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {filteredAnnouncements.map((announcement: Announcement) => (
                    <Link href={`${announcement.link}`} key={announcement.id}>
                      <Card className="bg-gray-900/50 border-gray-800 hover:border-[#F4B448]/50 transition-all duration-300 cursor-pointer hover:transform hover:scale-[1.02]">
                        <CardHeader className="p-0">
                          <div className="aspect-video bg-black rounded-t-lg overflow-hidden p-2">
                            <img
                              src={announcement.image || "/placeholder.svg"}
                              alt={announcement.title}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                        </CardHeader>
                        <CardContent className="p-6 backdrop-blur-3xl">
                          <div className="flex items-center gap-4 mb-4 flex-wrap">
                            <Badge className="bg-[#F4B448] text-black">
                              {announcement.category}
                            </Badge>
                            <span className="text-gray-400 text-sm">
                              {announcement.date}
                            </span>
                          </div>
                          <CardTitle className="text-white text-xl mb-3 hover:text-[#F4B448] transition-colors line-clamp-2">
                            {announcement.title}
                          </CardTitle>
                          <CardDescription className="text-gray-400 text-base line-clamp-3">
                            {announcement.excerpt}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>

                {filteredAnnouncements.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-400 text-lg">
                      No announcements found for the selected category.
                    </p>
                  </div>
                )}

                {/* <div className="text-center mt-12">
              <button className="bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold px-8 py-3 rounded-lg transition-colors">
                Load More Announcements
              </button>
            </div> */}
                {/* 
            <div className="mt-20 bg-gray-900/50 rounded-xl p-12 border border-gray-800 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Stay Informed
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter for regular updates about Areal.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#F4B448]"
                />
                <button className="bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold px-6 py-3 rounded-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
