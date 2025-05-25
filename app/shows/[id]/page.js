/**
  This component displays detailed information about a TV series. It fetches show data from the TVMaze API and the user's favorite list from a local API.
 It checks if the current show is already saved as a favorite and passes that info to the FavoriteButton component. The show details (image, rating, genres, summary, etc.)
 are then rendered along with a button to add or remove the show from favorites.*/

import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";


export default async function SeriesDetails({ params }){
    const {id} = await params;      // destructurize dynamic paramter id from parameter params who comes from next.js dynamic route (from structure of directories)

    // fetching series data from tvmaze API and using dynamic paramter for specific tv show
    const showFetch = fetch(`https://api.tvmaze.com/shows/${id}`);
    // fetching favorites from internal API route and using enviroment variable because in production version localhost:300/api/favorites is not correct location so it is used env variable that which then adapts depending on where the code is run
    const favFetch = fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/favorites`, {
        cache: "no-store"       // user can frequently change list of favorites so it must not be cached because we want to always have the latest data
      });

    // waiting for both of requests at the same time (Promise.all reduces waiting time)
    const [showRes, favRes] = await Promise.all([showFetch, favFetch]);

    // data processing, the .json() method reads the response and converts it into a JavaScript object
    const data = await showRes.json();
    const { favorites } = await favRes.json();
    const saved = favorites.some(fav => fav.name === data.name);        // comparing the name of the current series with the names of all series in the favorites array and if any of series in array has the same name, return true

    // function that removes tags from fetched html content
    const stripHtml = (html) => html.replace(/<[^>]+>/g, '');

    return(
        <main className="flex flex-col items-center">
            <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-6">
                <Image className="w-full max-w-[300px] h-auto object-cover m-4 sm:max-w-[200px] md:max-w-[300px]"
                    src={data.image?.original || "/empty.png"}
                    alt={`${data.name} image`}
                    width={300}
                    height={500}
                    priority
                />
                <div className="m-10 gap-14 flex flex-col content-between">
                    <p>Rating: {data.rating?.average ? `${data.rating.average} ⭐` : "no rating available" }</p>
                    <p>Language: {data.language}</p>
                    <p>Genres: {data.genres.join(", ")}</p>
                    <p>Summary: {stripHtml(data.summary)}</p>
                    {data.officialSite && <Link href={`${data.officialSite}`} className="hover:text-violet-500">Check the offical site: {data.officialSite}</Link>}                
                    <FavoriteButton name={data.name} initialSaved={saved} image={data.image?.original || "/empty.png"} rating={data.rating.average} id={data.id}/>
                </div>
            </div>

        </main>
    )
}