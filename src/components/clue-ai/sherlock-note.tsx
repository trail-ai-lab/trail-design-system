"use client"

import * as React from "react"
import { SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useClueAiLabels } from "./lib/labels"

export type SherlockNoteVariant = "default" | "success" | "destructive"

const bubbleClassName: Record<SherlockNoteVariant, string> = {
  default: "bg-muted",
  success: "bg-success/10",
  destructive: "bg-destructive/10",
}

/**
 * Sherlock, the game's narrator, speaking to the player ("Watson"): briefings
 * before a suspect, nudges along the way, and feedback after a verdict. An
 * avatar and a speech bubble — never a card, so it can sit above one.
 *
 * `variant` tints the bubble for feedback: `success` when the call was right,
 * `destructive` when it put an innocent behind bars.
 */
function SherlockNote({
  title,
  avatarUrl,
  variant = "default",
  actions,
  children,
  className,
}: {
  /** Shown above the bubble, e.g. "Sherlock's briefing" */
  title?: React.ReactNode
  avatarUrl?: string
  variant?: SherlockNoteVariant
  /** Buttons under the bubble, e.g. "Start investigating" */
  actions?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  const labels = useClueAiLabels()
  return (
    <figure
      data-slot="sherlock-note"
      data-variant={variant}
      className={cn("flex items-start gap-3", className)}
    >
      <Avatar size="lg" className="mt-0.5">
        {avatarUrl && <AvatarImage src={avatarUrl} alt="" />}
        <AvatarFallback>
          <SearchIcon className="size-4" aria-hidden />
        </AvatarFallback>
      </Avatar>
      <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5">
        <figcaption className="text-caption font-medium text-muted-foreground">
          {title ?? labels.sherlock.name}
        </figcaption>
        <blockquote
          className={cn(
            "max-w-prose rounded-2xl rounded-tl-sm px-4 py-3 text-body-sm leading-relaxed text-pretty",
            bubbleClassName[variant]
          )}
        >
          {children}
        </blockquote>
        {actions && (
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </figure>
  )
}

export { SherlockNote }
