import { Link } from "react-router-dom";
import useVideoList from "../hooks/useVideoList";
import Video from "./Video";

export default function Videos() {
  const { videos, error, loading, hasMore, loadingRef } = useVideoList();
  return (
    <div className="videos">
      {videos.length > 0 &&
        videos.map((video) => {
          // console.log(video.key);
          return video.num_of_ques > 0 ? (
            <Link
              to={`/quiz/${video.youtubeID}`}
              state={{ videoTitle: video.title }}
              key={video.youtubeID}
            >
              <Video
                title={video.title}
                id={video.youtubeID}
                noq={video.num_of_ques}
              />
            </Link>
          ) : (
            <Video
              key={video.youtubeID}
              title={video.title}
              id={video.youtubeID}
              noq={video.num_of_ques}
            />
          );
        })}
      {!loading && videos.length === 0 && <div>No data found!</div>}
      {error && <div>There was an error!</div>}
      {/* <button onClick={fetchVideos}>Load More</button> */}
      {hasMore && <div ref={loadingRef}>Loading...</div>}
    </div>
  );
}
