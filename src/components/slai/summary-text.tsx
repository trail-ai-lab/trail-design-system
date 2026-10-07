import { cn } from "@/lib/utils"

/**
 * Renders generated summary text: lines starting with "-", "*" or "•"
 * become a bullet list, everything else a paragraph. Shared by the live
 * summary, earlier phases and the post-session summary.
 */
function SummaryText({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const blocks: Array<{ type: "p" | "ul"; lines: string[] }> = []
  for (const raw of text.split("\n")) {
    const line = raw.trim()
    if (!line) continue
    const bullet = line.match(/^[-*•]\s+(.*)$/)
    const last = blocks[blocks.length - 1]
    if (bullet) {
      if (last?.type === "ul") last.lines.push(bullet[1])
      else blocks.push({ type: "ul", lines: [bullet[1]] })
    } else {
      blocks.push({ type: "p", lines: [line] })
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-2 text-sm leading-relaxed text-foreground",
        className
      )}
    >
      {blocks.map((block, index) =>
        block.type === "ul" ? (
          <ul key={index} className="flex list-disc flex-col gap-1 pl-5">
            {block.lines.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        ) : (
          <p key={index}>{block.lines[0]}</p>
        )
      )}
    </div>
  )
}

export { SummaryText }
