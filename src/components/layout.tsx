import type { ReactNode } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { BlobAnimation } from "./ui/BlobAnimation";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <BlobAnimation />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
