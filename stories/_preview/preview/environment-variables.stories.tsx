// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/environment-variables.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/react-vite"
import { EnvironmentVariables } from "@/components/blocks/preview/cards/environment-variables"

const meta: Meta<typeof EnvironmentVariables> = {
  title: "Preview/Blocks 01/EnvironmentVariables",
  component: EnvironmentVariables,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof EnvironmentVariables>

export const Default: Story = {}
