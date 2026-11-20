"use client"

import { CheckIcon, FileSearchIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ClassificationBadge } from "./classification-badge"
import { ClassificationPicker } from "./classification-picker"
import {
  CLASSIFICATIONS,
  classificationHighlightClassName,
  type Classification,
} from "./lib/case"

/**
 * One sentence of the AI summary, as a row: its number, the sentence (tinted
 * like a highlighter once classified), a "Check source" button that opens the
 * evidence it came from, and the classification picker.
 *
 * With `answer` the row shows the answer key instead of the picker: the
 * player's pick, whether it was right, and the correct label when it wasn't.
 */
function SummarySentence({
  index,
  text,
  value,
  defaultValue,
  onValueChange,
  isActive = false,
  onCheckSource,
  disabled = false,
  answer,
  className,
}: {
  /** 1-based position in the summary */
  index: number
  text: React.ReactNode
  value?: Classification | null
  defaultValue?: Classification | null
  onValueChange?: (value: Classification | null) => void
  /** Its source is the one open in the evidence panel */
  isActive?: boolean
  /** Opens the sentence's source; omit when it has none */
  onCheckSource?: () => void
  /** Picks are locked (timer ran out, or already submitted) */
  disabled?: boolean
  /** The correct classification; switches the row to answer-key mode */
  answer?: Classification
  className?: string
}) {
  const isAnswerKey = answer !== undefined
  // In answer-key mode the highlight shows the truth, not the guess.
  const highlight = isAnswerKey ? answer : value
  const isCorrect = isAnswerKey && value === answer

  return (
    <li
      data-slot="summary-sentence"
      data-active={isActive || undefined}
      className={cn(
        "group/sentence flex gap-3 rounded-xl px-3 py-3 transition-colors duration-fast ease-standard hover:bg-muted/50 data-active:bg-muted",
        className
      )}
    >
      <span
        aria-hidden
        className="w-5 shrink-0 pt-0.5 text-right text-caption text-muted-foreground tabular-nums"
      >
        {index}
      </span>
      <div className="@container flex min-w-0 flex-1 flex-col gap-2.5">
        <p className="text-body-sm leading-relaxed">
          <span className="sr-only">Sentence {index}: </span>
          <mark
            className={cn(
              "rounded-sm bg-transparent box-decoration-clone px-0.5 text-inherit transition-colors duration-base ease-standard",
              highlight && classificationHighlightClassName[highlight]
            )}
          >
            {text}
          </mark>
        </p>
        <div className="flex flex-wrap items-center justify-between gap-2">
          {onCheckSource ? (
            <Button
              variant="ghost"
              size="xs"
              onClick={onCheckSource}
              aria-pressed={isActive}
              className="-ml-2 text-muted-foreground aria-pressed:text-foreground"
            >
              <FileSearchIcon data-icon="inline-start" />
              {isActive ? "Viewing source" : "Check source"}
            </Button>
          ) : (
            <span />
          )}
          {isAnswerKey ? (
            <AnswerKeyResult
              value={value}
              answer={answer}
              isCorrect={isCorrect}
            />
          ) : (
            <ClassificationPicker
              value={value}
              defaultValue={defaultValue}
              onValueChange={onValueChange}
              disabled={disabled}
              aria-label={`Classify sentence ${index}`}
              className="ml-auto"
            />
          )}
        </div>
      </div>
    </li>
  )
}

function AnswerKeyResult({
  value,
  answer,
  isCorrect,
}: {
  value?: Classification | null
  answer: Classification
  isCorrect: boolean
}) {
  return (
    <div className="ml-auto flex flex-wrap items-center justify-end gap-2 text-caption">
      {isCorrect ? (
        <span className="flex items-center gap-1 font-medium text-success">
          <CheckIcon className="size-3.5" aria-hidden />
          Correct
        </span>
      ) : (
        <>
          <span className="flex items-center gap-1 font-medium text-destructive">
            <XIcon className="size-3.5" aria-hidden />
            You said
          </span>
          <ClassificationBadge classification={value} showIcon={false} />
          <span className="text-muted-foreground">
            · it was {CLASSIFICATIONS[answer].label.toLowerCase()}
          </span>
        </>
      )}
      {isCorrect && <ClassificationBadge classification={answer} />}
    </div>
  )
}

export { SummarySentence }
