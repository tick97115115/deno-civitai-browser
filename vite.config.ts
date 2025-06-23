import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import deno from "@deno/vite-plugin";

import "react";
import "react-dom";

export default defineConfig({
  root: "./src/client",
  server: {
    port: 3000,
  },
  plugins: [react({ babel: { babelrc: true, configFile: true } }), deno()],
  optimizeDeps: {
    include: ["react/jsx-runtime"],
  },
});
