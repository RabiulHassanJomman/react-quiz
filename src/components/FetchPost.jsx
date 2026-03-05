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

export default function FetchPost() {
  const db = getDatabase(app);
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadingRef = useRef(null);
  const isFetching = useRef(false);

  const PAGE_SIZE = 4;
  const fetchPosts = useCallback(async () => {
    if (isFetching.current || !hasMore) return;
    isFetching.current = true;
    try {
      // query created
      const myQuery = cursor
        ? query(
            ref(db, "posts"),
            orderByKey(),
            limitToFirst(PAGE_SIZE + 1),
            startAfter(cursor),
          )
        : query(ref(db, "posts"), orderByKey(), limitToFirst(PAGE_SIZE + 1));

      setLoading(true);
      const snap = await get(myQuery);

      // data is converted to an array
      const data = [];
      const keys = [];
      snap.forEach((child) => {
        data.push(child.val());
        keys.push(child.key);
      });

      if (data.length > PAGE_SIZE) {
        setHasMore(true);
      } else setHasMore(false);

      // removed the last element and appended to the items
      const pageData = data.slice(0, PAGE_SIZE);
      setItems((prev) => [...prev, ...pageData]);
      setCursor(keys[PAGE_SIZE - 1]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  }, [cursor, db, hasMore]);

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loadingRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchPosts();
        }
      },
      { threshold: 0, rootMargin: "500px" }
    );
    observer.observe(loadingRef.current);

    // console.log("rendered");
    return () => observer.disconnect();
  }, [hasMore, fetchPosts]);

  return (
    <div style={{ padding: "10px" , textAlign: "center"}}>
      {items.map((item) => (
        <div key={item.id}>
          <h1>{item.id}</h1>
          <h3>{item.title}</h3>
          <p>{item.content}</p>
          <h4>time: {item.createdAt}</h4>
          <hr />
        </div>
      ))}
      {hasMore && <div ref={loadingRef}>{loading ? "Loading..." : null}</div>}
    </div>
  );
}
