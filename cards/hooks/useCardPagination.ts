import { useState, useEffect, useMemo } from "react";
import { CardDetailsResponse } from "../../../model/Card/Card";
import { Cache } from "../../../utils/cache";

let running = false;

export function useCardPagination(
  fetchFn: (cursor: string, limit: number) => Promise<any>,
  page: number,
  limit: number
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<CardDetailsResponse[]>([]);
  const [cursors, setCursors] = useState<string[]>([""]);

  const cache = useMemo<Cache>(() => {
    const cache = new Cache(5000);
    cache.setKeyFn((page) => `card:${page}`);
    return cache;
  }, []);

  useEffect(() => {
    setCursors([""]);
    cache.clear();
  }, [limit, cache, fetchFn]);

  useEffect(() => {
    const fetch = async () => {
      if (running) {
        return;
      }

      running = true;

      const idx = page - 1;
      const cursor = cursors[idx];
      try {
        setLoading(true);
        setError("");
        const data = await fetchFn(cursor, limit);
        const next = data?.response_metadata?.next_cursor ?? "";

        if (data?.cards) {
          cache.set(page, data.cards);
          setData(data.cards);
        }

        if (cursors.length === page && next) {
          setCursors((cursors) => [...cursors, next]);
        }
      } catch (e) {
        setError(JSON.stringify(e));
      } finally {
        setLoading(false);
      }

      running = false;
    };

    const data = cache.get(page);
    if (data) {
      setData(data);
    } else {
      fetch();
    }
    // eslint-disable-next-line
  }, [page, cursors, cache]);

  return [data, error, loading, cursors.length];
}
