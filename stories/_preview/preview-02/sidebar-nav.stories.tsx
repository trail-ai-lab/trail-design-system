// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/sidebar-nav.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { SidebarNav } from "@/components/blocks/preview-02/cards/sidebar-nav"

const meta: Meta<typeof SidebarNav> = {
  title: "_Preview/Preview-02/SidebarNav",
  component: SidebarNav,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof SidebarNav>

export const Default: Story = {}
