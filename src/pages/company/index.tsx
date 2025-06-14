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
  Building2,
  Users,
  Globe,
  MapPin,
  TrendingUp,
  Shield,
  Zap,
} from "lucide-react";
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

interface AdvisorMember {
  name: string;
}

const teamMembers: TeamMember[] = [
  { name: "Bart de Bruijn", role: "Managing Director & Co-Founder" },
  { name: "Ron Nath Mukherjee", role: "Managing Director Luxembourg" },
  { name: "Steve Craggs", role: "Director of Global Real Estate Distribution" },
  { name: "Graham Ade", role: "Chief Technical Officer" },
  { name: "Steve Lawrence", role: "Head of Marketing & Business Development" },
  {
    name: "Michael Gord",
    role: "Business Development & Areal United States",
  },
  { name: "Rainer Bergmann", role: "Managing Director Germany" },
  { name: "Wim Geleyn", role: "Managing Director Luxembourg" },
  { name: "Thomas Onel", role: "Co-Founder" },
  { name: "Adam Schmideg", role: "Chief Engineer" },
];

const advisors: AdvisorMember[] = [
  { name: "Brock Pierce" },
  { name: "Brian D Evans" },
  { name: "Adrian Zdunzcyk" },
  { name: "Darknight" },
  { name: "Charles Lamoulen" },
  { name: "Laurent Rouach" },
  { name: "Marco Houwen" },
  { name: "Parul Gujral" },
  { name: "Claus Skaaning" },
  { name: "Lex Schreuder" },
  { name: "Adam Blazsek" },
  { name: "Volodymyr Havrylyuk-Jensen" },
];

const stats = [
  { number: "60+", label: "Employees", icon: Users },
  { number: "2+", label: "Continents", icon: Globe },
  { number: "10+", label: "Countries", icon: MapPin },
];

const features = [
  {
    icon: Building2,
    title: "Real Estate Innovation",
    description:
      "Transforming traditional property investment through cutting-edge technology",
  },
  {
    icon: Shield,
    title: "Blockchain Security",
    description:
      "Secure, transparent transactions powered by blockchain technology",
  },
  {
    icon: TrendingUp,
    title: "Global Accessibility",
    description:
      "Making real estate investment accessible to everyone, everywhere",
  },
];

const mediaLogos = [
  { name: "Forbes", src: "/media/forbes.png" },
  { name: "Gulf Time", src: "/media/gulf-time.png" },
  { name: "Gulf News", src: "/media/gulf-news.png" },
  { name: "Gulf Today", src: "/media/gulf_today.png" },
  { name: "CNBC", src: "/media/cnbc.png" },
  { name: "CoinTelegraph", src: "/media/cointelegraph.png" },
];

export default function Company() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Hero Section */}
        <div className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-[#F4B448]/20 text-[#F4B448] border-[#F4B448]/30 hover:bg-[#F4B448]/30 transition-colors">
                <Zap className="w-4 h-4 mr-2" />
                From Vision to Reality
              </Badge>
              <h1 className="text-5xl font-bold text-white mb-6">
                About Areal
              </h1>
              <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                At the heart of Areal is a commitment to transform the real
                estate industry. Discover how we're changing the landscape of
                investing with our revolutionary approach.
              </p>
            </div>

            {/* Mission & Vision */}
            <div className="grid lg:grid-cols-2 gap-16 mb-20">
              <div className="group">
                <Card className="h-full bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-[#F4B448] rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <Building2 className="w-6 h-6 text-black" />
                      </div>
                      <h2 className="text-3xl font-bold text-white">
                        Our Mission
                      </h2>
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-[#F4B448]">
                        Revolutionizing Real Estate Through Blockchain
                      </h3>
                      <p className="text-gray-400 text-lg leading-relaxed">
                        We aim to bring the new era of real estate investing to
                        life. Breaking down barriers and providing liquidity and
                        flexibility for the new generation of property owners
                        and investors.
                      </p>
                      <p className="text-gray-400 text-lg leading-relaxed">
                        Our mission is to make real estate simple, affordable
                        and accessible to everyone, everywhere.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-8">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-6">
                  {stats.map((stat, index) => (
                    <Card
                      key={index}
                      className="bg-gray-900/50 border-gray-800 text-center hover:bg-gray-900/70 transition-all duration-300 hover:-translate-y-1 group"
                    >
                      <CardContent className="p-6">
                        <div className="flex justify-center mb-3">
                          <stat.icon className="w-8 h-8 text-[#F4B448] group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">
                          {stat.number}
                        </div>
                        <div className="text-sm text-gray-400 font-medium">
                          {stat.label}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Features */}
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <Card
                      key={index}
                      className="bg-gray-900/30 border-gray-800 hover:bg-gray-900/50 transition-all duration-300 hover:-translate-y-1 group"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-[#F4B448]/20 rounded-lg flex items-center justify-center group-hover:bg-[#F4B448]/30 group-hover:scale-110 transition-all duration-300">
                              <feature.icon className="w-5 h-5 text-[#F4B448]" />
                            </div>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-2">
                              {feature.title}
                            </h4>
                            <p className="text-gray-400 text-sm">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Recognition */}
            <div className="text-center mb-20">
              <h2 className="text-3xl font-bold text-white mb-4">
                Areal in the Limelight
              </h2>
              <div className="w-24 h-1 bg-[#F4B448] mx-auto mb-6"></div>
              <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-12">
                We've been featured in leading global and regional publications
                for our innovative approach to real estate tokenization.
              </p>
              <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-16 items-center">
                {mediaLogos.map((media) => (
                  <div
                    key={media.name}
                    className="flex justify-center items-center h-20 group"
                  >
                    <Image
                      src={media.src}
                      alt={media.name}
                      width={250}
                      height={250} // Set width and height to the same value for uniformity
                      className="w-25 h-25 object-contain transition-all duration-300 group-hover:scale-[1.05]"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Meet the Founder
                </h2>
                <div className="w-24 h-1 bg-[#F4B448] mx-auto mb-6"></div>
                <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                  Our founder is the visionary behind Areal, with a deep passion
                  for innovation and technology. Leading the company into the
                  future, they bring unparalleled expertise to the real estate
                  and tech industries.
                </p>
              </div>

              <div className="flex items-center justify-center space-x-12">
                {/* Founder Image  */}
                <div className="bg-transparent rounded-lg border border-[#F4B448] overflow-hidden group hover:scale-105 transition-all duration-300">
                  <Image
                    src="/team/founder.png" // Replace with actual image path
                    alt="Founder"
                    width={350}
                    height={350}
                    className="object-cover"
                  />
                </div>

                {/* Founder Content */}
                <div className="flex flex-col justify-center space-y-4 max-w-lg">
                  <h3 className="text-white text-2xl font-semibold">
                    Sripriya Kalyanasundaram
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Founder & CEO | Areal Chain
                  </p>
                  <ul className="text-gray-400 text-sm space-y-2">
                    <li>
                      Sripriya Kalyanasundaram is the visionary Founder and CEO
                      of Areal Chain, leading the charge in the tokenization of
                      real-world assets (RWA) and creating a borderless,
                      decentralized, permissionless economy. With over 20 years
                      of experience in technology and business strategy, she is
                      dedicated to driving digital transformation and empowering
                      individuals through blockchain technology.
                    </li>
                    <li>
                      Our Vision: To make RWA the next UPI, democratizing access
                      to tokenized assets and driving innovation in the real
                      estate space globally.
                    </li>
                    {/* <li>
                      Dedicated to creating a sustainable, tech-driven future in
                      real estate.
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>

            {/* Team Section */}
            {/* <div className="mb-20"> */}
              {/* <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Meet the Innovators
                </h2>
                <div className="w-24 h-1 bg-[#F4B448] mx-auto mb-6"></div>
                <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                  Our team brings together expertise from real estate, finance,
                  and technology sectors. Meet the people leading the Areal
                  revolution.
                </p>
              </div> */}

              {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
                {teamMembers.map((member, index) => (
                  <Card
                    key={index}
                    className="bg-gray-900/50 border-gray-800 text-center hover:bg-gray-900/70 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group"
                  >
                    <CardHeader className="pb-4">
                      <div className="w-20 h-20 bg-[#F4B448] rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-lg font-bold text-black">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <CardTitle className="text-white group-hover:text-[#F4B448] transition-colors">
                        {member.name}
                      </CardTitle>
                      <CardDescription className="text-gray-400 text-sm leading-relaxed">
                        {member.role}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div> */}

              {/* Advisory Board */}
              {/* <div className="bg-gray-900/30 rounded-xl p-8 border border-gray-800">
                <h3 className="text-2xl font-bold text-white text-center mb-8">
                  Advisory Board
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {advisors.map((advisor, index) => (
                    <Card
                      key={index}
                      className="bg-gray-800/50 border-gray-700 text-center hover:bg-gray-800/70 transition-all duration-300 hover:-translate-y-1 group"
                    >
                      <CardContent className="p-4">
                        <div className="w-12 h-12 bg-gray-600 rounded-full mx-auto mb-3 flex items-center justify-center group-hover:bg-[#F4B448] group-hover:scale-110 transition-all duration-300">
                          <span className="text-white group-hover:text-black font-bold text-sm">
                            {advisor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-300 group-hover:text-[#F4B448] transition-colors">
                          {advisor.name}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div> */}

            {/* Video Section */}
            <div className="mb-20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Promotional Videos
                </h2>
                <div className="w-24 h-1 bg-[#F4B448] mx-auto mb-6"></div>
                <p className="text-gray-400 text-lg">
                  Learn more about our platform with our informative videos
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="aspect-video rounded-xl overflow-hidden border-2 border-[#F4B448]/30 shadow-[0_0_25px_#F4B44833]">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/wu5bA6-weUk?autoplay=1&mute=1&loop=1&playlist=wu5bA6-weUk&controls=0&modestbranding=1&showinfo=0&rel=0"
                    title="Introducing the identity behind the innovation."
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-900/50 rounded-xl p-12 border border-gray-800 hover:bg-gray-900/70 transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Join Our Journey
                </h2>
                <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                  Be part of the revolution that's transforming real estate
                  investment. Together, we're building a more accessible and
                  transparent future.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    Join Our Team
                  </button>
                  <button className="border border-[#F4B448] text-[#F4B448] hover:bg-[#F4B448] hover:text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    Partner With Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
