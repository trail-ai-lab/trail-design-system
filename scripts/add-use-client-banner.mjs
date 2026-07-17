import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs"
import { join } from "node:path"

const distDir = new URL("../dist", import.meta.url).pathname

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      walk(full)
    } else if (/^index\.(js|mjs)$/.test(entry)) {
      const content = readFileSync(full, "utf8")
      if (!content.startsWith('"use client";')) {
        writeFileSync(full, `"use client";\n${content}`)
      }
    }
  }
}

walk(distDir)
console.log("Prepended \"use client\"; to all dist/**/index.{js,mjs} files")
