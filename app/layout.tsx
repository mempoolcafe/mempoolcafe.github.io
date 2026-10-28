import type { Metadata } from "next";
import "./globals.css";
import { portfolioData } from "@/lib/portfolio-data";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import Footer from "@/components/footer";
import SparkleTrail from "@/components/sparkle-trail";

export const metadata: Metadata = {
  title: {
    default: portfolioData.name,
    template: `%s — ${portfolioData.name}`,
  },
  description: portfolioData.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <div className="mx-auto w-full max-w-[800px] px-4">
          <Navbar />
          {/* Sidebar comes first on desktop, but stacks below the content on mobile. */}
          <div className="mt-4 grid gap-5 md:grid-cols-[190px_1fr]">
            <main className="min-w-0 md:order-2">{children}</main>
            <div className="md:order-1">
              <Sidebar />
            </div>
          </div>
          <Footer />
        </div>
        <SparkleTrail />
      </body>
    </html>
  );
}
