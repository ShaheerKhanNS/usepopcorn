import { useState, useEffect } from "react";

export function useLocalStorageState(initialstage, key) {
  const [value, setValue] = useState(function () {
    const storedValues = localStorage.getItem(key);

    return storedValues ? JSON.parse(storedValues) : initialstage;
  });

  useEffect(
    function () {
      localStorage.setItem(`watched`, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
