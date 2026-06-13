import type { Meta, StoryObj } from "@storybook/nextjs"

import { ActivityCard } from "@/components/slai/activity-card"

const meta: Meta<typeof ActivityCard> = {
  title: "SLAI/ActivityCard",
  component: ActivityCard,
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof ActivityCard>

export const Default: Story = {
  args: {
    activity: {
      id: "inclined-plane",
      name: "Inclined Plane",
      description:
        "Interactive inclined plane simulation exploring forces and motion on ramps",
      tags: ["physics"],
    },
    className: "w-80",
  },
}

export const MultipleTags: Story = {
  args: {
    activity: {
      id: "vidyamap",
      name: "VidyaMap",
      description:
        "Interactive concept-map explorer for knowledge building across Biology, Forces and Motion, and Pulleys",
      tags: ["concept-map", "biology", "physics"],
    },
    className: "w-80",
  },
}

export const NoTags: Story = {
  args: {
    activity: {
      id: "compost",
      name: "Compost",
      description: "Interactive composting simulation for environmental science discussions",
    },
    className: "w-80",
  },
}
