import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { UseAuth } from "../contexts/AuthContext";
import app from "../firebase";

export default function useAnswer(videoID) {
  const [answers, setAnswer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { currentUser } = UseAuth();

  useEffect(() => {
    const fetchQuestion = async () => {
      const db = getDatabase(app);

      try {
        setLoading(true);
        const snap = await get(ref(db, `answers/${videoID}/questions`));
        const data = snap.val();

        setAnswer(data);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestion();
  }, [videoID, currentUser]);

  return { answers, loading, error };
}
