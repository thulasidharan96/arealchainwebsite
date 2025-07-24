import type { ReactNode } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { BlobAnimation } from "./ui/BlobAnimation";
import { Toaster } from "sonner";
import Chatbot from "./Chatbot";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900/80">
      <Navbar />
      <BlobAnimation />
      <main>
        {children}
        <Toaster richColors position="top-right" />
        {/* <Chatbot
          clientId="6fd615ce-6d26-47a2-8030-349d4b92422f"
          composerPlaceholder="Ask me about ArealChain..."
          botName="ArealChain AI"
          botDescription="Your personal ArealChain assistant"
        /> */}
      </main>
      <Footer />
    </div>
  );
}
