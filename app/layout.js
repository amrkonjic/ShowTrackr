import '../styles/globals.css'

export const metadata = {
    title: 'ShowTrackr',
    description: 'ShowTrackr',
  }


export default function RootLayout({ children }) {
    return (
      <html lang="hr">
        <body>
          
          {children}
        </body>
      </html>
    );
  }