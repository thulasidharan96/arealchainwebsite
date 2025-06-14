// pages/blog/[id].tsx
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
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
  getBlogPostById,
  getAllBlogPosts,
  getRelatedPosts,
} from "@/src/lib/blogData";
import type { BlogPost } from "@/src/lib/blogData";

interface BlogPostPageProps {
  post: BlogPost | null;
  relatedPosts: BlogPost[];
}

export default function BlogPostPage({
  post,
  relatedPosts,
}: BlogPostPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Article Not Found
            </h1>
            <p className="text-gray-400 mb-8">
              The article you're looking for doesn't exist.
            </p>
            <Link href="/blog">
              <button className="bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold px-6 py-3 rounded-lg transition-colors">
                Back to Blog
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Link
                  href="/"
                  className="hover:text-[#F4B448] transition-colors"
                >
                  Home
                </Link>
                <span>/</span>
                <Link
                  href="/blog"
                  className="hover:text-[#F4B448] transition-colors"
                >
                  Blog
                </Link>
                <span>/</span>
                <span className="text-gray-300">{post.title}</span>
              </div>
            </nav>

            {/* Article Header */}
            <div className="mb-12">
              <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden mb-8">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <Badge className="bg-[#F4B448] text-black">
                  {post.category}
                </Badge>
                <span className="text-gray-400 text-sm">{post.date}</span>
                <span className="text-gray-400 text-sm">{post.readTime}</span>
                {post.author && (
                  <span className="text-gray-400 text-sm">
                    by {post.author}
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>

              <p className="text-xl text-gray-400 leading-relaxed">
                {post.excerpt}
              </p>

              {post.tags && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-sm bg-gray-800 text-gray-300 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Article Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="text-gray-300 leading-relaxed">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold text-white mb-6 mt-8">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold text-white mb-4 mt-8">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-bold text-white mb-4 mt-6">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="text-gray-300 mb-4 ml-6 space-y-2">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="text-gray-300 mb-4 ml-6 space-y-2">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-gray-300 list-disc">{children}</li>
                    ),
                    strong: ({ children }) => (
                      <strong className="text-[#F4B448] font-semibold">
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em className="text-gray-200 italic">{children}</em>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-[#F4B448] pl-4 my-6 text-gray-200 italic">
                        {children}
                      </blockquote>
                    ),
                    code: ({ children }) => (
                      <code className="bg-gray-800 text-[#F4B448] px-2 py-1 rounded text-sm">
                        {children}
                      </code>
                    ),
                    pre: ({ children }) => (
                      <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto my-6">
                        {children}
                      </pre>
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-800">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Found this article helpful?
                  </h3>
                  <p className="text-gray-400">
                    Share it with others who might be interested.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                    Share on Twitter
                  </button>
                  <button className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg transition-colors">
                    Share on LinkedIn
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                    Copy Link
                  </button>
                </div>
              </div>
            </div>

            {/* Author Bio (if available) */}
            {post.author && (
              <div className="mt-12 bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-[#F4B448] rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-xl">
                      {post.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">
                      {post.author}
                    </h4>
                    <p className="text-gray-400">
                      Contributing to Areal's mission of democratizing real
                      estate investment through blockchain technology and
                      innovative financial solutions.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-12 flex justify-between items-center">
              <Link href="/blog">
                <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back to Blog
                </button>
              </Link>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="bg-[#F4B448] hover:bg-[#F4B448]/90 text-black px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
                Back to Top
              </button>
            </div>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="max-w-7xl mx-auto mt-20">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link href={`/blog/${relatedPost.id}`} key={relatedPost.id}>
                    <Card className="bg-gray-900/50 border-gray-800 hover:border-[#F4B448]/50 transition-all duration-300 cursor-pointer hover:transform hover:scale-[1.02]">
                      <CardHeader className="p-0">
                        <div className="aspect-video bg-gray-800 rounded-t-lg overflow-hidden">
                          <img
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <Badge className="bg-[#F4B448] text-black text-xs">
                            {relatedPost.category}
                          </Badge>
                          <span className="text-gray-400 text-sm">
                            {relatedPost.readTime}
                          </span>
                        </div>
                        <CardTitle className="text-white text-lg mb-2 hover:text-[#F4B448] transition-colors line-clamp-2">
                          {relatedPost.title}
                        </CardTitle>
                        <CardDescription className="text-gray-400 text-sm line-clamp-2">
                          {relatedPost.excerpt}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="max-w-4xl mx-auto mt-20 bg-gray-900/50 rounded-xl p-12 border border-gray-800 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Stay Updated</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Get the latest articles about real estate investment and
              blockchain technology delivered straight to your inbox.
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
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllBlogPosts();
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  return {
    paths,
    fallback: false, // Set to true if you want to generate pages on-demand
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const post = getBlogPostById(id);
  const relatedPosts = post ? getRelatedPosts(post.id, 3) : [];

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
      relatedPosts,
    },
    revalidate: 3600, // Revalidate every hour
  };
};
