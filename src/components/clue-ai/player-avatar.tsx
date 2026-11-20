import { BotIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StatusBadge } from "@/components/patterns/status-badge"
import type { Player } from "./lib/case"

/**
 * A player's avatar: their photo, else initials. An AI teammate always shows
 * the bot mark on a brand tint, so it's never mistaken for a person.
 */
function PlayerAvatar({
  player,
  size = "default",
  className,
}: {
  player: Player
  size?: "sm" | "default" | "lg"
  className?: string
}) {
  return (
    <Avatar data-slot="player-avatar" size={size} className={className}>
      {player.avatarUrl && <AvatarImage src={player.avatarUrl} alt="" />}
      <AvatarFallback
        className={cn(player.isAi && "bg-primary/10 text-primary")}
      >
        {player.isAi ? (
          <BotIcon
            aria-hidden
            className={cn(size === "sm" ? "size-3.5" : "size-4")}
          />
        ) : (
          player.initials
        )}
      </AvatarFallback>
    </Avatar>
  )
}

/** "AI" tag shown after an AI teammate's name. */
function AiTag({ className }: { className?: string }) {
  return (
    <StatusBadge data-slot="ai-tag" tone="primary" className={className}>
      AI
    </StatusBadge>
  )
}

export { PlayerAvatar, AiTag }
