// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/anomaly-alert.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/react-vite"
import { AnomalyAlert } from "@/components/blocks/preview/cards/anomaly-alert"

const meta: Meta<typeof AnomalyAlert> = {
  title: "Preview/Blocks 01/AnomalyAlert",
  component: AnomalyAlert,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof AnomalyAlert>

export const Default: Story = {}
