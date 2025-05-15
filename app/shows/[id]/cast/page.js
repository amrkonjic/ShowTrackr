import Image from "next/image";
import Link from "next/link";


export default async function Cast( {params} ) {
    const {id} = await params;

    // podaci o glumcima koji su glumili u određenoj seriji
    const resCast = await fetch(`https://api.tvmaze.com/shows/${id}/cast`);
    const dataCast = await resCast.json();
    // podaci o seriji koji sluze za prikaz slike u hero sekciji
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const data = await res.json();

    return(

        <div className="flex flex-col min-h-screen w-full items-center gap-6">
            <h2 className="font-bold text-xl">Cast</h2>
            <div className="w-full h-[400px] relative mx-auto">
                <Image
                    src={data.image?.original}
                    alt={`${data.name} banner`}
                    fill
                    className="object-cover brightness-50 "
                    priority
                />
                <div className="absolute inset-0 bg-black/50" />
            </div>
                 
            
            <div className="grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
                {dataCast.map(actor => (
                    <div key={actor.character.id} className="flex items-center gap-4 w-full border-b pb-3">
                        <Image 
                            src={actor.character.image?.medium || "/actor.png"}
                            alt={`${actor.character.name} image`}
                            width={100}
                            height={100}
                            className="rounded-full object-cover w-[100px] h-[100px]"
                        />
                        <div className="flex flex-col justify-center">
                            <p className="font-bold">{actor.character.name}</p>
                            <Link href={`/shows/${id}/cast/${actor.person.id}`}>{actor.person.name}</Link>
                        </div>
                        
                    </div>
                ))}
            </div>
                
            </div>

    )
}