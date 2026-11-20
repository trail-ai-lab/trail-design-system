import { BotIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { StatusBadge } from "@/components/patterns/status-badge"
import {
  AI_PARTNER_BEHAVIORS,
  playerLabel,
  type AiPartnerBehavior,
  type Player,
} from "./lib/case"

export interface PartnerDebriefStats {
  /** Team answers the AI suggested in chat */
  proposals: number
  /** Of those, how many the player accepted */
  accepted: number
  /** Times the AI changed one of its own answers */
  changedMind: number
  /** Sentences where the team answer matched the answer key */
  teamCorrect: number
  totalSentences: number
}

/**
 * After the case closes, reveals how the AI teammate was set up to argue —
 * which the game never shows while it's being played — and how the player
 * responded to it.
 */
function PartnerDebriefCard({
  partner,
  behavior,
  stats,
  className,
}: {
  partner: Player
  behavior: AiPartnerBehavior
  stats: PartnerDebriefStats
  className?: string
}) {
  const name = playerLabel(partner)
  const meta = AI_PARTNER_BEHAVIORS[behavior]
  const items = [
    {
      label: "Suggestions you accepted",
      value: `${stats.accepted}/${stats.proposals}`,
    },
    { label: `Times ${name} changed its mind`, value: stats.changedMind },
    {
      label: "Team answers that matched the key",
      value: `${stats.teamCorrect}/${stats.totalSentences}`,
    },
  ]
  return (
    <Card data-slot="partner-debrief-card" className={className}>
      <CardHeader>
        <CardTitle>How {name} played</CardTitle>
        <CardDescription>
          {name} wasn't trying to solve the case the same way you were. Here's
          how it was set up to argue.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-3 rounded-xl border border-border p-3">
          <BotIcon
            aria-hidden
            className="mt-0.5 size-5 shrink-0 text-primary"
          />
          <div className="flex flex-col gap-1">
            <StatusBadge
              tone={behavior === "defensive" ? "warning" : "info"}
              className="self-start"
            >
              {meta.label}
            </StatusBadge>
            <p className="text-body-sm text-muted-foreground">
              {meta.description}
            </p>
          </div>
        </div>
        <dl className={cn("grid gap-3 sm:grid-cols-3")}>
          {items.map((item) => (
            <div
              key={item.label}
              className="flex flex-col-reverse gap-1 rounded-xl bg-muted/50 p-3"
            >
              <dt className="text-caption text-muted-foreground">
                {item.label}
              </dt>
              <dd className="text-h3 tabular-nums">{item.value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  )
}

export { PartnerDebriefCard }
