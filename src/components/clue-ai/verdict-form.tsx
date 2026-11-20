"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useControllableState } from "@/lib/use-controllable-state"
import { AvatarGroup } from "@/components/ui/avatar"
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
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import {
  VERDICTS,
  notYetClassName,
  type Motive,
  type Player,
  type Verdict,
} from "./lib/case"
import { useClueAiLabels, usePlayerLabel } from "./lib/labels"
import { PlayerAvatar } from "./player-avatar"

export interface VerdictValue {
  verdict?: Verdict
  /** Motive value; required with "guilty" when `motives` are given */
  motive?: string
}

export interface VerdictPick extends VerdictValue {
  player: Player
}

/**
 * The call on one suspect: guilty or inconclusive, and — when guilty — the
 * motive. A single-task form card.
 *
 * Solo, it's each player's own verdict. Pass `picks` (each player's solo
 * verdict) and it becomes the team verdict: every option shows who chose it,
 * so partners see where they agree before they commit together.
 */
function VerdictForm({
  suspectName,
  motives,
  picks,
  description,
  value: valueProp,
  defaultValue,
  onValueChange,
  onSubmit,
  loading = false,
  disabled = false,
  disabledReason,
  className,
}: {
  suspectName: string
  /** Motive options; omit for a suspect whose verdict takes none */
  motives?: Motive[]
  /** Each player's solo verdict; switches to the team verdict */
  picks?: VerdictPick[]
  /** Replaces the default description, e.g. who has the final say */
  description?: React.ReactNode
  value?: VerdictValue
  defaultValue?: VerdictValue
  onValueChange?: (value: VerdictValue) => void
  onSubmit?: (value: VerdictValue) => void
  loading?: boolean
  disabled?: boolean
  /** Why the form can't be submitted yet, e.g. "Classify all 12 sentences first" */
  disabledReason?: string
  className?: string
}) {
  const labels = useClueAiLabels()
  const playerLabel = usePlayerLabel()
  const uid = React.useId()
  const [value, setValue] = useControllableState<VerdictValue>({
    value: valueProp,
    defaultValue: defaultValue ?? {},
    onChange: onValueChange,
  })
  const isTeam = picks !== undefined
  const needsMotive = value.verdict === "guilty" && !!motives?.length
  const isComplete = !!value.verdict && (!needsMotive || !!value.motive)
  const motiveLabel = (motive?: string) =>
    motives?.find((m) => m.value === motive)?.label

  return (
    <Card data-slot="verdict-form" className={className}>
      <CardHeader>
        <CardTitle>
          {labels.verdictForm.title({ suspect: suspectName, isTeam })}
        </CardTitle>
        <CardDescription>
          {description ??
            (isTeam
              ? labels.verdictForm.teamDescription
              : labels.verdictForm.soloDescription({ suspect: suspectName }))}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id={`${uid}-form`}
          onSubmit={(event) => {
            event.preventDefault()
            if (isComplete) onSubmit?.(value)
          }}
        >
          <FieldGroup>
            <FieldSet>
              <FieldLegend variant="label" className="sr-only">
                {labels.verdictForm.legend}
              </FieldLegend>
              <RadioGroup
                value={value.verdict ?? ""}
                onValueChange={(verdict) =>
                  setValue({
                    verdict: verdict as Verdict,
                    motive: verdict === "guilty" ? value.motive : undefined,
                  })
                }
                disabled={disabled}
                className="grid gap-3 sm:grid-cols-2"
              >
                {(Object.keys(VERDICTS) as Verdict[]).map((verdict) => {
                  const meta = labels.verdicts[verdict]
                  const pickedBy =
                    picks?.filter((p) => p.verdict === verdict) ?? []
                  const id = `${uid}-${verdict}`
                  return (
                    <FieldLabel key={verdict} htmlFor={id}>
                      <Field orientation="horizontal">
                        <RadioGroupItem
                          value={verdict}
                          id={id}
                          aria-labelledby={`${id}-title`}
                          aria-describedby={`${id}-description`}
                        />
                        <FieldContent>
                          <FieldTitle id={`${id}-title`}>
                            {meta.label}
                          </FieldTitle>
                          <FieldDescription id={`${id}-description`}>
                            {meta.description}
                          </FieldDescription>
                          {isTeam && (
                            <PickedBy players={pickedBy.map((p) => p.player)} />
                          )}
                        </FieldContent>
                      </Field>
                    </FieldLabel>
                  )
                })}
              </RadioGroup>
            </FieldSet>
            {needsMotive && (
              <Field>
                <FieldLabel htmlFor={`${uid}-motive`}>
                  {labels.common.motive}
                </FieldLabel>
                <Select
                  value={value.motive ?? ""}
                  onValueChange={(motive) => setValue({ ...value, motive })}
                  disabled={disabled}
                >
                  <SelectTrigger id={`${uid}-motive`} className="w-full">
                    <SelectValue
                      placeholder={labels.common.motivePlaceholder}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {motives!.map((motive) => (
                        <SelectItem key={motive.value} value={motive.value}>
                          {motive.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {isTeam && picks.some((p) => p.motive) && (
                  <FieldDescription>
                    {labels.verdictForm.motivePicks(
                      picks
                        .filter((p) => p.motive)
                        .map((p) => ({
                          player: playerLabel(p.player),
                          motive: motiveLabel(p.motive) ?? "",
                        }))
                    )}
                  </FieldDescription>
                )}
              </Field>
            )}
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-2">
        <Button
          type="submit"
          form={`${uid}-form`}
          disabled={disabled || loading || !isComplete}
          className={cn(!loading && notYetClassName)}
        >
          {loading && <Spinner data-icon="inline-start" />}
          {isTeam ? labels.verdictForm.submitTeam : labels.verdictForm.submit}
        </Button>
        {disabledReason && (disabled || !isComplete) && (
          <p className="text-center text-caption text-muted-foreground">
            {disabledReason}
          </p>
        )}
      </CardFooter>
    </Card>
  )
}

/** Avatars of the players who picked an option, or "No one yet". */
function PickedBy({
  players,
  className,
}: {
  players: Player[]
  className?: string
}) {
  const labels = useClueAiLabels()
  const playerLabel = usePlayerLabel()
  if (players.length === 0) {
    return (
      <span
        className={cn("mt-1 text-caption text-muted-foreground", className)}
      >
        {labels.verdictForm.nobodyPicked}
      </span>
    )
  }
  return (
    <span className={cn("mt-1 flex items-center gap-2", className)}>
      <AvatarGroup>
        {players.map((player) => (
          <PlayerAvatar key={player.id} player={player} size="sm" />
        ))}
      </AvatarGroup>
      <span className="text-caption text-muted-foreground">
        {labels.common.list(players.map(playerLabel))}
      </span>
    </span>
  )
}

export { VerdictForm }
