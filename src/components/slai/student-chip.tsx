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
  className,
}: {
  name: string
  onRemove?: () => void
  className?: string
}) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "h-auto gap-1.5 py-1 pr-2 pl-1 text-sm font-normal text-foreground",
        onRemove && "pr-1.5",
        className
      )}
    >
      <Avatar size="sm">
        <AvatarFallback>{initials(name)}</AvatarFallback>
      </Avatar>
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
    </Badge>
  )
}

export { StudentChip }
