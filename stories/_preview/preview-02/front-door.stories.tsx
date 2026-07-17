// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/front-door.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { FrontDoor } from "@/components/blocks/preview-02/cards/front-door"

const meta: Meta<typeof FrontDoor> = {
  title: "_Preview/Preview-02/FrontDoor",
  component: FrontDoor,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof FrontDoor>

export const Default: Story = {}
