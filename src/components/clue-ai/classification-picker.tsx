"use client"

import { cn } from "@/lib/utils"
import type { ButtonSize } from "@/lib/types"
import { useControllableState } from "@/lib/use-controllable-state"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  CLASSIFICATIONS,
  CLASSIFICATION_ORDER,
  classificationSelectedClassName,
  type Classification,
} from "./lib/case"

/**
 * The three highlighters: Accurate, Misrepresentation, Hallucination. A
 * single-choice toggle row; picking the selected one again clears it. The
 * picked item takes its meaning color and icon, the others stay neutral.
 *
 * Labels hide when the nearest `@container` ancestor is narrower than 28rem
 * (rows in AiSummaryCard and ReconcileCard set one), leaving icon buttons with
 * tooltips and accessible names. Without a container ancestor labels show.
 */
function ClassificationPicker({
  value: valueProp,
  defaultValue,
  onValueChange,
  disabled = false,
  size = "sm",
  "aria-label": ariaLabel = "Classification",
  className,
}: {
  value?: Classification | null
  defaultValue?: Classification | null
  onValueChange?: (value: Classification | null) => void
  disabled?: boolean
  size?: Extract<ButtonSize, "sm" | "default">
  "aria-label"?: string
  className?: string
}) {
  const [value, setValue] = useControllableState<Classification | null>({
    value: valueProp,
    defaultValue: defaultValue ?? null,
    onChange: onValueChange,
  })

  return (
    <ToggleGroup
      type="single"
      variant="outline"
      size={size}
      spacing={1}
      value={value ?? ""}
      onValueChange={(next) => setValue((next || null) as Classification)}
      disabled={disabled}
      aria-label={ariaLabel}
      data-slot="classification-picker"
      className={cn("flex-wrap", className)}
    >
      {CLASSIFICATION_ORDER.map((classification) => {
        const meta = CLASSIFICATIONS[classification]
        const Icon = meta.icon
        return (
          <Tooltip key={classification}>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                value={classification}
                aria-label={meta.label}
                className={cn(
                  "text-muted-foreground",
                  classificationSelectedClassName[classification]
                )}
              >
                <Icon data-icon="inline-start" aria-hidden />
                <span className="@max-md:sr-only">{meta.label}</span>
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>
              {meta.label} — {meta.description.toLowerCase()}
            </TooltipContent>
          </Tooltip>
        )
      })}
    </ToggleGroup>
  )
}

export { ClassificationPicker }
