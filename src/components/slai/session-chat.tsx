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
}

function ChatRow({ message }: { message: ChatMessage }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <p className="max-w-[85%] rounded-2xl bg-primary px-3.5 py-2 text-sm leading-relaxed text-primary-foreground">
          {message.content}
        </p>
      </div>
    )
  }
  return (
    <div className="flex gap-2.5">
      <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted">
        <SparklesIcon className="size-3 text-primary" />
      </div>
      <p className="min-w-0 text-sm leading-relaxed text-foreground">
        {message.content}
      </p>
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
  thinking = false,
  suggestions = [],
  className,
}: {
  messages: ChatMessage[]
  onSend?: (text: string) => void
  /** Label of the active scope, e.g. "Group 1" or "All groups" */
  scopeLabel?: string
  placeholder?: string
  /** Shows a spinner row while the assistant is answering */
  thinking?: boolean
  /** Suggested questions shown in the empty state */
  suggestions?: string[]
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
  }, [messages.length, thinking])

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
          {messages.length === 0 && !thinking ? (
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
              {messages.map((message) => (
                <ChatRow key={message.id} message={message} />
              ))}
              {thinking && (
                <div className="flex items-center gap-2.5">
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
    </Card>
  )
}

export { SessionChatCard }
