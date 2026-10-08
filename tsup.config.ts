import { defineConfig } from "tsup"

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "ui/index": "src/ui.ts",
    "patterns/index": "src/components/patterns/index.ts",
    "slai/index": "src/components/slai/index.ts",
    "lab-website/index": "src/components/lab-website/index.ts",
  },
  format: ["cjs", "esm"],
  // tsup's d.ts step sets `baseUrl` internally, which TypeScript 6 deprecates.
  // TypeScript 7 (native) has no JS API, so tsup can't use it yet; stay on 6.x.
  dts: { compilerOptions: { ignoreDeprecations: "6.0" } },
  external: ["react", "react-dom", "next"],
  clean: true,
  sourcemap: true,
  treeshake: true,
})
