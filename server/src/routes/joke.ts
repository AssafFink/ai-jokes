import { Router, type Request, type Response } from "express";

export const jokeRouter = Router();

interface JokeRequestBody {
  topic?: string;
}

// POST /api/joke
// Milestone 1: return a stub joke so the client<->server chain can be verified.
// Milestone 2 will replace this with a real OpenAI call.
jokeRouter.post("/", (req: Request, res: Response) => {
  const { topic } = req.body as JokeRequestBody;
  const trimmedTopic = typeof topic === "string" ? topic.trim() : "";

  const joke = trimmedTopic
    ? `(stub) Here is a joke about "${trimmedTopic}". The real one arrives in Milestone 2!`
    : "(stub) Here is a random joke. The real one arrives in Milestone 2!";

  res.json({ joke });
});
