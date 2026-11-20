"use client"

import * as React from "react"
import { GavelIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useControllableState } from "@/lib/use-controllable-state"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { notYetClassName, type Motive, type Suspect } from "./lib/case"
import { useClueAiLabels } from "./lib/labels"

export interface FinalCallValue {
  suspectId?: string
  motive?: string
}

/**
 * The team's one accusation that ends the case: who did it and why. Suspects
 * are choice cards with their portrait; the motive is a select. The warning
 * says it can't be taken back — open a ConfirmDialog from `onSubmit` before
 * sending it.
 */
function FinalCallForm({
  suspects,
  motives,
  value: valueProp,
  defaultValue,
  onValueChange,
  onSubmit,
  onBack,
  loading = false,
  className,
}: {
  suspects: Suspect[]
  motives: Motive[]
  value?: FinalCallValue
  defaultValue?: FinalCallValue
  onValueChange?: (value: FinalCallValue) => void
  onSubmit?: (value: FinalCallValue) => void
  /** Adds a "Back to suspects" button */
  onBack?: () => void
  loading?: boolean
  className?: string
}) {
  const labels = useClueAiLabels()
  const uid = React.useId()
  const [value, setValue] = useControllableState<FinalCallValue>({
    value: valueProp,
    defaultValue: defaultValue ?? {},
    onChange: onValueChange,
  })
  const isComplete = !!value.suspectId && !!value.motive

  return (
    <Card data-slot="final-call-form" className={className}>
      <CardHeader>
        <CardTitle>{labels.finalCall.title}</CardTitle>
        <CardDescription>{labels.finalCall.description}</CardDescription>
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
              <FieldLegend variant="label">
                {labels.finalCall.murderer}
              </FieldLegend>
              <RadioGroup
                value={value.suspectId ?? ""}
                onValueChange={(suspectId) => setValue({ ...value, suspectId })}
                className="grid gap-3 sm:grid-cols-2"
              >
                {suspects.map((suspect) => {
                  const id = `${uid}-${suspect.id}`
                  return (
                    <FieldLabel key={suspect.id} htmlFor={id}>
                      <Field orientation="horizontal" className="items-center">
                        <Avatar size="lg">
                          {suspect.portraitUrl && (
                            <AvatarImage src={suspect.portraitUrl} alt="" />
                          )}
                          <AvatarFallback>{suspect.initials}</AvatarFallback>
                        </Avatar>
                        <FieldContent>
                          <FieldTitle id={`${id}-title`}>
                            {suspect.name}
                          </FieldTitle>
                          <FieldDescription>{suspect.role}</FieldDescription>
                        </FieldContent>
                        <RadioGroupItem
                          value={suspect.id}
                          id={id}
                          aria-labelledby={`${id}-title`}
                        />
                      </Field>
                    </FieldLabel>
                  )
                })}
              </RadioGroup>
            </FieldSet>
            <Field>
              <FieldLabel htmlFor={`${uid}-motive`}>
                {labels.common.motive}
              </FieldLabel>
              <Select
                value={value.motive ?? ""}
                onValueChange={(motive) => setValue({ ...value, motive })}
              >
                <SelectTrigger id={`${uid}-motive`} className="w-full">
                  <SelectValue placeholder={labels.common.motivePlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {motives.map((motive) => (
                      <SelectItem key={motive.value} value={motive.value}>
                        {motive.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Alert>
              <GavelIcon />
              <AlertTitle>{labels.finalCall.warningTitle}</AlertTitle>
              <AlertDescription>
                {labels.finalCall.warningDescription}
              </AlertDescription>
            </Alert>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-2">
        <Button
          type="submit"
          form={`${uid}-form`}
          disabled={loading || !isComplete}
          className={cn(!loading && notYetClassName)}
        >
          {loading && <Spinner data-icon="inline-start" />}
          {labels.finalCall.submit}
        </Button>
        {onBack && (
          <Button variant="ghost" onClick={onBack}>
            {labels.finalCall.back}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export { FinalCallForm }
