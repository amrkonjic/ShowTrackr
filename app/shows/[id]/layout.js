/**
  Layout component for the "Show" pages. This component fetches the main show details (like the name) using the show's ID. It renders a navigation 
  section with links to different subpages of the show (back button, Episodes, Cast, Favorites) and displays any nested child routes passed as `children`.
  The layout also includes a consistent visual style for all subpages. */
import Image from "next/image";
import Link from "next/link";
import BackButton from "../../components/BackButton";

export default async function ShowsLayout({ children, params }) {
    const {id} = await params;

    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
    if (!res.ok) {
        throw new Error('Failed to fetch show details');
    }
    const data = await res.json();

    return (
        <main className='bg-gradient-to-b from-gray-800 to-black text-white flex flex-col items-center'>
            <h1 className="text-3xl font-bold p-10">{data.name}</h1>
            <section className="flex flex-row content-between bg-zinc-500 text-black rounded-md mb-10 gap-2">
                <BackButton />
                <Link className="p-4 flex flex-col items-center hover:bg-violet-500" href={`/shows/${id}/episodes`}>
                    <Image src="/menu.png" alt="actor icon" width={20} height={20}></Image>
                    <p>Episodes</p>
                </Link>
                <Link className="p-4 flex flex-col items-center hover:bg-violet-500" href={`/shows/${id}/cast`}>
                    <Image src="/drama.png" alt="actor icon" width={20} height={20}></Image>
                    <p>Cast</p>
                </Link>
                <Link className="p-4 flex flex-col items-center hover:bg-violet-500 rounded-r-md" href={"/shows/favorites"}>
                    <Image src="/list.png" alt="actor icon" width={20} height={20}></Image>
                    <p>Favorites</p>
                </Link>
            </section>

            <div>{children}</div>
        </main>
    );
  }