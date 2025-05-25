// Error boundary component that displays a fallback UI when a rendering error occurs on the client side.
"use client"; 

import { useEffect } from "react";

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error("Error:", error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">Something went wrong!</h1>
            <p>{error.message || "An unexpected error occurred."}</p>
            <button
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
                onClick={() => reset()}
            >
                Try again
            </button>
        </div>
    );
}