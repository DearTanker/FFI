"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { fetchFilamentIndex, ClientIndex } from "@/lib/filaments-client";

type FilamentContextType = {
  index: ClientIndex | null;
  loading: boolean;
  error: Error | null;
};

const FilamentContext = createContext<FilamentContextType>({ index: null, loading: true, error: null });

export function FilamentProvider({ children }: { children: React.ReactNode }) {
  const [index, setIndex] = useState<ClientIndex | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchFilamentIndex()
      .then(data => {
        setIndex(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return (
    <FilamentContext.Provider value={{ index, loading, error }}>
      {children}
    </FilamentContext.Provider>
  );
}

export const useFilamentContext = () => useContext(FilamentContext);
