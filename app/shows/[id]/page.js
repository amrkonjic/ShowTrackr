import Image from "next/image";
import Link from "next/link";

export default async function SeriesDetails({ params }){
    const {id} = await params;

    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
    if (!res.ok) {
        throw new Error('Failed to fetch show details');
    }
    const data = await res.json();
    

    return(
        <main className="flex flex-col items-center">
            <h1 className="text-2xl font-bold p-10">{data.name}</h1>
            <div className="flex flex-row content-center">
                <Image className="m-10"
                    src={data.image.original}
                    alt={`${data.name} image`}
                    width={300}
                    height={500}
                />
                <div className="m-10 gap-14 flex flex-col content-between">
                    <p>Rating: {data.rating.average} ⭐</p>
                    <p>Language: {data.language}</p>
                    <p>Genres: {data.genres}</p>
                    <p>Summary: {data.summary}</p>
                    {data.officialSite && <Link href={`${data.officialSite}`}>Check the offical site: {data.officialSite}</Link>}
                </div>
            </div>
            
            
        </main>
    )
}