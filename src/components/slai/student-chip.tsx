"use client"

import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

/**
 * A student's name as a pill with an initials badge. Removable on the group
 * setup form; read-only as a roster chip on the recording screen.
 */
function StudentChip({
  name,
  onRemove,
  className,
}: {
  name: string
  onRemove?: () => void
  className?: string
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border py-1 pr-2 pl-1 text-sm",
        onRemove && "pr-1.5",
        className
      )}
    >
      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-medium text-muted-foreground">
        {initials(name)}
      </span>
      <span className="max-w-40 truncate">{name}</span>
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
    </div>
  )
}

export { StudentChip }
