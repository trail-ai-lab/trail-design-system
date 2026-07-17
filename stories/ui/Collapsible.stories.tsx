import type { Meta, StoryObj } from "@storybook/nextjs"
import { ChevronsUpDownIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"

const meta: Meta<typeof Collapsible> = {
  title: "UI/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
}
export default meta
type Story = StoryObj<typeof Collapsible>

export const Default: Story = {
  render: () => (
    <Collapsible className="w-80" defaultOpen>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">
          3 students in Group 1
        </p>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon-sm">
            <ChevronsUpDownIcon />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="mt-2 flex flex-col gap-1.5">
        <p className="rounded-xl border border-border px-3 py-2 text-sm text-foreground">
          Aarav
        </p>
        <p className="rounded-xl border border-border px-3 py-2 text-sm text-foreground">
          Mia
        </p>
        <p className="rounded-xl border border-border px-3 py-2 text-sm text-foreground">
          Jordan
        </p>
      </CollapsibleContent>
    </Collapsible>
  ),
}

// Uncontrolled + closed by default — click the trigger to expand.
export const Collapsed: Story = {
  render: () => (
    <Collapsible className="w-80">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">
          Advanced settings
        </p>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon-sm">
            <ChevronsUpDownIcon />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="mt-2 text-sm text-muted-foreground">
        Hidden until the trigger is clicked.
      </CollapsibleContent>
    </Collapsible>
  ),
}
