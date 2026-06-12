import { LanguagesIcon, MicIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

/**
 * Compact chip summarizing the session's language configuration.
 * `kind="spoken"` shows the languages being transcribed; `kind="translation"`
 * shows the target language transcripts are translated into.
 */
function LanguageChip({
  kind,
  languages,
  className,
}: {
  kind: "spoken" | "translation"
  languages: string[]
  className?: string
}) {
  const Icon = kind === "spoken" ? MicIcon : LanguagesIcon
  return (
    <Badge variant="outline" className={cn("text-muted-foreground", className)}>
      <Icon data-icon="inline-start" />
      <span className="text-foreground">{languages.join(" · ")}</span>
    </Badge>
  )
}

export { LanguageChip }
