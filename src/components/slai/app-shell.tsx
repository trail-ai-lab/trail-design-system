"use client"

import * as React from "react"
import { MoonIcon, SearchIcon, SunIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

const TRAIL_LAB_URL = "https://trail.wcer.wisc.edu"

/**
 * Toggles the `dark` class on <html>. Works with class-based dark mode — the
 * app uses next-themes (attribute="class") and Storybook's preview decorator
 * toggles the same class, so flipping it here drives both.
 */
function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark")
    document.documentElement.classList.toggle("dark", next)
    setIsDark(next)
  }

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
    </Button>
  )
}

/** Command-palette-style search trigger. Presentational for now. */
function SearchButton() {
  return (
    <Button
      variant="outline"
      size="sm"
      className="hidden font-normal text-muted-foreground sm:inline-flex"
    >
      <SearchIcon data-icon="inline-start" />
      Search
      <Kbd className="ml-4">⌘K</Kbd>
    </Button>
  )
}

/** The default right-aligned header cluster shared by every page. */
function SiteHeaderActions() {
  return (
    <div className="ml-auto flex items-center gap-1.5">
      <SearchButton />
      <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
        <a href={TRAIL_LAB_URL} target="_blank" rel="noreferrer">
          TRAIL Lab
        </a>
      </Button>
      <ThemeToggle />
    </div>
  )
}

/**
 * The SLAI page scaffold: sidebar + a sticky breadcrumb header, an optional
 * toolbar row, and a scroll-managed content region.
 *
 * Every SLAI page (live session, post-session review, new session) renders
 * through this shell so the chrome — padding, borders, sidebar wiring, and the
 * shared header actions (search, TRAIL Lab, theme toggle) — stays identical.
 * Page-specific content padding is left to `children`, since layouts vary
 * (grid vs centered vs scroll).
 */
function AppShell({
  sidebar,
  title,
  toolbar,
  headerActions = <SiteHeaderActions />,
  children,
}: {
  /** The sidebar element, e.g. <SlaiSidebar … />. */
  sidebar: React.ReactNode
  /** Breadcrumb / page title shown next to the sidebar trigger. */
  title?: React.ReactNode
  /** Optional second row under the header (group switcher, page actions). */
  toolbar?: React.ReactNode
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
