// pages/blog/index.tsx
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
import { getAllBlogPosts, getBlogPostsByCategory } from "@/src/lib/blogData";
import type { BlogPost } from "@/src/lib/blogData";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const allPosts = getAllBlogPosts();
  const filteredPosts = getBlogPostsByCategory(selectedCategory);

  const categories = [
    "All",
    "Announcement",
    "Technology",
    "Market Analysis",
    "Education",
    "Partnership",
    "Company",
    "Update",
  ];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-white mb-6">Areal Blog</h1>
              <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                Stay updated with the latest insights, trends, and developments
                in blockchain-powered real estate investment.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center mb-12">
              {categories.map((category, index) => (
                <Badge
                  key={index}
                  className={`cursor-pointer px-4 py-2 transition-colors ${
                    selectedCategory === category
                      ? "bg-[#F4B448] text-black hover:bg-[#F4B448]/90"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {filteredPosts.map((post: BlogPost) => (
                <Link href={`/blog/${post.id}`} key={post.id}>
                  <Card className="bg-gray-900/50 border-gray-800 hover:border-[#F4B448]/50 transition-all duration-300 cursor-pointer hover:transform hover:scale-[1.02]">
                    <CardHeader className="p-0">
                      <div className="aspect-video bg-gray-800 rounded-t-lg overflow-hidden">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4 flex-wrap">
                        <Badge className="bg-[#F4B448] text-black">
                          {post.category}
                        </Badge>
                        <span className="text-gray-400 text-sm">
                          {post.date}
                        </span>
                        <span className="text-gray-400 text-sm">
                          {post.readTime}
                        </span>
                        {post.author && (
                          <span className="text-gray-400 text-sm">
                            by {post.author}
                          </span>
                        )}
                      </div>
                      <CardTitle className="text-white text-xl mb-3 hover:text-[#F4B448] transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400 text-base line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                      {post.tags && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">
                  No articles found for the selected category.
                </p>
              </div>
            )}

            <div className="text-center mt-12">
              <button className="bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold px-8 py-3 rounded-lg transition-colors">
                Load More Articles
              </button>
            </div>

            <div className="mt-20 bg-gray-900/50 rounded-xl p-12 border border-gray-800 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Stay Informed
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter and never miss important updates
                about real estate investment trends and Areal platform
                developments.
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
