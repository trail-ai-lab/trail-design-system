// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/social-links.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { SocialLinks } from "@/components/blocks/preview-02/cards/social-links"

const meta: Meta<typeof SocialLinks> = {
  title: "_Preview/Preview-02/SocialLinks",
  component: SocialLinks,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof SocialLinks>

export const Default: Story = {}
