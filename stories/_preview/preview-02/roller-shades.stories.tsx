// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/roller-shades.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { RollerShades } from "@/components/blocks/preview-02/cards/roller-shades"

const meta: Meta<typeof RollerShades> = {
  title: "_Preview/Preview-02/RollerShades",
  component: RollerShades,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof RollerShades>

export const Default: Story = {}
