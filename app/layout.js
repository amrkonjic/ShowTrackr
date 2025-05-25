// Root layout component for the entire application. Includes global styles, header with logo and search bar, and defines site-wide metadata.

import '../styles/globals.css'
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from "@/components/SearchBar";

export const metadata = {
  title: 'ShowTrackr | Discover and Track TV Shows',
  description: 'Easily search, discover, and keep track of your favorite TV shows with ShowTrackr.',
  openGraph: {
    title: 'ShowTrackr | Discover and Track TV Shows',
    description: 'Browse top-rated series and never miss a show again. ShowTrackr helps you stay up to date with your watchlist.',
    url: 'https://localhost:3000',
    siteName: 'ShowTrackr',
    images: [
      {
        width: 1200,
        height: 630,
        alt: 'ShowTrackr website preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShowTrackr | Discover and Track TV Shows',
    description: 'Follow your favorite series and explore new ones with ShowTrackr.',
  },
};


export default function RootLayout({ children }) {
    return (
      <html lang="hr">
        <body className='bg-gradient-to-b from-gray-800 to-black text-white m-0 p-0 min-h-screen'>
        <header className="bg-indigo-950 flex flex-row items-center justify-between h-24 w-full border-b-2 border-indigo-500 mb-4">
          <Link href={"/"}>
            <Image 
              className="my-2"
              src="/logo.png" 
              alt="logo" 
              width={180} 
              height={160}
              priority
            />
          </Link>

          <SearchBar /> 
        </header>
          
          {children}
        </body>
      </html>
    );
  }