"use client"

import * as React from "react"
import { SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/patterns/mode-toggle"

const TRAIL_LAB_URL = "https://trail.wcer.wisc.edu"

const noopSubscribe = () => () => {}

/** "⌘K" on Apple platforms, "Ctrl K" elsewhere. Renders "⌘K" on the server. */
function useShortcutLabel() {
  const isApple = React.useSyncExternalStore(
    noopSubscribe,
    () => /Mac|iPhone|iPad/i.test(navigator.userAgent),
    () => true
  )
  return isApple ? "⌘K" : "Ctrl K"
}

/** Command-palette-style search trigger. Presentational for now. */
function SearchButton({ onClick }: { onClick?: () => void }) {
  const shortcut = useShortcutLabel()
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className="hidden font-normal text-muted-foreground sm:inline-flex"
    >
      <SearchIcon data-icon="inline-start" />
      Search
      <Kbd className="ml-4">{shortcut}</Kbd>
    </Button>
  )
}

/** The default right-aligned header cluster shared by every page. */
function SiteHeaderActions({ onSearch }: { onSearch?: () => void }) {
  return (
    <div className="ml-auto flex items-center gap-1.5">
      <SearchButton onClick={onSearch} />
      <Button
        variant="ghost"
        size="sm"
        className="hidden sm:inline-flex"
        asChild
      >
        <a href={TRAIL_LAB_URL} target="_blank" rel="noreferrer">
          TRAIL Lab
        </a>
      </Button>
      <ModeToggle size="icon-sm" />
    </div>
  )
}

/**
 * The SLAI page scaffold: sidebar + a sticky breadcrumb header, an optional
 * toolbar row, and a scroll-managed content region.
 *
 * Every SLAI page (live session, session review, new session) renders
 * through this shell so the chrome — padding, borders, sidebar wiring, and the
 * shared header actions (search, TRAIL Lab, theme toggle) — stays identical.
 * Page-specific content padding is left to `children`, since layouts vary
 * (grid vs centered vs scroll).
 */
function AppShell({
  sidebar,
  title,
  toolbar,
  onSearch,
  headerActions = <SiteHeaderActions onSearch={onSearch} />,
  children,
}: {
  /** The sidebar element, e.g. <SlaiSidebar … />. */
  sidebar: React.ReactNode
  /** Breadcrumb / page title shown next to the sidebar trigger. */
  title?: React.ReactNode
  /** Optional second row under the header (group switcher, page actions). */
  toolbar?: React.ReactNode
  /** Called when the header search button is clicked; open your GlobalSearch. */
  onSearch?: () => void
  /** Right-aligned header cluster. Defaults to the shared search / link / theme set. */
  headerActions?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-svh w-full bg-background lg:h-svh lg:overflow-hidden">
        {sidebar}
        <main className="flex min-w-0 flex-1 flex-col lg:h-full">
          <div className="flex shrink-0 items-center gap-1.5 border-b border-border px-(--shell-px) py-(--shell-py) text-sm">
            <SidebarTrigger />
            <div aria-hidden className="mx-1 h-5 w-px bg-border" />
            {title}
            {headerActions}
          </div>
          {toolbar != null && (
            <div className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-2 border-b border-border px-(--shell-px) py-(--shell-py)">
              {toolbar}
            </div>
          )}
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export { AppShell }
