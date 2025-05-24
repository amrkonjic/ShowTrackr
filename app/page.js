import Image from 'next/image';
import Link from 'next/link';
import LoadMoreShows from '@/components/LoadMoreShows';

export default async function Home() {
  const res = await fetch('https://api.tvmaze.com/shows?page=0');
  const data = await res.json();
  const shows = data
    .filter(show => show.rating.average >= 8)
    .sort((a, b) => b.rating.average - a.rating.average)
    .slice(0, 10);

  return (
    <main className="flex flex-col items-center gap-2">
      <h1 className="text-5xl font-bold m-10 text-indigo-100 text-shadow-lg/30 text-shadow-indigo-900 p-4 rounded-lg">ShowTrackr</h1>
      <h2 className="text-2xl pb-10 text-indigo-100 mx-10">
        Binge smarter, not harder — track your favorite shows in one place!
      </h2>

      <button className="bg-indigo-800 border-2 border-indigo-500 text-indigo-100 px-6 py-2 mb-20 rounded-md hover:bg-indigo-700 transition-colors">
        <a href="#explore-more">Explore</a>
      </button>

      <div>
        <h3 className="text-3xl border-b-2 font-bold p-4 text-indigo-100">Popular series🔥</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 mx-auto p-10 gap-16 pb-10 min-h-screen bg-slate-700">
          {shows.map(show => (
            <div
              key={show.id}
              className="w-full sm:w-[220px] bg-indigo-950 p-4 border-solid border-indigo-500 border-2 rounded-md shadow-md shadow-indigo-500/50 flex flex-col items-center gap-2 transition-all duration-300 transform scale-100 hover:scale-105 hover:shadow-lg"
            >
              <Image
                src={show.image.medium}
                alt={`${show.name} image`}
                width={150}
                height={220}
              />
              <Link href={`/shows/${show.id}`} className="hover:text-indigo-500">
                {show.name}
              </Link>
              <p>{show.rating.average}⭐</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-2 mt-20">
        <LoadMoreShows />
      </div>
    </main>
  );
}