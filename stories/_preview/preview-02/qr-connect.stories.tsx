// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/qr-connect.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { QrConnect } from "@/components/blocks/preview-02/cards/qr-connect"

const meta: Meta<typeof QrConnect> = {
  title: "_Preview/Preview-02/QrConnect",
  component: QrConnect,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof QrConnect>

export const Default: Story = {}
