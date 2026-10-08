import type { Meta, StoryObj } from "@storybook/react-vite"
import { Progress } from "@/components/ui/progress"

const meta: Meta<typeof Progress> = {
  title: "UI/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 } },
  },
}
export default meta
type Story = StoryObj<typeof Progress>

export const Default: Story = {
  args: { value: 60, "aria-label": "Progress" },
}

export const States: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Uploading…</span>
          <span>33%</span>
        </div>
        <Progress value={33} aria-label="Uploading" />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Analysing…</span>
          <span>67%</span>
        </div>
        <Progress value={67} aria-label="Analysing" />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Complete</span>
          <span>100%</span>
        </div>
        <Progress value={100} aria-label="Complete" />
      </div>
    </div>
  ),
}
