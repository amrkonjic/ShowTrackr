/**
  This component displays the cast (actors and their characters) for a given TV show. It fetches both the cast data and the show data (used for the
  hero banner image). Each cast member is displayed with an image, character name, and actor name (as a link to their details page). */
import Image from "next/image";
import Link from "next/link";


export default async function Cast( {params} ) {
    const {id} = await params;

    // information about actors who starred in a particular series
    const resCast = await fetch(`https://api.tvmaze.com/shows/${id}/cast`);
    const dataCast = await resCast.json();
    // data about the series used to display the image in the hero section
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const data = await res.json();

    return(
        <div className="flex flex-col min-h-screen w-full items-center gap-6">
            <div className="w-full h-[400px] relative mx-auto">
                <Image
                    src={data.image?.original}
                    alt={`${data.name} banner`}
                    fill
                    className="object-cover brightness-50 "
                    priority={true}
                />
                <div className="absolute inset-0 bg-black/50" />
            </div>
            <h2 className="font-bold text-3xl pt-6 pb-12">Cast</h2>
                 
            
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
                {dataCast.map(actor => (
                    <div key={actor.character.id} className="flex items-center gap-4 w-full border-b pb-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                        <Image 
                            src={actor.character.image?.medium || "/actor.png"}
                            alt={`${actor.character.name} image`}
                            width={100}
                            height={100}
                            className="rounded-full object-cover w-[100px] h-[100px] transform transition-transform duration-300 hover:scale-110"
                        />
                        <div className="flex flex-col justify-center">
                            <p className="font-bold">{actor.character.name}</p>
                            <Link 
                                href={`/shows/${id}/cast/${actor.person.id}`}
                                className="text-blue-400 transition-colors duration-300 hover:text-violet-500"
                                >
                                {actor.person.name}
                            </Link>
                        </div>
                        
                    </div>
                ))}
            </div>
                
        </div>

    )
}