import type * as React from "react"

import { cn } from "@/lib/utils"
import { Item, ItemContent } from "@/components/ui/item"

export interface DetailListItem {
  label: string
  value: React.ReactNode
}

/**
 * Label–value facts in a muted box, e.g. a saved recording's name, duration
 * and size, or an activity event's details. Labels are muted on the left,
 * values right-aligned with tabular figures.
 */
function DetailList({
  items,
  className,
}: {
  items: DetailListItem[]
  className?: string
}) {
  return (
    <Item
      data-slot="detail-list"
      variant="muted"
      className={cn("flex-col items-stretch", className)}
    >
      <ItemContent>
        <dl className="flex flex-col gap-3">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-4"
            >
              <dt className="shrink-0 text-sm text-muted-foreground">
                {item.label}
              </dt>
              <dd className="min-w-0 text-right text-sm font-medium break-words tabular-nums">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </ItemContent>
    </Item>
  )
}

export { DetailList }
