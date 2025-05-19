"use client"


import { useState, useTransition } from "react";

export default function DeleteButton({id}){

    const [deleted, setDeleted] = useState(false);
    const [isPending, startTransition] = useTransition();

    async function removeFavorite(){
        startTransition(async () => {
            const res = await fetch(`/api/favorites?id=${id}`, {
                method: "DELETE",
              });
            if (res.ok) {
                const data = await res.json();
                if (data.ok) setDeleted(true);
                } else {
                console.error("Failed to delete:", await res.text());
            }
        });
    }

    return (
        <button
          disabled={deleted || isPending}
          onClick={removeFavorite}
          className={`px-3 py-1 rounded text-white ${
            deleted ? "bg-green-600" : "bg-amber-500 hover:bg-amber-600"
          }`}
        >
          {deleted ? "removed!" : isPending ? "removing..." : "remove from favorites"}
        </button>
      );
}