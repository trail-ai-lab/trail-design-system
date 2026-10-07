import { LanguagesIcon, MicIcon, SparklesIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

/**
 * Compact chip summarizing the session's language configuration.
 * `variant="spoken"` shows the languages being transcribed;
 * `variant="translation"` shows the target language transcripts are
 * translated into; `variant="detected"` shows the language auto-detected
 * from live audio.
 */
function LanguageChip({
  variant,
  languages,
  className,
}: {
  variant: "spoken" | "translation" | "detected"
  languages: string[]
  className?: string
}) {
  const Icon =
    variant === "spoken"
      ? MicIcon
      : variant === "detected"
        ? SparklesIcon
        : LanguagesIcon
  return (
    <Badge variant="outline" className={cn("text-muted-foreground", className)}>
      <Icon data-icon="inline-start" />
      {variant === "detected" && <span>Detected:</span>}
      <span className="text-foreground">{languages.join(" · ")}</span>
    </Badge>
  )
}

export { LanguageChip }
