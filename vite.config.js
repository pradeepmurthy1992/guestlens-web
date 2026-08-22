import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Only set when building for GitHub Pages (see .github/workflows/deploy.yml).
// Local dev and other hosts default to root ("/").
export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [react(), tailwindcss()],
});
