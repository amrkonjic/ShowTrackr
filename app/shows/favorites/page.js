import Image from "next/image";
import Link from "next/link";

export default async function Favorites(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/favorites`);
    const data = await res.json();

    return(
        <main className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold p-4">Your favorite series</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 mx-auto max-w-[1200px] gap-16">
            {data.favorites.map(show => (
                <div key={show.id} className="w-full sm:w-[220px] bg-indigo-950 p-4 mt-10 border-solid border-white border-2 rounded-md shadow-md shadow-indigo-500/50 flex flex-col items-center gap-2 transition-all duration-300 transform scale-100 hover:scale-105 hover:shadow-lg">
                    <Image 
                        src={show.image}
                        alt={`${show.name} image`}
                        width={150}
                        height={220}
                    />
                    <Link href={`/shows/${show.id}`}>{show.name}</Link>
                    <p>{show.rating}⭐</p>
                </div>
            ))}
            </div>
        </main>
    )
}