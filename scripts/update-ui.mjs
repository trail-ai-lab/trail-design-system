/**
 * Update every installed shadcn primitive in src/components/ui/ to the latest
 * registry version (style from components.json), via the shadcn CLI.
 *
 *   pnpm ui:update            # all installed components
 *   pnpm ui:update button     # just these
 *
 * The registry now imports `cn` from the `cn` package directly. Trail routes
 * every component through `@/lib/utils`, whose `cn` is configured with the
 * Trail scales (text-h1, shadow-raised, …), so after the CLI runs this script
 * points that import back at `@/lib/utils`. Review `git diff src/components/ui`
 * afterwards, then run `pnpm lint && pnpm build`.
 */
import { execFileSync } from "node:child_process"
import { readdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const uiDir = join(process.cwd(), "src/components/ui")
const installed = readdirSync(uiDir)
  .filter((file) => file.endsWith(".tsx"))
  .map((file) => file.replace(/\.tsx$/, ""))

const requested = process.argv.slice(2)
const components = requested.length > 0 ? requested : installed

console.log(
  `Updating ${components.length} component(s): ${components.join(", ")}`
)
execFileSync(
  "pnpm",
  ["exec", "shadcn", "add", ...components, "--overwrite", "--yes"],
  { stdio: "inherit" }
)

let rewritten = 0
for (const file of readdirSync(uiDir).filter((f) => f.endsWith(".tsx"))) {
  const path = join(uiDir, file)
  const source = readFileSync(path, "utf8")
  const next = source.replace(
    /import \{ cn \} from "cn"\n/,
    'import { cn } from "@/lib/utils"\n'
  )
  if (next !== source) {
    writeFileSync(path, next)
    rewritten++
  }
}
console.log(`Pointed ${rewritten} file(s) at @/lib/utils for cn.`)
