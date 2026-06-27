import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  external: ["react", "react-dom"],
  treeshake: true,
  onSuccess: "node -e \"require('fs').copyFileSync('src/styles.css','dist/styles.css')\"",
});
