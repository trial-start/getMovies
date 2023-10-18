import { useEffect, useState } from "react";
export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  const key = "6d0551f2";

  useEffect(
    function () {
      callback?.();
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setisLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=${query}
      `,
            { signal: controller.signal }
          );
          if (!res.ok) {
            throw new Error("something went wrong");
          }
          const data = await res.json();
          if (data.Response === "False") {
            throw new Error("No data found");
          }
          setMovies(data.Search);
          setError("");
          // setisLoading(false);
        } catch (err) {
          if (err.name != "AbortError") setError(err.message);
        } finally {
          setisLoading(false);
        }
      }
      if (!query.length) {
        setMovies([]);
        setError("");
        return;
      }
      // handleCloseMovie();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { isLoading, movies, error };
}
