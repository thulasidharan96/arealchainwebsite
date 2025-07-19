import Layout from "@/src/components/layout";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { Search, ChevronDown, MessageCircle, Mail, Phone } from "lucide-react";
import { faq_Data } from "@/src/data/faq_data";
import dynamic from "next/dynamic";

const SplineFaq = dynamic(() => import("@/src/components/SplineFaq"), {
  ssr: false,
});

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const faqCategories = [
    { id: "all", label: "All Questions", count: 10 },
    { id: "general", label: "General", count: 3 },
    { id: "blockchain", label: "Blockchain & Technology", count: 2 },
    { id: "investment", label: "Investment", count: 3 },
    { id: "platform", label: "Platform Usage", count: 2 },
  ];

  const faqData = faq_Data;

  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <Layout>
      <div className="relative z-0 bg-black">
        <SplineFaq />
        <div className="relative z-10">
          <div className="min-h-screen bg-transparent">
            {/* Hero Section */}
            <motion.section
              className="py-20 px-4"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <div className="max-w-4xl mx-auto text-center">
                <motion.h1
                  className="text-5xl font-bold text-white mb-6"
                  variants={fadeInUp}
                >
                  Frequently Asked Questions
                </motion.h1>
                <motion.p
                  className="text-xl text-gray-400 mb-8"
                  variants={fadeInUp}
                >
                  Before You Ask, We've Tokenized the Answer.
                </motion.p>

                {/* Search Bar */}
                <motion.div
                  className="relative max-w-2xl mx-auto mb-8 backdrop-blur-3xl"
                  variants={fadeInUp}
                >
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for answers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#F4B448] focus:ring-2 focus:ring-[#F4B448]/20"
                  />
                </motion.div>
              </div>
            </motion.section>

            {/* Category Filter */}
            <motion.section
              className="px-4 mb-12"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <div className="max-w-6xl mx-auto">
                <motion.div
                  className="flex flex-wrap justify-center gap-4"
                  variants={fadeInUp}
                >
                  {faqCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-6 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-3xl ${
                        selectedCategory === category.id
                          ? "bg-[#F4B448] text-black"
                          : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white"
                      }`}
                    >
                      {category.label}
                      <span className="ml-2 text-sm opacity-75">
                        ({category.count})
                      </span>
                    </button>
                  ))}
                </motion.div>
              </div>
            </motion.section>

            {/* FAQ Content */}
            <motion.section
              className="px-4 pb-20"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <div className="max-w-4xl mx-auto">
                {filteredFAQs.length > 0 ? (
                  <motion.div variants={fadeInUp}>
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full space-y-4"
                    >
                      {filteredFAQs.map((item, i) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                          <AccordionItem
                            value={`item-${item.id}`}
                            className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700 data-[state=open]:border-[#F4B448]/50 data-[state=open]:bg-gray-800/70 transition-all duration-300"
                          >
                            <AccordionTrigger className="p-6 text-left font-semibold text-white hover:no-underline hover:text-[#F4B448] transition-colors group">
                              <div className="flex items-center justify-between w-full">
                                <span className="text-lg">{item.question}</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-6">
                              <div className="text-gray-300 leading-relaxed text-base">
                                {item.answer}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </motion.div>
                      ))}
                    </Accordion>
                  </motion.div>
                ) : (
                  <motion.div className="text-center py-16" variants={fadeInUp}>
                    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      No results found
                    </h3>
                    <p className="text-gray-400">
                      Try adjusting your search terms or browse different
                      categories.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.section>

            {/* Contact Support Section */}
            {/* <motion.section
          className="py-20 px-4 bg-gray-900/50"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-3xl font-bold text-white mb-6"
              variants={fadeInUp}
            >
              Still Have Questions?
            </motion.h2>
            <motion.p className="text-gray-400 mb-12" variants={fadeInUp}>
              Our support team is here to help you navigate the future of real
              estate investment.
            </motion.p>

            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={staggerContainer}
            >
              {[
                {
                  icon: MessageCircle,
                  title: "Live Chat",
                  description: "Get instant answers from our support team",
                  action: "Start Chat",
                  color: "bg-blue-600 hover:bg-blue-700",
                },
                {
                  icon: Mail,
                  title: "Email Support",
                  description: "Send us detailed questions anytime",
                  action: "Send Email",
                  color: "bg-green-600 hover:bg-green-700",
                },
                {
                  icon: Phone,
                  title: "Phone Support",
                  description: "Speak directly with our experts",
                  action: "Call Now",
                  color: "bg-purple-600 hover:bg-purple-700",
                },
              ].map((contact, i) => (
                <motion.div
                  key={i}
                  className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-[#F4B448]/50 transition-all duration-300 group cursor-pointer"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className={`w-16 h-16 ${contact.color} rounded-full flex items-center justify-center mx-auto mb-6 transition-colors`}
                  >
                    <contact.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#F4B448] transition-colors">
                    {contact.title}
                  </h3>
                  <p className="text-gray-400 mb-6">{contact.description}</p>
                  <button className="bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold px-6 py-3 rounded-lg transition-colors">
                    {contact.action}
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section> */}

            {/* Quick Links Section */}
            {/* <motion.section
          className="py-16 px-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div className="text-center mb-12" variants={fadeInUp}>
              <h2 className="text-2xl font-bold text-white mb-4">
                Explore More
              </h2>
              <p className="text-gray-400">
                Learn more about AREAL and start your investment journey
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-4 gap-6"
              variants={staggerContainer}
            >
              {[
                {
                  title: "Getting Started",
                  description: "Learn how to begin investing",
                  href: "/getting-started",
                  color: "border-blue-500/50 hover:border-blue-500",
                },
                {
                  title: "Areal Suite",
                  description: "Explore our ecosystem",
                  href: "/areal-suite",
                  color: "border-green-500/50 hover:border-green-500",
                },
                {
                  title: "Properties",
                  description: "Browse investment opportunities",
                  href: "/properties",
                  color: "border-purple-500/50 hover:border-purple-500",
                },
                {
                  title: "Contact Us",
                  description: "Get in touch with our team",
                  href: "/contact",
                  color: "border-[#F4B448]/50 hover:border-[#F4B448]",
                },
              ].map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  className={`block p-6 bg-gray-800/30 rounded-xl border-2 ${link.color} transition-all duration-300 hover:bg-gray-800/50 group`}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#F4B448] transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{link.description}</p>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.section> */}
          </div>
        </div>
      </div>
    </Layout>
  );
}
