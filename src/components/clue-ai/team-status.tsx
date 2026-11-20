"use client"

import { cn } from "@/lib/utils"
import {
  statusToneDotClassName,
  type StatusTone,
} from "@/components/patterns/status-badge"
import type { Player } from "./lib/case"
import { useClueAiLabels, usePlayerLabel } from "./lib/labels"
import { AiTag, PlayerAvatar } from "./player-avatar"

/** Where a player is in the current phase. */
export type PlayerPhaseStatus = "waiting" | "working" | "submitted" | "offline"

const STATUS_TONE: Record<PlayerPhaseStatus, StatusTone> = {
  waiting: "muted",
  working: "info",
  submitted: "success",
  offline: "muted",
}

export interface TeamMember {
  player: Player
  status: PlayerPhaseStatus
}

/**
 * Who's on the case and where each is in the current phase — "You · Working",
 * "Mia · Submitted". Sits in the toolbar beside the PhaseTimer so a player can
 * tell at a glance whether they're waiting on their partner.
 */
function TeamStatus({
  members,
  className,
}: {
  members: TeamMember[]
  className?: string
}) {
  const labels = useClueAiLabels()
  const playerLabel = usePlayerLabel()
  return (
    <ul
      data-slot="team-status"
      aria-label={labels.teamStatus.label}
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-4",
        className
      )}
    >
      {members.map(({ player, status }) => {
        const meta = {
          label: labels.teamStatus.status[status],
          tone: STATUS_TONE[status],
        }
        return (
          <li key={player.id} className="flex items-center gap-2">
            <PlayerAvatar player={player} size="sm" />
            <span className="flex items-center gap-1.5 text-body-sm font-medium">
              {playerLabel(player)}
              {player.isAi && <AiTag />}
            </span>
            <span className="flex items-center gap-1.5 text-caption text-muted-foreground">
              <span
                aria-hidden
                className={cn(
                  "size-1.5 rounded-full",
                  statusToneDotClassName(meta.tone),
                  status === "working" && "motion-safe:animate-pulse"
                )}
              />
              <span className="max-sm:sr-only">{meta.label}</span>
            </span>
          </li>
        )
      })}
    </ul>
  )
}

export { TeamStatus }
