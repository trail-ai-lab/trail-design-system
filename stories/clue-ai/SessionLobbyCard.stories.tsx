import type { Meta, StoryObj } from "@storybook/react-vite"

import { SessionLobbyCard } from "@/components/clue-ai/session-lobby-card"
import { PARTNER, SESSION_CODE, YOU } from "./_case-fixtures"

const meta: Meta<typeof SessionLobbyCard> = {
  title: "ClueAI/SessionLobbyCard",
  component: SessionLobbyCard,
  tags: ["autodocs"],
  args: {
    code: SESSION_CODE,
    hostId: YOU.id,
    onCopyCode: () => {},
    onJoin: () => {},
    onStart: () => {},
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-lg">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SessionLobbyCard>

export const WaitingForPartner: Story = { args: { players: [YOU] } }
export const Ready: Story = { args: { players: [YOU, PARTNER] } }
export const Joining: Story = {
  args: { players: [YOU], joinStatus: "joining" },
}
export const JoinError: Story = {
  args: { players: [YOU], joinStatus: "error" },
}
