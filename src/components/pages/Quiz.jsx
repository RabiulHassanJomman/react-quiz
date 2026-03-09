import { getDatabase, ref, update } from "firebase/database";
import lod from "lodash";
import { useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UseAuth } from "../../contexts/AuthContext";
import app from "../../firebase";
import useQuiz from "../../hooks/useQuiz";
import Answers from "../Answers";
import MiniPlayer from "../MiniPlayer";
import ProgressBar from "../ProgressBar";

const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      if (!action.value || !Array.isArray(action.value)) {
        return state;
      }
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;
    case "answer": {
      const questions = lod.cloneDeep(state);
      questions[action.questionId].options[action.optionIndex].checked =
        action.value;
      return questions;
    }
    default:
      return state;
  }
};

export default function Quiz() {
  // ===== Hooks =====
  const { videoID } = useParams();
  const navigate = useNavigate();
  const { currentUser } = UseAuth();
  const { questions, loading, error } = useQuiz(videoID);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [qna, dispatch] = useReducer(reducer, []);
  const location = useLocation();
  const videoTitle = location.state.videoTitle;

  // ===== Derived Values =====
  const percentage =
    qna.length > 0 ? ((currentQuestion + 1) / qna.length) * 100 : 0;

  // ===== Effects =====
  useEffect(() => {
    if (questions && questions.length > 0) {
      dispatch({
        type: "questions",
        value: questions,
      });
    }
  }, [questions]);

  // ===== Handlers =====
  const handleAnsChange = (e, index) => {
    dispatch({
      type: "answer",
      questionId: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < qna.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const submit = async () => {
    const { uid } = currentUser;
    const db = getDatabase(app);
    const resultRef = ref(db, `result/${uid}`);

    await update(resultRef, {
      [videoID]: qna,
    });

    navigate(`/result/${videoID}`, { state: { qna } });
  };

  // ===== Render =====
  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error!</div>}

      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>

          <Answers
            options={qna[currentQuestion].options}
            handleChange={handleAnsChange}
            input
          />
          <ProgressBar
            nextQuestion={nextQuestion}
            submit={submit}
            prevQuestion={prevQuestion}
            progress={percentage}
          />
          <MiniPlayer videoID={videoID} title={videoTitle} />
        </>
      )}
    </div>
  );
}
