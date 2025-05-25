"use client"

import { useState, useEffect, useTransition } from "react";
import DeleteButton from "./DeleteButton";
import Image from "next/image";


export default function FavoriteButton( {name, image, rating, id, initialSaved = false} ){
    const [saved, setSaved] = useState(initialSaved);
    const [isPending, startTransition] = useTransition();
    
    // fetching favorites from the API and updates the 'saved' state if the current series is in the favorites
    useEffect(() => {                    
        fetch("/api/favorites")
          .then((res) => res.json())
          .then((data) => {
            if (data.favorites?.some(fav => fav.name === name)){
              setSaved(true);
            } else setSaved(false)
          });
      }, [name]);           // triggered on 'name' change


    async function addFavorite(){
        startTransition(async () => {
            const res = await fetch("/api/favorites", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, image, rating, id }),
              });
              if (res.ok) setSaved(true);
        });
    }


    // function that is called after removing show from favorites
    const handleDelete = () => {
        setSaved(false);            // set state "saved" on false to hide delete button and enable user to add that show in favorites again
    }

    return(
        <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-3">
            <button
                disabled={saved || isPending}
                onClick={addFavorite}
                className={`flex flex-row items-center justify-center gap-2 px-4 py-2 rounded text-white text-sm sm:text-base max-w-xs w-full sm:w-auto text-center ${
                saved ? "bg-rose-500" : "bg-indigo-600 hover:bg-indigo-800"
                }`}
            >
                <Image src="/heart.png" alt="love icon" width={20} height={20} />
                {saved ? "Saved" : isPending ? "Saving..." : "Add to favorite"}
            </button>
            {/* show delete button only if show is added to favorites */}
            {saved && <DeleteButton id={id} onDelete={handleDelete}/>} 
        </div>
        
    )
}