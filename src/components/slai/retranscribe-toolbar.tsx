"use client"

import { RefreshCwIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { LanguageMultiSelect } from "@/components/slai/language-multi-select"

/**
 * Toolbar above a recorded transcript to run transcription again with
 * different spoken languages. `loading` shows "Transcribing audio…".
 */
function RetranscribeToolbar({
  languages,
  value,
  onChange,
  onRetranscribe,
  loading = false,
  className,
}: {
  languages: string[]
  value: string[]
  onChange: (value: string[]) => void
  onRetranscribe?: () => void
  loading?: boolean
  className?: string
}) {
  return (
    <div className={cn("flex flex-wrap items-start gap-3", className)}>
      <LanguageMultiSelect
        className="min-w-56 flex-1"
        options={languages}
        value={value}
        onChange={onChange}
        placeholder="Languages spoken"
        disabled={loading}
      />
      <Button variant="outline" disabled={loading} onClick={onRetranscribe}>
        {loading ? (
          <Spinner data-icon="inline-start" />
        ) : (
          <RefreshCwIcon data-icon="inline-start" />
        )}
        {loading ? "Transcribing audio..." : "Retranscribe"}
      </Button>
    </div>
  )
}

export { RetranscribeToolbar }
