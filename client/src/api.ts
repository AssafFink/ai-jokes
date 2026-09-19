export interface JokeResponse {
  joke: string;
}

// Call the single backend route. In dev, Vite proxies /api to Express;
// in production the same server serves both this client and the API.
export async function fetchJoke(topic: string): Promise<string> {
  const response = await fetch("/api/joke", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic })
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = (await response.json()) as JokeResponse;
  return data.joke;
}
