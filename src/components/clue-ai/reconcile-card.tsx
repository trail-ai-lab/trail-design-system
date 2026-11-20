"use client"

import * as React from "react"
import { FileSearchIcon, HandshakeIcon, MessageCircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useControllableState } from "@/lib/use-controllable-state"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { StatusBadge } from "@/components/patterns/status-badge"
import type { SummaryClassifications } from "./ai-summary-card"
import { ClassificationBadge } from "./classification-badge"
import { ClassificationPicker } from "./classification-picker"
import { CitedDocuments } from "./cited-documents"
import {
  classificationHighlightClassName,
  playerLabel,
  type Classification,
  type Player,
  type Rationale,
  type SummarySentenceData,
} from "./lib/case"
import { AiTag, PlayerAvatar } from "./player-avatar"

/** Each player's classification per sentence: `picks[sentenceId][playerId]`. */
export type PlayerPicks = Record<string, Record<string, Classification | null>>

export type ReconcileFilter = "disagreements" | "all"

/** Why each player made their call: `rationales[sentenceId][playerId]`. */
export type PlayerRationales = Record<string, Record<string, Rationale>>

/**
 * Partners compare their solo classifications and agree on one team answer per
 * sentence. Each row shows both picks; rows where they differ are flagged and
 * shown first by default. Agreed rows start with the shared answer filled in.
 *
 * With an AI teammate, pass its `rationales` so each of its picks shows the
 * reasoning and files behind it, and `onDiscuss` to raise a sentence in chat.
 */
function ReconcileCard({
  suspectName,
  sentences,
  players,
  picks,
  value: valueProp,
  defaultValue,
  onValueChange,
  filter: filterProp,
  defaultFilter = "disagreements",
  onFilterChange,
  activeSentenceId,
  onCheckSource,
  rationales,
  onOpenDocument,
  discussingSentenceId,
  onDiscuss,
  disabled = false,
  footer,
  className,
}: {
  suspectName: string
  sentences: SummarySentenceData[]
  players: Player[]
  picks: PlayerPicks
  /** Team answer per sentence id */
  value?: SummaryClassifications
  defaultValue?: SummaryClassifications
  onValueChange?: (value: SummaryClassifications) => void
  filter?: ReconcileFilter
  defaultFilter?: ReconcileFilter
  onFilterChange?: (filter: ReconcileFilter) => void
  activeSentenceId?: string
  onCheckSource?: (sentenceId: string) => void
  /** Each player's reasoning per sentence, usually just the AI teammate's */
  rationales?: PlayerRationales
  /** Opens a cited file in the source panel */
  onOpenDocument?: (documentId: string) => void
  /** The sentence the chat is about right now */
  discussingSentenceId?: string
  /** Raise a sentence in the partner chat */
  onDiscuss?: (sentenceId: string) => void
  /** Deliberation time ran out, or the team answers were submitted */
  disabled?: boolean
  footer?: React.ReactNode
  className?: string
}) {
  const agreedAnswer = React.useCallback(
    (id: string) => {
      const values = players.map((p) => picks[id]?.[p.id] ?? null)
      return values.every((v) => v && v === values[0]) ? values[0] : null
    },
    [picks, players]
  )
  const [value, setValue] = useControllableState<SummaryClassifications>({
    value: valueProp,
    defaultValue:
      defaultValue ??
      Object.fromEntries(sentences.map((s) => [s.id, agreedAnswer(s.id)])),
    onChange: onValueChange,
  })
  const [filter, setFilter] = useControllableState<ReconcileFilter>({
    value: filterProp,
    defaultValue: defaultFilter,
    onChange: onFilterChange,
  })

  const numbered = sentences.map((sentence, i) => ({
    sentence,
    index: i + 1,
    isConflict: agreedAnswer(sentence.id) === null,
  }))
  const conflicts = numbered.filter((row) => row.isConflict)
  const resolved = sentences.filter((s) => value[s.id]).length
  const visible = filter === "all" ? numbered : conflicts
  const partner = players.find((p) => !p.isYou)

  return (
    <Card data-slot="reconcile-card" className={className}>
      <CardHeader>
        <CardTitle>Agree on the team answers</CardTitle>
        <CardDescription>
          {conflicts.length === 0
            ? `You and ${partner ? playerLabel(partner) : "your partner"} classified every sentence about ${suspectName} the same way.`
            : `You and ${partner ? playerLabel(partner) : "your partner"} disagreed on ${conflicts.length} of ${sentences.length} sentences. Check the source together, then pick one answer for each.`}
        </CardDescription>
        <CardAction>
          <span className="text-body-sm font-medium tabular-nums">
            {resolved}
            <span className="text-muted-foreground">/{sentences.length}</span>
          </span>
          <span className="sr-only"> agreed</span>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ToggleGroup
          type="single"
          variant="outline"
          size="sm"
          spacing={0}
          value={filter}
          onValueChange={(next) => next && setFilter(next as ReconcileFilter)}
          aria-label="Show sentences"
        >
          <ToggleGroupItem value="disagreements">
            Disagreements
            <span className="text-muted-foreground tabular-nums">
              {conflicts.length}
            </span>
          </ToggleGroupItem>
          <ToggleGroupItem value="all">
            All sentences
            <span className="text-muted-foreground tabular-nums">
              {sentences.length}
            </span>
          </ToggleGroupItem>
        </ToggleGroup>
      </CardContent>
      <Separator />
      <CardContent>
        {visible.length === 0 ? (
          <Empty className="p-4">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <HandshakeIcon />
              </EmptyMedia>
              <EmptyTitle>No disagreements</EmptyTitle>
              <EmptyDescription>
                Every team answer is already settled. Review all sentences or
                move on to the team verdict.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ol className="-mx-3 flex flex-col gap-0.5">
            {visible.map(({ sentence, index, isConflict }) => (
              <ReconcileSentence
                key={sentence.id}
                index={index}
                text={sentence.text}
                players={players}
                picks={picks[sentence.id] ?? {}}
                isConflict={isConflict}
                value={value[sentence.id] ?? null}
                onValueChange={(next) =>
                  setValue({ ...value, [sentence.id]: next })
                }
                isActive={sentence.id === activeSentenceId}
                onCheckSource={
                  onCheckSource ? () => onCheckSource(sentence.id) : undefined
                }
                rationales={rationales?.[sentence.id]}
                onOpenDocument={onOpenDocument}
                isDiscussing={sentence.id === discussingSentenceId}
                onDiscuss={onDiscuss ? () => onDiscuss(sentence.id) : undefined}
                disabled={disabled}
              />
            ))}
          </ol>
        )}
      </CardContent>
      {footer && (
        <CardFooter className="flex-col items-stretch">{footer}</CardFooter>
      )}
    </Card>
  )
}

/**
 * One sentence in the comparison: both players' picks side by side, and the
 * team answer picker. A disagreement is flagged with a warning badge.
 */
function ReconcileSentence({
  index,
  text,
  players,
  picks,
  isConflict,
  value,
  onValueChange,
  isActive = false,
  onCheckSource,
  rationales,
  onOpenDocument,
  isDiscussing = false,
  onDiscuss,
  disabled = false,
  className,
}: {
  index: number
  text: React.ReactNode
  players: Player[]
  /** Classification per player id */
  picks: Record<string, Classification | null>
  isConflict: boolean
  value: Classification | null
  onValueChange: (value: Classification | null) => void
  isActive?: boolean
  onCheckSource?: () => void
  /** Reasoning per player id */
  rationales?: Record<string, Rationale>
  onOpenDocument?: (documentId: string) => void
  /** This sentence is the chat's current topic */
  isDiscussing?: boolean
  onDiscuss?: () => void
  disabled?: boolean
  className?: string
}) {
  return (
    <li
      data-slot="reconcile-sentence"
      data-active={isActive || isDiscussing || undefined}
      data-conflict={isConflict || undefined}
      className={cn(
        "flex gap-3 rounded-xl px-3 py-3 transition-colors duration-fast ease-standard hover:bg-muted/50 data-active:bg-transparent data-active:inset-ring-2 data-active:inset-ring-primary/30",
        className
      )}
    >
      <span
        aria-hidden
        className="w-5 shrink-0 pt-0.5 text-right text-caption text-muted-foreground tabular-nums"
      >
        {index}
      </span>
      <div className="@container flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex items-start gap-3">
          <p className="flex-1 text-body-sm leading-relaxed">
            <span className="sr-only">Sentence {index}: </span>
            <mark
              className={cn(
                "rounded-sm bg-transparent box-decoration-clone px-0.5 text-inherit transition-colors duration-base ease-standard",
                value && classificationHighlightClassName[value]
              )}
            >
              {text}
            </mark>
          </p>
          {isConflict ? (
            <StatusBadge tone="warning" dot>
              Disagree
            </StatusBadge>
          ) : (
            <StatusBadge tone="muted">Agreed</StatusBadge>
          )}
        </div>
        <ul className="flex flex-col gap-1.5 rounded-lg border border-border px-3 py-2">
          {players.map((player) => {
            const rationale = rationales?.[player.id]
            return (
              <li key={player.id} className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <PlayerAvatar player={player} size="sm" />
                  <span className="flex items-center gap-1.5 text-body-sm">
                    {playerLabel(player)}
                    {player.isAi && <AiTag />}
                  </span>
                  <ClassificationBadge
                    classification={picks[player.id]}
                    className="ml-auto"
                  />
                </div>
                {rationale && (
                  <div className="flex flex-col gap-1.5 pb-1 pl-8">
                    <p className="text-body-sm text-muted-foreground">
                      {rationale.text}
                    </p>
                    {rationale.documents && (
                      <CitedDocuments
                        documents={rationale.documents}
                        onOpen={onOpenDocument}
                      />
                    )}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="-ml-2 flex items-center gap-1">
            {onCheckSource && (
              <Button
                variant="ghost"
                size="xs"
                onClick={onCheckSource}
                aria-pressed={isActive}
                className="text-muted-foreground aria-pressed:text-foreground"
              >
                <FileSearchIcon data-icon="inline-start" />
                {isActive ? "Viewing source" : "Check source"}
              </Button>
            )}
            {onDiscuss && (
              <Button
                variant="ghost"
                size="xs"
                onClick={onDiscuss}
                aria-pressed={isDiscussing}
                className="text-muted-foreground aria-pressed:text-foreground"
              >
                <MessageCircleIcon data-icon="inline-start" />
                {isDiscussing ? "Discussing" : "Discuss"}
              </Button>
            )}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-caption text-muted-foreground">Team</span>
            <ClassificationPicker
              value={value}
              onValueChange={onValueChange}
              disabled={disabled}
              aria-label={`Team answer for sentence ${index}`}
            />
          </div>
        </div>
      </div>
    </li>
  )
}

export { ReconcileCard, ReconcileSentence }
