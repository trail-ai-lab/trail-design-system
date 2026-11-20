import type { Meta, StoryObj } from "@storybook/react-vite"

import { TeamStatus } from "@/components/clue-ai/team-status"
import { PARTNER, YOU } from "./_case-fixtures"
import { RILEY } from "./_ai-partner-fixtures"

const meta: Meta<typeof TeamStatus> = {
  title: "ClueAI/TeamStatus",
  component: TeamStatus,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof TeamStatus>

export const BothWorking: Story = {
  args: {
    members: [
      { player: YOU, status: "working" },
      { player: PARTNER, status: "working" },
    ],
  },
}

export const PartnerSubmitted: Story = {
  args: {
    members: [
      { player: YOU, status: "working" },
      { player: PARTNER, status: "submitted" },
    ],
  },
}

export const AllStatuses: Story = {
  args: {
    members: [
      { player: YOU, status: "waiting" },
      { player: PARTNER, status: "working" },
      {
        player: { id: "sam", name: "Sam", initials: "SA" },
        status: "submitted",
      },
      { player: { id: "lee", name: "Lee", initials: "LE" }, status: "offline" },
    ],
  },
}

export const WithAiTeammate: Story = {
  args: {
    members: [
      { player: YOU, status: "working" },
      { player: RILEY, status: "submitted" },
    ],
  },
}
