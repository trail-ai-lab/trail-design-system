// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/github-profile.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/react-vite"
import { GithubProfile } from "@/components/blocks/preview/cards/github-profile"

const meta: Meta<typeof GithubProfile> = {
  title: "Preview/Blocks 01/GithubProfile",
  component: GithubProfile,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof GithubProfile>

export const Default: Story = {}
