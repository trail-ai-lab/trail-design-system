"use client"

import * as React from "react"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

/**
 * The SLAI page scaffold: sidebar + a sticky breadcrumb header, an optional
 * toolbar row, and a scroll-managed content region.
 *
 * Every SLAI page (live session, post-session review, new session) renders
 * through this shell so the chrome — padding, borders, sidebar wiring — stays
 * identical and on the shared spacing scale (--shell-* tokens in
 * src/tokens/layout.css). Page-specific content padding is left to `children`,
 * since layouts vary (grid vs centered vs scroll).
 */
function AppShell({
  sidebar,
  title,
  toolbar,
  children,
}: {
  /** The sidebar element, e.g. <SlaiSidebar … />. */
  sidebar: React.ReactNode
  /** Breadcrumb / page title shown next to the sidebar trigger. */
  title?: React.ReactNode
  /** Optional second row under the header (group switcher, page actions). */
  toolbar?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-svh w-full bg-background lg:h-svh lg:overflow-hidden">
        {sidebar}
        <main className="flex min-w-0 flex-1 flex-col lg:h-full">
          <div className="flex shrink-0 items-center gap-1.5 border-b border-border px-(--shell-px) py-(--shell-py) text-sm">
            <SidebarTrigger />
            {title}
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
