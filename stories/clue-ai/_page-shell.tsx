import * as React from "react"
import { CircleHelpIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AppShell } from "@/components/patterns/app-shell"
import { ModeToggle } from "@/components/patterns/mode-toggle"
import {
  PageBreadcrumb,
  type PageBreadcrumbItem,
} from "@/components/patterns/page-breadcrumb"
import type { CaseNavId } from "@/components/clue-ai/case-sidebar"
import type { SuspectStatus } from "@/components/clue-ai/suspect-card"
import type { Player } from "@/components/clue-ai/lib/case"
import { CasePageSidebar } from "./_case-fixtures"

/** Header cluster for Clue AI: how-to-play + theme. */
function CaseHeaderActions() {
  return (
    <div className="ml-auto flex items-center gap-1.5">
      <Button variant="ghost" size="sm">
        <CircleHelpIcon data-icon="inline-start" />
        <span className="max-sm:sr-only">How to play</span>
      </Button>
      <ModeToggle size="icon-sm" />
    </div>
  )
}

/** Every Clue AI page story renders through this shell. */
export function CasePage({
  breadcrumb,
  activeNav,
  activeSuspect,
  board,
  team,
  toolbar,
  children,
}: {
  breadcrumb: PageBreadcrumbItem[]
  activeNav?: CaseNavId
  activeSuspect?: string
  board?: Record<string, SuspectStatus>
  /** The players shown in the sidebar footer */
  team?: Player[]
  toolbar?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <AppShell
      sidebar={
        <CasePageSidebar
          activeNav={activeNav}
          activeSuspect={activeSuspect}
          board={board}
          players={team}
        />
      }
      title={<PageBreadcrumb items={breadcrumb} />}
      headerActions={<CaseHeaderActions />}
      toolbar={toolbar}
    >
      {children}
    </AppShell>
  )
}
