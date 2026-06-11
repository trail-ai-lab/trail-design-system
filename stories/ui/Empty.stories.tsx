import type { Meta, StoryObj } from "@storybook/nextjs"
import { FileSearch } from "lucide-react"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Button } from "@/components/ui/button"

const meta: Meta = {
  title: "UI/Empty",
  tags: ["autodocs"],
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Empty className="w-80">
      <EmptyHeader>
        <EmptyMedia>
          <FileSearch />
        </EmptyMedia>
        <EmptyTitle>No sessions found</EmptyTitle>
        <EmptyDescription>
          No SLAI sessions match your current filters. Try adjusting the date range.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Clear filters</Button>
      </EmptyContent>
    </Empty>
  ),
}

export const Simple: Story = {
  render: () => (
    <Empty className="w-80">
      <EmptyHeader>
        <EmptyTitle>No results</EmptyTitle>
        <EmptyDescription>Start by uploading a session recording.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}
