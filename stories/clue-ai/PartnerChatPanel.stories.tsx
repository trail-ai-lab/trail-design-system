import type { Meta, StoryObj } from "@storybook/react-vite"

import { PartnerChatPanel } from "@/components/clue-ai/partner-chat-panel"
import { SCENARIOS, aiTopics } from "./_ai-partner-fixtures"

const meta: Meta<typeof PartnerChatPanel> = {
  title: "ClueAI/PartnerChatPanel",
  component: PartnerChatPanel,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="flex h-svh max-w-md flex-col">
        <Story />
      </div>
    ),
  ],
  args: {
    className: "flex-1",
    suggestions: ["Show me where it says that", "Why do you think so?"],
    onSend: () => {},
    onRespond: () => {},
    onOpenDocument: () => {},
  },
}

export default meta
type Story = StoryObj<typeof PartnerChatPanel>

export const Debating: Story = {
  args: {
    partner: SCENARIOS.defensive.partner,
    players: SCENARIOS.defensive.team,
    messages: SCENARIOS.defensive.messages,
    topics: aiTopics(SCENARIOS.defensive),
  },
}

export const ChangedItsMind: Story = {
  args: {
    partner: SCENARIOS.reasonable.partner,
    players: SCENARIOS.reasonable.team,
    messages: SCENARIOS.reasonable.messages,
    topics: aiTopics(SCENARIOS.reasonable),
    typing: true,
  },
}

export const NotOpenYet: Story = {
  args: {
    partner: SCENARIOS.reasonable.partner,
    players: SCENARIOS.reasonable.team,
    status: "waiting",
    messages: [],
  },
}

export const Closed: Story = {
  args: {
    partner: SCENARIOS.defensive.partner,
    players: SCENARIOS.defensive.team,
    status: "closed",
    messages: SCENARIOS.defensive.messages,
  },
}
