import { useRef, useState } from "react";
import Button from "./Button";
import classes from "./styles/ProgressBar.module.css";

export default function ProgressBar({
  nextQuestion,
  prevQuestion,
  progress,
  submit,
}) {
  const [toolTip, setTooltip] = useState(false);
  const tooltipRef = useRef();

  function toogleTooltip() {
    if (toolTip) {
      setTooltip(false);
      tooltipRef.current.style.display = "none";
    } else {
      setTooltip(true);
      tooltipRef.current.style.display = "block";
      tooltipRef.current.style.left = `calc(${progress}% - 65px)`;
    }
  }

  return (
    <div className={classes.progressBar}>
      <div className={classes.backButton} onClick={prevQuestion}>
        <span className="material-icons-outlined"> arrow_back </span>
      </div>
      <div className={classes.rangeArea}>
        <div className={classes.tooltip} ref={tooltipRef}>
          {Math.round(progress)}% Complete!
        </div>
        <div className={classes.rangeBody}>
          <div
            className={classes.progress}
            style={{ width: `${progress}%` }}
            onMouseOver={toogleTooltip}
            onMouseOut={toogleTooltip}
          ></div>
        </div>
      </div>

      {progress < 100 ? (
        <Button className={classes.next} onClick={nextQuestion}>
          <span>Next Question</span>
          <span className="material-icons-outlined"> arrow_forward </span>
        </Button>
      ) : (
        <Button className={classes.next} onClick={submit}>
          <span>Submit Quiz</span>
          <span className="material-icons-outlined"> arrow_forward </span>
        </Button>
      )}
    </div>
  );
}
