// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/invite-team.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/react-vite"
import { InviteTeam } from "@/components/blocks/preview/cards/invite-team"

const meta: Meta<typeof InviteTeam> = {
  title: "Preview/Blocks 01/InviteTeam",
  component: InviteTeam,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof InviteTeam>

export const Default: Story = {}
