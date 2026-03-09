import { useRef, useState } from "react";
import ReactPlayer from "react-player";

import classes from "./styles/MiniPlayer.module.css";

export default function MiniPlayer({ videoID, title }) {
  const [buttonState, setButtonState] = useState(false);
  const buttonRef = useRef();
  const videoUrl = `https://youtube.com/watch?v=${videoID}`;

  function toggleMiniplayer() {
    if (buttonState) {
      setButtonState(false);
      buttonRef.current.classList.add(classes.floatingBtn);
    } else {
      setButtonState(true);
      buttonRef.current.classList.remove(classes.floatingBtn);
    }
  }
  return (
    <div
      className={`${classes.miniPlayer} ${classes.floatingBtn}`}
      ref={buttonRef}
    >
      <span
        className={`${classes.open} material-icons-outlined`}
        onClick={toggleMiniplayer}
      >
        {" "}
        play_circle_filled{" "}
      </span>
      <span
        className={`${classes.close} material-icons-outlined`}
        onClick={toggleMiniplayer}
      >
        {" "}
        close{" "}
      </span>
      <ReactPlayer
        className={classes.player}
        src={videoUrl}
        width={"300px"}
        height={"168px"}
        style={{ display: "" }}
        playing={buttonState}
        controls
      ></ReactPlayer>
      <p>{title}</p>
    </div>
  );
}
