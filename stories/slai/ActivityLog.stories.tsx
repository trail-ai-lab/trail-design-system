import type { Meta, StoryObj } from "@storybook/nextjs"
import { MapIcon, ShapesIcon, SlidersHorizontalIcon } from "lucide-react"

import { ActivityLogCard } from "@/components/slai/activity-log-card"

const meta: Meta<typeof ActivityLogCard> = {
  title: "SLAI/ActivityLogCard",
  component: ActivityLogCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ActivityLogCard>

export const Default: Story = {
  args: {
    scopeLabel: "Group 1",
    events: [
      {
        id: "a1",
        icon: ShapesIcon,
        title: "Inclined Plane",
        detail: "Activity started",
        time: "3:40 PM",
      },
      {
        id: "a2",
        icon: SlidersHorizontalIcon,
        title: "Ramp angle",
        detail: "15° → 30°",
        time: "3:43 PM",
        value: "2 runs",
      },
      {
        id: "a3",
        icon: SlidersHorizontalIcon,
        title: "Ball mass",
        detail: "1.0 kg → 2.0 kg",
        time: "3:47 PM",
        value: "1 run",
      },
      {
        id: "a4",
        icon: MapIcon,
        title: "VidyaMap",
        detail: "Concept map opened",
        time: "3:51 PM",
      },
    ],
  },
}
