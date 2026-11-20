"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"
import { StatusBadge } from "@/components/patterns/status-badge"
import { notYetClassName, type Player } from "./lib/case"
import { useClueAiLabels, usePlayerLabel } from "./lib/labels"
import { AiTag, PlayerAvatar } from "./player-avatar"

/**
 * Pairing two players before the investigation: share this session's code, or
 * enter a partner's code to join theirs. The team list fills as players join;
 * empty seats show a waiting row. The start button unlocks once every seat is
 * taken, since the shared timers start for everyone at once.
 */
function SessionLobbyCard({
  code,
  players,
  seats = 2,
  hostId,
  onCopyCode,
  onJoin,
  onStart,
  joinStatus = "idle",
  className,
}: {
  /** This session's code, e.g. "4F7K-Q2" */
  code: string
  /** Players who have joined, in join order */
  players: Player[]
  /** Players the session needs */
  seats?: number
  /** Player who created the session */
  hostId?: string
  onCopyCode?: () => void
  /** Join another session instead */
  onJoin?: (code: string) => void
  onStart?: () => void
  joinStatus?: "idle" | "joining" | "error"
  className?: string
}) {
  const labels = useClueAiLabels()
  const playerLabel = usePlayerLabel()
  const uid = React.useId()
  const [copied, setCopied] = React.useState(false)
  const [joinCode, setJoinCode] = React.useState("")
  const isFull = players.length >= seats
  const waiting = Math.max(seats - players.length, 0)

  return (
    <Card data-slot="session-lobby-card" className={className}>
      <CardHeader>
        <CardTitle>{labels.lobby.title}</CardTitle>
        <CardDescription>{labels.lobby.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor={`${uid}-code`}>
              {labels.lobby.yourCode}
            </FieldLabel>
            <InputGroup className="h-11">
              <InputGroupInput
                id={`${uid}-code`}
                readOnly
                value={code}
                className="font-mono text-h3 tracking-widest"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  size="sm"
                  onClick={() => {
                    onCopyCode?.()
                    setCopied(true)
                  }}
                >
                  {copied ? (
                    <CheckIcon className="text-primary" />
                  ) : (
                    <CopyIcon />
                  )}
                  {copied ? labels.lobby.copied : labels.lobby.copy}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <ul
            aria-label={labels.lobby.team}
            className="flex flex-col divide-y divide-border rounded-2xl border border-border"
          >
            {players.map((player) => (
              <li
                key={player.id}
                className="flex items-center gap-3 px-3 py-2.5"
              >
                <PlayerAvatar player={player} />
                <span className="flex flex-1 items-center gap-1.5 text-body-sm font-medium">
                  {player.isYou
                    ? labels.common.youNamed({ name: player.name })
                    : playerLabel(player)}
                  {player.isAi && <AiTag />}
                </span>
                {player.id === hostId && (
                  <StatusBadge tone="muted">{labels.lobby.host}</StatusBadge>
                )}
                <StatusBadge tone="success" dot>
                  {labels.lobby.ready}
                </StatusBadge>
              </li>
            ))}
            {Array.from({ length: waiting }, (_, i) => (
              <li
                key={`waiting-${i}`}
                className="flex items-center gap-3 px-3 py-2.5 text-muted-foreground"
              >
                <span className="flex size-8 items-center justify-center rounded-full border border-dashed border-border">
                  <Spinner
                    className="size-3.5"
                    aria-label={labels.lobby.waiting}
                  />
                </span>
                <span className="text-body-sm">
                  {labels.lobby.waitingForPartner}
                </span>
              </li>
            ))}
          </ul>

          {onJoin && (
            <>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                {labels.lobby.orJoin}
              </FieldSeparator>
              <Field data-invalid={joinStatus === "error" || undefined}>
                <FieldLabel htmlFor={`${uid}-join`}>
                  {labels.lobby.partnerCode}
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id={`${uid}-join`}
                    value={joinCode}
                    onChange={(event) =>
                      setJoinCode(event.target.value.toUpperCase())
                    }
                    placeholder={labels.lobby.codePlaceholder}
                    aria-invalid={joinStatus === "error" || undefined}
                    className="font-mono tracking-widest"
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      variant="secondary"
                      size="sm"
                      disabled={!joinCode.trim() || joinStatus === "joining"}
                      onClick={() => onJoin(joinCode.trim())}
                    >
                      {joinStatus === "joining" && <Spinner />}
                      {labels.lobby.join}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {joinStatus === "error" && (
                  <FieldError>{labels.lobby.joinError}</FieldError>
                )}
              </Field>
            </>
          )}
        </FieldGroup>
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-2">
        <Button
          disabled={!isFull}
          onClick={onStart}
          className={notYetClassName}
        >
          {labels.lobby.start}
        </Button>
        {!isFull && (
          <p className="text-center text-caption text-muted-foreground">
            {labels.lobby.startHint}
          </p>
        )}
      </CardFooter>
    </Card>
  )
}

export { SessionLobbyCard }
