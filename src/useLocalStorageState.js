import { useState, useEffect } from "react";
export function useLocalStorageState(initial, key) {
  const [value, setValue] = useState(initial);
  // const [value, setValue] = useState(function () {
  //   const getMovies = localStorage.getItem(key);
  //   return JSON.parse(getMovies);
  // });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key, value]
  );
  return [value, setValue];
}
