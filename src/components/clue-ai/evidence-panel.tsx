"use client"

import * as React from "react"
import { FileSearchIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Separator } from "@/components/ui/separator"
import { SectionLabel } from "@/components/patterns/section-label"
import { useClueAiLabels } from "./lib/labels"

/** What kind of case file a document is; picks its icon. */
export type EvidenceKind =
  "record" | "transcript" | "voicemail" | "report" | "photo" | "financial"

export interface EvidenceDocument {
  id: string
  title: string
  /** The case file it comes from, e.g. "Voicemail_Transcript.pdf" */
  fileName: string
  kind: EvidenceKind
}

/**
 * The source behind a summary sentence, open beside the summary so players can
 * compare the two. Shows one document at a time: its title and file, which
 * sentences cite it, and its body (`children`, built from DetailList,
 * EvidenceTranscript and EvidenceFigure). With no `document` it shows how to
 * open one.
 */
function EvidencePanel({
  document,
  citedBy,
  onClose,
  children,
  className,
}: {
  document?: EvidenceDocument | null
  /** Sentence numbers that cite this document */
  citedBy?: number[]
  onClose?: () => void
  children?: React.ReactNode
  className?: string
}) {
  const labels = useClueAiLabels()
  if (!document) {
    return (
      <Card
        data-slot="evidence-panel"
        className={cn("justify-center", className)}
      >
        <CardContent className="p-0">
          <Empty className="p-4">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FileSearchIcon />
              </EmptyMedia>
              <EmptyTitle>{labels.evidence.emptyTitle}</EmptyTitle>
              <EmptyDescription>
                {labels.evidence.emptyDescription}
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      data-slot="evidence-panel"
      className={cn("min-h-0 gap-0 pb-0", className)}
    >
      <CardHeader className="pb-(--card-spacing)">
        <CardTitle>{document.title}</CardTitle>
        <CardDescription className="truncate font-mono text-caption">
          {document.fileName}
        </CardDescription>
        {onClose && (
          <CardAction>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onClose}
              aria-label={labels.evidence.close}
            >
              <XIcon />
            </Button>
          </CardAction>
        )}
      </CardHeader>
      {citedBy && citedBy.length > 0 && (
        <p className="px-(--card-spacing) pb-3 text-caption text-muted-foreground">
          {labels.evidence.citedBy({ count: citedBy.length })}{" "}
          <span className="font-medium text-foreground tabular-nums">
            {labels.common.list(citedBy.map(String))}
          </span>
        </p>
      )}
      <Separator />
      <CardContent
        role="region"
        aria-label={document.title}
        tabIndex={0}
        className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto py-(--card-spacing) outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
      >
        {children}
      </CardContent>
    </Card>
  )
}

/** A titled part of a document body, e.g. "Background" or "Timeline". */
function EvidenceSection({
  title,
  children,
  className,
}: {
  title: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      data-slot="evidence-section"
      className={cn("flex flex-col gap-2.5", className)}
    >
      <SectionLabel>{title}</SectionLabel>
      {children}
    </section>
  )
}

export interface EvidenceTranscriptLine {
  /** Who is speaking; omit for a continuation or a cue */
  speaker?: string
  text: React.ReactNode
  /** A sound or stage cue, e.g. "[pause, wind picks up]" */
  isCue?: boolean
  /** The passage the summary sentence draws on */
  isCited?: boolean
}

/**
 * Spoken evidence — an interview or voicemail — as speaker-labelled lines.
 * The cited passage is marked with a brand rule and tint so players can find
 * what the summary quoted, and compare the exact words.
 */
function EvidenceTranscript({
  lines,
  className,
}: {
  lines: EvidenceTranscriptLine[]
  className?: string
}) {
  const labels = useClueAiLabels()
  return (
    <div
      data-slot="evidence-transcript"
      className={cn("flex flex-col gap-1", className)}
    >
      {lines.map((line, i) =>
        line.isCue ? (
          <p
            key={i}
            className="px-3 py-1 text-caption text-muted-foreground italic"
          >
            {line.text}
          </p>
        ) : (
          <div
            key={i}
            data-cited={line.isCited || undefined}
            className="relative flex flex-col gap-0.5 rounded-lg px-3 py-2 data-cited:bg-primary/5 data-cited:before:absolute data-cited:before:inset-y-2 data-cited:before:left-0 data-cited:before:w-0.5 data-cited:before:rounded-full data-cited:before:bg-primary"
          >
            {(line.speaker || line.isCited) && (
              <div className="flex items-center justify-between gap-2">
                {line.speaker && (
                  <span className="text-caption font-medium text-muted-foreground">
                    {line.speaker}
                  </span>
                )}
                {line.isCited && (
                  <span className="ml-auto text-caption font-medium text-primary">
                    {labels.evidence.citedInSummary}
                  </span>
                )}
              </div>
            )}
            <p className="text-body-sm leading-relaxed">{line.text}</p>
          </div>
        )
      )}
    </div>
  )
}

/** A photo or scanned exhibit with its caption. */
function EvidenceFigure({
  src,
  alt,
  caption,
  className,
}: {
  src: string
  alt: string
  caption?: React.ReactNode
  className?: string
}) {
  return (
    <figure
      data-slot="evidence-figure"
      className={cn("flex flex-col gap-2", className)}
    >
      <img
        src={src}
        alt={alt}
        className="w-full rounded-xl border border-border bg-muted object-cover"
      />
      {caption && (
        <figcaption className="text-caption text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export { EvidencePanel, EvidenceSection, EvidenceTranscript, EvidenceFigure }
