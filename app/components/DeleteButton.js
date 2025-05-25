"use client"

import { useState, useTransition } from "react";
import Image from "next/image";

export default function DeleteButton({id, onDelete}){     // onDelete() is function that updates the parent component

    const [deleted, setDeleted] = useState(false);      // tracks whether the item has been deleted
    const [isPending, startTransition] = useTransition();       // tracks if the async deletion is pending

    async function removeFavorite(){
      // useTransition keeps the UI responsive during async work (because it needs to wait for response of server)
        startTransition(async () => {
            const res = await fetch(`/api/favorites?id=${id}`, {
                method: "DELETE",
              });
            // if response is OK, update state and call parent handler
            if (res.ok) {
                const data = await res.json();
                if (data.ok){
                    setDeleted(true);     // visually mark the item as deleted
                    onDelete();         // notify parent to update its list
                }
                } else {
                console.error("Failed to delete:", await res.text());
            }
        });
    }

    return (
        <button
          disabled={deleted || isPending}
          onClick={removeFavorite}
          className={`flex flex-row items-center justify-center gap-2 px-4 py-2 rounded text-white text-sm sm:text-base max-w-xs w-full sm:w-auto text-center ${
            deleted ? "bg-rose-500" : "bg-indigo-600 hover:bg-indigo-800"
          }`}
        >
          <Image src="/delete.png" alt="delete icon" width={20} height={20} />
          {deleted ? "removed!" : isPending ? "removing..." : "remove from favorites"}
        </button>
      );
}