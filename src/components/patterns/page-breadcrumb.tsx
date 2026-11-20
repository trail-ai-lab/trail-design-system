import * as React from "react"
import { ChevronLeftIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { AppLink } from "@/components/patterns/link-provider"
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
  /** Link target (rendered with the `LinkProvider` component); omit for a non-navigable ancestor */
  href?: string
}

/**
 * Page location for an app shell header, e.g. "Physics / Period 3 — Aug 21".
 * Ancestors are muted; the last item is the current page. Pass a single item
 * for a top-level page title.
 *
 * On phones the ancestors collapse into a back arrow to the nearest linked
 * one, so the current page name gets the whole width.
 */
function PageBreadcrumb({
  items,
  className,
}: {
  items: PageBreadcrumbItem[]
  className?: string
}) {
  const back = items
    .slice(0, -1)
    .reverse()
    .find((item) => item.href)
  return (
    <Breadcrumb className={cn("min-w-0", className)}>
      <BreadcrumbList className="flex-nowrap">
        {back && (
          <BreadcrumbItem className="md:hidden">
            <BreadcrumbLink asChild>
              <AppLink
                href={back.href!}
                aria-label={
                  typeof back.label === "string"
                    ? `Back to ${back.label}`
                    : "Back"
                }
                className="-ml-1 flex size-7 items-center justify-center rounded-md"
              >
                <ChevronLeftIcon aria-hidden className="size-4" />
              </AppLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem
                className={cn("min-w-0", !isLast && "max-md:hidden")}
              >
                {isLast ? (
                  <BreadcrumbPage className="truncate font-medium">
                    {item.label}
                  </BreadcrumbPage>
                ) : item.href ? (
                  <BreadcrumbLink asChild className="truncate">
                    <AppLink href={item.href}>{item.label}</AppLink>
                  </BreadcrumbLink>
                ) : (
                  <span className="truncate">{item.label}</span>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="max-md:hidden" />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export { PageBreadcrumb }
