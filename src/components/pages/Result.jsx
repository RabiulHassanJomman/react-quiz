import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import useAnswer from "../../hooks/useAnswer";
import Analysis from "../Analysis";
import Summary from "../Summary";

function scoreCalc(answers, submittedAnswers) {
  let score = 0;

  if (
    !answers ||
    !submittedAnswers ||
    answers.length == 0 ||
    submittedAnswers.length == 0
  ) {
    return score;
  }
  submittedAnswers.forEach((submittedAnswer, index1) => {
    let correct = true;
    submittedAnswer.options.forEach((option, index2) => {
      answers[index1].options[index2].checked = option.checked;
      if (option.checked != answers[index1].options[index2].correct)
        correct = false;
    });
    if (correct) score += 5;
  });

  return score;
}

export default function Result() {
  const { videoID } = useParams();
  const location = useLocation();
  const qna = useMemo(() => location.state?.qna ?? [], [location.state]);
  const { answers, error, loading } = useAnswer(videoID);

  const score = useMemo(() => {
    if (answers && qna.length > 0) {
      return scoreCalc(answers, qna);
    }
    return 0;
  }, [answers, qna]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>There was an error!</div>;

  return (
    <div>
      <Summary
        score={score}
        totalScore={answers?.length ? answers.length * 5 : 0}
      />
      <Analysis answers={answers} />
    </div>
  );
}
