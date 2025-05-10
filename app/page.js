import Image from "next/image";
import Link from "next/link";

export default async function Home(){

    const res = await fetch("https://api.tvmaze.com/shows");
    const data = await res.json();
    const shows = data
            .filter(show => show.rating.average >= 8)
            .sort((a,b) => b.rating.average - a.rating.average )
            .slice(0,20)


    return(
        <main className="flex flex-col items-center gap-2">
            <h1 className="text-5xl font-bold m-10">ShowTrackr</h1>
            <h2 className="text-2xl pb-10">Binge smarter, not harder — track your favorite shows in one place!</h2>

            <div>
                <h3 className="text-2xl font-bold p-4">Popular series🔥</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 mx-auto max-w-[1200px] gap-16">
                {shows.map(show => (
                    <div key={show.id} className="w-full sm:w-[220px] bg-indigo-950 p-4 border-solid border-white border-2 rounded-md shadow-md shadow-indigo-500/50 flex flex-col items-center gap-2">
                        <Image 
                            src={show.image.medium}
                            alt={`${show.name} image`}
                            width={150}
                            height={220}
                        />
                        <Link href={`/shows/${show.id}`}>{show.name}</Link>
                        <p>{show.rating.average}⭐</p>
                        
                    </div>
                ))}
                </div>
            </div>
            
            
        </main>
    )
}