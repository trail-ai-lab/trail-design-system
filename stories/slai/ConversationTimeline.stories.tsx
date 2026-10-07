import type { Meta, StoryObj } from "@storybook/nextjs"

import { ConversationTimeline } from "@/components/slai/conversation-timeline"

const meta: Meta<typeof ConversationTimeline> = {
  title: "SLAI/ConversationTimeline",
  component: ConversationTimeline,
  tags: ["autodocs"],
  args: {
    segments: [
      { id: "1", speakerId: "a", speakerName: "Rosa", startSec: 4, text: "Cuatro en cada grupo.", language: "ES", translatedText: "Four in each group." },
      { id: "2", speakerId: "b", speakerName: "Liam", startSec: 11, text: "I think it's four too." },
      { id: "3", speakerId: "a", speakerName: "Rosa", startSec: 19, text: "Sí, doce entre tres.", language: "ES", translatedText: "Yes, twelve divided by three." },
    ],
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
type Story = StoryObj<typeof ConversationTimeline>

export const Default: Story = {}
