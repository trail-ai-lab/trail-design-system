"use client"

import { CircleDashedIcon } from "lucide-react"

import { StatusBadge } from "@/components/patterns/status-badge"
import { CLASSIFICATIONS, type Classification } from "./lib/case"
import { useClueAiLabels } from "./lib/labels"

/**
 * A sentence's classification as a tinted pill with its icon: Accurate,
 * Misrepresentation or Hallucination. With no `classification` it reads
 * "Not classified". Used wherever a pick is shown rather than made — a
 * partner's choice, the answer key, the suspect board.
 */
function ClassificationBadge({
  classification,
  showIcon = true,
  className,
}: {
  classification?: Classification | null
  showIcon?: boolean
  className?: string
}) {
  const labels = useClueAiLabels()
  if (!classification) {
    return (
      <StatusBadge
        data-slot="classification-badge"
        tone="muted"
        icon={showIcon ? CircleDashedIcon : undefined}
        className={className}
      >
        {labels.notClassified}
      </StatusBadge>
    )
  }
  const meta = CLASSIFICATIONS[classification]
  return (
    <StatusBadge
      data-slot="classification-badge"
      tone={meta.tone}
      icon={showIcon ? meta.icon : undefined}
      className={className}
    >
      {labels.classifications[classification].label}
    </StatusBadge>
  )
}

export { ClassificationBadge }
