"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

/**
 * A labelled on/off switch for a card header's actions, e.g. "Translation"
 * or "Speakers" on a transcript. The label sits before the switch, muted, so
 * a row of them reads as view options rather than form fields.
 */
function HeaderSwitch({
  label,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  className,
}: {
  label: string
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
}) {
  const id = React.useId()
  return (
    <div
      data-slot="header-switch"
      className={cn("flex items-center gap-2", className)}
    >
      <Label htmlFor={id} className="font-normal text-muted-foreground">
        {label}
      </Label>
      <Switch
        id={id}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
    </div>
  )
}

export { HeaderSwitch }
