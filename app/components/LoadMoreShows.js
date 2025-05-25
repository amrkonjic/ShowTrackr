'use client';

/* The LoadMoreShows component is designed to implement an infinite scroll feature. It is designed as client-side component because of 
  implementation of dynamic changes caused by users actions. It utilizes the IntersectionObserver API to detect when a loader element becomes 
  visible, triggering the fetchMore function to retrieve the next page of shows from the TVMaze API. The component manages state to prevent
  duplicate data and ensures a smooth user experience by handling loading states and cleanup to avoid memory leaks. */

import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function LoadMoreShows() {
  const [shows, setShows] = useState([]);       // array that contains tv shows fetched from API
  const [page, setPage] = useState(1);          // used for following current API page
  const [hasMore, setHasMore] = useState(true);       // indicating whether there is more data to fetch
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);       // reference to DOM element used as trigger for the IntersectionObserver

  // ensures that page automatically moves to the top when it is first rendered (this is used to solve problem of the page loading at the bottom after refreshing)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // function for fetching new page with tv shows
  const fetchMore = useCallback(async () => {         // useCallback is used to memorize function fetchMore so that a new instance is not created for each render
    if (!hasMore || loading) return;    // break if there is no available data to fetch or it is currently loading

    setLoading(true);
    try {
      // fetch data from API 
      const res = await fetch(`https://api.tvmaze.com/shows?page=${page}`);
      const data = await res.json();

      if (data.length === 0) {
        setHasMore(false);  // end of content
      } else {
        // filter only shows that are not yet in the shows array
        setShows(prev => {
          // create set of existing ids before adding new show to array shows
          const existingIds = new Set(prev.map(show => show.id));
          // filter new shows - include only those whose id is not already present 
          const newShows = data.filter(show => !existingIds.has(show.id));
          // join filtered shows and existing array
          return [...prev, ...newShows];
        });
        // after the content from the current page is loaded, increase the page number
        setPage(prev => prev + 1);
      }
    } catch (err) {
      console.error('Greška prilikom učitavanja:', err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading]);       // create new instance of fetchMore component only if some of these change

  // IntersectionObserver follows the visibility of the element associated with the loaderRef (the div at the bottom of the component)
  // useEffect ensures that IntersectionObserver is setted when component is first time rendered and when fetchMore is changed
  // goal: track the visibility of the loaderRef and trigger fetchMore when that element becomes visible (because the user has scrolled to it)
  useEffect(() => {
    const currentLoader = loaderRef.current;
    // create new instance of IntersectionObserver, constuctor takes as an argument callback function that is called whenever visibility of tracked element is changed
    const observer = new IntersectionObserver(entries => {        //entries is array of objects who describe visibility changes of all tracked elements
      const first = entries[0];       // in this case only one element is tracked so entries has only one element(with index 0)
      if (first.isIntersecting) {     
        fetchMore();
      }
    });

    if (currentLoader) {
      observer.observe(currentLoader);    // observe is IntersectionObserver method that tracks visibility of currentLoader
    }

    // cleanup function that is executed when component did unmount or when useEffet is restarted because of change of dependecy (fetchMore in this case) 
    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [fetchMore]);

  return (
    <div className="flex flex-col items-start min-h-[100vh]">
      <h2 id="explore-more" className="w-full text-2xl border-b-2 font-bold p-4 text-indigo-100">Explore more </h2>
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
      <div ref={loaderRef} className="h-1" /> {/* empty div that is used as trigger for IntersectionObserver */}
    </div>
  );
}