import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { crx } from "@crxjs/vite-plugin";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import manifest from "./src/manifest";

export default defineConfig({
  plugins: [solidPlugin(), crx({ manifest }), ViteImageOptimizer()],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
