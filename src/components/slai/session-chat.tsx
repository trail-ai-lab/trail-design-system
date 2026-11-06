"use client"

import * as React from "react"
import {
  ChevronRightIcon,
  CornerDownLeftIcon,
  FileTextIcon,
  MessageSquareQuoteIcon,
  SparklesIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
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
  /** Section heading, e.g. "Lesson 16 > Reflection" */
  section?: string
  /** Where in it, e.g. "p. 12" or "slide 4" */
  location?: string
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp?: string
  /** Transcript excerpts or groups the answer drew on, listed under its sources */
  sources?: string[]
  /** Course materials the answer drew on, listed with a document icon */
  materials?: ChatMaterialSource[]
  /** Transcript entry id the answer points to; makes the row clickable
   * (with `onMessageClick`, when the answer has no `sources` to click) */
  highlight?: string
}

const EVIDENCE_ROW =
  "flex w-full items-start gap-2 rounded-md px-2 py-1.5 text-left text-xs leading-relaxed wrap-anywhere text-foreground"

function SourceRow({
  source,
  onClick,
}: {
  source: string
  onClick?: () => void
}) {
  const content = (
    <>
      <MessageSquareQuoteIcon
        className="mt-0.5 size-3.5 shrink-0 text-muted-foreground"
        aria-hidden
      />
      <span className="min-w-0">{source}</span>
    </>
  )
  if (!onClick) return <div className={EVIDENCE_ROW}>{content}</div>
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Show in transcript: ${source}`}
      className={cn(
        EVIDENCE_ROW,
        "cursor-pointer outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
      )}
    >
      {content}
    </button>
  )
}

function MaterialRow({ material }: { material: ChatMaterialSource }) {
  const details = [material.section, material.location]
    .filter(Boolean)
    .join(" · ")
  return (
    <div className={EVIDENCE_ROW}>
      <FileTextIcon
        className="mt-0.5 size-3.5 shrink-0 text-muted-foreground"
        aria-hidden
      />
      <span className="flex min-w-0 flex-col">
        <span>{material.name}</span>
        {details && <span className="text-muted-foreground">{details}</span>}
      </span>
    </div>
  )
}

/**
 * An answer's evidence, kept out of the way so the answer stays the thing to
 * read: one line with the count, which opens into the full list.
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
  const count = sources.length + materials.length
  const rootRef = React.useRef<HTMLDivElement>(null)
  return (
    <Collapsible
      ref={rootRef}
      onOpenChange={(open) => {
        if (!open) return
        // The latest answer sits at the bottom of the thread, where the list
        // would otherwise open out of sight. A list too tall to fit keeps the
        // row that closes it at the top.
        requestAnimationFrame(() =>
          rootRef.current?.scrollIntoView({ block: "nearest" })
        )
      }}
    >
      <CollapsibleTrigger className="group/evidence flex cursor-pointer items-center gap-1 rounded-md text-xs text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50">
        {count} {count === 1 ? "source" : "sources"}
        <ChevronRightIcon
          className="size-3.5 transition-transform group-data-[state=open]/evidence:rotate-90"
          aria-hidden
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-1 flex flex-col gap-0.5 border-l border-border pl-1">
        {sources.map((source, index) => (
          <SourceRow
            key={`${index}-${source}`}
            source={source}
            onClick={onSourceClick && (() => onSourceClick(message, index))}
          />
        ))}
        {materials.map((material) => (
          <MaterialRow
            key={`${material.id ?? material.name}-${material.section ?? ""}-${material.location ?? ""}`}
            material={material}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
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
  // Clickable sources replace the clickable answer.
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
  /** Makes each of an answer's `sources` a button, e.g. to show that passage
   * in the transcript; called with the answer and the source's index */
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
