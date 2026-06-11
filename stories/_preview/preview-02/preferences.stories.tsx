// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/preferences.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { Preferences } from "@/components/blocks/preview-02/cards/preferences"

const meta: Meta<typeof Preferences> = {
  title: "_Preview/Preview-02/Preferences",
  component: Preferences,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof Preferences>

export const Default: Story = {}
