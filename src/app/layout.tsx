import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import Sidebar from '@/components/Sidebar';
import layoutStyles from './layout.module.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AB Blogs',
  description: 'A Next.js blogging platform deployed on Vercel.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="container">
            <header className={layoutStyles.sidebarWrapper}>
              <Sidebar />
            </header>
            <main className={layoutStyles.mainContent}>
              {children}
            </main>
            <aside className={layoutStyles.rightSidebar}>
              {/* Right Sidebar for trends, search etc. */}
              <div className={layoutStyles.trendingBox}>
                <h2>What's happening</h2>
                <div className={layoutStyles.trendItem}>
                  <p className={layoutStyles.trendCategory}>Technology · Trending</p>
                  <p className={layoutStyles.trendTitle}>Next.js</p>
                  <p className={layoutStyles.trendPosts}>102K posts</p>
                </div>
                <div className={layoutStyles.trendItem}>
                  <p className={layoutStyles.trendCategory}>Entertainment · Trending</p>
                  <p className={layoutStyles.trendTitle}>Liquid Glass CSS</p>
                  <p className={layoutStyles.trendPosts}>45K posts</p>
                </div>
              </div>
            </aside>
          </div>
        </Providers>
      </body>
    </html>
  );
}
