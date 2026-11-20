"use client"

import { FileTextIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { CitedDocument } from "./lib/case"
import { useClueAiLabels } from "./lib/labels"

/**
 * The case files a message or rationale relies on, as small chips. With
 * `onOpen` each chip opens that file in the source panel; without it they're
 * plain labels.
 */
function CitedDocuments({
  documents,
  onOpen,
  activeDocumentId,
  className,
}: {
  documents: CitedDocument[]
  onOpen?: (documentId: string) => void
  /** The file open in the source panel right now */
  activeDocumentId?: string
  className?: string
}) {
  const labels = useClueAiLabels()
  if (documents.length === 0) return null
  return (
    <ul
      data-slot="cited-documents"
      aria-label={labels.evidence.citedFiles}
      className={cn("flex flex-wrap gap-1.5", className)}
    >
      {documents.map((document) => (
        <li key={document.id}>
          {onOpen ? (
            <Button
              variant="outline"
              size="xs"
              aria-pressed={document.id === activeDocumentId}
              onClick={() => onOpen(document.id)}
              className="font-normal text-muted-foreground aria-pressed:border-primary aria-pressed:text-foreground"
            >
              <FileTextIcon data-icon="inline-start" />
              {document.title}
            </Button>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-0.5 text-caption text-muted-foreground">
              <FileTextIcon aria-hidden className="size-3" />
              {document.title}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}

export { CitedDocuments }
