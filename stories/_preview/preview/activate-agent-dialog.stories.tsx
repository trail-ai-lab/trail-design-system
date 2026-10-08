// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/activate-agent-dialog.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/react-vite"
import { ActivateAgentDialog } from "@/components/blocks/preview/cards/activate-agent-dialog"

const meta: Meta<typeof ActivateAgentDialog> = {
  title: "Preview/Blocks 01/ActivateAgentDialog",
  component: ActivateAgentDialog,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof ActivateAgentDialog>

export const Default: Story = {}
