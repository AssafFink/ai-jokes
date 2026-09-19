import { useState } from "react";
import { fetchJoke } from "./api";

export default function App() {
  const [topic, setTopic] = useState("");
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate() {
    setLoading(true);
    setError("");
    try {
      const result = await fetchJoke(topic);
      setJoke(result);
    } catch {
      setError("משהו השתבש ביצירת הבדיחה. נסו שוב.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="card">
        <h1>מחולל בדיחות AI</h1>
        <p className="subtitle">הכניסו נושא (לא חובה) ולחצו לקבלת בדיחה</p>

        <input
          className="topic-input"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="נושא לבדיחה — או השאירו ריק לנושא רנדומלי"
        />

        <button className="generate-btn" onClick={handleGenerate} disabled={loading}>
          {loading ? "מייצר…" : "צור בדיחה"}
        </button>

        {error && <p className="error">{error}</p>}
        {joke && !error && <p className="joke">{joke}</p>}
      </section>
    </main>
  );
}
