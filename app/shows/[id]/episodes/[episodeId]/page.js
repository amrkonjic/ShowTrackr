import Image from "next/image";

export default async function SingleEpisode( {params} ) {
    const {episodeId} = await params;

    const res = await fetch(`https://api.tvmaze.com/episodes/${episodeId}`);
    const data = await res.json();

    return(
        <main className="flex flex-row content-center">
            <Image className="m-10"
                src={data.image.original}
                alt={`${data.name} image`}
                width={500}
                height={300}
                priority={true}
                />
            <div className="m-10 gap-8 flex flex-col content-between">
                <h2 className="text-bold">Name of episode: {data.name}</h2>
                <p>Season {data.season}, episode {data.number}</p>
                <p>Rate: {data.rating.average} ⭐</p>
                <p>Runtime: {data.runtime} min</p>
                <p>Summary: {data.summary}</p>
            </div>
            
        </main>
    )
}