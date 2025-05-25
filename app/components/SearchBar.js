"use client";

/* This component implement search bar, inspired by Stackoverflow but contains changes. 
(https://stackoverflow.com/questions/76990541/search-bar-with-debounce-using-react-hooks)  */

import { useState, useEffect } from "react";
import Link from "next/link";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // clear results if term is too short to prevent unnecessary API calls and retrieving useless results
    if (search.length < 2) {
      setResults([]);
      return;
    }

    // debounce search: wait 300ms after user stops typing, also to prevent unnecessary API calls
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        // call internal API route to search shows
        const res = await fetch(`/api/search?q=${encodeURIComponent(search)}`);
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300); // debounce 300ms

    // clear previous timeout when search changes
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="relative w-64 m-5 max-w-xs sm:max-w-md">
      <input
        type="text"
        placeholder="Search shows..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 rounded bg-indigo-800 text-white placeholder-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full max-w-xs sm:max-w-md"
      />

      {search.length > 1 && (
        <div className="absolute z-50 bg-white text-black mt-1 rounded shadow w-full max-h-60 overflow-y-auto">
          {loading && <p className="p-2 text-sm">Searching...</p>}
          {!loading && results.length === 0 && (
            <p className="p-2 text-sm text-gray-500">No results</p>
          )}
          {!loading &&
            results.map((show) => (
              <Link
                key={show.id}
                href={`/shows/${show.id}`}
                onClick={() => setSearch("")}
                className="block px-4 py-2 hover:bg-indigo-100"
              >
                {show.name}
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
