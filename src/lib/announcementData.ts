export interface Announcement {
  link: string;
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author?: string;
  tags?: string[];
}

export const announcements: Announcement[] = [
  {
    link: "https",
    id: "brock-pierce-joins-Areal",
    title: "EOS & USDT Co-Founder, Brock Pierce, Joins Areal!",
    excerpt:
      "We're thrilled to announce that blockchain pioneer Brock Pierce has joined Areal as an advisor and investor.",
    content: `
    # EOS & USDT Co-Founder, Brock Pierce, Joins Areal!
    
    We're thrilled to announce that blockchain pioneer Brock Pierce has joined Areal as an advisor and investor. This partnership marks a significant milestone in our journey to revolutionize real estate investment through blockchain technology.
    
    ## About Brock Pierce
    
    Brock Pierce is a legendary figure in the cryptocurrency space, known for his pivotal roles in:
    - Co-founding EOS, one of the largest blockchain platforms
    - Co-founding Tether (USDT), the world's most widely used stablecoin
    - Chairman of the Bitcoin Foundation
    - Founding Block.one, which raised over $4 billion in one of the largest ICOs in history
    
    ## What This Means for Areal
    
    With Brock's expertise and network, Areal is positioned to accelerate our mission of making real estate investment accessible to everyone through tokenization. His deep understanding of blockchain technology and token economics will be invaluable as we scale our platform.
    
    ## Looking Forward
    
    This partnership opens doors to new opportunities and validates our approach to blockchain-based real estate investment. Stay tuned for exciting developments as we continue to build the future of property investment.
      `,
    category: "Announcement",
    date: "Feb 20, 2024",
    readTime: "3 min read",
    image: "/placeholder.svg?height=400&width=800",
    author: "Areal Team",
    tags: ["Partnership", "Blockchain", "Investment"],
  },
  {
    link: "https",
    id: "welcoming-charles-lamoulen",
    title: "Welcoming Charles Lamoulen!",
    excerpt:
      "We're excited to welcome Charles Lamoulen to the Areal advisory board, bringing decades of real estate expertise.",
    content: `
    # Welcoming Charles Lamoulen!
    
    We're excited to welcome Charles Lamoulen to the Areal advisory board. With over 25 years of experience in real estate development and investment, Charles brings invaluable expertise to our team.
    
    ## Charles's Background
    
    Charles has been instrumental in:
    - Managing over $2 billion in real estate assets
    - Developing commercial and residential properties across Europe
    - Leading successful real estate investment funds
    - Pioneering innovative financing solutions in the property sector
    
    ## His Role at Areal
    
    As an advisor, Charles will help us:
    - Identify premium real estate opportunities for tokenization
    - Develop strategic partnerships with traditional real estate players
    - Ensure our platform meets institutional investment standards
    - Guide our expansion into new markets
    
    ## The Future of Real Estate Investment
    
    With Charles's guidance, we're building bridges between traditional real estate and blockchain technology, creating new opportunities for investors worldwide.
    
    Welcome to the team, Charles!
      `,
    category: "Announcement",
    date: "Jun 18, 2024",
    readTime: "2 min read",
    image: "/placeholder.svg?height=400&width=800",
    author: "Areal Team",
    tags: ["Team", "Advisory", "Real Estate"],
  },
  {
    link: "https",
    id: "marketing-visual-update",
    title: "Ramping Up the Marketing Machine: A Visual Update",
    excerpt:
      "Check out our refreshed brand identity and new marketing materials as we prepare for launch.",
    content: `
    # Ramping Up the Marketing Machine: A Visual Update
    
    As we approach our platform launch, we're excited to share our refreshed brand identity and new marketing materials that better reflect Areal's innovative approach to real estate investment.
    
    ## Brand Evolution
    
    Our updated visual identity includes:
    - **Modern Logo Design**: Clean, professional, and blockchain-inspired
    - **Color Palette**: Sophisticated grays with our signature golden accent
    - **Typography**: Clear, readable fonts that convey trust and innovation
    - **Imagery**: High-quality visuals showcasing premium real estate
    
    ## New Marketing Materials
    
    We've developed:
    - **Website Redesign**: Enhanced user experience and clearer messaging
    - **Social Media Templates**: Consistent branding across all platforms
    - **Investor Presentations**: Professional materials for partnerships
    - **Educational Content**: Infographics and videos explaining tokenization
    
    ## Building Trust Through Design
    
    Our visual update isn't just about aesthetics – it's about building trust and credibility in the blockchain real estate space. Every design choice reflects our commitment to professionalism and innovation.
    
    ## What's Next?
    
    Stay tuned for more exciting updates as we continue building the future of real estate investment!
      `,
    category: "Announcement",
    date: "Jun 13, 2024",
    readTime: "3 min read",
    image: "/placeholder.svg?height=400&width=800",
    author: "Areal Marketing Team",
    tags: ["Marketing", "Branding", "Design"],
  },
  // Add more announcements as needed
];

// Helper function to get an announcement by ID
export function getAnnouncementById(id: string): Announcement | undefined {
  return announcements.find((announcement) => announcement.id === id);
}

// Helper function to get all announcements
export function getAllAnnouncements(): Announcement[] {
  return announcements;
}

// Helper function to get announcements by category
export function getAnnouncementsByCategory(category: string): Announcement[] {
  if (category === "All") return announcements;
  return announcements.filter(
    (announcement) => announcement.category === category
  );
}

// Helper function to get related announcements
export function getRelatedAnnouncements(
  currentAnnouncementId: string,
  limit: number = 3
): Announcement[] {
  const currentAnnouncement = getAnnouncementById(currentAnnouncementId);
  if (!currentAnnouncement) return [];

  return announcements
    .filter(
      (announcement) =>
        announcement.id !== currentAnnouncementId &&
        announcement.category === currentAnnouncement.category
    )
    .slice(0, limit);
}
