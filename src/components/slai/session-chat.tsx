"use client"

import * as React from "react"
import { CornerDownLeftIcon, SparklesIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Spinner } from "@/components/ui/spinner"

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp?: string
  /** Transcript excerpts or groups the answer drew on, shown as chips */
  sources?: string[]
  /** Transcript entry id the answer points to; makes the row clickable */
  highlight?: string
}

function ChatRow({
  message,
  onMessageClick,
}: {
  message: ChatMessage
  onMessageClick?: (message: ChatMessage) => void
}) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <p className="max-w-5/6 rounded-2xl bg-primary px-3.5 py-2 text-sm leading-relaxed text-primary-foreground">
          {message.content}
        </p>
      </div>
    )
  }
  const clickable = Boolean(message.highlight && onMessageClick)
  return (
    <div className="flex gap-3">
      <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted">
        <SparklesIcon className="size-3 text-primary" />
      </div>
      <div className="flex min-w-0 flex-col gap-2">
        <p
          {...(clickable && {
            role: "button",
            tabIndex: 0,
            onClick: () => onMessageClick?.(message),
            onKeyDown: (event: React.KeyboardEvent) => {
              if (event.key === "Enter") onMessageClick?.(message)
            },
          })}
          className={cn(
            "text-sm leading-relaxed text-foreground",
            clickable &&
              "cursor-pointer underline-offset-4 outline-none hover:underline focus-visible:underline"
          )}
        >
          {message.content}
        </p>
        {message.sources && message.sources.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {message.sources.map((source) => (
              <Badge key={source} variant="outline" className="font-normal">
                {source}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
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
  showDisclaimer = false,
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
  /** Called when an assistant message with a `highlight` is clicked */
  onMessageClick?: (message: ChatMessage) => void
  /** Footer reminding that AI answers can be wrong */
  showDisclaimer?: boolean
  className?: string
}) {
  const resolvedPlaceholder =
    placeholder ??
    (scopeLabel ? `Ask about ${scopeLabel}...` : "Ask about the session...")
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
        <CardTitle>Ask a question</CardTitle>
        {scopeLabel && (
          <CardAction>
            <Badge variant="secondary">{scopeLabel}</Badge>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col p-0">
        <ScrollArea ref={scrollRef} className="min-h-0 flex-1">
          {messages.length === 0 && !loading && !welcomeMessage ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 px-(--card-spacing) py-8 text-center">
              <p className="text-sm text-muted-foreground">
                Ask anything about what {scopeLabel ?? "your students"}{" "}
                {scopeLabel ? "is" : "are"} discussing.
              </p>
              {suggestions.length > 0 && (
                <div className="flex flex-wrap justify-center gap-1.5">
                  {suggestions.map((suggestion) => (
                    <Badge
                      key={suggestion}
                      variant="outline"
                      className="h-auto cursor-pointer py-1 font-normal whitespace-normal hover:bg-muted"
                      onClick={() => submit(suggestion)}
                    >
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-4 px-(--card-spacing) py-1">
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
                />
              ))}
              {loading && (
                <div className="flex items-center gap-3">
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted">
                    <SparklesIcon className="size-3 text-primary" />
                  </div>
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
        <p className="px-(--card-spacing) text-center text-xs text-muted-foreground/70">
          SLAI can make mistakes. Double-check important responses.
        </p>
      )}
    </Card>
  )
}

export { SessionChatCard }
