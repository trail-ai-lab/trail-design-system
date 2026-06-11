// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/no-team-members.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { NoTeamMembers } from "@/components/blocks/preview/cards/no-team-members"

const meta: Meta<typeof NoTeamMembers> = {
  title: "_Preview/Preview/NoTeamMembers",
  component: NoTeamMembers,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof NoTeamMembers>

export const Default: Story = {}
