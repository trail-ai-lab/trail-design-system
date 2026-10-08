/**
 * Trail's token rules (CLAUDE.md "Token Rules"), enforced on class strings only:
 * `className="…"`, `className={`…`}` and string arguments to cn() / cva().
 */

const PALETTE =
  "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose"
const COLOR_UTILS =
  "bg|text|border|border-[trblxy]|ring|ring-offset|outline|fill|stroke|from|via|to|divide|decoration|placeholder|caret|accent|shadow|inset-shadow|inset-ring"

// bg-blue-500, text-white, ring-black/10, hover:bg-gray-100 …
const RAW_PALETTE = new RegExp(
  `(?:^|[\\s:])(?:${COLOR_UTILS})-(?:white|black|(?:${PALETTE})-\\d{2,3})(?:\\/\\d+)?(?=$|[\\s])`
)
// bg-[#fff], text-[rgb(…)], border-[oklch(…)], shadow-[0_0_0_1px_hsl(…)]
const RAW_ARBITRARY_COLOR =
  /-\[[^\]]*(?:#[0-9a-fA-F]{3,8}|rgba?\(|hsla?\(|oklch\(|oklab\()/
// text-[0.95rem], z-[60], shadow-[…] — named scales exist for these
const ARBITRARY_SCALE =
  /(?:^|[\s:])(?:text|z|shadow|leading|tracking)-\[[^\]]+\]/

function classStrings(node) {
  if (node.type === "Literal" && typeof node.value === "string")
    return [node.value]
  if (node.type === "TemplateLiteral")
    return node.quasis.map((q) => q.value.cooked ?? "")
  return []
}

function isClassContext(node) {
  const parent = node.parent
  if (!parent) return false
  // className="…" / className={"…"} / className={`…`}
  if (parent.type === "JSXAttribute" && parent.name?.name === "className")
    return true
  if (
    parent.type === "JSXExpressionContainer" &&
    parent.parent?.type === "JSXAttribute" &&
    parent.parent.name?.name === "className"
  )
    return true
  // cn("…"), cva("…", { variants: { … "…" } }) — any string nested in the call
  let current = node
  while (current.parent) {
    current = current.parent
    if (
      current.type === "CallExpression" &&
      current.callee.type === "Identifier" &&
      (current.callee.name === "cn" || current.callee.name === "cva")
    )
      return true
    if (current.type.endsWith("Statement") || current.type === "Program")
      return false
  }
  return false
}

function makeRule(description, test, message) {
  return {
    meta: { type: "problem", docs: { description }, schema: [] },
    create(context) {
      const check = (node) => {
        if (!isClassContext(node)) return
        for (const value of classStrings(node)) {
          const match = test(value)
          if (match) context.report({ node, message: message(match) })
        }
      }
      return { Literal: check, TemplateLiteral: check }
    },
  }
}

export default {
  meta: { name: "trail" },
  rules: {
    "no-raw-colors": makeRule(
      "Use semantic color tokens, not Tailwind palette colors or literal color values",
      (value) =>
        value.match(RAW_PALETTE)?.[0]?.trim() ??
        value.match(RAW_ARBITRARY_COLOR)?.[0],
      (match) =>
        `"${match}" is a raw color. Use a semantic token (bg-primary, text-muted-foreground, border-border, bg-success/10 …).`
    ),
    "no-arbitrary-values": makeRule(
      "Use the named scales instead of arbitrary text / z-index / shadow values",
      (value) => value.match(ARBITRARY_SCALE)?.[0]?.trim(),
      (match) =>
        `"${match}" is an arbitrary value. Use the named scale (text-h1…text-caption, z-raised…z-toast, shadow-raised…shadow-modal).`
    ),
  },
}
