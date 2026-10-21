import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

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

/**
 * The teacher joined the group (`role: "teacher"`), and speaker identification
 * tagged two speakers (`aiTagged`), so their rows carry "Teacher" and "AI" badges.
 */
export const WithTeacherAndAiTags: Story = {
  args: {
    speakers: [
      {
        id: "s1",
        label: "Speaker 1",
        seconds: 412,
        student: "Asha",
        aiTagged: true,
      },
      {
        id: "s2",
        label: "Speaker 2",
        seconds: 268,
        student: "Teacher",
        role: "teacher",
      },
      {
        id: "s3",
        label: "Speaker 3",
        seconds: 190,
        student: "Chen",
        aiTagged: true,
      },
      { id: "s4", label: "Speaker 4", seconds: 74 },
    ],
    students: ["Teacher", "Asha", "Ben", "Chen", "Dara"],
  },
}

/** `embedded`: a labelled subsection with no card chrome, for inside DiarizationPanel. */
export const Embedded: Story = { args: { variant: "embedded" } }

/**
 * Roster entries as `{id, name}`: `onAssign` also receives the student's id,
 * so the assignment can be stored against the roster student.
 */
export const WithRosterIds: Story = {
  args: {
    students: [
      { id: "stu_asha", name: "Asha" },
      { id: "stu_ben", name: "Ben" },
      { id: "stu_chen", name: "Chen" },
      { id: "stu_dara", name: "Dara" },
    ],
  },
  render: function Controlled(args) {
    const [speakers, setSpeakers] = React.useState(args.speakers)
    return (
      <ContributionPanel
        {...args}
        speakers={speakers}
        onAssign={(id, student, studentId) =>
          setSpeakers((list) =>
            list.map((s) => (s.id === id ? { ...s, student, studentId } : s))
          )
        }
      />
    )
  },
}
