// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/faq.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { Faq } from "@/components/blocks/preview-02/cards/faq"

const meta: Meta<typeof Faq> = {
  title: "_Preview/Preview-02/Faq",
  component: Faq,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof Faq>

export const Default: Story = {}
