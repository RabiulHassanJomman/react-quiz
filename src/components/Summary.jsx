import { useMemo, useState } from "react";
import useFetchImage from "../hooks/useFetchImage";
import classes from "./styles/Summary.module.css";

export default function Summary({ score, totalScore }) {
  const getQuery = useMemo(() => {
    const scorePercent = score / totalScore;

    if (scorePercent >= 0.8) return "achievement,trophy,celebration";
    if (scorePercent >= 0.5) return "learning,books,thoughtful";
    return "climbing, mountain,persistence"; 
  }, [score, totalScore]);

  const [randomPage] = useState(() => Math.ceil(Math.random() * 80));
  const url = `https://api.pexels.com/v1/search?query=${getQuery}&per_page=1&page=${randomPage}`;
  
  const { result, loading, error } = useFetchImage(url, "GET");

  return (
    <div className={classes.summary}>
      <div className={classes.point}>
        {/* progress bar will be placed here */}
        <p className={classes.score}>
          Your score is <br />
          {score} out of {totalScore}
        </p>
      </div>
      {loading && <div className={classes.badge}>Loading...</div>}
      {error && <div className={classes.badge}>There was an error!</div>}
      {!loading && !error && (
        <div className={classes.badge}>
          <img src={result} alt="Success" />
        </div>
      )}
    </div>
  );
}
