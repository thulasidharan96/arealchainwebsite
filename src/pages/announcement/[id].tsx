import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/src/components/layout";
import {
  getAnnouncementById,
  getRelatedAnnouncements,
} from "@/src/lib/announcementData"; // Helper functions
import type { Announcement } from "@/src/lib/announcementData"; // Types for Announcement
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { getAllAnnouncements } from "@/src/lib/announcementData";

interface AnnouncementPageProps {
  announcement: Announcement | null;
  relatedAnnouncements: Announcement[];
}

export default function AnnouncementPage({
  announcement,
  relatedAnnouncements,
}: AnnouncementPageProps) {
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

  if (!announcement) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Announcement Not Found
            </h1>
            <Link href="/announcement">
              <button className="bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold px-6 py-3 rounded-lg transition-colors">
                Back to Announcements
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
                  href="/announcement"
                  className="hover:text-[#F4B448] transition-colors"
                >
                  Announcements
                </Link>
                <span>/</span>
                <span className="text-gray-300">{announcement.title}</span>
              </div>
            </nav>

            {/* Announcement Content */}
            <div className="mb-12">
              <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden mb-8">
                <img
                  src={announcement.image}
                  alt={announcement.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {announcement.title}
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed">
                {announcement.excerpt}
              </p>

              {/* Content */}
              <div className="prose prose-invert prose-lg max-w-none">
                <div className="text-gray-300 leading-relaxed">
                  {announcement.content}
                </div>
              </div>
            </div>

            {/* Related Announcements */}
            <div className="mt-20">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Related Announcements
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedAnnouncements.map((relatedAnnouncement) => (
                  <Link
                    href={`/announcement/${relatedAnnouncement.id}`}
                    key={relatedAnnouncement.id}
                  >
                    <Card className="bg-gray-900/50 border-gray-800 hover:border-[#F4B448]/50 transition-all duration-300 cursor-pointer hover:transform hover:scale-[1.02]">
                      <CardHeader className="p-0">
                        <div className="aspect-video bg-gray-800 rounded-t-lg overflow-hidden">
                          <img
                            src={relatedAnnouncement.image}
                            alt={relatedAnnouncement.title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <CardTitle className="text-white text-lg mb-2 hover:text-[#F4B448] transition-colors line-clamp-2">
                          {relatedAnnouncement.title}
                        </CardTitle>
                        <CardDescription className="text-gray-400 text-sm line-clamp-2">
                          {relatedAnnouncement.excerpt}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const announcements = getAllAnnouncements();
  const paths = announcements.map((announcement: { id: any }) => ({
    params: { id: announcement.id },
  }));

  return {
    paths,
    fallback: true, // Set to true if you want to generate pages on-demand
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const announcement = getAnnouncementById(id);
  const relatedAnnouncements = announcement
    ? getRelatedAnnouncements(announcement.id, 3)
    : [];

  if (!announcement) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      announcement,
      relatedAnnouncements,
    },
    revalidate: 3600, // Revalidate every hour
  };
};
