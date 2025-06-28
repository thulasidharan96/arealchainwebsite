import type { ReactNode } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { BlobAnimation } from "./ui/BlobAnimation";
import { Toaster } from "sonner";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <BlobAnimation />
      <main>
        {children}
        <Toaster richColors position="top-right" />
      </main>
      <Footer />
    </div>
  );
}
