import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import useAnswer from "../../hooks/useAnswer";
import Analysis from "../Analysis";
import Summary from "../Summary";
import isEqual from "lodash/isEqual";

function scoreCalc(answers = [], submittedAnswer = []) {
  let score = 0;

  if (!Array.isArray(answers) || !Array.isArray(submittedAnswer)) {
    return score;
  }

  answers.forEach((answer, index1) => {
    const options = Array.isArray(answer?.options) ? answer.options : [];
    const submittedOptions = Array.isArray(submittedAnswer?.[index1]?.options)
      ? submittedAnswer[index1].options
      : [];

    options.forEach((option, index2) => {
      const submittedOption = submittedOptions[index2];
      if (submittedOption) option.checked = submittedOption.checked;
    });

    if (isEqual(options, submittedOptions)) score += 5;
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
