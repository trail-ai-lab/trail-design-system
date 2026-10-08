import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export interface PageBreadcrumbItem {
  label: React.ReactNode
  /** Link target; omit for a non-navigable ancestor */
  href?: string
}

/**
 * Page location for an app shell header, e.g. "Physics / Period 3 — Aug 21".
 * Ancestors are muted; the last item is the current page. Pass a single item
 * for a top-level page title.
 */
function PageBreadcrumb({
  items,
  className,
}: {
  items: PageBreadcrumbItem[]
  className?: string
}) {
  return (
    <Breadcrumb className={cn("min-w-0", className)}>
      <BreadcrumbList className="flex-nowrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem className="min-w-0">
                {isLast ? (
                  <BreadcrumbPage className="truncate font-medium">
                    {item.label}
                  </BreadcrumbPage>
                ) : item.href ? (
                  <BreadcrumbLink href={item.href} className="truncate">
                    {item.label}
                  </BreadcrumbLink>
                ) : (
                  <span className="truncate">{item.label}</span>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export { PageBreadcrumb }
