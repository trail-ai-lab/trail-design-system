import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import {
  ContributionPanel,
  type ContributionSpeaker,
} from "@/components/slai/contribution-panel"

const SPEAKERS: ContributionSpeaker[] = [
  { id: "s1", label: "Speaker 1", seconds: 412, student: "Asha" },
  { id: "s2", label: "Speaker 2", seconds: 268 },
  { id: "s3", label: "Speaker 3", seconds: 190, student: "Chen" },
  { id: "s4", label: "Speaker 4", seconds: 74 },
]

const meta: Meta<typeof ContributionPanel> = {
  title: "SLAI/ContributionPanel",
  component: ContributionPanel,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    speakers: SPEAKERS,
    students: ["Asha", "Ben", "Chen", "Dara"],
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ContributionPanel>

export const Default: Story = {}

export const Saving: Story = { args: { status: "saving" } }

export const Saved: Story = { args: { status: "saved" } }

export const Interactive: Story = {
  render: function Controlled(args) {
    const [speakers, setSpeakers] = React.useState(args.speakers)
    return (
      <ContributionPanel
        {...args}
        speakers={speakers}
        onAssign={(id, student) =>
          setSpeakers((list) =>
            list.map((s) => (s.id === id ? { ...s, student } : s))
          )
        }
      />
    )
  },
}
