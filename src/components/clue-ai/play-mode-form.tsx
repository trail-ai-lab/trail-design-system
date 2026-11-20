"use client"

import * as React from "react"
import { BotIcon, UserIcon, UsersIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useControllableState } from "@/lib/use-controllable-state"
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
import { Spinner } from "@/components/ui/spinner"
import { notYetClassName, type Player, type PlayMode } from "./lib/case"
import { useClueAiLabels, usePlayerLabel } from "./lib/labels"
import { PlayerAvatar } from "./player-avatar"

const MODE_ICON: Record<
  PlayMode,
  React.ComponentType<React.ComponentProps<"svg">>
> = {
  solo: UserIcon,
  partner: UsersIcon,
  ai: BotIcon,
}

const MODE_ORDER: PlayMode[] = ["solo", "partner", "ai"]

export interface PlayModeValue {
  mode: PlayMode
  /** The AI teammate picked, when `mode` is "ai" */
  teammateId?: string
}

/**
 * How to play this case: alone, with a friend, or with an AI teammate. A
 * single-task form card. Pass `modes` to offer only some.
 *
 * With more than one AI teammate, choosing "With an AI teammate" asks the
 * player to pick one by name. Teammates are presented identically — same
 * mark, same description — so nothing hints at how each one argues. Shuffle
 * `aiTeammates` per player to avoid an order effect.
 */
function PlayModeForm({
  aiTeammates = [],
  modes = MODE_ORDER,
  value: valueProp,
  defaultValue,
  onValueChange,
  onSubmit,
  loading = false,
  className,
}: {
  /** The AI teammates on offer, in display order */
  aiTeammates?: Player[]
  /** The modes on offer, in order */
  modes?: PlayMode[]
  value?: Partial<PlayModeValue>
  defaultValue?: Partial<PlayModeValue>
  onValueChange?: (value: Partial<PlayModeValue>) => void
  onSubmit?: (value: PlayModeValue) => void
  loading?: boolean
  className?: string
}) {
  const labels = useClueAiLabels()
  const playerLabel = usePlayerLabel()
  const t = labels.playMode
  const uid = React.useId()
  const [value, setValue] = useControllableState<Partial<PlayModeValue>>({
    value: valueProp,
    defaultValue: defaultValue ?? {},
    onChange: onValueChange,
  })
  const picksTeammate = value.mode === "ai" && aiTeammates.length > 1
  const teammate =
    aiTeammates.length === 1
      ? aiTeammates[0]
      : aiTeammates.find((t) => t.id === value.teammateId)
  const isComplete = !!value.mode && (!picksTeammate || !!teammate)

  return (
    <Card data-slot="play-mode-form" className={className}>
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id={`${uid}-form`}
          onSubmit={(event) => {
            event.preventDefault()
            if (!isComplete || !value.mode) return
            onSubmit?.({
              mode: value.mode,
              teammateId: value.mode === "ai" ? teammate?.id : undefined,
            })
          }}
        >
          <FieldGroup>
            <FieldSet>
              <FieldLegend variant="label" className="sr-only">
                {t.legend}
              </FieldLegend>
              <RadioGroup
                value={value.mode ?? ""}
                onValueChange={(mode) =>
                  setValue({ ...value, mode: mode as PlayMode })
                }
                className="grid gap-3"
              >
                {modes.map((mode) => {
                  const meta = t.modes[mode]
                  const Icon = MODE_ICON[mode]
                  const id = `${uid}-${mode}`
                  return (
                    <FieldLabel key={mode} htmlFor={id}>
                      <Field orientation="horizontal">
                        <Icon
                          aria-hidden
                          className="mt-0.5 size-5 shrink-0 text-muted-foreground"
                        />
                        <FieldContent>
                          <FieldTitle id={`${id}-title`}>
                            {meta.title}
                          </FieldTitle>
                          <FieldDescription id={`${id}-description`}>
                            {meta.description}
                          </FieldDescription>
                        </FieldContent>
                        <RadioGroupItem
                          value={mode}
                          id={id}
                          aria-labelledby={`${id}-title`}
                          aria-describedby={`${id}-description`}
                        />
                      </Field>
                    </FieldLabel>
                  )
                })}
              </RadioGroup>
            </FieldSet>
            {picksTeammate && (
              <FieldSet>
                <FieldLegend variant="label">{t.teammateLegend}</FieldLegend>
                <FieldDescription>{t.teammateDescription}</FieldDescription>
                <RadioGroup
                  value={value.teammateId ?? ""}
                  onValueChange={(teammateId) =>
                    setValue({ ...value, teammateId })
                  }
                  className="grid grid-cols-2 gap-3"
                >
                  {aiTeammates.map((player) => {
                    const id = `${uid}-teammate-${player.id}`
                    return (
                      <FieldLabel key={player.id} htmlFor={id}>
                        <Field
                          orientation="horizontal"
                          className="items-center"
                        >
                          <PlayerAvatar player={player} size="sm" />
                          <FieldTitle id={`${id}-title`} className="flex-1">
                            {playerLabel(player)}
                          </FieldTitle>
                          <RadioGroupItem
                            value={player.id}
                            id={id}
                            aria-labelledby={`${id}-title`}
                          />
                        </Field>
                      </FieldLabel>
                    )
                  })}
                </RadioGroup>
              </FieldSet>
            )}
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          form={`${uid}-form`}
          className={cn("w-full", !loading && notYetClassName)}
          disabled={!isComplete || loading}
        >
          {loading && <Spinner data-icon="inline-start" />}
          {value.mode === "partner"
            ? t.continuePairing
            : value.mode === "ai"
              ? teammate
                ? t.startWith({ name: playerLabel(teammate) })
                : t.pickTeammate
              : t.start}
        </Button>
      </CardFooter>
    </Card>
  )
}

export { PlayModeForm }
