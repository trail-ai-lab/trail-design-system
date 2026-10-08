import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { AppShell } from "@/components/slai/app-shell"
import {
  GlobalSearch,
  useSearchShortcut,
  type SearchResult,
} from "@/components/slai/global-search"
import { PageSidebar } from "./_page-fixtures"
import { PageBreadcrumb } from "@/components/patterns/page-breadcrumb"

const RESULTS: SearchResult[] = [
  {
    id: "1",
    className: "Physics",
    sessionName: "Period 3",
    groupName: "Group 1",
    speaker: "Student 2",
    snippet: "The steeper ramp made the ball roll faster because of gravity.",
    timestamp: "10:44 AM",
  },
]

function GlobalSearchPage() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  useSearchShortcut(() => setOpen((value) => !value))

  return (
    <AppShell
      sidebar={<PageSidebar />}
      title={<PageBreadcrumb items={[{ label: "Search" }]} />}
      onSearch={() => setOpen(true)}
    >
      <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
        Click Search or press ⌘K.
      </div>
      <GlobalSearch
        open={open}
        onOpenChange={setOpen}
        query={query}
        onQueryChange={setQuery}
        results={query.trim().length >= 2 ? RESULTS : []}
      />
    </AppShell>
  )
}

const meta: Meta = {
  title: "SLAI/Pages/GlobalSearch",
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

export const Default: Story = { render: () => <GlobalSearchPage /> }
