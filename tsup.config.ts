import { defineConfig } from "tsup"

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "slai/index": "src/components/slai/index.ts",
    "lab-website/index": "src/components/lab-website/index.ts",
    "aibat/index": "src/components/aibat/index.ts",
    "casting-lab/index": "src/components/casting-lab/index.ts",
    "murder-mystery/index": "src/components/murder-mystery/index.ts",
    "trail-console/index": "src/components/trail-console/index.ts",
    "bias-audit/index": "src/components/bias-audit/index.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  external: ["react", "react-dom", "next"],
  clean: true,
  sourcemap: true,
  treeshake: true,
})
