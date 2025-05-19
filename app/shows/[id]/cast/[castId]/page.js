import Image from "next/image";

export default async function Actor( {params} ){
    const {castId} = await params;
    const res = await fetch(`https://api.tvmaze.com/people/${castId}?embed=castcredits`);
    const data = await res.json();


    return(
        <main className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start">
            <Image className="m-10"
                src={data.image?.medium || "/actor.png"} 
                alt={`${data.name} image`}
                width={300}
                height={100}
                priority={true}
                />

            <div className="m-10 gap-8 flex flex-col content-between bg-indigo-950 p-4 border-solid border-white border-2 rounded-md shadow-md shadow-indigo-500/50">
                <h2 className="font-bold">{data.name}</h2>
                <p>Gender: {data.gender}</p>
                <p>Country: {data.country?.name}</p>
                <p>Birthday: {new Date(data.birthday).toLocaleDateString("hr-HR")}</p>
                {data.deathday && <p>Deathday: {new Date(data.deathday).toLocaleDateString("hr-HR")}</p>}
                
            </div>
            <div className="flex flex-col items-center gap-6 mt-8 bg-indigo-950 p-4 border-solid border-white border-2 rounded-md shadow-md shadow-indigo-500/50">
                Shows:{data._embedded.castcredits.map(castcredit => (
                    <div key={castcredit._links.show.name} className="flex flex-col gap-2 w-full items-center bg-violet-950 p-4 rounded-md border-b shadow-md shadow-indigo-100/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ">
                        <p>Character: {castcredit._links.character.name}</p>
                        <p>Show: {castcredit._links.show.name}</p>
                    </div>
                ))}</div>
        </main>
    )
}

