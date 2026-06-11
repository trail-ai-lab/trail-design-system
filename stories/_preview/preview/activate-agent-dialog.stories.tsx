// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/activate-agent-dialog.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { ActivateAgentDialog } from "@/components/blocks/preview/cards/activate-agent-dialog"

const meta: Meta<typeof ActivateAgentDialog> = {
  title: "_Preview/Preview/ActivateAgentDialog",
  component: ActivateAgentDialog,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof ActivateAgentDialog>

export const Default: Story = {}
