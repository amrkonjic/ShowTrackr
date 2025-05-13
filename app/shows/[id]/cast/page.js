import Image from "next/image";


export default async function Cast( {params} ) {
    const {id} = await params;

    const resCast = await fetch(`https://api.tvmaze.com/shows/${id}/cast`);
    const dataCast = await resCast.json();

    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const data = await res.json();

    return(

        <div className="flex flex-col min-h-screen">
            <div className="w-full h-[400px] relative mx-auto">
                <Image
                    src={data.image?.original}
                    alt={`${data.name} banner`}
                    fill
                    className="object-cover brightness-50"
                    priority
                />
                <div className="absolute inset-0 bg-black/50" />
            </div>
                 

            <div className="flex flex-col items-start gap-4 px-10">
            
            <h2 className="font-bold text-xl">Cast</h2>
            <div className="flex flex-col w-full gap-4">
                <h2>Characters:</h2>
                {dataCast.map(actor => (
                    <div key={actor.character.id} className="flex items-center gap-4 w-full border-b pb-3">
                        <Image 
                            src={actor.character.image?.medium || "/actor.png"}
                            alt={`${actor.character.name} image`}
                            width={100}
                            height={100}
                            className="rounded-full object-cover w-[100px] h-[100px]"
                        />
                        <p className="font-bold">{actor.character.name}</p>
                        <p>{actor.person.name}</p>
                    </div>
                ))}
            </div>
                
            </div>
        </div>

        
    )
}