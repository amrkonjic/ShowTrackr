"use client"


import { useState, useTransition } from "react";
import Image from "next/image";

export default function DeleteButton({id, onDelete}){

    const [deleted, setDeleted] = useState(false);
    const [isPending, startTransition] = useTransition();

    async function removeFavorite(){
        startTransition(async () => {
            const res = await fetch(`/api/favorites?id=${id}`, {
                method: "DELETE",
              });
            if (res.ok) {
                const data = await res.json();
                if (data.ok){
                    setDeleted(true);
                    onDelete();
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
          className={`flex flex-row gap-4 justify-between px-3 py-1 rounded text-white ${
                    deleted ? "bg-rose-500" : "bg-indigo-600 hover:bg-indigo-800"
          }`}
        >
          <Image src="/delete.png" alt="delete icon" width={20} height={20} />
          {deleted ? "removed!" : isPending ? "removing..." : "remove from favorites"}
        </button>
      );
}