import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  FlagIcon,
  MapIcon,
  ShapesIcon,
  SlidersHorizontalIcon,
} from "lucide-react"

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

export const Empty: Story = {
  args: {
    scopeLabel: "Group 2",
    events: [],
  },
}

/** Events with `details` expand to show every setting and result of a run. */
export const WithDetails: Story = {
  args: {
    scopeLabel: "Group 1",
    events: [
      {
        id: "1",
        icon: ShapesIcon,
        title: "Inclined Plane started",
        time: "3:40 PM",
      },
      {
        id: "2",
        icon: SlidersHorizontalIcon,
        title: "Ramp angle",
        detail: "15° → 30°",
        time: "3:41 PM",
      },
      {
        id: "3",
        icon: FlagIcon,
        title: "Trial 1 completed",
        detail: "Ball reached the bottom in 1.8 s",
        time: "3:42 PM",
        details: [
          { label: "Ramp angle", value: "30°" },
          { label: "Mass", value: "0.5 kg" },
          { label: "Friction", value: "0.1" },
          { label: "Time", value: "1.8 s" },
          { label: "Final speed", value: "3.1 m/s" },
        ],
      },
    ],
  },
}
