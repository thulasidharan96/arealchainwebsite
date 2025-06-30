// /src/lib/announcementData.ts

export type Announcement = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: "Announcement" | "Press Release";
  date: string;
  image: string;
  link: string;
};

export const announcements: Announcement[] = [
  {
    id: "areal-crypto-revolution-dubai",
    title:
      "Areal Chain announces real-world crypto revolution led by Sripriya Kalyanasundaram at Crypto Expo Dubai 2025",
    excerpt:
      "Areal Chain makes waves at Crypto Expo Dubai with a bold vision of real-world asset tokenization, led by Sripriya Kalyanasundaram.",
    content: "...", // full content for blog page
    category: "Press Release",
    date: "June 3, 2025 | 14:30",
    image: "/announcement/crypto-expo.jpg", // your image path
    link: "https://www.gulftoday.ae/business/2025/06/03/areal-chain-announces-real-world-crypto-revolution-led-by-sripriya-alyanasundaram-at-crypto-expo-dubai-2025",
  },
  {
    id: "areal-launch-layer1",
    title:
      "Areal Chain Announces Launch of Layer 1 Blockchain at Crypto Expo Dubai 2025",
    excerpt:
      "The next evolution of blockchain is here — Areal officially launches its Layer 1 chain for tokenizing real-world assets.",
    content: "...", // full content for blog page
    category: "Announcement",
    date: "June 3, 2025 | 12:00",
    image: "/announcement/layer1-launch.jpg",
    link: "https://medium.com/arabianpost/areal-chain-announces-launch-of-layer-1-blockchain-at-crypto-expo-dubai-2025-5bee88b587e5",
  },
];

export function getAllAnnouncements(): Announcement[] {
  return announcements;
}

export function getAnnouncementsByCategory(category: string): Announcement[] {
  if (category === "All") return announcements;
  return announcements.filter((item) => item.category === category);
}
