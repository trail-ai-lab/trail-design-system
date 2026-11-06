"use client"

import * as React from "react"
import { CornerDownLeftIcon, FileTextIcon, SparklesIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Spinner } from "@/components/ui/spinner"

/** A course material an answer drew on, e.g. "Unit 3 slides", "p. 12". */
export interface ChatMaterialSource {
  id?: string
  name: string
  /** Section heading, shown once the answer's evidence is expanded */
  section?: string
  /** Where in it, e.g. "p. 12" or "slide 4" */
  location?: string
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp?: string
  /** Transcript excerpts or groups the answer drew on, shown as chips */
  sources?: string[]
  /** Course materials the answer drew on, shown as chips with a document icon */
  materials?: ChatMaterialSource[]
  /** Transcript entry id the answer points to; makes the row clickable
   * (with `onMessageClick`, when the answer has no `sources` to click) */
  highlight?: string
}

/** Chips shown before "Show more"; each also stays on one line until then. */
const VISIBLE_EVIDENCE = 3

/** One line while collapsed, the full text once expanded. */
function chipClassName(expanded: boolean) {
  return cn(
    "max-w-full justify-start text-left font-normal",
    expanded && "h-auto py-1 wrap-anywhere whitespace-normal"
  )
}

function SourceChip({
  source,
  expanded,
  onClick,
}: {
  source: string
  expanded: boolean
  onClick?: () => void
}) {
  const text = expanded ? (
    source
  ) : (
    <span data-evidence-text className="truncate">
      {source}
    </span>
  )
  if (!onClick) {
    return (
      <Badge
        variant="outline"
        className={chipClassName(expanded)}
        title={expanded ? undefined : source}
      >
        {text}
      </Badge>
    )
  }
  return (
    <Badge
      variant="outline"
      className={cn(chipClassName(expanded), "cursor-pointer hover:bg-muted")}
      asChild
    >
      <button
        type="button"
        onClick={onClick}
        aria-label={`Show in transcript: ${source}`}
        title={expanded ? undefined : source}
      >
        {text}
      </button>
    </Badge>
  )
}

function MaterialChip({
  material,
  expanded,
}: {
  material: ChatMaterialSource
  expanded: boolean
}) {
  const { name, section, location } = material
  const full = [name, section, location].filter(Boolean).join(" · ")
  return (
    <Badge
      variant="outline"
      className={cn(chipClassName(expanded), expanded && "items-start")}
      title={expanded ? undefined : full}
    >
      <FileTextIcon
        data-icon="inline-start"
        className={cn("shrink-0", expanded && "mt-0.5")}
        aria-hidden
      />
      {expanded ? (
        <span>{full}</span>
      ) : (
        <>
          <span data-evidence-text className="truncate">
            {name}
          </span>
          {/* The file name gives way first, so the page stays readable. */}
          {location && <span className="shrink-0">· {location}</span>}
        </>
      )}
    </Badge>
  )
}

/**
 * An answer's evidence, kept small so the answer stays the thing to read:
 * a few one-line chips, and "Show more" for the rest and their full text.
 */
function AnswerEvidence({
  message,
  onSourceClick,
}: {
  message: ChatMessage
  onSourceClick?: (message: ChatMessage, index: number) => void
}) {
  const sources = message.sources ?? []
  const materials = message.materials ?? []
  const [expanded, setExpanded] = React.useState(false)
  const [clipped, setClipped] = React.useState(false)
  const listRef = React.useRef<HTMLDivElement>(null)

  // Always leave room for one material, so a long list of passages can't hide
  // that the answer also drew on the teacher's documents.
  const shownMaterials = expanded
    ? materials.length
    : Math.min(materials.length, Math.max(1, VISIBLE_EVIDENCE - sources.length))
  const shownSources = expanded
    ? sources.length
    : Math.min(sources.length, VISIBLE_EVIDENCE - shownMaterials)
  const hidden =
    sources.length + materials.length - shownSources - shownMaterials

  React.useEffect(() => {
    const list = listRef.current
    if (!list || expanded) return
    const measure = () =>
      setClipped(
        Array.from(list.querySelectorAll("[data-evidence-text]")).some(
          (text) => text.scrollWidth > text.clientWidth
        )
      )
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    return () => observer.disconnect()
  }, [expanded, shownSources, shownMaterials])

  return (
    <div ref={listRef} className="flex flex-wrap items-center gap-1">
      {sources.slice(0, shownSources).map((source, index) => (
        <SourceChip
          key={`${index}-${source}`}
          source={source}
          expanded={expanded}
          onClick={onSourceClick && (() => onSourceClick(message, index))}
        />
      ))}
      {materials.slice(0, shownMaterials).map((material) => (
        <MaterialChip
          key={`${material.id ?? material.name}-${material.section ?? ""}-${material.location ?? ""}`}
          material={material}
          expanded={expanded}
        />
      ))}
      {(expanded || hidden > 0 || clipped) && (
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
          className="cursor-pointer rounded-md px-1 text-xs text-muted-foreground underline-offset-4 outline-none hover:text-foreground hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {expanded
            ? "Show less"
            : hidden > 0
              ? `Show ${hidden} more`
              : "Show more"}
        </button>
      )}
    </div>
  )
}

function ChatRow({
  message,
  onMessageClick,
  onSourceClick,
}: {
  message: ChatMessage
  onMessageClick?: (message: ChatMessage) => void
  onSourceClick?: (message: ChatMessage, index: number) => void
}) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <p className="max-w-5/6 rounded-2xl bg-primary px-3.5 py-2 text-sm leading-relaxed wrap-anywhere text-primary-foreground">
          {message.content}
        </p>
      </div>
    )
  }
  const hasSources = Boolean(message.sources && message.sources.length > 0)
  // Clickable source chips replace the clickable answer.
  const clickable = Boolean(
    message.highlight && onMessageClick && !(hasSources && onSourceClick)
  )
  return (
    <div className="flex gap-3">
      <Avatar size="sm" aria-hidden>
        <AvatarFallback>
          <SparklesIcon className="size-3 text-primary" />
        </AvatarFallback>
      </Avatar>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {clickable ? (
          <button
            type="button"
            onClick={() => onMessageClick?.(message)}
            className="cursor-pointer rounded-md text-left text-sm leading-relaxed wrap-anywhere text-foreground underline-offset-4 outline-none hover:underline focus-visible:underline focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {message.content}
          </button>
        ) : (
          <p className="text-sm leading-relaxed wrap-anywhere text-foreground">
            {message.content}
          </p>
        )}
        {(hasSources ||
          (message.materials && message.materials.length > 0)) && (
          <AnswerEvidence message={message} onSourceClick={onSourceClick} />
        )}
      </div>
    </div>
  )
}

function MaterialsLine({
  materials,
  onClick,
}: {
  materials: { ready: number; processing?: number }
  onClick?: () => void
}) {
  const { ready, processing = 0 } = materials
  const label =
    ready === 0 && processing === 0
      ? "Transcript only"
      : `Transcript + ${ready} course material${ready === 1 ? "" : "s"}`
  const action =
    ready === 0 && processing === 0 ? "Add course materials" : undefined
  return (
    <span data-slot="materials-line" className="flex flex-wrap gap-x-1">
      <span>
        {label}
        {processing > 0 && ` · ${processing} processing`}
        {onClick && " ·"}
      </span>
      {onClick && (
        <button
          type="button"
          onClick={onClick}
          className="cursor-pointer rounded-sm text-primary underline-offset-4 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {action ?? "Manage"}
        </button>
      )}
    </span>
  )
}

/**
 * Q&A over the live transcript as a chat thread, with the question
 * input pinned to the bottom of the card.
 */
function SessionChatCard({
  messages,
  onSend,
  scopeLabel,
  placeholder,
  loading = false,
  suggestions = [],
  welcomeMessage,
  onMessageClick,
  onSourceClick,
  showDisclaimer = false,
  materials,
  onMaterialsClick,
  className,
}: {
  messages: ChatMessage[]
  onSend?: (text: string) => void
  /** Label of the active scope, e.g. "Group 1" or "All groups" */
  scopeLabel?: string
  placeholder?: string
  /** Shows a spinner row while the assistant is answering */
  loading?: boolean
  /** Suggested questions shown in the empty state */
  suggestions?: string[]
  /** Assistant greeting pinned at the top of the thread */
  welcomeMessage?: string
  /** Called when an assistant message with a `highlight` is clicked. With
   * `onSourceClick`, only answers without `sources` are clickable. */
  onMessageClick?: (message: ChatMessage) => void
  /** Makes each of an answer's `sources` chips a button, e.g. to show that
   * passage in the transcript; called with the answer and the chip's index */
  onSourceClick?: (message: ChatMessage, index: number) => void
  /** Footer reminding that AI answers can be wrong */
  showDisclaimer?: boolean
  /** Course materials Q&A can draw on; shows a line under the title */
  materials?: { ready: number; processing?: number }
  /** Makes the materials line a button, e.g. to open `UploadMaterialsSheet` */
  onMaterialsClick?: () => void
  className?: string
}) {
  const resolvedPlaceholder =
    placeholder ??
    (scopeLabel ? `Ask about ${scopeLabel}...` : "Ask about the session…")
  const [question, setQuestion] = React.useState("")
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const submit = (text: string) => {
    if (!text.trim()) return
    onSend?.(text.trim())
    setQuestion("")
  }

  React.useEffect(() => {
    const viewport = scrollRef.current?.querySelector(
      '[data-slot="scroll-area-viewport"]'
    )
    viewport?.scrollTo({ top: viewport.scrollHeight })
  }, [messages.length, loading])

  return (
    <Card className={cn("flex min-h-0 flex-col", className)}>
      <CardHeader>
        <CardTitle>Ask SLAI</CardTitle>
        {materials && (
          <CardDescription>
            <MaterialsLine materials={materials} onClick={onMaterialsClick} />
          </CardDescription>
        )}
        {scopeLabel && (
          <CardAction>
            <Badge variant="secondary">{scopeLabel}</Badge>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col p-0">
        {/* Radix wraps the content in a `display: table` box that grows to fit
            its widest line instead of wrapping it; keep it at the card's width. */}
        <ScrollArea
          ref={scrollRef}
          className="min-h-0 flex-1 [&_[data-slot=scroll-area-viewport]>div]:block!"
        >
          {messages.length === 0 && !loading && !welcomeMessage ? (
            <Empty className="h-full">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <SparklesIcon />
                </EmptyMedia>
                <EmptyTitle>Ask about this session</EmptyTitle>
                <EmptyDescription>
                  Ask anything about what {scopeLabel ?? "your students"}{" "}
                  {scopeLabel ? "is" : "are"} discussing.
                </EmptyDescription>
              </EmptyHeader>
              {suggestions.length > 0 && (
                <EmptyContent className="flex-row flex-wrap justify-center gap-1.5">
                  {suggestions.map((suggestion) => (
                    <Badge
                      key={suggestion}
                      variant="outline"
                      className="h-auto py-1 font-normal whitespace-normal hover:bg-muted"
                      asChild
                    >
                      <button type="button" onClick={() => submit(suggestion)}>
                        {suggestion}
                      </button>
                    </Badge>
                  ))}
                </EmptyContent>
              )}
            </Empty>
          ) : (
            <div
              role="log"
              aria-live="polite"
              aria-label="Conversation"
              aria-busy={loading}
              className="flex flex-col gap-4 px-(--card-spacing) py-1"
            >
              {welcomeMessage && (
                <ChatRow
                  message={{
                    id: "welcome",
                    role: "assistant",
                    content: welcomeMessage,
                  }}
                />
              )}
              {messages.map((message) => (
                <ChatRow
                  key={message.id}
                  message={message}
                  onMessageClick={onMessageClick}
                  onSourceClick={onSourceClick}
                />
              ))}
              {loading && (
                <div className="flex items-center gap-3">
                  <Avatar size="sm" aria-hidden>
                    <AvatarFallback>
                      <SparklesIcon className="size-3 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  <Spinner className="size-3.5 text-muted-foreground" />
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <InputGroup>
          <InputGroupInput
            placeholder={resolvedPlaceholder}
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") submit(question)
            }}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-xs"
              aria-label="Send question"
              disabled={!question.trim()}
              onClick={() => submit(question)}
            >
              <CornerDownLeftIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </CardFooter>
      {showDisclaimer && (
        <p className="px-(--card-spacing) text-center text-xs text-muted-foreground">
          SLAI can make mistakes. Double-check important responses.
        </p>
      )}
    </Card>
  )
}

export { SessionChatCard }
