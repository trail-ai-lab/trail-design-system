"use client"

import { CheckIcon, CircleSlashIcon, ShapesIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

export interface SessionActivity {
  id: string
  name: string
  description: string
  tags?: string[]
}

/**
 * Selectable list of interactive activities for a session. Always includes
 * a "None" option at the top. Students see the chosen activity alongside
 * the recording controls.
 */
function ActivityPicker({
  activities,
  value = "none",
  onValueChange,
  className,
}: {
  activities: SessionActivity[]
  /** Selected activity id, or "none" */
  value?: string
  onValueChange?: (value: string) => void
  className?: string
}) {
  const options: SessionActivity[] = [
    {
      id: "none",
      name: "None",
      description: "No activity — recording only",
    },
    ...activities,
  ]

  return (
    <ItemGroup className={cn("gap-2", className)} role="radiogroup">
      {options.map((activity) => {
        const selected = value === activity.id
        return (
          <Item
            key={activity.id}
            asChild
            variant="outline"
            className={cn(
              "cursor-pointer",
              selected && "border-primary bg-primary/5"
            )}
          >
            <button
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onValueChange?.(activity.id)}
            >
              <ItemMedia variant="icon">
                {activity.id === "none" ? <CircleSlashIcon /> : <ShapesIcon />}
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{activity.name}</ItemTitle>
                <ItemDescription>{activity.description}</ItemDescription>
                {activity.tags && activity.tags.length > 0 && (
                  <span className="mt-1 flex flex-wrap gap-1">
                    {activity.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </span>
                )}
              </ItemContent>
              {selected && <CheckIcon className="size-4 text-primary" />}
            </button>
          </Item>
        )
      })}
    </ItemGroup>
  )
}

/**
 * Side panel wrapping the activity picker.
 */
function ActivityPickerSheet({
  open,
  onOpenChange,
  activities,
  value,
  onValueChange,
  children,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  activities: SessionActivity[]
  value?: string
  onValueChange?: (value: string) => void
  children?: React.ReactNode
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {children}
      <SheetContent className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-heading">Activities</SheetTitle>
          <SheetDescription>
            Choose an interactive activity for this session. Students will see
            it alongside the recording controls.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <ActivityPicker
            activities={activities}
            value={value}
            onValueChange={onValueChange}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { ActivityPicker, ActivityPickerSheet }
