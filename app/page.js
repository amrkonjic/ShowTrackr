/* This is home page of application. It is designed as server-side component so majority of content (title, and section with popular series) is
 renered on server and part that is in charge of infinite scroll is implemented as specific component LoadMoreShows (client-side). */

export const metadata = {
  title: 'ShowTrackr | Track Your Favorite Series',
  description: 'Stay up to date with the most popular TV shows! Discover top-rated series and enjoy infinite scrolling for endless entertainment.',
  openGraph: {
    title: 'ShowTrackr | Track Your Favorite Series',
    description: 'Explore highly-rated TV shows with ShowTrackr. Never miss an episode of your favorite series again.',
    url: 'https://localhost:3000', 
    siteName: 'ShowTrackr',
    images: [
      {
        width: 1200,
        height: 630,
        alt: 'ShowTrackr homepage preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShowTrackr | Track Your Favorite Series',
    description: 'Discover and follow the most popular TV shows — all in one place!',
  },
};


import Image from 'next/image';
import Link from 'next/link';
import LoadMoreShows from '@/components/LoadMoreShows';


export default async function Home() {
  const res = await fetch('https://api.tvmaze.com/shows?page=0');       //fetch data from extern API
  const data = await res.json();                            
  const shows = data                                                    // filter data by average rate and sort them from higher rated to lower rated
    .filter(show => show.rating.average >= 8)
    .sort((a, b) => b.rating.average - a.rating.average)
    .slice(0, 10);                          // take 10 best rated 

  return (
    <main className="flex flex-col items-center gap-2">
      <h1 className="text-5xl font-bold m-10 text-indigo-100 text-shadow-lg/30 text-shadow-indigo-900 p-4 rounded-lg">ShowTrackr</h1>
      <h2 className="text-2xl pb-10 text-center text-indigo-100 mx-10">
        Binge smarter, not harder — track your favorite shows in one place!
      </h2>

      <button className="bg-indigo-800 border-2 border-indigo-500 text-indigo-100 font-bold px-8 py-4 mb-20 rounded-md hover:bg-indigo-700 transition-colors">
        <a href="#explore-more">Explore</a>
      </button>

      <div className='bg-indigo-400/25 rounded-md w-[90%] sm:w-2/3 md:w-1/2 lg:w-1/3 p-6 sm:p-8 flex flex-col justify-center items-center gap-4'>
        <h3 className="text-xl text-indigo-200 text-center mx-10 mt-10 text-wrap">Step into a world where every story begins with a click. Log in and let the screen come alive.</h3>
      
        <div className='flex flex-col sm:flex-row items-center justify-center gap-8 w-full my-6'>
          <button className="bg-violet-800 border-2 border-indigo-500 text-indigo-100 font-bold px-8 py-4 rounded-md hover:bg-indigo-700 transition-colors">
            <a href='/register/'>Register</a>
          </button> 
          <button className="bg-violet-800 border-2 border-indigo-500 text-indigo-100 font-bold px-8 py-4 rounded-md hover:bg-indigo-700 transition-colors">
            <a href='/login'>Login</a>
          </button>        
        </div>
      </div>
      

      <div>
        <h2 className="text-2xl border-b-2 font-bold p-4 text-indigo-100">Popular series🔥</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 mx-auto p-10 gap-16 pb-10 min-h-screen bg-slate-700">
          {shows.map(show => (
            <Link href={`/shows/${show.id}`}
              key={show.id}
              className="w-full sm:w-[220px] bg-indigo-950 p-4 border-solid border-indigo-500 border-2 rounded-md shadow-md shadow-indigo-500/50 flex flex-col items-center gap-2 transition-all duration-300 transform scale-100 hover:scale-105 hover:shadow-lg"
            >
              <Image
                src={show.image.medium}
                alt={`${show.name} image`}
                width={150}
                height={220}
              />
              <p className="hover:text-indigo-500">
                {show.name}
              </p>
              <p>{show.rating.average}⭐</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-2 mt-20">
        <LoadMoreShows />
      </div>
    </main>
  );
}