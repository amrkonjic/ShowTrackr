"use client"

import { useState, useEffect, useTransition } from "react";
import DeleteButton from "./DeleteButton";


export default function FavoriteButton( {name, image, rating, id, initialSaved = false} ){
    const [saved, setSaved] = useState(false);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {                       
        fetch("/api/favorites")
          .then((res) => res.json())
          .then((data) => {
            if (data.favorites?.some(fav => fav.name === name)) 
              setSaved(true);
          });
      }, [name]);

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

    return(
        <div className="flex flex-row justify-between">
            <button
                disabled = {saved || isPending}
                onClick={addFavorite}
                className={`px-3 py-1 rounded text-white ${
                    saved ? "bg-green-600" : "bg-amber-500 hover:bg-amber-600"
                }`}
            >
                {saved ? "saved!" : isPending ? "Saving..." : "Add to favorite"}
            </button>
            {saved && <DeleteButton id={id} />}
        </div>
        
    )
}