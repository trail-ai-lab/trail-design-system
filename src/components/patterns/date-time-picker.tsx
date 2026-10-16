"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useControllableState } from "@/lib/use-controllable-state"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

/** "14:05" for a time input. */
function timeOf(date: Date) {
  return format(date, "HH:mm")
}

/** `date` with its time of day set from "HH:mm". */
function withTime(date: Date, time: string) {
  const [hours, minutes] = time.split(":").map(Number)
  const next = new Date(date)
  next.setHours(hours || 0, minutes || 0, 0, 0)
  return next
}

/**
 * A date and time of day, picked from a calendar popover with a time input
 * under it. Controlled, `null` means no date picked (`undefined` leaves the
 * picker uncontrolled); with `clearable` a × button clears it. Picking a day keeps the time already chosen (or `defaultTime`).
 */
function DateTimePicker({
  id,
  value: valueProp,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date and time",
  defaultTime = "09:00",
  clearable = false,
  disabled = false,
  className,
  "aria-label": ariaLabel,
}: {
  /** Put on the trigger, for a `<label htmlFor>` */
  id?: string
  /** The picked date; `null` when none is picked */
  value?: Date | null
  defaultValue?: Date | null
  onValueChange?: (value: Date | null) => void
  placeholder?: string
  /** Time of day ("HH:mm") a newly picked day starts at */
  defaultTime?: string
  /** Shows a clear (×) button while a date is picked */
  clearable?: boolean
  disabled?: boolean
  className?: string
  "aria-label"?: string
}) {
  const uid = React.useId()
  const [open, setOpen] = React.useState(false)
  const [stored, setStored] = useControllableState<Date | null>({
    value: valueProp,
    defaultValue: defaultValue ?? null,
    onChange: onValueChange,
  })
  const value = stored ?? undefined

  return (
    <div
      data-slot="date-time-picker"
      className={cn("flex items-center gap-2", className)}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            type="button"
            variant="outline"
            disabled={disabled}
            aria-label={ariaLabel}
            className={cn(
              "min-w-0 flex-1 justify-start font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon data-icon="inline-start" />
            <span className="truncate">
              {value ? format(value, "PPP 'at' p") : placeholder}
            </span>
          </Button>
        </PopoverTrigger>
        {/* Opens on whichever side has more room, and never taller than that
          room (it scrolls instead), so a trigger low in a dialog or a short
          window doesn't push the calendar off screen. */}
        <PopoverContent
          align="start"
          collisionPadding={8}
          className="max-h-(--radix-popover-content-available-height) w-auto gap-0 overflow-y-auto p-0"
        >
          <Calendar
            mode="single"
            selected={value}
            defaultMonth={value}
            onSelect={(day) => {
              if (!day) return
              setStored(withTime(day, value ? timeOf(value) : defaultTime))
            }}
          />
          <div className="flex items-center gap-2 px-3 pb-3">
            <Label htmlFor={`${uid}-time`} className="shrink-0">
              Time
            </Label>
            <Input
              id={`${uid}-time`}
              type="time"
              value={value ? timeOf(value) : ""}
              disabled={!value}
              onChange={(event) => {
                if (value && event.target.value) {
                  setStored(withTime(value, event.target.value))
                }
              }}
            />
          </div>
        </PopoverContent>
      </Popover>
      {clearable && value && (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Clear date"
          disabled={disabled}
          onClick={() => setStored(null)}
        >
          <XIcon />
        </Button>
      )}
    </div>
  )
}

export { DateTimePicker }
