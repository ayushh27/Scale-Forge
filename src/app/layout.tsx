import type { Metadata, Viewport } from 'next';
import { Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Providers } from '@/components/Providers';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ScaleForge | Scalable Engineering Documentation',
  description: 'A production-grade engineering documentation platform focused on system design and backend engineering.',
  keywords: ['system design', 'backend engineering', 'scalability', 'documentation'],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground selection:bg-primary/20 antialiased">
        <Providers>
          {/* Fixed Navbar */}
          <Navbar />

          {/* Main Content Area */}
          <div id="main-content" className="relative z-0 flex flex-col min-h-screen">
            {/* Page Content */}
            <div className="flex-1">
              {children}
            </div>

            {/* Footer */}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

