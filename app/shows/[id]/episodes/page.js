import Image from "next/image";

export default async function Episodes( {params} ){
    const {id} = await params;

    const res = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`);
    const data = await res.json();
    
    const seasonGrouped = data.reduce((acc, episode) => {
        const season = episode.season;
        //ako jos ne postoji niz za odredenu sezonu, prvo stvori prazan niz za tu sezonu pa onda dodaj epizode
        if(!acc[season]){
            acc[season] = [];
        }
         //ako postoji niz za tu sezonu, dodaj epizodu u niz te sezone
        acc[season].push(episode);
        return acc;
    }, {});

    return(
        <main>
            <div className="flex flex-row justify-start flex-wrap">
                {
                    Object.entries(seasonGrouped).map(([key, value]) => (
                        <div key={key} className="flex flex-col gap-10">
                           <h2 className="text-2xl font-bold ml-14 mr-14"> Season {key}</h2>
                           <div className="flex flex-row flex-wrap gap-6 ml-14 mr-14 mb-16 justify-start">
                                {value.map(episode => (
                                    <div key={episode.id} >
                                        <Image 
                                            src={episode.image.medium}
                                            alt={`${episode.name} image`}
                                            width={250}
                                            height={220}
                                        />
                                        <p>season {episode.season}, episode {episode.number}</p>
                                    </div>
                                ))}
                           </div>
                            
                        </div>
                    ))
                }

            </div>
        </main>
    )
}