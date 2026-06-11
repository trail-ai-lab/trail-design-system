// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/account-access.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { AccountAccess } from "@/components/blocks/preview-02/cards/account-access"

const meta: Meta<typeof AccountAccess> = {
  title: "_Preview/Preview-02/AccountAccess",
  component: AccountAccess,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof AccountAccess>

export const Default: Story = {}
