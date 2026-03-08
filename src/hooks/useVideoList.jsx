import {
  get,
  getDatabase,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAfter,
} from "firebase/database";
import { useCallback, useEffect, useRef, useState } from "react";
import app from "../firebase";

export default function useVideoList() {
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");
  const loadingRef = useRef(null);

  const VIDEOS_PER_FETCH = 8;
  const db = getDatabase(app);
  const fetchVideos = useCallback(async () => {
    if (!hasMore) return;
    try {
      const myQuery = cursor
        ? query(
            ref(db, "videos"),
            orderByKey(),
            limitToFirst(VIDEOS_PER_FETCH + 1),
            startAfter(cursor),
          )
        : query(
            ref(db, "videos"),
            orderByKey(),
            limitToFirst(VIDEOS_PER_FETCH + 1),
          );

      setLoading(true);
      const snap = await get(myQuery);
      const fetchedData = [];
      snap.forEach((child) => {
        fetchedData.push({ key: child.key, ...child.val() });
      });

      if (fetchedData.length > VIDEOS_PER_FETCH) setHasMore(true);
      else setHasMore(false);

      const myData = fetchedData.splice(0, VIDEOS_PER_FETCH);
      const newCursor = myData[myData.length - 1].key;
      setCursor(newCursor);
      setVideos((prevVideos) => [...prevVideos, ...myData]);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [cursor, db, hasMore]);

  useEffect(() => {
    if (!loadingRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchVideos();
        }
      },
      { threshold: 0 },
    );
    observer.observe(loadingRef.current);
    return () => observer.disconnect();
  }, [fetchVideos, hasMore]);

  return {
    videos,
    error,
    loading,
    hasMore,
    loadingRef,
  };
}
