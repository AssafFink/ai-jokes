import "dotenv/config";
import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { jokeRouter } from "./routes/joke.js";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(express.json());

// Single API route
app.use("/api/joke", jokeRouter);

// Serve the built React client from client/dist when it exists (production).
// This keeps everything on a single service (single URL, no CORS). In local
// dev the build is absent and Vite serves the client instead.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDist = path.resolve(__dirname, "../../client/dist");

if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  // SPA fallback: send index.html for any non-API GET route.
  app.get("*", (_req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
