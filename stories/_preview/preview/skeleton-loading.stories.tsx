// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/skeleton-loading.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/react-vite"
import { SkeletonLoading } from "@/components/blocks/preview/cards/skeleton-loading"

const meta: Meta<typeof SkeletonLoading> = {
  title: "Preview/Blocks 01/SkeletonLoading",
  component: SkeletonLoading,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof SkeletonLoading>

export const Default: Story = {}
