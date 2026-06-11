// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/empty-connect-bank.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { EmptyConnectBank } from "@/components/blocks/preview-02/cards/empty-connect-bank"

const meta: Meta<typeof EmptyConnectBank> = {
  title: "_Preview/Preview-02/EmptyConnectBank",
  component: EmptyConnectBank,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof EmptyConnectBank>

export const Default: Story = {}
