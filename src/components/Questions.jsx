import Answers from "./Answers";
import classes from "./styles/Questions.module.css";

export default function Questions({ answers }) {
  const safeAnswers = Array.isArray(answers) ? answers : [];

  return safeAnswers.map((answer, index) => (
    <div className={classes.question} key={index}>
      <div className={classes.qtitle}>
        <span className="material-icons-outlined"> help_outline </span>
        {answer.title}
      </div>
      <Answers options={answer.options} input = {false}/>
    </div>
  ));
}
