import { useState, type KeyboardEvent } from "react";
import { fetchJoke } from "./api";

export default function App() {
  const [topic, setTopic] = useState("");
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate() {
    if (loading) return;
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

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleGenerate();
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
          onKeyDown={handleKeyDown}
          disabled={loading}
          placeholder="נושא לבדיחה — או השאירו ריק לנושא רנדומלי"
        />

        <button
          className="generate-btn"
          onClick={handleGenerate}
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? (
            <>
              <span className="spinner" aria-hidden="true" />
              מייצר…
            </>
          ) : (
            "צור בדיחה"
          )}
        </button>

        {error && <p className="error">{error}</p>}
        {joke && !error && (
          <p key={joke} className={`joke${loading ? " joke--stale" : ""}`}>
            {joke}
          </p>
        )}
      </section>
    </main>
  );
}
