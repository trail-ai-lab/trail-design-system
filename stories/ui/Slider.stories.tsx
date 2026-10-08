import type { Meta, StoryObj } from "@storybook/react-vite"
import { Slider } from "@/components/ui/slider"

// a11y: aria-input-field-name disabled. Upstream: shadcn's Slider doesn't pass aria-label to the Radix thumb.
const A11Y = {
  config: {
    rules: [{ id: "aria-input-field-name", enabled: false }],
  },
}

const meta: Meta<typeof Slider> = {
  title: "UI/Slider",
  parameters: { a11y: A11Y },
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    defaultValue: { control: false },
  },
}
export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {
  render: () => (
    <Slider defaultValue={[50]} max={100} step={1} className="w-64" />
  ),
}

export const Range: Story = {
  render: () => (
    <Slider defaultValue={[20, 80]} max={100} step={1} className="w-64" />
  ),
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-3">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Confidence threshold</span>
        <span>70%</span>
      </div>
      <Slider defaultValue={[70]} max={100} step={5} />
    </div>
  ),
}
