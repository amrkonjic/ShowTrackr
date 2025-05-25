/* This component displays a data for single episode of selected tv show */

import Image from "next/image";
import { notFound } from "next/navigation";

export default async function SingleEpisode( {params} ) {
    const {episodeId} = await params;

    const res = await fetch(`https://api.tvmaze.com/episodes/${episodeId}`);
    if (!res.ok) {
        notFound(); 
    }
    const data = await res.json();

    const stripHtml = (html) => html?.replace(/<[^>]+>/g, '');

    return(
        <main className="flex flex-col md:flex-row items-center justify-center w-full p-4 min-h-screen max-w-7xl mx-auto">
                <Image className="w-full max-w-[500px] h-auto object-cover m-4"
                    src={data.image?.original || "/empty.png"}
                    alt={`${data.name} image`}
                    width={500}
                    height={300}
                    priority={true}
                />
                
            <div className="m-10 gap-8 flex flex-col content-between">
                <h2 className="text-bold">Name of episode: {data.name}</h2>
                <p>Season {data.season}, episode {data.number}</p>
                <p>Rate: {data.rating?.average ? `${data.rating.average} ⭐` : "no rating available" }</p>
                <p>Runtime: {data.runtime} min</p>
                <p>Summary: {stripHtml(data.summary)}</p>
            </div>
            
        </main>
    )
}