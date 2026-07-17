// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/syncing-state.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { SyncingState } from "@/components/blocks/preview-02/cards/syncing-state"

const meta: Meta<typeof SyncingState> = {
  title: "_Preview/Preview-02/SyncingState",
  component: SyncingState,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof SyncingState>

export const Default: Story = {}
