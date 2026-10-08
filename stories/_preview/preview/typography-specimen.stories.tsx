// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/typography-specimen.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/react-vite"
import { TypographySpecimen } from "@/components/blocks/preview/cards/typography-specimen"

const meta: Meta<typeof TypographySpecimen> = {
  title: "Preview/Blocks 01/TypographySpecimen",
  component: TypographySpecimen,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof TypographySpecimen>

export const Default: Story = {}
