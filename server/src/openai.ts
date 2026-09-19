import OpenAI from "openai";

const MODEL = "gpt-4o-mini";

// Create the OpenAI client lazily so the server can boot without a key,
// and a missing key surfaces as a clear per-request error.
let client: OpenAI | null = null;

function getClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("MISSING_API_KEY");
  }
  if (!client) {
    client = new OpenAI({ apiKey });
  }
  return client;
}

// Build the user prompt. Language/topic logic lives in the prompt, not in code:
// - with a topic: joke about it, in the same language as the topic
// - without a topic: a random everyday topic, in Hebrew
function buildUserPrompt(topic: string): string {
  if (topic) {
    return `Write the joke about: ${topic}. Write it in the SAME language as the topic.`;
  }
  return "Pick a random everyday topic and write the joke in Hebrew.";
}

const SYSTEM_PROMPT =
  "You are a witty comedian. Reply with exactly one short, clean, funny joke. " +
  "No preamble, no explanation, no surrounding quotation marks.";

export async function generateJoke(topic: string): Promise<string> {
  const completion = await getClient().chat.completions.create({
    model: MODEL,
    temperature: 1,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildUserPrompt(topic) }
    ]
  });

  const joke = completion.choices[0]?.message?.content?.trim();
  if (!joke) {
    throw new Error("EMPTY_RESPONSE");
  }
  return joke;
}
