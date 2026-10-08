import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "@/components/ui/button"
import {
  GlobalSearch,
  useSearchShortcut,
  type SearchResult,
} from "@/components/slai/global-search"

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
  {
    id: "2",
    className: "Physics",
    sessionName: "Period 3",
    groupName: "Group 2",
    snippet: "We think friction slows it down on the wood surface.",
    timestamp: "10:51 AM",
  },
  {
    id: "3",
    className: "Biology",
    sessionName: "Period 1",
    groupName: "Group 4",
    speaker: "Student 1",
    snippet: "Photosynthesis needs light, water and carbon dioxide.",
    timestamp: "9:12 AM",
  },
]

const meta: Meta<typeof GlobalSearch> = {
  title: "SLAI/GlobalSearch",
  component: GlobalSearch,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    open: true,
    onOpenChange: () => {},
    query: "ramp",
    onQueryChange: () => {},
    results: RESULTS,
    classes: ["Physics", "Biology"],
    sessions: ["Period 1", "Period 3"],
    tookMs: 42,
  },
}

export default meta
type Story = StoryObj<typeof GlobalSearch>

export const Results: Story = {}

export const WithClassFilter: Story = {
  args: { classFilter: "Physics", results: RESULTS.slice(0, 2) },
}

export const StartTyping: Story = { args: { query: "" } }

export const Loading: Story = { args: { loading: true } }

export const NoResults: Story = { args: { query: "volcano", results: [] } }

export const ErrorState: Story = {
  args: { error: "Search is unavailable right now. Try again." },
}

/** Press ⌘K / Ctrl+K to toggle; `useSearchShortcut` wires the shortcut. */
export const Interactive: Story = {
  render: function Interactive(args) {
    const [open, setOpen] = React.useState(false)
    const [query, setQuery] = React.useState("")
    useSearchShortcut(() => setOpen((value) => !value))
    const results = query.trim().length >= 2 ? RESULTS : []
    return (
      <div className="p-6">
        <Button variant="outline" onClick={() => setOpen(true)}>
          Search (⌘K)
        </Button>
        <GlobalSearch
          {...args}
          open={open}
          onOpenChange={setOpen}
          query={query}
          onQueryChange={setQuery}
          results={results}
        />
      </div>
    )
  },
}
