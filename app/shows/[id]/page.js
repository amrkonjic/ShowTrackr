import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";
import { notFound } from "next/navigation";

export default async function SeriesDetails({ params }){
    const {id} = await params;

    // fetching series data
    const showFetch = fetch(`https://api.tvmaze.com/shows/${id}`);
    // fetching favorites
    const favFetch = fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/favorites`, {
        cache: "no-store"
      });

    // waiting for both of requests
    const [showRes, favRes] = await Promise.all([showFetch, favFetch]);

    const data = await showRes.json();
    const { favorites } = await favRes.json();
    const saved = favorites.includes(data.name);

    // function that removes tags from fetched html content
    const stripHtml = (html) => html.replace(/<[^>]+>/g, '');

    return(
        <main className="flex flex-col items-center">
            <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-6">
                <Image className="w-full max-w-[300px] h-auto object-cover m-4 sm:max-w-[200px] md:max-w-[300px]"
                    src={data.image.original}
                    alt={`${data.name} image`}
                    width={300}
                    height={500}
                    priority={true}
                />
                <div className="m-10 gap-14 flex flex-col content-between">
                    <p>Rating: {data.rating.average} ⭐</p>
                    <p>Language: {data.language}</p>
                    <p>Genres: {data.genres.join(", ")}</p>
                    <p>Summary: {stripHtml(data.summary)}</p>
                    {data.officialSite && <Link href={`${data.officialSite}`}>Check the offical site: {data.officialSite}</Link>}
                </div>
                <FavoriteButton name={data.name} initialSaved={saved} image={data.image.original} rating={data.rating.average} id={data.id}/>
            </div>

        </main>
    )
}