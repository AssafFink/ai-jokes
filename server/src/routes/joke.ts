import { Router, type Request, type Response } from "express";
import { generateJoke } from "../openai.js";

export const jokeRouter = Router();

interface JokeRequestBody {
  topic?: string;
}

// POST /api/joke
// Generate a joke via OpenAI. With a topic -> joke about it in the topic's
// language; without a topic -> a random joke in Hebrew.
jokeRouter.post("/", async (req: Request, res: Response) => {
  const { topic } = req.body as JokeRequestBody;
  const trimmedTopic = typeof topic === "string" ? topic.trim() : "";

  try {
    const joke = await generateJoke(trimmedTopic);
    res.json({ joke });
  } catch (err) {
    if (err instanceof Error && err.message === "MISSING_API_KEY") {
      console.error("OPENAI_API_KEY is not set");
      res.status(500).json({ error: "Server is missing its OpenAI API key." });
      return;
    }
    console.error("Failed to generate joke:", err);
    res.status(502).json({ error: "Failed to generate a joke. Please try again." });
  }
});
