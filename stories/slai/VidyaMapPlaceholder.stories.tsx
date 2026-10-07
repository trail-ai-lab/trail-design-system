import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { VidyaMapPlaceholder } from "@/components/slai/vidya-map-placeholder"

const meta: Meta<typeof VidyaMapPlaceholder> = {
  title: "SLAI/VidyaMapPlaceholder",
  component: VidyaMapPlaceholder,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof VidyaMapPlaceholder>

export const Default: Story = {
  render: function Controlled(args) {
    const [subject, setSubject] = React.useState<string>()
    return (
      <VidyaMapPlaceholder {...args} subject={subject} onSubjectChange={setSubject} />
    )
  },
}

export const SubjectSelected: Story = { args: { subject: "Biology" } }

export const Loading: Story = { args: { subject: "Biology", loading: true } }

export const ErrorState: Story = {
  args: { subject: "Biology", error: "Couldn't load the concept map." },
}
