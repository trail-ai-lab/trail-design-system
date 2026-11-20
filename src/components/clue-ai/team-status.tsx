import { cn } from "@/lib/utils"
import {
  statusToneDotClassName,
  type StatusTone,
} from "@/components/patterns/status-badge"
import { playerLabel, type Player } from "./lib/case"
import { AiTag, PlayerAvatar } from "./player-avatar"

/** Where a player is in the current phase. */
export type PlayerPhaseStatus = "waiting" | "working" | "submitted" | "offline"

const STATUS: Record<PlayerPhaseStatus, { label: string; tone: StatusTone }> = {
  waiting: { label: "Not started", tone: "muted" },
  working: { label: "Working", tone: "info" },
  submitted: { label: "Submitted", tone: "success" },
  offline: { label: "Offline", tone: "muted" },
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
  return (
    <ul
      data-slot="team-status"
      aria-label="Team"
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-4",
        className
      )}
    >
      {members.map(({ player, status }) => {
        const meta = STATUS[status]
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
