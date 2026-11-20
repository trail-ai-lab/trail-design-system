"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useControllableState } from "@/lib/use-controllable-state"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { SummarySentence } from "./summary-sentence"
import {
  CLASSIFICATIONS,
  CLASSIFICATION_ORDER,
  type Classification,
  type SummarySentenceData,
} from "./lib/case"
import { useClueAiLabels } from "./lib/labels"

export type SummaryClassifications = Record<string, Classification | null>

/**
 * The AI's summary of one suspect, sentence by sentence — the heart of the
 * game. Players open each sentence's source, then mark it Accurate,
 * Misrepresentation or Hallucination. The header tallies progress and how many
 * of each label they've used.
 *
 * Pass `answers` after the verdict to turn the card into the answer key: each
 * row shows whether the pick was right, and the header shows the score.
 */
function AiSummaryCard({
  suspectName,
  sentences,
  value: valueProp,
  defaultValue,
  onValueChange,
  activeSentenceId,
  onCheckSource,
  disabled = false,
  answers,
  notice,
  footer,
  className,
}: {
  suspectName: string
  sentences: SummarySentenceData[]
  /** Classification per sentence id */
  value?: SummaryClassifications
  defaultValue?: SummaryClassifications
  onValueChange?: (value: SummaryClassifications) => void
  /** Sentence whose source is open in the evidence panel */
  activeSentenceId?: string
  /** Opens a sentence's source document */
  onCheckSource?: (sentenceId: string) => void
  /** Locks every picker (timer ran out, verdict submitted) */
  disabled?: boolean
  /** Correct classification per sentence id; shows the answer key */
  answers?: Record<string, Classification>
  /** Shown above the sentences, e.g. a "timer ended" Alert */
  notice?: React.ReactNode
  /** Shown under the sentences, e.g. the verdict action */
  footer?: React.ReactNode
  className?: string
}) {
  const labels = useClueAiLabels()
  const [value, setValue] = useControllableState<SummaryClassifications>({
    value: valueProp,
    defaultValue: defaultValue ?? {},
    onChange: onValueChange,
  })

  const total = sentences.length
  const classified = sentences.filter((s) => value[s.id]).length
  const correct = answers
    ? sentences.filter((s) => value[s.id] && value[s.id] === answers[s.id])
        .length
    : 0
  const counts = CLASSIFICATION_ORDER.map((classification) => ({
    classification,
    count: sentences.filter((s) => value[s.id] === classification).length,
  }))
  const progress = answers ? correct : classified

  return (
    <Card data-slot="ai-summary-card" className={className}>
      <CardHeader>
        <CardTitle>
          {labels.aiSummary.title({ suspect: suspectName })}
        </CardTitle>
        <CardDescription>
          {answers
            ? labels.aiSummary.answerKeyDescription
            : labels.aiSummary.description({ suspect: suspectName })}
        </CardDescription>
        <CardAction>
          <span className="text-body-sm font-medium tabular-nums">
            {progress}
            <span className="text-muted-foreground">/{total}</span>
          </span>
          <span className="sr-only">
            {answers
              ? labels.aiSummary.correctSuffix
              : labels.aiSummary.classifiedSuffix}
          </span>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Progress
          value={total ? (progress / total) * 100 : 0}
          aria-label={
            answers
              ? labels.aiSummary.progressCorrect
              : labels.aiSummary.progressClassified
          }
          className="h-1.5 *:bg-foreground"
        />
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-caption text-muted-foreground">
          {counts.map(({ classification, count }) => {
            const meta = CLASSIFICATIONS[classification]
            const Icon = meta.icon
            return (
              <li key={classification} className="flex items-center gap-1.5">
                <Icon
                  aria-hidden
                  className={cn("size-3.5", toneTextClassName[meta.tone])}
                />
                {labels.classifications[classification].label}
                <span className="font-medium text-foreground tabular-nums">
                  {count}
                </span>
              </li>
            )
          })}
        </ul>
      </CardContent>
      <Separator />
      <CardContent className="flex flex-col gap-3">
        {notice}
        <ol className="-mx-3 flex flex-col gap-0.5">
          {sentences.map((sentence, i) => (
            <SummarySentence
              key={sentence.id}
              index={i + 1}
              text={sentence.text}
              value={value[sentence.id] ?? null}
              onValueChange={(next) =>
                setValue({ ...value, [sentence.id]: next })
              }
              isActive={sentence.id === activeSentenceId}
              onCheckSource={
                onCheckSource ? () => onCheckSource(sentence.id) : undefined
              }
              disabled={disabled}
              answer={answers?.[sentence.id]}
            />
          ))}
        </ol>
      </CardContent>
      {footer && (
        <CardFooter className="flex-col items-stretch">{footer}</CardFooter>
      )}
    </Card>
  )
}

const toneTextClassName = {
  success: "text-success",
  warning: "text-warning",
  destructive: "text-destructive",
} as const

export { AiSummaryCard }
