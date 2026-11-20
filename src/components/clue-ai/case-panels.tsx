"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useControllableState } from "@/lib/use-controllable-state"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export interface CasePanel {
  value: string
  label: string
  icon: React.ComponentType<React.ComponentProps<"svg">>
  /** A count on the tab, e.g. suggestions waiting */
  badge?: number
  /** Read by screen readers after the badge, e.g. "suggestions waiting" */
  badgeLabel?: string
  /** The panel; give it `className="h-full"` so it fills the column */
  content: React.ReactNode
}

const LARGE_QUERY = "(min-width: 1024px)"

function useIsLarge() {
  const [isLarge, setIsLarge] = React.useState(true)
  React.useEffect(() => {
    const mql = window.matchMedia(LARGE_QUERY)
    const update = () => setIsLarge(mql.matches)
    update()
    mql.addEventListener("change", update)
    return () => mql.removeEventListener("change", update)
  }, [])
  return isLarge
}

function PanelBadge({ panel }: { panel: CasePanel }) {
  if (!panel.badge) return null
  return (
    <span className="rounded-full bg-foreground px-1.5 text-caption text-background tabular-nums">
      {panel.badge}
      {panel.badgeLabel && <span className="sr-only"> {panel.badgeLabel}</span>}
    </span>
  )
}

/**
 * The right-hand side of a working screen — the open source, and with an AI
 * teammate the chat. On large screens it's a column (tabs when there's more
 * than one panel). On phones it's a bar pinned to the bottom of the page whose
 * buttons open the panel in a drawer, so the source and chat are always one
 * tap away instead of below every sentence.
 *
 * Set `value` and `open` together to bring a panel up from elsewhere, e.g.
 * "Check source" on a sentence.
 */
function CasePanels({
  panels,
  value: valueProp,
  defaultValue,
  onValueChange,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
}: {
  panels: CasePanel[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Phones only: the drawer is open */
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}) {
  const isLarge = useIsLarge()
  const [value, setValue] = useControllableState({
    value: valueProp,
    defaultValue: defaultValue ?? panels[0]?.value ?? "",
    onChange: onValueChange,
  })
  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  const active = panels.find((p) => p.value === value) ?? panels[0]

  const tabs = (
    <Tabs
      value={active?.value}
      onValueChange={setValue}
      className="flex min-h-0 flex-1 flex-col gap-2"
    >
      {panels.length > 1 && (
        <TabsList className="w-full">
          {panels.map((panel) => {
            const Icon = panel.icon
            return (
              <TabsTrigger key={panel.value} value={panel.value}>
                <Icon />
                {panel.label}
                <PanelBadge panel={panel} />
              </TabsTrigger>
            )
          })}
        </TabsList>
      )}
      {panels.map((panel) => (
        <TabsContent
          key={panel.value}
          value={panel.value}
          className="flex min-h-0 flex-1 flex-col"
        >
          {panel.content}
        </TabsContent>
      ))}
    </Tabs>
  )

  if (isLarge) {
    return (
      <div
        data-slot="case-panels"
        className={cn("flex min-h-0 flex-col", className)}
      >
        {tabs}
      </div>
    )
  }

  return (
    <div
      data-slot="case-panels"
      data-layout="dock"
      className="sticky bottom-(--shell-gap) z-raised flex justify-center"
    >
      <div className="flex gap-1 rounded-full bg-card p-1 shadow-overlay ring-1 ring-foreground/10">
        {panels.map((panel) => {
          const Icon = panel.icon
          return (
            <Button
              key={panel.value}
              variant="ghost"
              className="rounded-full"
              onClick={() => {
                setValue(panel.value)
                setOpen(true)
              }}
            >
              <Icon data-icon="inline-start" />
              {panel.label}
              <PanelBadge panel={panel} />
            </Button>
          )
        })}
      </div>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="h-5/6">
          <DrawerHeader className="sr-only">
            <DrawerTitle>{active?.label}</DrawerTitle>
            <DrawerDescription>
              {panels.map((p) => p.label).join(" and ")}
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex min-h-0 flex-1 flex-col p-(--shell-gap) pt-2">
            {tabs}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export { CasePanels }
