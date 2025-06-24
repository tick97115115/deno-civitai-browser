import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import deno from "@deno/vite-plugin";
import tailwindcss from "@tailwindcss/vite";

import "react";
import "react-dom";

export default defineConfig({
  root: "./src/client",
  server: {
    port: 3000,
  },
  plugins: [
    react({ babel: { babelrc: true, configFile: true } }),
    deno(),
    tailwindcss(),
  ],
  optimizeDeps: {
    include: ["react/jsx-runtime"],
  },
});
