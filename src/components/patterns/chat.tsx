"use client"

import * as React from "react"
import { CornerDownLeftIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useControllableState } from "@/lib/use-controllable-state"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"

/**
 * The building blocks every TRAIL chat shares — SLAI's Q&A and Clue AI's
 * partner chat — so they read as one interface:
 *
 *   ChatLog       the conversation, a polite live region
 *   ChatRow       one message: the person's own on the right in a brand
 *                 bubble; the other side on the left with an avatar, an
 *                 optional header (badges) and footer (evidence, actions)
 *   ChatTypingRow the other side is composing a reply
 *   ChatComposer  the input with a send button, and an optional row under it
 */

function ChatLog({
  loading = false,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  /** The other side is replying; marks the log busy */
  loading?: boolean
}) {
  return (
    <div
      data-slot="chat-log"
      role="log"
      aria-live="polite"
      aria-label="Conversation"
      aria-busy={loading}
      className={cn("flex flex-col gap-4", className)}
      {...props}
    >
      {children}
    </div>
  )
}

function ChatRow({
  from,
  tone = "primary",
  bubble = false,
  avatar,
  header,
  footer,
  className,
  children,
}: {
  /** "self" is the person using the screen */
  from: "self" | "other"
  /**
   * The person's own bubble: brand color, or "neutral" where the brand color
   * already means something else (e.g. Clue AI, where red is "Hallucination")
   */
  tone?: "primary" | "neutral"
  /** Put the other side's text in a muted bubble, like a character speaking */
  bubble?: boolean
  /** The other side's avatar (ignored for "self") */
  avatar?: React.ReactNode
  /** Above the message, e.g. a grounding or topic badge */
  header?: React.ReactNode
  /** Under the message, e.g. sources or actions */
  footer?: React.ReactNode
  className?: string
  /** The message: a string, or your own element (e.g. a button) */
  children: React.ReactNode
}) {
  if (from === "self") {
    return (
      <div
        data-slot="chat-row"
        data-from="self"
        className={cn("flex flex-col items-end gap-1.5", className)}
      >
        {header}
        <div
          className={cn(
            "max-w-5/6 rounded-2xl px-3.5 py-2 text-sm leading-relaxed wrap-anywhere",
            tone === "primary"
              ? "bg-primary text-primary-foreground"
              : "bg-foreground text-background"
          )}
        >
          {children}
        </div>
        {footer}
      </div>
    )
  }
  return (
    <div
      data-slot="chat-row"
      data-from="other"
      className={cn("flex gap-3", className)}
    >
      {avatar}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {header}
        {typeof children === "string" ? (
          <p
            className={cn(
              "text-sm leading-relaxed wrap-anywhere text-foreground",
              bubble &&
                "self-start rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-pretty"
            )}
          >
            {children}
          </p>
        ) : (
          children
        )}
        {footer}
      </div>
    </div>
  )
}

function ChatTypingRow({
  avatar,
  label,
  className,
}: {
  avatar?: React.ReactNode
  /** e.g. "Riley is typing" */
  label?: string
  className?: string
}) {
  return (
    <div
      data-slot="chat-typing-row"
      className={cn("flex items-center gap-3", className)}
    >
      {avatar}
      <Spinner
        className="size-3.5 text-muted-foreground"
        aria-label={label ?? "Replying"}
      />
      {label && <span className="text-xs text-muted-foreground">{label}…</span>}
    </div>
  )
}

function ChatComposer({
  value: valueProp,
  defaultValue = "",
  onValueChange,
  onSend,
  placeholder,
  disabled = false,
  sendLabel = "Send message",
  leading,
  toolbar,
  className,
}: {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Called with the trimmed text; the input then clears */
  onSend?: (text: string) => void
  placeholder?: string
  disabled?: boolean
  /** Accessible name of the send button */
  sendLabel?: string
  /** Above the input, e.g. what the message is about */
  leading?: React.ReactNode
  /** The row under the input */
  toolbar?: React.ReactNode
  className?: string
}) {
  const [value, setValue] = useControllableState({
    value: valueProp,
    defaultValue,
    onChange: onValueChange,
  })
  const submit = () => {
    if (!value.trim() || disabled) return
    onSend?.(value.trim())
    setValue("")
  }

  return (
    <div
      data-slot="chat-composer"
      className={cn("flex flex-col items-stretch gap-1.5", className)}
    >
      {leading}
      <InputGroup data-disabled={disabled || undefined}>
        <InputGroupInput
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") submit()
          }}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            aria-label={sendLabel}
            disabled={disabled || !value.trim()}
            onClick={submit}
          >
            <CornerDownLeftIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      {toolbar && (
        <div
          data-slot="chat-composer-toolbar"
          className="flex min-h-6 items-center gap-2 pl-1 text-xs text-muted-foreground"
        >
          {toolbar}
        </div>
      )}
    </div>
  )
}

export { ChatLog, ChatRow, ChatTypingRow, ChatComposer }
