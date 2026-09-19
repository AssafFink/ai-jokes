import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// During development, proxy API calls to the Express server so the
// browser talks to a single origin (no CORS). In production the same
// Express server serves this built client.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3001"
    }
  }
});
