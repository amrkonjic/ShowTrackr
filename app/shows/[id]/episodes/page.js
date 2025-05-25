/**
  This component displays a list of all episodes for a given TV show, grouped by season. It fetches episodes using the show's ID from the TVMaze 
  API, organizes them by season using `reduce`, and then renders each season with its corresponding episodes as clickable links. Each episode 
  includes an image and basic info like season and episode number.*/
import Image from "next/image";
import Link from "next/link";

export default async function Episodes( {params} ){
    const {id} = await params;      // extract the show ID from route parameters

    const res = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`);
    const data = await res.json();
    // group episodes by season using a reducer
    const seasonGrouped = data.reduce((acc, episode) => {
        const season = episode.season;
        // if this season doesn't exist in the accumulator yet, create a new array for it
        if(!acc[season]){
            acc[season] = [];
        }
         // if there is a array of series for that season, add the episode to that season's array
        acc[season].push(episode);
        return acc;
    }, {});         // initial value is an empty object

    return(
        <main>
            <div className="flex flex-row justify-start flex-wrap">
                {   // Object.entries() is used to iterate over the seasons object, because reduce returns an object and map() works only with arrays(does not work with objects) 
                    Object.entries(seasonGrouped).map(([key, value]) => (
                        <div key={key} className="flex flex-col gap-10">
                           <h2 className="text-2xl font-bold ml-14 mr-14"> Season {key}</h2>
                           <div className="flex flex-row flex-wrap gap-6 ml-14 mr-14 mb-16 justify-start">
                                {value.map(episode => (
                                    <Link key={episode.id} href={`/shows/${id}/episodes/${episode.id}`}>
                                        <Image 
                                            src={episode.image.medium}
                                            alt={`${episode.name} image`}
                                            width={250}
                                            height={220}
                                        />
                                        <p>season {episode.season}, episode {episode.number}</p>
                                    </Link>
                                ))}
                           </div>
                            
                        </div>
                    ))
                }

            </div>
        </main>
    )
}