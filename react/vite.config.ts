import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  root: resolve(__dirname),
  plugins: [react(), svgr()],
  css: {
    postcss: {
      plugins: [
        tailwindcss({ config: resolve(__dirname, "tailwind.config.js") }),
        autoprefixer(),
      ],
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:5174",
      "/Tekoa%20(c%C3%B3pia)": "http://localhost:5174",
    },
    fs: {
      allow: [resolve(__dirname, "..")],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});

