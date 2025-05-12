import '../styles/globals.css'

export const metadata = {
    title: 'ShowTrackr',
    description: 'ShowTrackr',
  }


export default function RootLayout({ children }) {
    return (
      <html lang="hr">
        <body className='bg-gradient-to-b from-gray-800 to-black text-white min-h min-h-screen'>
          
          {children}
        </body>
      </html>
    );
  }