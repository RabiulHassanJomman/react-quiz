import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import app from "../firebase";

export default function useQuiz(id) {
  const [questions, setQuestions] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchQuestion = async () => {
      const db = getDatabase(app);
      try {
        setLoading(true);
        const snap = await get(ref(db, `quiz/${id}/questions`));
        const data = snap.val();

        setQuestions(data);
        console.log(data);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestion();
  }, [id]);

  return { questions, loading, error };
}
