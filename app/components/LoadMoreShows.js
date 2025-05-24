'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function LoadMoreShows() {
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchMore = useCallback(async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const res = await fetch(`https://api.tvmaze.com/shows?page=${page}`);
      const data = await res.json();

      if (data.length === 0) {
        setHasMore(false); // Kraj sadržaja
      } else {
        // Filtriraj samo emisije koje još nisu u shows nizu
        setShows(prev => {
          const existingIds = new Set(prev.map(show => show.id));
          const newShows = data.filter(show => !existingIds.has(show.id));
          return [...prev, ...newShows];
        });
        setPage(prev => prev + 1);
      }
    } catch (err) {
      console.error('Greška prilikom učitavanja:', err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading]);

  useEffect(() => {
    const currentLoader = loaderRef.current;
    const observer = new IntersectionObserver(entries => {
      const first = entries[0];
      if (first.isIntersecting) {
        fetchMore();
      }
    });

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [fetchMore]);

  return (
    <div className="flex flex-col items-start min-h-[100vh]">
      <h3 id="explore-more" className="w-full text-3xl border-b-2 font-bold p-4 text-indigo-100">Explore more </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 mx-auto p-10 gap-16 pb-10">
        {shows.map(show => (
          <Link href={`/shows/${show.id}`}
            key={show.id}
            className="w-full max-w-[220px] sm:w-[220px] bg-indigo-950 p-4 border-solid border-indigo-500 border-2 rounded-md shadow-md shadow-indigo-500/50 flex flex-col items-center gap-2 transition-all duration-300 transform scale-100 hover:scale-105 hover:shadow-lg"
          >
            {show.image?.medium && (
              <Image
                src={show.image.medium}
                alt={`${show.name} image`}
                width={150}
                height={220}
              />
            )}
            <p className="hover:text-indigo-500">
              {show.name}
            </p>
            <p>{show.rating?.average && `${show.rating.average}⭐`}</p>
          </Link>
        ))}
      </div>

      {loading && <p className="text-indigo-100 text-center mb-4">Loading...</p>}
      <div ref={loaderRef} className="h-1" />
    </div>
  );
}