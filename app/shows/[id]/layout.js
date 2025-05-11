
import Image from "next/image";
import Link from "next/link";

export default async function ShowsLayout({ children, params }) {
    const {id} = await params;

    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
    if (!res.ok) {
        throw new Error('Failed to fetch show details');
    }
    const data = await res.json();

    return (
        <main className='bg-gradient-to-b from-gray-800 to-black text-white flex flex-col items-center'>
            <h1 className="text-2xl font-bold p-10">{data.name}</h1>

            <div>{children}</div>

            <section className="flex flex-row content-between bg-indigo-100 text-black rounded-md m-10 gap-2">
                <Link className="p-4 flex flex-col items-center" href={`/shows/${id}/episodes`}>
                    <Image src="/menu.png" alt="actor icon" width={20} height={20}></Image>
                    <p>Episodes</p>
                </Link>
                <div className="p-4 flex flex-col items-center">
                    <Image src="/drama.png" alt="actor icon" width={20} height={20}></Image>
                    <p>Cast</p>
                </div>
                <div className="p-4 flex flex-col items-center">
                    <Image src="/list.png" alt="actor icon" width={20} height={20}></Image>
                    <p>Favorites</p>
                </div>
            </section>
        </main>
    );
  }