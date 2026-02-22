"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { fetchFilamentIndex, clearIndexCache, ClientIndex } from "@/lib/filaments-client";

type FilamentContextType = {
  index: ClientIndex | null;
  loading: boolean;
  error: Error | null;
  refreshing: boolean;
  refresh: () => void;
};

const FilamentContext = createContext<FilamentContextType>({ index: null, loading: true, error: null, refreshing: false, refresh: () => {} });

export function FilamentProvider({ children }: { children: React.ReactNode }) {
  const [index, setIndex] = useState<ClientIndex | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const doFetch = useCallback(() => {
    fetchFilamentIndex()
      .then(data => {
        setIndex(data);
        setLoading(false);
        setRefreshing(false);
      })
      .catch(err => {
        console.error(err);
        setError(err);
        setLoading(false);
        setRefreshing(false);
      });
  }, []);

  useEffect(() => { doFetch(); }, [doFetch]);

  const refresh = useCallback(() => {
    clearIndexCache();
    setRefreshing(true);
    setError(null);
    doFetch();
  }, [doFetch]);

  return (
    <FilamentContext.Provider value={{ index, loading, error, refreshing, refresh }}>
      {children}
    </FilamentContext.Provider>
  );
}

export const useFilamentContext = () => useContext(FilamentContext);
