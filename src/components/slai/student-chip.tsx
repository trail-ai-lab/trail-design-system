"use client"

import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { initials } from "@/components/slai/lib/format"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

/**
 * A student's name as a pill with an initials avatar. Removable on the group
 * setup form; read-only as a roster chip on the recording screen.
 */
function StudentChip({
  name,
  onRemove,
  language,
  grade,
  wida,
  native = false,
  selected = false,
  onClick,
  className,
}: {
  name: string
  onRemove?: () => void
  /** Language code shown as a small tag, e.g. "ES" */
  language?: string
  grade?: number | string
  /** WIDA level shown as "W3.2"; ignored when `native` */
  wida?: number
  /** Native English speaker: shows "native" in place of a WIDA level */
  native?: boolean
  /** Highlights the chip, e.g. while picking a student to place in a group */
  selected?: boolean
  onClick?: () => void
  className?: string
}) {
  return (
    <Badge
      variant="outline"
      onClick={onClick}
      data-selected={selected || undefined}
      className={cn(
        "h-auto gap-1.5 py-1 pr-2 pl-1 text-sm font-normal text-foreground",
        onRemove && "pr-1.5",
        onClick && "cursor-pointer hover:bg-muted",
        "data-[selected]:border-primary data-[selected]:bg-primary/10 data-[selected]:ring-1 data-[selected]:ring-primary",
        className
      )}
    >
      <Avatar size="sm">
        <AvatarFallback>{initials(name)}</AvatarFallback>
      </Avatar>
      <span className="max-w-40 truncate">{name}</span>
      {language && (
        <span className="text-xs font-medium text-muted-foreground uppercase">
          {language}
        </span>
      )}
      {grade !== undefined && (
        <span className="text-xs text-muted-foreground">Gr {grade}</span>
      )}
      {(native || wida !== undefined) && (
        <span className="text-xs text-muted-foreground tabular-nums">
          {native ? <em>native</em> : `W${wida?.toFixed(1)}`}
        </span>
      )}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${name}`}
          className="flex size-4 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <XIcon className="size-3" />
        </button>
      )}
    </Badge>
  )
}

export { StudentChip }
