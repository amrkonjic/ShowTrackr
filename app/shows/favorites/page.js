/* Page used for the user's favorite TV series retrieved from internal /api/favorites */

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect is used to retrive information as soon as component is mounted (loaded on the page)
    useEffect(() => {                       //useEffect hook does not accept async functions directly because an async function always returns a Promise, which is not compatible with the expected return type of void or a cleanup function so async function is placed inside useEffect
        const fetchFavorites = async () => {        // it is necessarily for function to be async because of waiting for data to be fetched
            try {
                const res = await fetch("/api/favorites");
                const data = await res.json();
                setFavorites(data.favorites || []);
            } catch (error) {
                console.error("Failed to fetch favorites:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);         // empty dependency array because useEffect needs to be executed only once (when component is mounted)

    return (
        <main className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold p-8">Your favorite series</h1>
            {loading ? (
                <p>Loading...</p>
            ) : favorites.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 mx-auto max-w-[1200px] gap-16">
                    {favorites.map((show) => (
                        <Link href={`/shows/${show.id}`} key={show.id} className="w-full sm:w-[220px] bg-indigo-950 p-4 mt-10 border-solid border-indigo-500 border-2 rounded-md shadow-md shadow-indigo-500/50 flex flex-col items-center gap-2 transition-all duration-300 transform scale-100 hover:scale-105 hover:shadow-lg">
                            <Image 
                                src={show.image}
                                alt={`${show.name} image`}
                                width={150}
                                height={220}
                            />
                            <p>{show.name}</p>
                            <p>{show.rating}⭐</p>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center w-3/4 max-w-3xl bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 shadow-xl mt-10 mb-10 mx-auto">
                    <Image
                        className="w-full max-w-[200px] sm:max-w-[280px] md:max-w-[350px] h-auto object-contain mb-6"
                        src="/empty.png"
                        alt="empty favorites image"
                        width={350}
                        height={250}
                        priority={true}
                    />
                    <div className="text-center px-2 sm:px-4">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">
                            Your favorites list is empty
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-violet-100 max-w-md mx-auto">
                            You haven’t added any favorites yet. Browse shows and mark your favorites to see them here.
                        </p>
                    </div>
                </div>
            )}
        </main>
    );
}
