import '../styles/globals.css'
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from "@/components/SearchBar";

export const metadata = {
    title: 'ShowTrackr',
    description: 'ShowTrackr',
  }


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
              width={200} 
              height={180}
            />
          </Link>

          <SearchBar /> 
        </header>
          
          {children}
        </body>
      </html>
    );
  }