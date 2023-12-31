import { useState, useEffect } from "react";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const KEY = "4b8c2872";

  useEffect(
    function () {
      callback?.();
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("Something went in fetching data😔");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found🎥⚠️");
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 2) {
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

  return { movies, loading, error };
}
