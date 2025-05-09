import Image from "next/image";

export default async function Home(){

    const res = await fetch("https://api.tvmaze.com/shows");
    const shows = await res.json();
    

    return(
        <main className="flex flex-col items-center">
            <h1>ShowTrackr</h1>
            <h2 className="bg-red-500 text-white p-4">Binge smarter, not harder — track your favorite shows in one place</h2>

            <div className="flex flex-wrap justify-center">
                {shows.map(show => (
                    <div key={show.id} className="w-full sm:w-[230px] bg-blue">
                        <Image 
                            src={show.image.medium}
                            alt={`${show.name} image`}
                            width={150}
                            height={220}
                        />
                        <p>{show.name}</p>
                        <p>{show.rating.average}</p>
                        
                    </div>
                ))}
            </div>
            
        </main>
    )
}