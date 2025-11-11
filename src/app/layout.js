// RootLayout.jsx or RootLayout.js
import Head from 'next/head';
import './globals.css';
import AuthProvider from '@/components/AuthProvider';
import Providers from '@/redux/Providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Golden Ghaf',
  description: 'Ecommerce Website for goodies',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Preload the LCP video */}
        <link
          rel="preload"
          as="video"
          href="https://sahara-theme.myshopify.com/cdn/shop/videos/c/vp/58b76d3b993a49dda787c082767e6ecf/58b76d3b993a49dda787c082767e6ecf.HD-1080p-4.8Mbps-12867843.mp4?v=0"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fanwood+Text:wght@400;700&display=swap"
        />
      </Head>
      <body className="overflow-x-hidden font-fanwood-text">
        <AuthProvider>
          <Providers>
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
