import { useEffect, useRef, useState } from "react";

export default function InfiniteScroll() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`,
      );
      const data = await res.json();

      setLoading(false);
      if (data.length === 0) setHasMore(false);
      else setItems((prev) => [...prev, ...data]);
    };
    fetchData();
  }, [page]);

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setPage((prev) => prev + 1);
        console.log(entries);
      },
      { threshold: 1 },
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [hasMore, loading]);

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <p>Title: {item.title}</p>
          {/* <p>{item.body}</p> */}
        </div>
      ))}
      {hasMore && <div ref={loaderRef}>Loading...</div>}
    </div>
  );
}
