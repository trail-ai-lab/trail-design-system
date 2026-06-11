import type { Meta, StoryObj } from "@storybook/nextjs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

const meta: Meta = {
  title: "UI/Popover",
  tags: ["autodocs"],
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">Session filters</p>
          <p className="text-xs text-muted-foreground">
            Filter sessions by date range, tool, or speaker count.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
}
